import {Component, OnInit} from '@angular/core';

@Component( {
    selector: 'app-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.css'],
    standalone: false
} )
export class ContentComponent implements OnInit {
  constructor() {
  }

  ngOnInit(): void {
  }

  onActivate( event ): void {
    const scrollToTop = window.setInterval( () => {
      const pos = window.pageYOffset;
      if ( pos > 0 ) {
        window.scrollTo( 0, pos - 20 ); // how far to scroll on each step
      } else {
        window.clearInterval( scrollToTop );
      }
    }, 16 );
  }
}
