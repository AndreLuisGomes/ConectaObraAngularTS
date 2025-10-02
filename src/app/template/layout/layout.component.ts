import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../layout.service';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit{

  titulo : string = '';

  constructor(private layoutService : LayoutService){
  }
  
  ngOnInit(): void {
    this.layoutService.titulo$.subscribe(t => {
      this.titulo = t;
    })
  }

  

}
