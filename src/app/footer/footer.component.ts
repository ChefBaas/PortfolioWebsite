import { AfterViewInit, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ColorsService } from '../shared/colors.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements AfterViewInit
{
  @ViewChild('container')container!:ElementRef<HTMLDivElement>;
  colorsService:ColorsService = inject(ColorsService);

  ngAfterViewInit():void 
  {
    this.container.nativeElement.style.backgroundColor = this.colorsService.getRandomColor();
  }
}
