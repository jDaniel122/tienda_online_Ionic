import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: any[] = [];
  private cartCount = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCount.asObservable();

  constructor() {
    this.loadCart();
  }

  async loadCart() {
    const { value } = await Preferences.get({ key: 'cart' });
    this.cart = value ? JSON.parse(value) : [];
    this.cartCount.next(this.cart.length);
  }

  async addItem(item: any) {
    this.cart.push(item);
    await Preferences.set({ key: 'cart', value: JSON.stringify(this.cart) });
    this.cartCount.next(this.cart.length);
  }

  async removeItem(index: number) {
    this.cart.splice(index, 1);
    await Preferences.set({ key: 'cart', value: JSON.stringify(this.cart) });
    this.cartCount.next(this.cart.length);
  }

  async clearCart() {
    this.cart = [];
    await Preferences.remove({ key: 'cart' });
    this.cartCount.next(0);
  }

  getCart() {
    return this.cart;
  }
}
