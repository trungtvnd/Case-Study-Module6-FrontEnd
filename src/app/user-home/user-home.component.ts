import { Component, OnInit } from '@angular/core';
import { map } from "rxjs/operators";
import {finalize, Observable} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {Post} from "../model/Post";
import {PostService} from "../service/blog/post.service";
import {StatusService} from "../service/blog/status.service";
import {HashTagsService} from "../service/blog/hash-tags.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  public posts!:Post[];

  selectedFile!: File;
  fb: any = '';
  downloadURL!: Observable<string>;

  constructor(private storage: AngularFireStorage,
              private postService:PostService,
              private statusService:StatusService,
              private hashTagsService:HashTagsService,
              private httpClient:HttpClient) { }

  ngOnInit(): void {

    this.getAllPost();
  }

  public getAllPost(){
    this.postService.findAllPost().subscribe(data=>{
      this.posts = data
    })

  }

  onFileSelected(event:any) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
            }
            console.log(this.fb);
          });
        })
      )
      .subscribe((url: any) => {
        if (url) {
          console.log(url);
        }
      });
  }

  delete(id:any) {

  }
}
