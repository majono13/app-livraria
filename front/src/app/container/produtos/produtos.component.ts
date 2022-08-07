import { Component, OnInit, Inject } from '@angular/core';

import { Subject, takeUntil, Observable } from 'rxjs';

import { LivrosService } from '../../shared/livros.service';
import { Livro } from '../../shared/models/livros.models';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { EditeComponent } from './edite/edite.component'

import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  livros: Livro[] = []
  load: boolean = true
  livroEdit!: Livro
  resultado: Livro[] = []
  pesquisa: string = ''

  private unsubscribe$: Subject<any> = new Subject()

  constructor(
    private livrosService: LivrosService, public dialog: MatDialog) { }

  ngOnInit(): void {

    this.listar();
  }

  listar() {
    this.livrosService.get()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((livro) => {
        this.livros = livro
        this.load = false
      })
  }

  apagar(livro: Livro, i: number) {
    this.livrosService.delete(livro)
      .subscribe((e) => {
        this.livros.splice(i, 1);
        this.livrosService.notificacao('Produto Excluído')
      })
  }

  editar(livro: Livro) {
    alert('oi')
  }

  openDialogDetails(i: number) {
    this.dialog.open(DetalhesComponent, {
      data: this.livros[i],

    });
  }

  openDialogEdit(i: number) {
    this.dialog.open(EditeComponent, {
      data: this.livros[i],
    }).afterClosed().subscribe(ret => {
      this.listar();
    })
  }

  pesquisar() {
    this.resultado = this.livros.filter((resultado) => {
      return resultado.nome.toUpperCase() == this.pesquisa.toUpperCase()
    })
  }

  cancelarPesquisa() {
    this.resultado = [];
    this.pesquisa = '';
  }

  ngOnDestroy() {
    this.unsubscribe$.next('')
  }

}
