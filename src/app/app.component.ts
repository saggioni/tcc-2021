import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { onAuthUIStateChange, CognitoUserInterface, AuthState } from '@aws-amplify/ui-components';
import { delay } from 'rxjs/operators';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-app';
  loading: boolean = false;
  authState: any;
  showMenu: boolean = true;
  user: CognitoUserInterface | undefined;

  constructor(private _loading: LoadingService, private ref: ChangeDetectorRef) { }


  ngOnInit() {
    this.listenToLoading();
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData as CognitoUserInterface;
      this.ref.detectChanges();
    });
  }

  listenToLoading(): void {
    this._loading.loadingSub
      .pipe(delay(0)) 
      .subscribe((loading) => {
        this.loading = loading;
      });
  }

  ngOnDestroy() {
    return onAuthUIStateChange;
  }

  changeState(newState: string) {
    this.authState = newState;
  }

  changeUser(newUser: CognitoUserInterface) {
    this.user = newUser;
  }

  toogleMenu() {
    this.showMenu = !this.showMenu;
  }

  getPerfil(): Boolean {
    const userProfile = localStorage['username'].toLowerCase();
    return userProfile === 'gestor';
  }
}