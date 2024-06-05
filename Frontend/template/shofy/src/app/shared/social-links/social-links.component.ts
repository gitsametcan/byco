import { Component } from '@angular/core';

@Component({
  selector: 'app-social-links',
  templateUrl: './social-links.component.html',
  styleUrls: ['./social-links.component.scss']
})
export class SocialLinksComponent {

  public social_data = [
    {
      id:1,
      link:'https://www.facebook.com/bycomuhendislik',
      icon:'fa-brands fa-facebook-f',
      title:'Facebook'
    },
    {
      id:2,
      link:'https://x.com/byco_as',
      icon:'fa-brands fa-twitter',
      title:'Twitter'
    },
    {
      id:3,
      link:'https://www.linkedin.com/company/byco',
      icon:'fa-brands fa-linkedin-in',
      title:'Linkedin'
    },
    {
      id:4,
      link:'https://www.instagram.com/byco_elektrik/',
      icon:'fa-brands fa-instagram',
      title:'Vimeo'
    }
  ]
}
