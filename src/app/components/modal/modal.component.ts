import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html'
})
export class ModalComponent implements OnInit {

  constructor() { }

  @Output() clickYesEvent = new EventEmitter();
  @Input() message: string | undefined;

  ngOnInit(): void {
    if(this.message === undefined)
      this.message = "Deseja confirmar sua ação?";

  }

  click(){
    this.clickYesEvent.emit();
  }

}
