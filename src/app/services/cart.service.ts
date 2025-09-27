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
    this.updateCount();
  }

  private async updateCount() {
    this.cartCount.next(this.cart.reduce((sum, p) => sum + p.cantidad, 0));
    await Preferences.set({ key: 'cart', value: JSON.stringify(this.cart) });
  }

  async addItem(item: any) {
    const existing = this.cart.find(p => p.id === item.id);
    if (existing) {
      existing.cantidad += 1;
    } else {
      this.cart.push({ ...item, cantidad: 1 });
    }
    await this.updateCount();
  }

  async decreaseItem(itemId: number) {
    const existing = this.cart.find(p => p.id === itemId);
    if (existing) {
      existing.cantidad -= 1;
      if (existing.cantidad <= 0) {
        this.cart = this.cart.filter(p => p.id !== itemId);
      }
      await this.updateCount();
    }
  }

  async clearCart() {
    this.cart = [];
    await this.updateCount();
  }

  getItems() {
    return this.cart;
  }
}

