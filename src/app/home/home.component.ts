import { Component, OnInit } from '@angular/core';
import {AuthService, Role} from "../service/auth/auth.service";
import {Router} from "@angular/router";
import {UserService} from "../service/blog/user.service";
import firebase from "firebase/compat";
import {User} from "../model/User";
import {PostService} from "../service/blog/post.service";
import {Post} from "../model/Post";
import {TokenService} from "../service/auth/token.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  p: number = 1;
  nameLogin!:string | null
  roleLogin!:any
  user!:User
  checkLogin = false
  post!:Post
  posts!:Post[]

  constructor(private authService:AuthService,
              private router:Router,
              private userService:UserService,
              private postService:PostService,
              private tokenService: TokenService
              ) { }

  ngOnInit(): void {
    this.roleLogin = localStorage.getItem('roleLogin')

    if(this.tokenService.getToken()){
      this.checkLogin = true;
      this.nameLogin = this.tokenService.getName()
    }else {
      localStorage.removeItem('nameLogin')
      localStorage.removeItem('idLogin')
      localStorage.removeItem('roleLogin')
      localStorage.removeItem('userLogin')
    }
    this.getAllPostByStatus()
    this.findUser(this.nameLogin)
  }



  public logout(){
    localStorage.removeItem('nameLogin')
    localStorage.removeItem('idLogin')
    localStorage.removeItem('roleLogin')
    localStorage.removeItem('userLogin')
    window.sessionStorage.clear()
    window.location.reload()
    this.router.navigate(['/login'])
  }

  public findUser(fullName:any){
    if(this.tokenService.getToken()){
      this.userService.findUserByFullName(fullName).subscribe(data => {
        this.user = data;
        console.log(data.id)
        localStorage.setItem("idLogin", String(data.id))
        localStorage.setItem("userLogin", JSON.stringify(this.user))

      })
    }

  }
  getPostDetail(id: number) {
    this.postService.findPostById(id).subscribe(data => {
      this.post = data;
      console.log(data)
      localStorage.setItem('post', JSON.stringify(data))
      this.router.navigate(['post']).then(()=>{
        window.location.reload();
      })
    })

  }
  public getAllPost(){
    this.postService.findAllPost().subscribe({
      next:(res)=>{
        this.posts = res

      }, error:(err)=>{
        alert('Error while searching product')
      }
    })
  }
  public getAllPostByStatus(){
    this.postService.findAllPostByStatusId(2).subscribe({
      next:(res)=>{
        this.posts = res

      }, error:(err)=>{
        alert('Error while searching product')
      }
    })
  }




}
