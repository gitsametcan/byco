import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BeautyComponent } from './beauty/beauty.component';
import { FashionComponent } from './fashion/fashion.component';
import { ElectronicsComponent } from './electronics/electronics.component';
import { JewelryComponent } from './jewelry/jewelry.component';

const routes: Routes = [
  // {
  //   path:'electronic',
  //   component:ElectronicsComponent,
  //   title:'Shofy - Multipurpose eCommerce Angular Template'
  // },
 {
     path:'projeler',
     component:FashionComponent,
     title:'Home Fashion'
  },
  {
    path:'',
    component:BeautyComponent,
    title:'Anasayfa'
  },
  {
    path:'admin',
    component:JewelryComponent,
    title:'Proje Yükle'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
