import { Component, OnInit } from '@angular/core';
import { Notificacao } from '../../../model/notificacao';
import { NotificacoesService } from '../../../services/notificacoes.service';
import {Router} from "@angular/router"

@Component({
  selector: 'notificacoes-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class NotificacaoListComponent implements OnInit {

  notificacoes: Notificacao[] | undefined;
  selectedItem: Notificacao | undefined;
  editMode: boolean;
  selectedToExclusionId: string | undefined;

  constructor(private notificacoesServices:NotificacoesService, private router: Router) {
    this.notificacoes = [];
    this.editMode = false;
  }

  ngOnInit(): void {
    this.load();
  }

  async load() {
    await this.notificacoesServices.getAll().subscribe(data => { 
      this.notificacoes = data 
    });
  }

  async view(notificacao_id: string) {
    this.editMode = true;
    this.notificacoesServices.get(notificacao_id).subscribe(data => { 
      this.selectedItem = data;      
    })
  }

  async new() {
    this.editMode = true;
    this.selectedItem = undefined;
  }

  async closeView() {
    this.editMode = false;
    this.selectedItem = undefined;
    this.router.navigate(['/notificacoes']);
  }

  confirmaExclusao(){
    this.notificacoesServices.delete(this.selectedToExclusionId).subscribe(obj=>{
      this.selectedToExclusionId = undefined;
      this.router.navigate(['/notificacoes']);
    });
  }
}