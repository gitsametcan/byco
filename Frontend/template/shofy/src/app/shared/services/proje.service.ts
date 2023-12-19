import { Iproje } from "@/types/projelerimiz-type";
import { Injectable } from "@angular/core";
import {of,Observable} from 'rxjs';
import projeler_data from '@/data/projeler-data';
import {map} from 'rxjs/operators'

export class ProjeService {
    public get products(): Observable<Iproje[]> {
        return of(projeler_data);
      }
    
    constructor() { }


    activeImg: string | undefined;

    handleImageActive(img: string) {
        this.activeImg = img;
    }

    




}