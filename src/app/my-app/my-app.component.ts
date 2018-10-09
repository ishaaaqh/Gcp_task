import { Component, OnInit, ViewChild } from '@angular/core';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import { getCenter } from 'ol/extent.js';
import ImageLayer from 'ol/layer/Image.js';
import Projection from 'ol/proj/Projection.js';
import Static from 'ol/source/ImageStatic.js';
import { GCPServiceService } from '../../app/gcp-service.service';
import { map, filter } from 'rxjs/operators';
import { SlickModule } from 'ngx-slick';


@Component({
  selector: 'app-my-app',
  templateUrl: './my-app.component.html',
  styleUrls: ['./my-app.component.css']
})
export class MyAppComponent implements OnInit{
  public tranGcp = [];

  public currentGcp:number=1;
  public currentImages=this.tranGcp[0];//this is not working >>> Fix this
  constructor(private gCPServiceService: GCPServiceService) {  }

  previous() {
    if(this.currentGcp>1){
     this.currentGcp--;
     console.log('The value is '+ this.currentGcp);
     this.currentImages=this.tranGcp[this.currentGcp-1]
     console.log(this.currentImages)
    }
  }

  next(){
   if(this.currentGcp<6){
    this.currentGcp++;
    console.log('this value is ' + this.currentGcp);
    this.currentImages=this.tranGcp[this.currentGcp-1]
    console.log(this.currentImages);

    let extent=[0, 0, 1025, 968];
    console.log(`https://s3aws.blob.core.windows.net/uploads/dev-site/19/${this.currentImages[0].image}`);
    const projection = new Projection({
    });
     extent: extent
       console.log(this.currentImages[0].image);
       console.log(this.currentImages)
      for (let image in this.currentImages) {
       var map = new Map({
        layers: [
          new ImageLayer({
            source: new Static({
              url: `https://s3aws.blob.core.windows.net/uploads/dev-site/19/${this.currentImages[image].image}`,
              imageExtent: extent,
            })
          })
        ],
        target: 'map',
        view: new View({
          projection: projection,
          center: getCenter(extent),
          zoom: 2,
          maxZoom: 8,
        })
       });
      }

   }
  }

  ngOnInit() {
    const extent:number[] = [0, 0, 1024, 968];
    let GcpInfo;
    let currentGcp=1;
    let ElementRef = document.getElementById("map");
    // let inputRef:
    // @ViewChild('map',{ read: ElementRef } )chipElement: ElementRef;

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
        // const projection = new Projection({
      //  });
      //    extent: extent
      //  for (let image of currentImages) {
      // var map = new Map({
      //   layers: [
      //       new ImageLayer({
      //         source: new Static({
      //             url: `https://s3aws.blob.core.windows.net/uploads/dev-site/19/${image.image}`,
      //             imageExtent: extent,
      //         })
      //       })
      //   ],
      //     target: 'map',
      //     view: new View({
      //       projection: projection,
      //       center: getCenter(extent),
      //       zoom: 2,
      //       maxZoom: 8,
      //     })
      // });
      //  }

  }
}
// *for the dynamic loading of the containers

//{ read: ElementRef })
