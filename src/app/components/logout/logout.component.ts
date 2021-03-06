import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Auth } from '@aws-amplify/auth';
import { onAuthUIStateChange, CognitoUserInterface, AuthState } from '@aws-amplify/ui-components';
import { NotificacoesService } from '../../services/notificacoes.service';
import { Notificacao } from '../../model/notificacao';
import { NormasService } from 'src/app/services/normas.service';
import { Norma } from 'src/app/model/norma';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private normas: NormasService, private notificacoes: NotificacoesService) { }


  notificacoesModel: Notificacao[] | undefined;
  normasModel: Norma[] | undefined;
  @Output() authStateChangeEvent = new EventEmitter<string>();
  @Output() userChangeEvent = new EventEmitter<any>();
  authState: string | undefined;
  user: CognitoUserInterface | undefined;
  username: string | undefined;

  ngOnInit(): void {
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData as CognitoUserInterface;
    })
    this.authState = localStorage.authState;
    this.user = localStorage.user as CognitoUserInterface;
    this.username = localStorage.username;
  }

  async signOut() {
    try {
        this.authState = 'notidentified';
        this.user = undefined;
        localStorage.clear();
        this.authStateChangeEvent.emit(this.authState);
        this.userChangeEvent.emit(this.user);       
        await Auth.signOut({ global: true }); 
    } catch (error) {
        console.log('error signing out: ', error);
    }
  }  
}
