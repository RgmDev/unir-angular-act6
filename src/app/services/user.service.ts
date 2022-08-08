import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getAll(page: number): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`https://peticiones.online/api/users?page=${page}`));
  }

}
