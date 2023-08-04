import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/Service/api.service';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  segmentModel = "Individual";
  public myForm: FormGroup;
  private playerCount: number = 1;
  public type = 'password';
  public showPass = false;
  constructor(
    private router:Router,
    private formBuilder: FormBuilder,
    private auth:ApiService,
    private alertCtrl:AlertController,
    private toastCtrl:ToastController,
    private loadingCtrl:LoadingController,

    ) { 
      this.myForm = formBuilder.group({
        player1: ['', Validators.required]
      });
    }
 form =new FormGroup({
  name:new FormControl('',Validators.required),
  address1:new FormControl('',Validators.required),
  address2:new FormControl('',Validators.required),
  address3:new FormControl('',Validators.required),
  mobile_number:new FormControl('',Validators.required),
  email_id:new FormControl('',Validators.required),
  website:new FormControl('',Validators.required),
  director_name:new FormControl('',Validators.required),
  director_mobile:new FormControl('',Validators.required),
  director_email_id:new FormControl('',Validators.required),
  type_of_industry:new FormControl('',Validators.required),
  gst:new FormControl('',Validators.required),
  tan:new FormControl('',Validators.required),
  pan:new FormControl('',Validators.required),
  username:new FormControl('',Validators.required),
  password:new FormControl('',Validators.required)
 })

 comform =new FormGroup({
  name:new FormControl('',Validators.required),
  address1:new FormControl('',Validators.required),
  address2:new FormControl('',Validators.required),
  address3:new FormControl('',Validators.required),
  mobile_number:new FormControl('',Validators.required),
  email_id:new FormControl('',Validators.required),
  website:new FormControl('',Validators.required),
  director_name:new FormControl('',Validators.required),
  director_mobile:new FormControl('',Validators.required),
  director_email_id:new FormControl('',Validators.required),
  type_of_industry:new FormControl('',Validators.required),
  gst:new FormControl('',Validators.required),
  tan:new FormControl('',Validators.required),
  pan:new FormControl('',Validators.required),
  username:new FormControl('',Validators.required),
  password:new FormControl('',Validators.required),
  contact_person_designation:new FormControl('',Validators.required)
 })
    ngOnInit() {
    }
  showPassword() {
    this.showPass = !this.showPass;
    if(this.showPass){
      this.type = 'text';
    } else {
      this.type = 'password';
    }
 }
  login() {
    this.router.navigate(['/home']); 
    }
 
    segmentChanged(event){
      console.log(this.segmentModel);
      
      console.log(event);
    }
    async removeControl(control){
      this.myForm.removeControl(control.key);
    }
    async addControl(){
      this.playerCount++;
      this.myForm.addControl('player' + this.playerCount, new FormControl('', Validators.required));
    }

    async save(){
      const loading = await this.loadingCtrl.create({ message:'Registering....'});
      await loading.present();
      this.auth.register(this.form.value).subscribe(
        //if success
       async () => {
         const toast = await this.toastCtrl.create({message:"User Registered successfully", duration:2000, color:'dark'})
          await toast.present();
         loading.dismiss();
         this.form.reset();
       },
       //if there is an error
       async () => {
        const alert = await this.alertCtrl.create({message:"There is an error",buttons:['OK']})
        loading.dismiss();
         await alert.present();
      },
        );
    }

    async companySave(){
      const loading = await this.loadingCtrl.create({ message:'Registering....'});
      await loading.present();
      this.auth.registerCompany(this.comform.value).subscribe(
        //if success
       async () => {
         const toast = await this.toastCtrl.create({message:"User Registered successfully", duration:2000, color:'dark'})
          await toast.present();
         loading.dismiss();
         this.comform.reset();
       },
       //if there is an error
       async () => {
        const alert = await this.alertCtrl.create({message:"There is an error",buttons:['OK']})
        loading.dismiss();
         await alert.present();
      },
        );
    }
  }
