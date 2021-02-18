import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { onAuthUIStateChange, CognitoUserInterface, AuthState } from '@aws-amplify/ui-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-app';
  authState: any;
  user: CognitoUserInterface | undefined;

  constructor(private ref: ChangeDetectorRef) { }

  ngOnInit() {
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData as CognitoUserInterface;
      this.ref.detectChanges();
    })
  }  

  ngOnDestroy() {
    return onAuthUIStateChange;
  }
  
  changeState(newState: string)
  {
    this.authState = newState;
  }

  changeUser(newUser: CognitoUserInterface)
  {
    this.user = newUser;
  }
}