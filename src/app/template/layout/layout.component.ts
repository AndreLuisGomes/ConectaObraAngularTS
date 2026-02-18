import { Component, inject, OnInit } from '@angular/core';
import { LayoutService } from '../../services/layout.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit{

  titulo : string = '';
   router = inject(Router);

  constructor(private layoutService : LayoutService, private authService : AuthService){
  }
  
  ngOnInit(): void {
    this.layoutService.titulo$.subscribe(t => {
      this.titulo = t;
    })
  }

  deslogar(){
    this.authService.deslogar();
    this.router.navigate(["/auth/fazer-login"]);
  }
}
