import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-scrollable-gallery',
  standalone: true,
  imports: [],
  templateUrl: './scrollable-gallery.component.html',
  styleUrl: './scrollable-gallery.component.css'
})
export class ScrollableGalleryComponent 
{
  @ViewChild('container') scrollContainer!:ElementRef<HTMLDivElement>;

  mouseX:number = 0;

  onDragStart(event:MouseEvent):void
  {
    this.mouseX = event.clientX;
  }

  onDrag(event:MouseEvent):void
  {
    /*event.preventDefault();
    event.stopPropagation();
    if (event.clientX === 0 && event.clientY === 0) return;
    this.scrollContainer.nativeElement.scrollLeft += (event.clientX - this.mouseX);
    this.mouseX = event.clientX;*/
  }
}
