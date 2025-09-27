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
      <ion-grid>
        <ion-row>
          <ion-col
            size="12"
            size-sm="6"
            size-md="4"
            size-lg="3"
            *ngFor="let p of productos"
          >
            <ion-card>
              <img [src]="p.image" alt="{{ p.title }}" />
              <ion-card-header>
                <ion-card-title>{{ p.title }}</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <p>
                  {{ p.price * 5000 | currency : 'COP ' : 'symbol' : '1.0-0' }}
                </p>
                <ion-button
                  expand="block"
                  color="primary"
                  (click)="addToCart(p)"
                >
                  Agregar 🛒
                </ion-button>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  `,
  styles: [
    `
      ion-card {
        height: 300px; /* altura fija para todas */
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      ion-card img {
        height: 150px;
        object-fit: contain; /* mantiene proporción */
        width: 100%;
      }

      ion-card-title {
        font-size: 14px; /* achicamos para que títulos largos no rompan layout */
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      ion-card-content p {
        font-size: 14px;
        font-weight: bold;
      }

      ion-button {
        font-size: 12px;
        padding: 4px 0;
      }
    `,
  ],
  imports: [IonicModule, CommonModule, HttpClientModule],
})
export class HomePage implements OnInit {
  productos: any[] = [];
  cartCount = 0;

  constructor(
    private router: Router,
    private http: HttpClient,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.cartService.cartCount$.subscribe((count) => {
      this.cartCount = count;
    });
    //Llamamos a laAPI
    this.http
      .get<any[]>('https://fakestoreapi.com/products')
      .subscribe((data) => {
        this.productos = data.filter(
          (p) =>
            p.category === "men's clothing" || p.category === "women's clothing"
        );
      });
  }

  addToCart(p: any) {
    this.cartService.addItem(p);
  }

  goCart() {
    this.router.navigate(['/cart']);
  }
}
