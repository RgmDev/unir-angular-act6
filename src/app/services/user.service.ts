import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private base_url = 'https://peticiones.online/api/users';

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  getAll(page: number): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.base_url}?page=${page}`));
  }

  getUserById(userId: number) : Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.base_url}/${userId}`));
  }

  deleteUser(userId: number) : Promise<any> {
    return lastValueFrom(this.httpClient.delete<any>(`${this.base_url}/${userId}`));
  }

  deleteUserPopup(user: User) {
    Swal.fire({
      title: '¿Estás seguro?',
      html: `El usuario <b>${user.first_name} ${user.last_name}</b> será eliminado`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, eliminar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        let response = await this.deleteUser(user.id);
        if(response.error) {
          Swal.fire(
            'ERROR',
            response.error,
            'error'
          )
        } else {
          Swal.fire(
            '¡Eliminado!',
            `El usuario ${user.first_name} ${user.last_name} ha sido eliminado.`,
            'success'
          ).then(() => {
            this.router.navigate(['home']);
          })
        }     
      }
    })
  }



}
