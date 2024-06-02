import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'BYCO';

  isCookieAccept=false;

  gizle(){
    localStorage.setItem('cookie-consent', 'true');
  }

  cookieSonuc():boolean{
    if (!localStorage.getItem('cookie-consent')) {
        return true;
      }
    return false;

  }
}
