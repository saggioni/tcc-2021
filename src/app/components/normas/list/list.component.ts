import { Component, OnInit } from '@angular/core';
import { Norma } from '../../../model/norma';
import { NormasService } from '../../../services/normas.service';


@Component({
  selector: 'normas-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class NormasListComponent implements OnInit {
  normas: Norma[] | undefined;
  selectedItem: any;
  editMode: boolean;

  constructor(private normasServices: NormasService) {
    this.normas = [];
    this.editMode = false;
  }

  ngOnInit(): void {
    this.load();
  }

  async load() {
    await this.normasServices.getAll().subscribe(data => this.normas = data);
  }

  async view(norma_id: string) {
    this.editMode = true;
    await this.normasServices.get(norma_id).subscribe(data => { 
      console.log(data);
      this.selectedItem = data;      
    })
  }

  closeView() {
    this.editMode = false;
  }

}
