import {Component, OnInit} from '@angular/core';
import {User} from "../model/User";
import {HttpClient} from "@angular/common/http";
import {AdminService} from "../service/admin/admin.service";
import {MatTableDataSource} from "@angular/material/table";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Post} from "../model/Post";
import {PostService} from "../service/blog/post.service";
import {ChangeStatusUserForm} from "../model/changeStatusUserForm";
import {AuthService} from "../service/auth/auth.service";

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  p: number = 1;
  posts: Post[] = [];
  users: User[] = [];
  user!: User
  userForm!: FormGroup;
  title: any;
  userName: any;

  checkBlock = false;
  idBlock = 0

  changeStatusForm!: ChangeStatusUserForm


  constructor(private httpClient: HttpClient, private adminService: AdminService,
              private formBuilder: FormBuilder,
              private router: Router,
              private postService: PostService,
              private authService:AuthService) {

  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      id: [''],
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      email: ['', [Validators.required]],
      fullName: ['', [Validators.required]],
      address: [''],
      phone: [''],
      avatar: [''],
      status: [''],
    })

    this.getAllUser()
    this.getAllPost()
    console.log(this.getAllUser())
  }

  getAllUser() {
    this.adminService.findAllUser().subscribe((data) => this.users = data)
    this.userForm.reset()
  }


  getAllPost() {
    this.postService.findAllPost().subscribe((data) => this.posts = data)
    this.userForm.reset()
  }


  getAllPostByTitle() {
    if (this.title == "") {
      this.ngOnInit();
    } else {
      this.posts = this.posts.filter(res => {
        return res.title.toLocaleLowerCase().match(this.title.toLocaleLowerCase());
      })
    }
  }

  getAllUserByUserName() {
    if (this.userName == "") {
      this.ngOnInit();
    } else {
      this.users = this.users.filter(res => {
        return res.userName.toLocaleLowerCase().match(this.userName.toLocaleLowerCase());
      })
    }
  }


  deletePost(id: any) {
    if (confirm('Are you sure delete product: ' + '?')) {
      this.postService.deletePost(id).subscribe(() => {
          alert('Delete Successfully!');
          this.getAllPost()

        }
      );
    }
  }

  public logout() {
    localStorage.removeItem('nameLogin')
    localStorage.removeItem('idLogin')
    localStorage.removeItem('roleLogin')
    this.router.navigate(['/login'])
  }
  blockUser(id: any) {
    this.changeStatusForm = new  ChangeStatusUserForm("block")
    if (confirm('Are you sure block this user: ' + '?')) {
      this.adminService.blockUserStatus(this.changeStatusForm,id).subscribe(data =>{
        alert("Da block tai khoan")
        this.router.navigate(['/admin']).then(()=>{
          window.location.reload();
        })
        this.checkBlock=true
        this.idBlock  = id
        console.log(data)
      })
    }
  }

  unBlockUser(id: number) {
    this.changeStatusForm = new  ChangeStatusUserForm("")
    if (confirm('Are you sure unblock this user: ' + '?')) {
      this.adminService.blockUserStatus(this.changeStatusForm,id).subscribe(data =>{
        alert("Da UnBlock tai khoan")
        this.router.navigate(['/admin']).then(()=>{
          window.location.reload();
        })
        this.checkBlock=true
        this.idBlock  = id
        console.log(data)
      })
    }
  }
}
