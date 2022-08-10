import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';

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
    console.log('ngoninit')
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
    alert('Eliminar usuario')
  }



}
