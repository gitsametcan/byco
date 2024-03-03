import { IMenuItem, IMobileType } from "@/types/menu-d-type";

export const menu_data:IMenuItem[] = [
  {
    id:1,
    link:'/anasayfa',
    title:'ANASAYFA',
    mega_menu:false,
    // home_pages:[
    //   {
    //     id:1,
    //     title:'Elektronik',
    //     img:'/assets/img/menu/menu-home-1.jpg',
    //     link:'/home/electronic'
    //   },
    //   {
    //     id:2,
    //     title:'Giyim',
    //     img:'/assets/img/menu/menu-home-2.jpg',
    //     link:'/home/fashion'
    //   },
    //   {
    //     id:3,
    //     title:'Güzellik',
    //     img:'/assets/img/menu/menu-home-3.jpg',
    //     link:'/home/beauty'
    //   },
    //   {
    //     id:4,
    //     title:'Takılar',
    //     img:'/assets/img/menu/menu-home-4.jpg',
    //     link:'/home/jewelry'
    //   },
    // ]
  },
  {
    id:2,
    link:'/pages/hizmetler',
    title:'HİZMETLERİMİZ',
    mega_menu:false,
    // shop_mega_menus:[
    //   {
    //     link:'/shop',
    //     title:'Ticaret Sayfaları',
    //     list_menus:[
    //       {title:'Grid Layout',link:'/shop'},
    //       {title:'Shop Categories',link:'/shop/shop-category'},
    //       {title:'List Layout',link:'/shop/shop-list'},
    //       {title:'Full width Layout',link:'/shop/shop-full-width'},
    //       {title:'1600px Layout',link:'/shop/shop-1600'},
    //       {title:'Left Sidebar',link:'/shop'},
    //       {title:'Right Sidebar',link:'/shop/shop-right-sidebar'},
    //       {title:'Hidden Sidebar',link:'/shop/shop-no-sidebar'},
    //     ]
    //   },
    //   {
    //     link:'/shop',
    //     title:'Özellikler',
    //     list_menus:[
    //       {title:'Filter Dropdown',link:'/shop/shop-filter-dropdown'},
    //       {title:'Filters Offcanvas',link:'/shop/shop-filter-offcanvas'},
    //       {title:'Filters Sidebar',link:'/shop'},
    //       {title:'Load More button',link:'/shop/shop-load-more'},
    //       {title:'1600px Layout',link:'/shop/shop-1600'},
    //       {title:'Collections list',link:'/shop/shop-list'},
    //       {title:'Hidden search',link:'/shop'},
    //       {title:'Search Full screen',link:'/shop'},
    //     ]
    //   },
    //   {
    //     link:'/shop',
    //     title:'Hover Style',
    //     list_menus:[
    //       {title:'Hover Style 1',link:'/shop'},
    //       {title:'Hover Style 2',link:'/shop'},
    //       {title:'Hover Style 3',link:'/shop'},
    //       {title:'Hover Style 4',link:'/shop'}
    //     ]
    //   },
    // ]
  },
  {
    id:3,
    link:'/anasayfa/projeler',
    title:'PROJELER',
  },
  {
    id:4,
    link:'/pages/hakkimizda',
    title:'HAKKIMIZDA'
  },
  {
    id:5,
    link:'/pages/contact',
    title:'İLETİŞİM',
  },
//   {
//     id:6,
//     link:'/shop',
//     title:'MAĞAZA'
//   }
]

// mobile menu data
export const mobile_menu:IMobileType[] = [
  {
    id:1,
    link:'/anasayfa',
    title:'ANASAYFA'
  },
  {
    id:2,
    link:'/pages/hizmetler',
    title:'HİZMETLERİMİZ'
  },
  {
    id:3,
    link:'/anasayfa/projeler',
    title:'PROJELER',
  },
  {
    id:4,
    link:'/pages/hakkimizda',
    title:'HAKKIMIZDA'
  },
  {
    id:5,
    link:'/pages/contact',
    title:'İLETİŞİM',
  },
//   {
//     id:6,
//     link:'/shop',
//     title:'MAĞAZA'
//   }
]
