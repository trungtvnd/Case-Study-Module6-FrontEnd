import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../../model/User";
import {HttpClient} from "@angular/common/http";
import {Post} from "../../model/Post";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient: HttpClient) { }

  findAllUser(): Observable<User[]>{
    return this.httpClient.get<User[]>('http://localhost:8080/admin')
  }
  public findUserById(id:number){
    return this.httpClient.get<User>('http://localhost:8080/admin/user/' + id)
  }
  blockUser(user: User,id: any): Observable<any>{
    return this.httpClient.put<any>('http://localhost:8080/admin/user/' + id, user)
  }
}
