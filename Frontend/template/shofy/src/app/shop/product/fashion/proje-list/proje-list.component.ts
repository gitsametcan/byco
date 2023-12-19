import { Component } from '@angular/core';
import Swiper from 'swiper';
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Iproje } from '@/types/projelerimiz-type';
import { ProjeService } from '@/shared/services/proje.service';
import { CartService } from '@/shared/services/cart.service';

@Component({
  selector: 'app-proje-list',
  templateUrl: './proje-list.component.html',
  styleUrls: ['./proje-list.component.scss']
})
export class ProjeListComponent {

    public projeler: Iproje[] = [];

    constructor(public cartService: CartService, public projeService: ProjeService) {
        this.projeService.products.subscribe((products) => {
          this.projeler = products;
        });
      }


      ngOnInit(): void {
        new Swiper('.tp-category-slider-active-2', {
          slidesPerView: 5,
          spaceBetween: 20,
          loop: false,
          modules: [Pagination, Navigation, Scrollbar],
          pagination: {
            el: '.tp-category-slider-dot',
            clickable: true,
          },
          navigation: {
            nextEl: '.tp-category-slider-button-next',
            prevEl: '.tp-category-slider-button-prev',
          },
          scrollbar: {
            el: '.swiper-scrollbar',
            draggable: true,
            dragClass: 'tp-swiper-scrollbar-drag',
            snapOnRelease: true,
          },
          breakpoints: {
            '1200': {
              slidesPerView: 5,
            },
            '992': {
              slidesPerView: 4,
            },
            '768': {
              slidesPerView: 3,
            },
            '576': {
              slidesPerView: 2,
            },
            '0': {
              slidesPerView: 1,
            },
          },
        });
      }




}
