import { AfterViewInit, Component, ElementRef, inject, QueryList, ViewChildren } from '@angular/core';
import { ColorsService } from '../../shared/colors.service';

type FilterButton =
{
  button: HTMLButtonElement | undefined,
  active:boolean,
  color:string
}

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent implements AfterViewInit
{
  @ViewChildren('button')buttonChildren!:QueryList<ElementRef<HTMLButtonElement>>;
  filters:string[] = ['computational geometry', 'interactive', 'music', 'front-end'];
  buttons:FilterButton[] = [];
  colorsService:ColorsService = inject(ColorsService);

  constructor()
  {
    for (let i:number = 0; i < this.filters.length; i++)
    {
      this.buttons.push({button: undefined, active:false, color:""});
    }
  }

  ngAfterViewInit(): void 
  {
    for (let i:number = 0; i < this.buttonChildren.length; i++)
    {
      this.buttons[i] = {button: this.buttonChildren.get(i)!.nativeElement, active:false, color: this.colorsService.getRandomColor()};
      this.buttons[i].button!.style.color = this.buttons[i].color;
    }
  }

  onMouseOver(index:number):void
  {
    this.buttons[index].button!.style.color = 'white';
    this.buttons[index].button!.style.backgroundColor = this.buttons[index].color;
  }
  
  onMouseLeave(index:number):void
  {
    if (!this.buttons[index].active)
    {
      this.buttons[index].button!.style.color = this.buttons[index].color;
      this.buttons[index].button!.style.backgroundColor = '#f8f9fa';
    }
  }

  onClick(index:number):void
  {
    this.buttons[index].active = !this.buttons[index].active;
  }
}