import { Component, OnInit } from '@angular/core';
import { FilesService } from 'src/app/services/filesService/files.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor() { }
  ngOnInit(): void {
    
  }
}
