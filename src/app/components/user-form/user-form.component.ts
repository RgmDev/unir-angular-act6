import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  @Input() user!: User;
  @Input() onSubmit!: Function;

  form: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router
  ) { 

    console.log(this.user);

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

}
