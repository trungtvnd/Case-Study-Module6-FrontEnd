import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {finalize, Observable} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {PostService} from "../../service/blog/post.service";
import {StatusService} from "../../service/blog/status.service";
import {HashTagsService} from "../../service/blog/hash-tags.service";
import {HttpClient} from "@angular/common/http";
import {Post} from "../../model/Post";
import {Status} from "../../model/Status";
import {HashTags} from "../../model/HashTags";
import {AuthService} from "../../service/auth/auth.service";
import {UserService} from "../../service/blog/user.service";
import {User} from "../../model/User";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-user',
  templateUrl: './dialog-user.component.html',
  styleUrls: ['./dialog-user.component.css']
})
export class DialogUserComponent implements OnInit {
  formPost!: FormGroup
  posts!: Post[];
  status!: Status[];
  hashtags!:HashTags[];
  user!:User
  idUser!:number;



  selectedFile!: File;
  fb: any = '';
  downloadURL!: Observable<string>;

  constructor(private storage: AngularFireStorage,
              private postService:PostService,
              private statusService:StatusService,
              private hashTagsService:HashTagsService,
              private httpClient:HttpClient,
              private formBuilder:FormBuilder,
              private authService:AuthService,
              private userService:UserService,
              private matDialogRef: MatDialogRef<DialogUserComponent>,
              @Inject(MAT_DIALOG_DATA) public editData: any) {
  }

  ngOnInit(): void {

    this.formPost = this.formBuilder.group({
      id:[''],
      dateCreate:['',],
      title : ['',[Validators.required]],
      content : ['',[Validators.required]],
      description: ['', [Validators.required]],
      avatarPost : ['',[Validators.required]],
      status : ['',[Validators.required]],
      hashTags:['', [Validators.required]],
      user:[''],
    })
    this.getAllPost()
    this.getAllHashtags()
    this.getAllStatus()
    console.log('nameLogin',this.authService.nameLogin)
    this.findUserByFullName(this.authService.nameLogin)
    if(this.editData){
      this.formPost.controls['id'].setValue(this.editData.id);
      this.formPost.controls['title'].setValue(this.editData.title);
      this.formPost.controls['dateCreate'].setValue(this.editData.dateCreate);
      this.formPost.controls['content'].setValue(this.editData.content);
      this.formPost.controls['description'].setValue(this.editData.description);
      this.formPost.controls['avatarPost'].setValue(this.editData.avatarPost);
      this.formPost.controls['hashTags'].setValue(this.editData.hashTags);
      this.formPost.controls['status'].setValue(this.editData.status);
      this.formPost.controls['user'].setValue(this.editData.user);
    }
  }

  public getAllPost(){
    this.postService.findAllPost().subscribe(data=>{
      this.posts = data
    })

  }
  public getAllStatus(){
    this.statusService.findAllStatus().subscribe(data=>{
      this.status = data
    })

  }

  public getAllHashtags(){
    this.hashTagsService.findAllHashTag().subscribe(data=>{
      this.hashtags = data
    })

  }




  createPost() {
      const post = {
        id: this.formPost.value.id,
        title: this.formPost.value.title,
        dateCreate: new Date(),
        content: this.formPost.value.content,
        description: this.formPost.value.description,
        avatarPost: this.fb,
        status: {id: this.formPost.value.status},
        hashTags: {id: this.formPost.value.hashTags},
        user: {id: this.idUser}
      };
      this.postService.createPost(post).subscribe(() => {
        alert('Create Successfully');
        console.log(post)
        console.log(this.fb)
        this.formPost.reset();
        this.matDialogRef.close();
      });

  }

  public editPost(){
    this.postService.editPost(this.formPost.value, this.editData.id)
      .subscribe({
        next:(res) =>{
          console.log(res)
          alert('Update successfully')
          this.formPost.reset();
          this.matDialogRef.close('update')
        },
        error:()=>{
          alert('Errors while update')
        }
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

  public findUserByFullName(fullName:string){
    this.userService.findUserByFullName(fullName).subscribe(data => {
      this.user = data;
      this.idUser = data.id
      console.log(data)
    })

  }


}

