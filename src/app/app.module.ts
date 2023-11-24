import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ViajerosComponent } from './pages/viajeros/viajeros.component';
import { ViajesComponent } from './pages/viajes/viajes.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { ConfirmationService, MessageService } from 'primeng/api';

import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { OrigenComponent } from './pages/origen/origen.component';
import { DestinoComponent } from './pages/destino/destino.component';
import { ReferenciasComponent } from './pages/referencias/referencias.component';


@NgModule({
  declarations: [
    AppComponent,
    ViajerosComponent,
    ViajesComponent,
    NavbarComponent,
    OrigenComponent,
    DestinoComponent,
    ReferenciasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,

    MenubarModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    ConfirmPopupModule,
    ToastModule,
    DropdownModule
  ],
  providers: [
    ConfirmationService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
