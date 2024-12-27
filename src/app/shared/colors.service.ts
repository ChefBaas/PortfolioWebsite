import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})
export class ColorsService
{
    color1:string = "#d35098";
    color2:string = "#dbab57";
    color3:string = "#578adb";
    colors:string[] = [this.color1, this.color2, this.color3];

    getRandomColor():string
    {
        return this.colors[Math.floor(Math.random() * this.colors.length)];
    }
}