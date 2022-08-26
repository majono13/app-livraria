import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';

import { ConnectableObservable, Subject } from 'rxjs';

import { LivrosService } from 'src/app/container/produtos/livros.service';
import { Cliente } from 'src/app/shared/models/clientes.models';
import { Livro } from 'src/app/shared/models/livros.models';
import { ClienteService } from '../clientes.service';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.css']
})
export class CadastroClienteComponent implements OnInit {

  @ViewChild('form') form!: NgForm;

  novoCliente!: Cliente;

  clienteForm = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(3)]],
    sobrenome: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    telefone: ['', [Validators.required, Validators.minLength(11)]],
    favoritos: ['false']
  });

  constructor(private fb: FormBuilder, private clientesService: ClienteService) { }

  ngOnInit(): void {
  }

  submit() {
    this.novoCliente = {
      nome: this.clienteForm.value.nome,
      sobrenome: this.clienteForm.value.sobrenome,
      email: this.clienteForm.value.email,
      telefone: this.clienteForm.value.telefone,
      favoritos: this.clienteForm.value.favoritos
    }

    this.clientesService.add(this.novoCliente)
      .subscribe(e => this.clientesService.notificacao('Cliente Adicionado com sucesso!'))
    console.log(this.novoCliente)
    this.cancelar()
  }

  cancelar() {
    this.form.resetForm()
  }

}
