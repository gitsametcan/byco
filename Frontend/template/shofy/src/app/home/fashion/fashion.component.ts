import { Component, Input } from '@angular/core';
import { ProjeListComponent } from 'src/app/shop/product/fashion/proje-list/proje-list.component';

@Component({
  selector: 'app-fashion',
  templateUrl: './fashion.component.html',
  styleUrls: ['./fashion.component.scss']
})
export class FashionComponent {
  @Input () style_2 : Boolean | undefined;
  @Input () primary_style : Boolean | undefined;
  @Input () style_3 : Boolean | undefined;
}
