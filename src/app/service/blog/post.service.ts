import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post} from "../../model/Post";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient:HttpClient) { }

  findAllPost(): Observable<Post[]>{
    return this.httpClient.get<Post[]>('http://localhost:8080/user/post')
  }

  findAllPostByUserId(idUser:any):Observable<Post[]>{
    return this.httpClient.get<Post[]>(`http://localhost:8080/user/post/displayByUser/${idUser}`)
  }

  findAllPostByTitle(title: string): Observable<Post[]>{
    return this.httpClient.get<Post[]>('http://localhost:8080/user/post/findByName/' + title)
  }

  findPostById(id: number):Observable<Post>{
    return this.httpClient.get<Post>(`http://localhost:8080/user/post/${id}`)
  }

  deletePost(id: number):Observable<void>{
    return this.httpClient.delete<void>(`http://localhost:8080/user/post/${id}`)
  }

  createPost(post:any): Observable<Post> {
    return this.httpClient.post<Post>('http://localhost:8080/user/post', post)
  }

  editPost(post: Post,id: number): Observable<any>{
    return this.httpClient.put<any>('http://localhost:8080/user/post/' + post.id, post)
  }

}
