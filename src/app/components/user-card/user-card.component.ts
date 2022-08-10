import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  @Input() user!: User;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  goToUserDetail(userId: number | undefined): void {
    this.router.navigate(['user', userId]);
  }

}
