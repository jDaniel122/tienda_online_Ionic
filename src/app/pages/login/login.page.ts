import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-login',
  template: `
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Login</ion-title>
      </ion-toolbar>
    </ion-header>

   <ion-content fullscreen>
      <div class="login-wrapper">
        <div class="login-box">
          <ion-list>
            <ion-item>
              <ion-label position="floating">Usuario</ion-label>
              <ion-input
                [(ngModel)]="username"
                type="text"
                name="username"
              ></ion-input>
            </ion-item>

            <ion-item>
              <ion-label position="floating">Contraseña</ion-label>
              <ion-input
                [(ngModel)]="password"
                type="password"
                name="password"
              ></ion-input>
            </ion-item>
          </ion-list>

          <ion-button expand="block" shape="round" color="primary" (click)="login()">
            Ingresar
          </ion-button>
        </div>
      </div>
    </ion-content>
  `,
  styles: [`
    .login-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      padding: 16px;
      background: #f2f2f2;
    }

    .login-box {
      width: 100%;
      max-width: 350px;
      background: #fff;
      padding: 20px;
      border-radius: 15px;
      box-shadow: 0px 4px 12px rgba(0,0,0,0.1);
    }

    ion-item {
      margin-bottom: 15px;
      border-radius: 10px;
    }

    ion-button {
      margin-top: 20px;
    }
  `],
  imports: [IonicModule, FormsModule],
})
export class LoginPage {
  username = '';
  password = '';

  constructor(private router: Router) {}

  login() {
    if (this.username === 'admin' && this.password === '1234') {
      alert('Login exitoso 🚀');
      this.router.navigate(['/home']);
    } else {
      alert('Credenciales inválidas ❌');
    }
    console.log(this.username , this.password)
  }
}
