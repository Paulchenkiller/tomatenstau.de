import { Component, OnInit } from '@angular/core';
import {
  FaIconComponent,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  imports: [FaIconComponent],
})
export class FooterComponent implements OnInit {
  currentYear: number = new Date().getFullYear();

  constructor(private library: FaIconLibrary) {
    this.library.addIconPacks(fas, fab);
  }

  ngOnInit(): void {}
}
