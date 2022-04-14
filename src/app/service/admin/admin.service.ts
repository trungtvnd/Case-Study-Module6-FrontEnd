import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../../model/User";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient: HttpClient) { }

  findAllUser(): Observable<User[]>{
    return this.httpClient.get<User[]>('http://localhost:8080/admin')
  }
}
