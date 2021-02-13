import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
declare var mapboxgl:any;
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit {
  @Input() coords:string;
  @ViewChild('mapa') mapa;
  constructor() { }

  ngOnInit() {
    console.log(this.coords);
    const latLng = this.coords.split(',');
    const lat = Number(latLng[0]);
    const lng = Number(latLng[1]);

    mapboxgl.accessToken = 'pk.eyJ1Ijoia2V5bWVyaiIsImEiOiJja2pxMmc3dm0wbnh5Mnpwa2VuZDE0dGd4In0.WIw9T5eC38-Xw1lJ--_yTg';
      const map = new mapboxgl.Map({
      container: this.mapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: 15
    });

    const marker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);

  }

}
