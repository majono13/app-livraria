import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/componentes/header/header.component';
import { MenuComponent } from './shared/componentes/menu/menu.component';
import { ContainerComponent } from './container/container.component';
import { ProdutosComponent } from './container/produtos/produtos.component';
import { FooterComponent } from './shared/componentes/footer/footer.component';

//MATERIAL
import { MaterialModule } from './shared/material.module';
/////

import { Ng2SearchPipeModule } from "ng2-search-filter";
import { CadastroComponent } from './container/produtos/cadastro/cadastro.component';
import { DetalhesComponent } from './container/produtos/detalhes/detalhes.component';
import { EditeComponent } from './container/produtos/edite/edite.component';
import { ClientesComponent } from './container/clientes/clientes.component';
import { ColaboradoresComponent } from './container/colaboradores/colaboradores.component';
import { HomeComponent } from './container/home/home.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    ContainerComponent,
    ProdutosComponent,
    CadastroComponent,
    DetalhesComponent,
    EditeComponent,
    FooterComponent,
    ClientesComponent,
    ColaboradoresComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
