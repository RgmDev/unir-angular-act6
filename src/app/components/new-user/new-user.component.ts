import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  form: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router
  ) { 
    this.form = new FormGroup({
      first_name: new FormControl('', [
        Validators.required
      ]),
      last_name: new FormControl('', [
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")
      ]),
      image: new FormControl('', [
        Validators.required,
        Validators.pattern("^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\/\_\.\-]+\.(jpg|jpeg|png){1}$")
      ])
    })
  }

  ngOnInit(): void {
  }

  async onSubmit() {
    let newUser: User = this.form.value;
    newUser.username = this.generateUsername(newUser);
    let response = await this.userService.createUser(newUser);
    console.log(response);
    if(response.error) {
      Swal.fire(
        'ERROR',
        response.error,
        'error'
      )
    } else {
      Swal.fire(
        'Usuario agregado correctamente',
        ``,
        'success'
      ).then(() => {
        this.router.navigate(['home']);
      })
    }    
  }

  generateUsername(user: User) {
    let first_name = user.first_name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    let last_name = user.last_name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(" ", "");
    return `${first_name}.${last_name}`;
  }

}
