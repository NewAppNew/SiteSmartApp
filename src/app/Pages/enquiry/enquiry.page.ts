import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.page.html',
  styleUrls: ['./enquiry.page.scss'],
})
export class EnquiryPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  async customer() {
    this.router.navigate(['/dashboard']);
  }
  async enquiry() {
    this.router.navigate(['/enquiry']);
  }
 
  async createcontact() {
    this.router.navigate(['/createcontact']);
  }
  async companycontact() {
    this.router.navigate(['/companycontact']);
  }
  async product() {
    this.router.navigate(['/product']);
  }
  async order(){
    this.router.navigate(['/orderdetails']);
  }
  async report(){
    this.router.navigate(['/report']);
  }
  async signout() {
    this.router.navigate(['/home']);
  }


}
