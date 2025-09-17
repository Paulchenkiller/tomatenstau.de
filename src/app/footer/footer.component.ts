import { Component } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { IconService } from '../services/icon.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [FaIconComponent],
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();

  constructor(private iconService: IconService) {
    // Icons are now loaded via the IconService
  }
}
