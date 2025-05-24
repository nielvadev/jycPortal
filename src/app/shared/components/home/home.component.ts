import { Component, OnInit } from '@angular/core';
import { PrimeNgModule } from '../../modules/PrimeNg.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PrimeNgModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
