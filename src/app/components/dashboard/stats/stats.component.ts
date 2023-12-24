import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ContratService } from 'src/app/services/contratService/contrat.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  stats: Observable<{labels: string[], datasets: any[]}> = this.contratService.getStats();
  data = {
    labels: ["AA", "BBB"],
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: "#42A5F5",
        borderColor: "#1E88E5",
        data: [65, 59]
      },
      {
        label: "My Second dataset",
        backgroundColor: "#9CCC65",
        borderColor: "#7CB342",
        data: [28, 48]
      }
    ]
  }
  constructor(private contratService: ContratService){
  }

  ngOnInit(): void {
      this.contratService.getStats().subscribe({
        next: (data) => {
          console.log("stats",data);
        },
        error: (err) => {
          console.log(err);
        }
      })
  }
}
