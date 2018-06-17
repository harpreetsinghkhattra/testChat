import { Component, OnInit, Input, OnChanges, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-overlay-loader',
  templateUrl: './overlay-loader.component.html',
  styleUrls: ['./overlay-loader.component.css']
})
export class OverlayLoaderComponent implements OnInit, OnChanges {

  @Input() isLoading: boolean;
  @ViewChild("overlay") overlayLoader: ElementRef;
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.overlayLoader) {
      if (this.isLoading) {
        this.overlayLoader.nativeElement.style.display = "block";
      } else this.overlayLoader.nativeElement.style.display = "none";
    } else console.log("this.overlayLoader", this.overlayLoader);
  }

}
