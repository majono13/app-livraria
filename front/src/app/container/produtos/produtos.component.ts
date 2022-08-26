import { Component, OnInit } from '@angular/core';

import { Subject, takeUntil } from 'rxjs';

import { LivrosService } from './livros.service';
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
  pesquisando: boolean = false
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
    this.pesquisando = false
    this.livrosService.get()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((livro) => {
        this.livros = livro
        this.load = false
      })
  }

  apagar(livro: Livro) {

    for (let i in this.livros) {

      if (this.livros[i]._id === livro._id) {
        this.livrosService.delete(livro)
          .subscribe((e) => {
            this.livros.splice(Number(i), 1);
            this.livrosService.notificacao('Produto Excluído')
          })
      }
    }

  }

  openDialogDetails(livro: Livro) {

    for (let i in this.livros) {
      if (this.livros[i]._id === livro._id) {
        this.dialog.open(DetalhesComponent, {
          data: this.livros[i],
        });
      }
    }

  }

  openDialogEdit(livro: Livro) {

    for (let i in this.livros) {

      if (this.livros[i]._id === livro._id) {
        this.dialog.open(EditeComponent, {
          data: this.livros[i],
        }).afterClosed().subscribe(ret => {
          this.listar();
        })
      }

    }
  }

  pesquisar() {
    if (this.pesquisa.length >= 3) {
      this.resultado = []
      this.pesquisando = true

      for (let i in this.livros) {

        if
          (this.livros[i].nome.toUpperCase() == this.pesquisa.toUpperCase() ||
          this.livros[i].autor.toUpperCase() == this.pesquisa.toUpperCase() ||
          this.livros[i].categoria.toUpperCase() == this.pesquisa.toUpperCase()) {

          this.resultado.push(this.livros[i])
        }
      }
      this.pesquisa = ''
    }
  }



  cancelarPesquisa() {
    this.pesquisando = false
    this.resultado = [];
    this.pesquisa = '';
  }

  ngOnDestroy() {
    this.unsubscribe$.next('')
  }

}
