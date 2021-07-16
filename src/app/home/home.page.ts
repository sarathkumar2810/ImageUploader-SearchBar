import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  showLoader: boolean;
  p_bar_value = 0;
  base64Image: any;
  multipleImg:any = []
  imageResponse: any = [];
  options: any
  uploader = true

  showProgressBar() {
    this.showLoader = true;
  }

  hideProgressBar() {
    this.showLoader = false;
  }

  runDeterminateProgress() {
    this.showProgressBar()
    for (let index = 0; index <= 100; index++) {
      this.setPercentBar(+index);
    }
  }

  setPercentBar(i) {
    setTimeout(() => {
      let apc = (i / 100)
      console.log(apc);
      this.p_bar_value = apc;
    }, 30 * i);
  }
 
  constructor(private camera: Camera, public navCtrl: NavController, public http: HttpClient, public imagePicker: ImagePicker, private router: Router ) { }

  openCamera () {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    } 

    this.camera.getPicture(options).then((ImageData) => {
      this.base64Image = 'data:image/jpeg;base64,' + ImageData;
      this.multipleImg.push(this.base64Image)
      console.log(this.multipleImg.length);
      console.log(ImageData);
     
    }, (err) => {
      //Handle Error
    });
  }

  getImages() {
    const options = {
      quality: 100,
     width: 200,
     outputType: 1
    } 
    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        this.imageResponse.push('data:image/jpeg;base64,' + results[i]);
      }
    }, (err) => { });
  }

  openGallery () {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    } 

    this.camera.getPicture(options).then((ImageData) => {
      this.base64Image = 'data:image/jpeg;base64,' + ImageData;
      this.multipleImg.push(this.base64Image);
      console.log(this.base64Image);
    }, (err) => {
      //Handle Error
    });
  }

  uploadImage () {
        let test = {name: this.multipleImg};
        let data:Observable<any> = this.http.post('https://upload-331de-default-rtdb.firebaseio.com/post.json',
         test,{reportProgress:true,observe:'events'});
        data.pipe(map(event=>{
          console.log(event,"outside if");
          if(event.type === HttpEventType.UploadProgress){
            this.showLoader = true;
            this.p_bar_value = Math.round(event.loaded*100 / event.total); 
             console.log(event,"inside if");
          }
        })).subscribe((res) => {
          console.log(res)
        });
  }

  nextPage () {
    this.router.navigateByUrl('search')
  }

}
