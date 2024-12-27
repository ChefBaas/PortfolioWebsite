import { Component, ElementRef, EventEmitter, inject, Output, ViewChild } from '@angular/core';
import { ImageShape } from '../shapes/imageShape';
import { Vector2 } from '../../shared/Vector2';
import { CanvasBackgroundService } from '../canvas-background.service';
import { BallData } from '../ball';

@Component({
  selector: 'app-draggable-image, img[draggableImg]',
  standalone: true,
  imports: [],
  templateUrl: './draggable-image.component.html',
  styleUrl: './draggable-image.component.css',
})
export class DraggableImageComponent 
{
  canvasBackgroundService:CanvasBackgroundService = inject(CanvasBackgroundService);

  @Output() onHidePhoto = new EventEmitter<void>();

  @ViewChild('photo') photo!:ElementRef<HTMLImageElement>;
  photoBall!:ImageShape;
  draggingPhoto:boolean = false;
  showPhoto:boolean = true;
  mouseDragStart:Vector2 = new Vector2(0,0);
  mouseDragOffset:Vector2 = new Vector2(0,0);

  onDragPhotoStart(event:MouseEvent):void
  {
    this.draggingPhoto = true;
    let photoRect:DOMRect = this.photo.nativeElement.getBoundingClientRect();
    this.mouseDragStart.x = event.clientX;
    this.mouseDragStart.y = event.clientY;
    this.mouseDragOffset.x = photoRect.left - event.clientX;
    this.mouseDragOffset.y = photoRect.top - event.clientY;
  }
  
  onDragPhotoEnd(event:MouseEvent):void
  { 
    let canvasRect:DOMRect = this.canvasBackgroundService.canvas.nativeElement.getBoundingClientRect();
    let photoRect:DOMRect = this.photo.nativeElement.getBoundingClientRect();
    let position:Vector2 = new Vector2(event.clientX - canvasRect.left + photoRect.height * 0.5 + this.mouseDragOffset.x, event.clientY - canvasRect.top + photoRect.height * 0.5 + this.mouseDragOffset.y);
    let direction:Vector2 = new Vector2(event.clientX - this.mouseDragStart.x, event.clientY - this.mouseDragStart.y).normalize();
    const ballData:BallData = this.canvasBackgroundService.getNewBallData(photoRect.width * 0.5, position, direction);

    this.photoBall = new ImageShape(ballData, this.photo.nativeElement, photoRect);
    this.draggingPhoto = true;
    
    this.canvasBackgroundService.balls.push(this.photoBall);
    
    this.onHidePhoto.emit();
  }
}
