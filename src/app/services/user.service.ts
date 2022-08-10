import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private base_url = 'https://peticiones.online/api/users';

  constructor(
    private httpClient: HttpClient
  ) { }

  getAll(page: number): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.base_url}?page=${page}`));
  }

  getUserById(userId: number) : Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.base_url}/${userId}`));
  }

}
