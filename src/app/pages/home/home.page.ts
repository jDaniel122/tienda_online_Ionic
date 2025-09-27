import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
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
  cartCount = 0;

  constructor(private router: Router, private http: HttpClient, private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });

    this.http.get<any[]>('https://fakestoreapi.com/products').subscribe(data => {
      this.productos = data;
    });
  }

  addToCart(p: any) {
    this.cartService.addItem(p);
  }

  goCart() {
    this.router.navigate(['/cart']);
  }
}
