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
        <ion-title>Carrito</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-list>
        <ion-item *ngFor="let p of cart; let i = index">
          {{ p.title }} - {{ p.price | currency : 'USD' : 'symbol' }}
          <ion-button slot="end" colot="danger" (click)="removeItem(i)"
            >❌ ELIMINAR
          </ion-button>
        </ion-item>
      </ion-list>

      <h2 *ngIf="cart.length > 0">
        Total: {{ getTotal() | currency : 'USD' : 'symbol' }}
      </h2>
      <ion-button
        expand="block"
        color="danger"
        (click)="clearCart()"
        *ngIf="cart.length > 0"
      >
        Vaciar carrito 🗑️
      </ion-button>
    </ion-content>
  `,
  imports: [IonicModule, CommonModule],
})
export class CartPage implements OnInit {
  cart: any[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cart = this.cartService.getCart();
  }

  getTotal() {
    return this.cart.reduce((sum, p) => sum + p.price, 0);
  }
  async clearCart() {
    await this.cartService.clearCart();
    this.cart = this.cartService.getCart();
  }
  async removeItem(index: number) {
    await this.cartService.removeItem(index);
  }
}
