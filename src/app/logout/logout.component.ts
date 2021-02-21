import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import Amplify, { API } from 'aws-amplify';
import { Auth } from '@aws-amplify/auth';
import { onAuthUIStateChange, CognitoUserInterface, AuthState } from '@aws-amplify/ui-components';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor() { }

  @Output() authStateChangeEvent = new EventEmitter<string>();
  @Output() userChangeEvent = new EventEmitter<any>();
  authState: string | undefined;
  user: CognitoUserInterface | undefined;

  ngOnInit(): void {
    this.authState = localStorage.authState;
    this.user = localStorage.user;
  }

  async signOut() {
    try {
        await Auth.signOut({ global: true });

        this.authState = 'notidentified';
        this.user = undefined;
        localStorage.clear();
        this.authStateChangeEvent.emit(this.authState);
        this.userChangeEvent.emit(this.user);        
    } catch (error) {
        console.log('error signing out: ', error);
    }
  }

  async testApi() {
    const apiName = 'BackendApi';
    const path = '/incidentes'; 
    const myInit = { // OPTIONAL
        headers: {}, // OPTIONAL
        response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
    };
    
    API
      .get(apiName, path, myInit)
      .then((response: any) => {
        console.log(response);
      })
      .catch((error: { response: any; }) => {
        console.log(error.response);
     });    
  }
}
