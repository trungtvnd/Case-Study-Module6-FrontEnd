import {Component, OnInit} from '@angular/core';
import {User} from "../model/User";
import {HttpClient} from "@angular/common/http";
import {AdminService} from "../service/admin/admin.service";
import {MatTableDataSource} from "@angular/material/table";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Post} from "../model/Post";
import {PostService} from "../service/blog/post.service";

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


  constructor(private httpClient: HttpClient, private adminService: AdminService,
              private formBuilder: FormBuilder,
              private router: Router,
              private postService: PostService) {

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
    if (confirm('Are you sure delete product: ' + '?')) {
      this.adminService.findUserById(id).subscribe((data) => {
        this.user = data
        this.user.status = false
        localStorage.setItem('userBlock', JSON.stringify(data))
        localStorage.setItem('idUserBlock', String(data.id))
      })
      this.changeStatusUser()
    }
  }
  public changeStatusUser(){
    console.log('userBlock',localStorage.getItem('userBlock'))
    this.adminService.blockUser(JSON.parse(<string>localStorage.getItem('userBlock')), localStorage.getItem('idUserBlock')).subscribe()
  }
}
