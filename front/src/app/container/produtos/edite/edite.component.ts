import { Component, OnInit, Inject, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, NgForm } from '@angular/forms';

import { LivrosService } from 'src/app/shared/livros.service';
import { Livro } from 'src/app/shared/models/livros.models';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ThisReceiver } from '@angular/compiler';



@Component({
  selector: 'app-edite',
  templateUrl: './edite.component.html',
  styleUrls: ['./edite.component.css']
})
export class EditeComponent implements OnInit {

  livroEdite = this.fb.group({
    nome: [this.livro.nome, [Validators.required, Validators.minLength(3)]],
    autor: [this.livro.autor, [Validators.required, Validators.minLength(3)]],
    preco: [this.livro.preco, [Validators.required, Validators.minLength(1)]],
    categoria: [this.livro.categoria, [Validators.required]],
    estoque: [this.livro.estoque, [Validators.required, Validators.minLength(1)]],

  })

  livroEditado!: Livro

  @ViewChild('form') form!: NgForm
  @Output() salve = new EventEmitter<any>()

  categorias: string[] = this.livrosService.categorias

  constructor(private fb: FormBuilder, private livrosService: LivrosService, @Inject(MAT_DIALOG_DATA) public livro: Livro, private dialogRef: MatDialogRef<EditeComponent>) { }

  ngOnInit(): void {
    this.livroEdite.value.nome = this.livro.nome
  }

  submit() {

    this.livroEditado = {
      nome: this.livroEdite.value.nome,
      autor: this.livroEdite.value.autor,
      preco: this.livroEdite.value.preco,
      categoria: this.livroEdite.value.categoria,
      estoque: this.livroEdite.value.estoque,
      _id: this.livro._id
    }

    this.livrosService.edit(this.livroEditado)
      .subscribe(
        (dep) => {
          this.livrosService.notificacao('Detalhes do produto atualizado!')
        },

        (err) => { console.log(err) }
      )

    this.salve.emit()

    this.cancelar()
  }

  cancelar() {
    this.dialogRef.close()
  }
}
