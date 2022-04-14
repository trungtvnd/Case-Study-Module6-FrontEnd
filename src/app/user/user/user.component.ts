import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {PostService} from "../../service/blog/post.service";
import {StatusService} from "../../service/blog/status.service";
import {HashTagsService} from "../../service/blog/hash-tags.service";
import {HttpClient} from "@angular/common/http";
import {DialogUserComponent} from "../dialog-user/dialog-user.component";
import {finalize, Observable} from "rxjs";
import {Post} from "../../model/Post";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {AuthService} from "../../service/auth/auth.service";
import {UserService} from "../../service/blog/user.service";
import {User} from "../../model/User";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  idLogin!:number
  user!:User
  nameLogin!:any

  displayedColumns: string[] = [ 'avatarPost', 'title','description', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public posts!:Post[];

  selectedFile!: File;
  fb: any = '';
  downloadURL!: Observable<string>;

  constructor(private  dialog:MatDialog,
              private storage: AngularFireStorage,
              private postService:PostService,
              private statusService:StatusService,
              private hashTagsService:HashTagsService,
              private httpClient:HttpClient,
              private authService:AuthService,
              private userService:UserService,
              private router:Router) { }

  ngOnInit(): void {
    this.getAllPostByUserId();
    this.user = JSON.parse(<string>localStorage.getItem("userLogin"))
    console.log(this.user)

  }

  // public getAllPost(){
  //   this.postService.findAllPost().subscribe({
  //     next:(res)=>{
  //       this.posts = res
  //       this.dataSource = new MatTableDataSource(res)
  //       this.dataSource.paginator = this.paginator;
  //       this.dataSource.sort = this.sort;
  //       console.log(this.dataSource)
  //     }, error:(err)=>{
  //       alert('Error while searching product')
  //     }
  //   })
  // }

  public getAllPostByUserId(){
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


  delete(id:any) {

  }

  openDialogPost() {
    this.dialog.open(DialogUserComponent, {
      width: '80%'
    }).afterClosed().subscribe(()=>{
      console.log(this.getAllPostByUserId())
      this.getAllPostByUserId();
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
      this.getAllPostByUserId();

    })
  }

  deletePost(id:any) {
    if (confirm('Are you sure delete product: ' + '?')) {
      this.postService.deletePost(id).subscribe(() => {
          alert('Delete Successfully!');
          this.getAllPostByUserId()

        }
      );
    }
  }

  // public findUser(fullName:string){
  //   this.userService.findUserByFullName(fullName).subscribe(data => {
  //     this.user = data;
  //     this.idLogin = data.id
  //     console.log(data.id)
  //     console.log('idLogin haha', this.idLogin)
  //     localStorage.setItem("idLogin", String(data.id))
  //   })
  // }

  openUserDetail() {
this.router.navigate([''])
  }


  getUser() {

  }
}
