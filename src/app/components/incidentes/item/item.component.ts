import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Type, ViewChild } from '@angular/core';
import { Incidentes } from 'src/app/model/incidentes';
import { IncidentesService } from 'src/app/services/incidentes.service';


@Component({
  selector: 'incidente-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class IncidentesItemComponent implements OnInit {
  @ViewChild('txtIncidenteTipo', { static: true }) txtIncidenteTipo: ElementRef | undefined;
  @ViewChild('txtIncidenteTitulo', { static: true }) txtIncidenteTitulo: ElementRef | undefined;
  @ViewChild('txtIncidenteProcessoNome', { static: true }) txtIncidenteProcessoNome: ElementRef | undefined;
  @ViewChild('cmbHouveParada', { static: true }) cmbHouveParada: ElementRef | undefined;
  @ViewChild('txtIncidenteData', { static: true }) txtIncidenteData: ElementRef | undefined;
  @ViewChild(' txtIncidenteDuracao', { static: true }) txtIncidenteDuracao: ElementRef | undefined;

  @Input() selectedItem: Incidentes | undefined;
  @Output() closeEvent = new EventEmitter();
  constructor(private incidentesServices: IncidentesService) { }

  ngOnInit(): void { }

  close() {
    this.closeEvent.emit();
  }

  salvar() {    
    var edit = (this.selectedItem?.incidente_id !== undefined);

    var formValues: Incidentes | undefined;
    if (edit) {
      formValues = this.getIncidentesObject(this.selectedItem?.incidente_id, this.selectedItem?.usuario_criacao);      
    }else{
      formValues = this.getIncidentesObject(undefined, localStorage.getItem('username'));   
    }
    this.incidentesServices.post(formValues).subscribe(data => console.log(data));
    this.closeEvent.emit();
  }

  getIncidentesObject(id: any, usuario_criacao: any): Incidentes{
    var formValues: Incidentes = {
      "incidente_id": id,
      "incidente_tipo": this.txtIncidenteTipo?.nativeElement.value,
      "incidente_houveparada": this.cmbHouveParada?.nativeElement.options[0].selected,
      "incidente_titulo": this.txtIncidenteTitulo?.nativeElement.value,
      "incidente_data":  this.txtIncidenteData?.nativeElement.value,           
      "incidente_dataregistro": new Date().toLocaleDateString(), 
      "incidente_duracao": this.txtIncidenteDuracao?.nativeElement.value,       
      "usuario_criacao": usuario_criacao,
      "processo_nome": this.txtIncidenteProcessoNome?.nativeElement.value,                   
    };

    return formValues;
  }
}