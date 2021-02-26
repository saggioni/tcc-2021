import { Component, OnInit } from '@angular/core';
import { Incidentes } from '../../../model/incidentes';
import { IncidentesService } from '../../../services/incidentes.service';
import { IncidentesItemComponent } from '../item/item.component';

@Component({
  selector: 'incidentes-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class IncidentesListComponent implements OnInit {

  incidentes: Incidentes[] | undefined;
  selectedItem: Incidentes | undefined;
  editMode: boolean;
  selectedToExclusionId: string | undefined;

  constructor(private incidentesServices: IncidentesService) {
    this.incidentes = [];
    this.editMode = false;
  }

  ngOnInit(): void {
    this.load();
  }

  async load() {
    await this.incidentesServices.getAll().subscribe(data => {
      this.incidentes = data
    });
  }

  async view(incidente_id: string) {
    this.editMode = true;
    this.incidentesServices.get(incidente_id).subscribe(data => {
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
    this.load();
  }

  confirmaExclusao() {
    this.incidentesServices.delete(this.selectedToExclusionId).subscribe(obj => {
      this.selectedToExclusionId = undefined;
      this.load();
    });
  }
}