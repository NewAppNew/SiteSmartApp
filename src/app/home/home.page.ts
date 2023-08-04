import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/Service/api.service';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private auth: ApiService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,

  ) { }
  form = new FormGroup({
    username: new FormControl(null, Validators.compose([Validators.required])),
    password: new FormControl(null, Validators.compose([Validators.required]))
  })
  
  async reg(){
    this.router.navigate(['/registration']);
  }
  
  async Login() {
    this.auth.signIn(this.form.value).
      subscribe(async response => {
        console.log('response is: ', response);
            
        let loading = await this.loadingCtrl.create({
          message: 'Logging in...',
        });
        loading.present();
       
        if (response.status === 200 ) {
            loading.dismiss();
          this.router.navigate(['/dashboard']);
         
        }
        else {
          loading.dismiss();
          const alert = await this.alertCtrl.create({ message: 'Login Failed', buttons: ['Ok'] });
          await alert.present();
        }
      });
  }
  }



