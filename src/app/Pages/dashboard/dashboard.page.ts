import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController, Platform } from '@ionic/angular';
import { ApiService } from 'src/app/Service/api.service';
import { retry, catchError ,map } from 'rxjs/operators';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  segmentModel = "orders";
  public showSearch = true;
  public menuhead=true;
  public qt:any;
  constructor(
    private router:Router,
    private modalController:ModalController,
    private http:HttpClient,
    private api:ApiService,
    private loadingController:LoadingController) { }

  ngOnInit() {
  }
  
  segmentChanged(event){
    console.log(this.segmentModel);
    
    console.log(event);
  }

  async signout() {
    this.router.navigate(['/home']);
  }
  async home() {
    this.router.navigate(['/dashboard']);
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
  showSearchbar() {
    this.showSearch = !this.showSearch;
 }
 showMenu() {
  this.menuhead = !this.menuhead;
}

async quotation(){
  let loading = await this.loadingController.create({
    message: 'Loading data.... ',
  });
  loading.present();
  return this.http.get(this.api.api_url+"read_quotation.php").
  pipe(
    map((data: any) => {
      return data;
    }))
  .subscribe((data) => {
    loading.dismiss();
    console.log(data);
    this.qt = data;
    console.log("qt",this.qt);

  });
}
}


