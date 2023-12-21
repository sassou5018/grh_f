import { Component, Input } from '@angular/core';
import { IAvantage } from 'src/app/interfaces/IAvantage';

@Component({
  selector: 'app-avantagestable',
  templateUrl: './avantagestable.component.html',
  styleUrls: ['./avantagestable.component.scss']
})
export class AvantagestableComponent {
  @Input() avantage!: any[];
  constructor() { }
}
