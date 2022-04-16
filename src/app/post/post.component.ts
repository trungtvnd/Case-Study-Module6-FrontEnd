import { Component, OnInit } from '@angular/core';
import {Post} from "../model/Post";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  dateCreate!:any
  post!:Post
  constructor() { }

  ngOnInit(): void {
    this.post= JSON.parse(<string>localStorage.getItem("post"))
    console.log(Date.parse(this.post.dateCreate))
 this.dateCreate = new Date(this.post.dateCreate).toDateString()
  }

}
