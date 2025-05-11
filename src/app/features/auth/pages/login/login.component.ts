import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private keycloakService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin(): void {
    const { username, password } = this.loginForm.value;

    // Redirect to Keycloak login page
    // this.keycloakService.login({
    //   loginHint: username,
    //   redirectUri: window.location.origin
    // });

    this.keycloakService.login();
  }

  onLogout(): void {
    this.keycloakService.logout();
  }

  get isLoggedIn(): boolean {
    return this.keycloakService.isLoggedIn();
  }

}
