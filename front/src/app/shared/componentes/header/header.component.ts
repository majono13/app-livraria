import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AutService } from 'src/app/autenticacao/aut.service';
import { User } from '../../models/user.models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user$!: Observable<User>;

  constructor(private autService: AutService, private router: Router) {


  }

  ngOnInit(): void {
    this.user$ = this.autService.getUser();
  }

  logout() {
    this.autService.logout();
    this.router.navigateByUrl('/login');
  }

}
