import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { AutService } from '../aut.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private fb: FormBuilder, private autService: AutService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const credenciais = this.formLogin.value;

    this.autService.login(credenciais)
      .subscribe({
        error: (err) => {
          console.error(err);
        },
        complete: () => {
          this.router.navigateByUrl('/index');
        }
      })
  }

}
