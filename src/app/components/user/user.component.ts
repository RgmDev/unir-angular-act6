import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {


  user: User | any;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) { 
    this.activatedRoute.params.subscribe(async (data: any) => {
      this.user = await this.userService.getUserById(data.userId);
    });
  }

  ngOnInit(): void { }

  deleteUser() {
    this.userService.deleteUserPopup(this.user);
  }
  
}
