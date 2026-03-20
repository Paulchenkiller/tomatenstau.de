import { Component } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [FaIconComponent],
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
