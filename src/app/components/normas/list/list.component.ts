import { Component, OnInit } from '@angular/core';
import { NormasItemComponent } from '../item/item.component';
import { Norma } from '../../../model/norma';
import { NormasService } from '../../../services/normas.service';

@Component({
  selector: 'normas-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class NormasListComponent implements OnInit {
  normas: Norma[] | undefined;

  constructor(private normasServices: NormasService) { 
    this.normas = [];
  }

  ngOnInit(): void {
    this.get();
  }

  async get()
  {
    await this.normasServices.get().subscribe(result => this.normas = result);
  }

}
