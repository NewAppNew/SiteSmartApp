import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.page.html',
  styleUrls: ['./orderdetails.page.scss'],
})
export class OrderdetailsPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
async enquiry(){
  this.router.navigate(['/dashboard'])
}
}
