import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { Norma } from 'src/app/model/norma';
import { NormasService } from 'src/app/services/normas.service';

@Component({
  selector: 'normas-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class NormasItemComponent implements OnInit {

  @Input() selectedItem: Norma | undefined;
  @Output() closeEvent = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  
  close() {
    this.closeEvent.emit();
  }
}
