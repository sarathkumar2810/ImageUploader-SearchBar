import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  capital: any
  value: any
  tableData = true;
  test:any = [] ;
  Records = true;

  stateObj = [
    { id: 1,
      name: "Alabama",
    },
    { id: 2,
      name: "Alaska",
    },
    { id: 3,
      name: "Kansas",
    },
    { id: 4,
      name: "Kantucky",
    },
    { id: 5,
      name: "Mississippi",
    },
    { id: 6,
      name: "Missouri",
    },
    { id: 7,
      name: "MisAlari",
    },
    

  ];
  

  constructor(public alertController: AlertController) { }

  ngOnInit() {
    console.log(this.stateObj.length);
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Minimum Characters Must be 3.',
      buttons: ['OK']
    });

    await alert.present();
  }

  mySearchFunction(event: any) {
    this.capital = event.target.value;
    this.value = this.capital[0].toUpperCase()+this.capital.slice(1);
    // console.log(this.value)
    if (this.capital.length <= 2 ){
      //  console.log("hi")
      this.presentAlert()
     }else {
      this.test = this.stateObj.filter(data=>data.name.includes(this.value));
      this.Records = false;
      // this.res = this.stateObj.filter((data)=>{
      // return data.name.includes(this.capital)
      //})
      console.log(this.test,"test");
    };
      
  }

}


