import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.css']
})
export class ImageGalleryComponent implements OnInit, OnChanges {

  @Input() pictures: string[];
  selectedIndex: number;
  pictureUrl: string;

  constructor() { }

  ngOnInit() {
    this.loadDefaultSelection();
  }

  nextPicture() {
    this.pictureUrl = null;

    this.loadNextPicture();

    if (!this.pictureUrl){
      this.loadDefaultSelection();
    }
  }

  ngOnChanges(changes: any): void {
    this.loadDefaultSelection();
  }

  private loadDefaultSelection() {
    if (this.pictures) {
      this.pictures.forEach(
        (picture, index) => {
          if (picture && !this.pictureUrl) {
            this.selectedIndex = index;
            this.pictureUrl = picture;
          }
        }
      );
    }
  }

  private loadNextPicture() {
    this.pictures.forEach(
      (picture, index) => {
        if (picture && index > this.selectedIndex) {
          this.selectedIndex = index;
          this.pictureUrl = picture;
        }
      }
    );
  }
}
