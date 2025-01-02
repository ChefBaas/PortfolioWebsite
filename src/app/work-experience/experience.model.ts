import { SafeResourceUrl } from "@angular/platform-browser"

export type ExperienceData =
{
    videoURL:string,
    safeVideoURL:SafeResourceUrl
    title:string,
    description:string,
    responsibilities:string[],
    websiteURL:string,
    year:string,
    shortTitle:string,
    id:number
}