import { Component, OnInit, isDevMode } from '@angular/core';
import getEnv from './envResolver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'grh_f';
  ngOnInit(): void {
      if(isDevMode()){
        console.log('Dev Environment');
        console.log('API IS: '+ getEnv().API_URL);
      }
  }
}
