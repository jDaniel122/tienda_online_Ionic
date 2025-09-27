import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';
import { CommonModule, JsonPipe } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  standalone: true,
  selector: 'app-cart',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/home"></ion-back-button>
        </ion-buttons>
        <ion-title>Carrito</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-list *ngIf="cart.length > 0; else emptyCart">
        <ion-item *ngFor="let p of cart; let i = index">
          {{ p.title }} -
          {{ p.price * 5000 | currency : 'COP ' : 'symbol' : '1.0-0' }}
          <ion-buttons slot="end">
            <ion-button size="small" (click)="decrease(p.id)">-</ion-button>
            <span>{{ p.cantidad }}</span>
            <ion-button size="small" (click)="add(p)">+</ion-button>
          </ion-buttons>
        </ion-item>
      </ion-list>
      <ng-template #emptyCart>
        <div class="empty-cart">
          <h2>No hay articulos en el carrito 😢</h2>
        </div>
      </ng-template>
      <ion-button
        expand="block"
        color="danger"
        (click)="clearCart()"
        *ngIf="cart.length > 0"
      >
        Vaciar carrito 🗑️
      </ion-button>
    </ion-content>
    <ion-button
      expand="block"
      color="success"
      [disabled]="true"
      *ngIf="cart.length > 0"
    >
      Comprar - Total:
      {{ getTotal() * 5000 | currency : 'COP ' : 'symbol' : '1.0-0' }}
    </ion-button>
  `,
  styles: [
    `
      .empty-cart {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 60%;
        font-size: 1.2rem;
        color: #555;
        text-align: center;
      }
    `,
  ],
  imports: [IonicModule, CommonModule],
})
export class CartPage implements OnInit {
  cart: any[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cart = this.cartService.getItems();
  }

  add(p: any) {
    this.cartService.addItem(p);
    this.cart = this.cartService.getItems();
  }

  decrease(id: number) {
    this.cartService.decreaseItem(id);
    this.cart = this.cartService.getItems();
  }

  async clearCart() {
    await this.cartService.clearCart();
    this.cart = this.cartService.getItems();
  }

  getTotal() {
    return this.cart.reduce((sum, p) => sum + p.price * p.cantidad, 0);
  }
}
