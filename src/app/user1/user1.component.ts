import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from "../model/User";
import {PostService} from "../service/blog/post.service";
import {Post} from "../model/Post";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Observable} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {StatusService} from "../service/blog/status.service";
import {HashTagsService} from "../service/blog/hash-tags.service";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../service/auth/auth.service";
import {UserService} from "../service/blog/user.service";
import {Router} from "@angular/router";
import {DialogUserComponent} from "../user/dialog-user/dialog-user.component";

@Component({
  selector: 'app-home1',
  templateUrl: './user1.component.html',
  styleUrls: ['./user1.component.css']
})
export class User1Component implements OnInit {

  idLogin!:number;
  user!:User;
  nameLogin!:any;

  posts!:Post[];
  displayedColumns: string[] = [ 'avatarPost', 'title','description', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  selectedFile!: File;
  fb: any = '';
  downloadURL!: Observable<string>;

  constructor(private postService:PostService,
              private  dialog:MatDialog,
              private storage: AngularFireStorage,
              private statusService:StatusService,
              private hashTagsService:HashTagsService,
              private httpClient:HttpClient,
              private authService:AuthService,
              private userService:UserService,
              private router:Router) { }

  ngOnInit(): void {
    this.nameLogin = localStorage.getItem('nameLogin')
    this.user = JSON.parse(<string>localStorage.getItem("userLogin"))
    this.findAllPostByUserId()
    console.log('avatar',this.user.avatar)
  }

  public findAllPostByUserId(){
    this.postService.findAllPostByUserId(localStorage.getItem('idLogin')).subscribe({
      next:(result)=>{
        this.posts = result
        this.dataSource = new MatTableDataSource(result)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.dataSource)
      }, error:(err)=>{
        alert('Error while searching product')
      }
    })
  }
  openDialogPost() {
    this.dialog.open(DialogUserComponent, {
      width: '80%'
    }).afterClosed().subscribe(()=>{
      console.log(this.findAllPostByUserId())
      this.findAllPostByUserId();
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editPost(row:any) {
    this.dialog.open(DialogUserComponent,{
      width: '80%',
      data: row
    }).afterClosed().subscribe(() => {
      this.findAllPostByUserId();

    })
  }

  deletePost(id:any) {
    if (confirm('Are you sure delete product: ' + '?')) {
      this.postService.deletePost(id).subscribe(() => {
          alert('Delete Successfully!');
          this.findAllPostByUserId()

        }
      );
    }
  }

  public findUser(fullName:string){
    this.userService.findUserByFullName(fullName).subscribe(data => {
      this.user = data;
      this.idLogin = data.id
      console.log(data.id)
      console.log('idLogin haha', this.idLogin)
      localStorage.setItem("idLogin", String(data.id))
    })
  }

  openUserDetail() {
    this.router.navigate([''])
  }

  public logout(){
    localStorage.removeItem('nameLogin')
    localStorage.removeItem('idLogin')
    localStorage.removeItem('roleLogin')
    this.router.navigate(['/login'])
  }



  getUser() {

  }
  public checkAvatar(){
    return this.user.avatar != null;
  }

}
