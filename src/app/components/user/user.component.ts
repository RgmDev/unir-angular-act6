import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User = {
    id: 0,
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    image: ''  
  }

  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data: any) => {
      this.getUser(data.userId);
    });
  }

  async getUser(userId: number) {
    this.user = await this.userService.getUserById(userId);
  }

  goToHome() {
    this.router.navigate(['home']);
  }

  updateUser() {
    alert('Actualizar usuario');
  }

  deleteUser() {
    Swal.fire({
      title: '¿Estás seguro?',
      html: `El usuario <b>${this.user.first_name} ${this.user.last_name}</b> será eliminado`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, eliminar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        let response = await this.userService.deleteUser(this.user.id);
        if(response.error) {
          Swal.fire(
            'ERROR',
            response.error,
            'error'
          )
        } else {
          Swal.fire(
            '¡Eliminado!',
            `El usuario ${this.user.first_name} ${this.user.last_name} ha sido eliminado.`,
            'success'
          ).then(() => {
            this.router.navigate(['home']);
          })
        }     
      }
    })
  }



}
