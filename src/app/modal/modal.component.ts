import {Component, Input, OnInit} from '@angular/core';
import {faPlus} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() img: {src, alt};
  @Input() title: string;
  @Input() content: string;
  faPlus = faPlus;
  constructor() { }

  ngOnInit(): void {
  }

}
