import { Component, OnInit, ViewChild } from '@angular/core';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import { getCenter } from 'ol/extent.js';
import ImageLayer from 'ol/layer/Image.js';
import Projection from 'ol/proj/Projection.js';
import Static from 'ol/source/ImageStatic.js';
import { GCPServiceService } from '../../app/gcp-service.service';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-my-app',
  templateUrl: './my-app.component.html',
  styleUrls: ['./my-app.component.css']
})
export class MyAppComponent implements OnInit {
  public tranGcp = [];
  public gcps:number[] = [1, 2, 3, 4, 5, 6];
  public gcpnames:string[] = ["gcp1", "gcp2", "gcp3", "gcp4", "gcp5", "gcp6" ];
  constructor(private gCPServiceService: GCPServiceService) {  }

  ngOnInit() {
      const extent:number[] = [0, 0, 1024, 968];
      public let GcpInfo;
      let currentGcp=1;
      let ElementRef = document.getElementById("map");
      @ViewChild('map',{ read: ElementRef } )chipElement: ElementRef;  // selection of the container

      this.gCPServiceService.getGcp().subscribe(            //subscribe start
        filterGcpsAlone => {
          for (let gcp in filterGcpsAlone) {
            if(typeof(filterGcpsAlone[gcp]) != "string") {
              this.tranGcp.push(filterGcpsAlone[gcp]);

              setTimeout(() => {
                GcpInfo=this.tranGcp;
                console.log(GcpInfo);
               }, 150);
            }
          }
        },
      );
      console.log(this.tranGcp);                                                      //sunscribe end
 }
  //    const projection = new Projection({
  //       extent: extent
  //     });
  // }
  //      // for (let image of images) {
  //     // var map = new Map({
      //   layers: [
      //       new ImageLayer({
      //         source: new Static({
      //             url: `https://s3aws.blob.core.windows.net/uploads/dev-site/19/${path}`,
      //             imageExtent: extent,
      //         })
      //       })
      //   ],
      //     target: 'chipElement',
      //     view: new View({
      //       projection: projection,
      //       center: getCenter(extent),
      //       zoom: 2,
      //       maxZoom: 8,
      //     })
      // });
      //  }

  }
// *for the dynamic loading of the containers

//{ read: ElementRef })
