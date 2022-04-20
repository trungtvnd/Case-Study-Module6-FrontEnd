import {Component, OnInit} from '@angular/core';
import {Post} from "../model/Post";
import {CommentPost} from "../model/comment-post";
import {CommentPostService} from "../service/blog/comment-post.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../model/User";
import {Router} from "@angular/router";
import {TokenService} from "../service/auth/token.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogUserComponent} from "../user/dialog-user/dialog-user.component";
import {DialogAlertComponent} from "../dialog-alert/dialog-alert.component";
import {UserService} from "../service/blog/user.service";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  dateCreate!: any
  post!: Post
  commentPosts!: any[]
  formComment!: FormGroup
  user!: User

  numberLike: number = 0;
  numberComment: number = 0;

  checkLogin = false
  nameLogin!:string | null
  roleLogin!:any


  constructor(private commentPostService: CommentPostService,
              private formBuilder: FormBuilder,
              private router: Router,
              private tokenService: TokenService,
              private dialog: MatDialog,
              private userService:UserService) {
  }

  ngOnInit(): void {
    this.formComment = this.formBuilder.group({
      id: [''],
      content: ['', [Validators.required]],
      user: [''],
      post: ['']
    })
    if(this.tokenService.getToken()){
      this.checkLogin = true;
      this.nameLogin = this.tokenService.getName()
      this.findUser(this.nameLogin)
    }else {
      localStorage.removeItem('nameLogin')
      localStorage.removeItem('idLogin')
      localStorage.removeItem('roleLogin')
      localStorage.removeItem('userLogin')
    }
    this.post = JSON.parse(<string>localStorage.getItem("post"))
    // @ts-ignore
    document.getElementById("contentPost").innerHTML = this.post.content
    this.dateCreate = new Date(this.post.dateCreate).toDateString()
    this.getAllCommentByPostId();
    this.user = JSON.parse(<string>localStorage.getItem("userLogin"))
  }

  getAllCommentByPostId() {
    this.commentPostService.findAllCommentByPostId(JSON.parse(<string>localStorage.getItem("post")).id).subscribe((res) => {
      this.commentPosts = res
      this.numberComment = res.length
      console.log('comment', res)
    })
  }


  addComment() {
    if (this.tokenService.getToken()) {
      const comment = {
        id: this.formComment.value.id,
        content: this.formComment.value.content,
        user: {id: this.user.id},
        post: {id: JSON.parse(<string>localStorage.getItem("post")).id}
      }
      this.commentPostService.createComment(comment).subscribe(() => {
        this.formComment.reset()
        this.getAllCommentByPostId()
        console.log('comment', comment)
      })
    } else {
      alert("Please Login to comment")
      this.formComment.reset()
    }

  }

  likePost() {
    this.numberLike++;

  }

  backHome() {
    this.router.navigate(['']).then(() => {
      window.location.reload();
    })
  }

  openDialogLogin() {
    this.dialog.open(DialogAlertComponent, {
      width: '40%'
    }).afterClosed().subscribe(() => {
      window.location.reload()

      console.log(this.getAllCommentByPostId())

      this.getAllCommentByPostId();
    });
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

}
