import { Component, OnInit, ViewChild,AfterViewInit } from '@angular/core';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import {defaults as defaultControls, Control} from 'ol/control.js';
import { getCenter } from 'ol/extent.js';
import ImageLayer from 'ol/layer/Image.js';
import Projection from 'ol/proj/Projection.js';
import Static from 'ol/source/ImageStatic.js';
import { GCPServiceService } from '../../app/gcp-service.service';
import { map, filter } from 'rxjs/operators';
import { SlickModule } from 'ngx-slick';
import * as $ from 'jquery';


@Component({
  selector: 'app-my-app',
  templateUrl: './my-app.component.html',
  styleUrls: ['./my-app.component.css']
})
export class MyAppComponent implements OnInit {
  public tranGcp = [];
  @ViewChild('mapElement') mapElement;
  public currentGcp:number=0;
  public currentImages;
  constructor(private gCPServiceService: GCPServiceService) {  };


   previous() {
    if(this.currentGcp>1){
     this.currentGcp--;
     let mapRef= this.mapElement.nativeElement;
     mapRef.innerHTML="";
     console.log('The value is '+ this.currentGcp);
     this.currentImages=this.tranGcp[this.currentGcp-1]
     console.log(this.currentImages);
     this.generateMap(this.currentImages);
    }
  }

  next(){
    if(this.currentGcp<6){
     this.currentGcp++;
     let mapRef= this.mapElement.nativeElement;
     mapRef.innerHTML="";
     console.log('this value is ' + this.currentGcp);
     this.currentImages=this.tranGcp[this.currentGcp-1];
     this.generateMap(this.currentImages);

   }
  }

  generateMap(data){
    let mapRef= this.mapElement.nativeElement;
    let extent = [0, 0, 1024, 968];
    console.log(`https://s3aws.blob.core.windows.net/uploads/dev-site/19/${data[0].image}`);
    const projection = new Projection({
     extent: extent
    });
    console.log(data[0].image);
    console.log(this.currentImages)
    let count = 0;
    $('#map').siblings().empty

    for (let images of data) {
    const container = document.createElement('div');
    $(container).insertBefore('#map');
    $(container).css('width', '500px');
    $(container).css('height', '500px');
    $(container).attr('id', `map_${images.Easting}_${count}`);

    console.log(`https://s3aws.blob.core.windows.net/uploads/dev-site/19/${images.image}`);
    var map = new Map({
      controls : new defaultControls({
      attribution : false,
      zoom : false,
      rotate:false,
     }),
     layers: [
       new ImageLayer({
         source: new Static({
           url: `https://s3aws.blob.core.windows.net/uploads/dev-site/19/${images.image}`,
           projection: projection,
           imageExtent: extent,
         })
       })
     ],
     target: `map_${images.Easting}_${count}`,
     view: new View({
       projection: projection,
       center: getCenter(extent),
       zoom: 2,
       maxZoom: 8,
     })
    });

     count += 1;
    }

      }

  ngOnInit() {
    let GcpInfo;
    let currentGcp=1;
    let ElementRef = document.getElementById("map");

    this.gCPServiceService.getGcp().subscribe(

    filterGcpsAlone => {
      for (let gcp in filterGcpsAlone) {
       if(typeof(filterGcpsAlone[gcp]) != "string") {
        this.tranGcp.push(filterGcpsAlone[gcp]);

       }
      }

      setTimeout(() => {
        console.log(this.tranGcp);
        console.log(this.currentImages);
      }, 10)
        console.log(this.tranGcp);
        console.log(this.currentGcp);
        console.log(this.currentImages);
    },
    );
      }
}
