import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { CadastroComponent } from './container/produtos/cadastro/cadastro.component';
import { ProdutosComponent } from './container/produtos/produtos.component';
import { ClientesComponent } from './container/clientes/clientes.component';
import { ColaboradoresComponent } from './container/colaboradores/colaboradores.component';
import { HomeComponent } from './container/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'produtos', component: ProdutosComponent },
  { path: 'novo_produto', component: CadastroComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'colaboradores', component: ColaboradoresComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
