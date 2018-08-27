import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-authorised',
  templateUrl: './authorised.component.html',
  styleUrls: ['./authorised.component.css']
})
export class AuthorisedComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
      localStorage.setItem("authorised", JSON.stringify(true));
      this.router.navigate(['/']);
  }
}
