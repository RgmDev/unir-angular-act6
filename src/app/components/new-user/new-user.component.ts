import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router
  ) { 
   
  }

  ngOnInit(): void {
  }

  async onSubmit(formData: any) {
    let newUser: User = formData;
    newUser.username = this.userService.generateUsername(newUser);
    console.log(newUser);
    let response = await this.userService.createUser(newUser);
    if(response.error) {
      Swal.fire(
        'ERROR',
        response.error,
        'error'
      )
    } else {
      Swal.fire(
        'Usuario agregado correctamente',
        '',
        'success'
      ).then(() => {
        this.router.navigate(['home']);
      })
    }    
  }

}
