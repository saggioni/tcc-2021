import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Amplify } from '@aws-amplify/core';
import { Auth } from '@aws-amplify/auth';
import { onAuthUIStateChange, CognitoUserInterface, AuthState } from '@aws-amplify/ui-components';
import { FormsModule }   from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  @Output() authStateChangeEvent = new EventEmitter<string>();
  @Output() userChangeEvent = new EventEmitter<any>();
  authState: string | undefined;
  user: CognitoUserInterface | undefined;
  showMessage: boolean = false;
  message: string | undefined;

  ngOnInit(): void {
    this.authState = localStorage.authState;
    this.user = localStorage.user;
    this.authStateChangeEvent.emit(this.authState);
    this.userChangeEvent.emit(this.user);
    this.showMessage = false;
  }

  hideAllert(){
    this.showMessage=false;
  }

  async signIn(username: string, password: string) {
    try {
      this.showMessage = false;
      const user = await Auth.signIn(username, password);          
      this.authState = 'signedin';
      this.user = user;
      localStorage.setItem('AUTH_USER_TOKEN_KEY', user.signInUserSession.accessToken.jwtToken);
      localStorage.setItem('user', user);
      localStorage.setItem('authState', this.authState);
      this.authStateChangeEvent.emit(this.authState);
      this.userChangeEvent.emit(this.user);
    } catch (error) {
        console.log('Ocorreu um erro ao tentar efetuar o login.', error);
        this.authState = 'notauthorized';
        this.showMessage = true;
        this.message = 'Usuário e/ou senha inválido.'
    }
  }
}
