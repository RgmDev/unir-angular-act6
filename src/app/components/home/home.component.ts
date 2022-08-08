import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users: User[] = [];
  page: number = 1;
  total_pages: number = 1;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  async getUsers() {
    let users = await this.userService.getAll(this.page);
    this.users = users.data;
    this.total_pages = users.total_pages;
  }

  goToPage(page: number) {
    this.page = page;
    this.getUsers();
  }

  pageNumber(): number[] {
    let pages = [];
    for(let i = 1; i <= this.total_pages; i++) {
      pages.push(i);
    }
    return pages;
  }


}
