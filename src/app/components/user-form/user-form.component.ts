import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  title!: string;
  onSubmit!: Function;
  form: FormGroup;
  user!: User;
  textButton!: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
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
        Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,8}$")
      ]),
      image: new FormControl('', [
        Validators.required,
        Validators.pattern("^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\/\_\.\-?@&-]+")
      ])
    });

    this.activatedRoute.params.subscribe(async (data: any) => {
      if(data.userId) {
        this.loadUpdateConf(data.userId);
      } else {
        this.loadCreateConf();
      }
    })
  }

  ngOnInit(): void {
  }

  async loadUpdateConf(userId: number) {
    this.user = await this.userService.getUserById(userId);
    this.title = 'Actualizar usuario';
    this.textButton = 'Actualizar';
    this.onSubmit = this.updateUser;
    this.form.get('first_name')?.setValue(this.user.first_name);
    this.form.get('last_name')?.setValue(this.user.last_name);
    this.form.get('email')?.setValue(this.user.email);
    this.form.get('image')?.setValue(this.user.image);
  }

  loadCreateConf() {
    this.title = 'Nuevo usuario';
    this.textButton = 'Guardar';
    this.onSubmit = this.createUser;
  }

  async updateUser() {
    let updateUser: User = this.form.value;
    updateUser.username = this.userService.generateUsername(updateUser);
    updateUser.id = this.user.id;
    let response = await this.userService.updateUser(updateUser).catch((err) => {
      Swal.fire('ERROR', err.statusText, 'error');
    });
    if(response) {
      this.showAlert(response, 'Usuario actualizado corretamente');
    }
  }

  async createUser() {
    let newUser: User = this.form.value;
    newUser.username = this.userService.generateUsername(newUser);
    let response = await this.userService.createUser(newUser).catch((err) => {
      Swal.fire('ERROR', err.statusText, 'error');
    });
    if(response) {
      this.showAlert(response, 'Usuario creado corretamente');
    }
  }

  showAlert(responseData: any, successText: string) {
    if(responseData.error) {
      Swal.fire( 'ERROR', responseData.error, 'error');
    } else {
      Swal.fire(successText, '', 'success').then(() => {
        this.router.navigate(['home']);
      });
    }
  }

}
