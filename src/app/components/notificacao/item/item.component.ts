import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Type, ViewChild } from '@angular/core';
import { Notificacao } from 'src/app/model/notificacao';
import { NotificacoesService } from 'src/app/services/notificacoes.service';

@Component({
  selector: 'notificacao-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class NotificacaoItemComponent implements OnInit {
  @ViewChild('txtNotificacaoTitulo', { static: true }) txtNotificacaoTitulo: ElementRef | undefined;
  @ViewChild('txtNotificacaoTexto', { static: true }) txtNotificacaoTexto: ElementRef | undefined;
  @ViewChild('txtDataInicio', { static: true }) txtDataInicio: ElementRef | undefined;
  @ViewChild('txtDataFim', { static: true }) txtDataFim: ElementRef | undefined;
  @ViewChild('cmbHomeSistema', { static: true }) cmbHomeSistema: ElementRef | undefined;
  @ViewChild(' cmbEmail', { static: true }) cmbEmail: ElementRef | undefined;

  @Input() selectedItem: Notificacao | undefined;
  @Output() closeEvent = new EventEmitter();
  constructor(private notificacoesServices: NotificacoesService) { }

  ngOnInit(): void { }

  close() {
    this.closeEvent.emit();
  }

  salvar() {    
    var edit = (this.selectedItem?.notificacao_id !== undefined);

    var formValues: Notificacao | undefined;
    if (edit) {
      formValues = this.getNotificacaoObject(this.selectedItem?.notificacao_id, this.selectedItem?.usuario_login);      
    }else{
      formValues = this.getNotificacaoObject(undefined, localStorage.getItem('username'));   
    }
    this.notificacoesServices.post(formValues).subscribe(data => this.closeEvent.emit());    
  }

  getNotificacaoObject(id: any, usuario_criacao: any): Notificacao{
    var formValues: Notificacao = {
      "notificacao_id": id,
      "notificacao_titulo": this.txtNotificacaoTitulo?.nativeElement.value,
      "notificacao_texto": this.txtNotificacaoTexto?.nativeElement.value,
      "notificacao_agenda_datainicio": this.txtDataInicio?.nativeElement.value,
      "notificacao_agenda_datafim":  this.txtDataFim?.nativeElement.value,           
      "notificacao_homesistema": this.cmbHomeSistema?.nativeElement.options[0].selected, 
      "notificacao_email": this.cmbEmail?.nativeElement.options[0].selected,     
      "usuario_login": usuario_criacao                  
    };

    return formValues;
  }
}
