import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-home',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Tienda Online</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="goCart()">🛒 {{ cartCount }}</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-list>
        <ion-item *ngFor="let p of productos">
          {{ p.title }} - {{ p.price | currency : 'USD' : 'symbol' }}
          <ion-button slot="end" (click)="addToCart(p)">Agregar</ion-button>
        </ion-item>
      </ion-list>
    </ion-content>
  `,
  imports: [IonicModule, CommonModule, HttpClientModule],
})
export class HomePage implements OnInit {
  productos: any[] = [];
  cart: any[] = [];
  cartCount = 0;

  constructor(private router: Router, private http: HttpClient) {}

  async ngOnInit() {
    this.loadCart();
    this.http
      .get<any[]>('https://fakestoreapi.com/products')
      .subscribe((data) => {
        this.productos = data;
      });
  }

  async loadCart() {
    const { value } = await Preferences.get({ key: 'cart' });
    this.cart = value ? JSON.parse(value) : [];
    this.cartCount = this.cart.length;
  }

  async addToCart(p: any) {
    this.cart.push(p);
    this.cartCount = this.cart.length;
    await Preferences.set({ key: 'cart', value: JSON.stringify(this.cart) });
  }

  goCart() {
    this.router.navigate(['/cart']);
  }
}
