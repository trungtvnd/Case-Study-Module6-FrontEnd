import {Component, OnInit} from '@angular/core';
import {Post} from "../model/Post";
import {CommentPost} from "../model/comment-post";
import {CommentPostService} from "../service/blog/comment-post.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../model/User";
import {Router} from "@angular/router";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  dateCreate!: any
  post!: Post
  commentPosts!: any[]
  formComment!:FormGroup
  user!:User

  numberLike:number = 0;

  constructor(private commentPostService: CommentPostService,
              private formBuilder: FormBuilder,
              private router:Router) {
  }

  ngOnInit(): void {
    this.formComment = this.formBuilder.group({
      id: [''],
      content:['',[Validators.required]],
      user: [''],
      post: ['']
    })
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
      console.log('comment',res)
    })
  }



  addComment() {
  const comment = {
    id: this.formComment.value.id,
    content: this.formComment.value.content,
    user: {id: JSON.parse(<string>localStorage.getItem("userLogin")).id},
    post: {id: JSON.parse(<string>localStorage.getItem("post")).id}
  }
  this.commentPostService.createComment(comment).subscribe(()=>{
    this.formComment.reset()
    this.getAllCommentByPostId()
    console.log('comment',comment)
  })
}

  likePost() {
    this.numberLike++;

  }

  backHome() {
    this.router.navigate(['']).then(()=>{
      window.location.reload();
    })
  }
}
