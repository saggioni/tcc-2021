import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { Amplify } from '@aws-amplify/core';
import { Auth } from '@aws-amplify/auth';

Amplify.configure({
  Auth: {
    region: 'sa-east-1',
    userPoolId: 'sa-east-1_dpP907tV7',
    userPoolWebClientId: '5idv4v922blpsj4cgdcrsq6qh',
    authenticationFlowType: 'USER_PASSWORD_AUTH',
  },
  API: {
    endpoints: [
        {
            name: "BackendApi",
            endpoint: "https://4ql3a62j23.execute-api.sa-east-1.amazonaws.com/Prod"
        }
    ]
  }
});
const currentConfig = Auth.configure();
Amplify.configure(currentConfig);
Auth.configure(currentConfig);

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
