import { Component } from '@angular/core';
import { Highlight } from 'ngx-highlightjs';
import { HeadlineComponent } from '../../../headline/headline.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-python-mutable-default',
  templateUrl: './python-mutable-default.component.html',
  imports: [Highlight, HeadlineComponent, TranslateModule],
})
export class PythonMutableDefaultComponent {
  badCode = `def append_item(x, lst=[]):
    lst.append(x)
    return lst

print(append_item(1))  # [1]
print(append_item(2))  # [1, 2]  <-- überrascht!`;

  goodCode = `def append_item(x, lst=None):
    if lst is None:
        lst = []
    lst.append(x)
    return lst

print(append_item(1))  # [1]
print(append_item(2))  # [2]`;

  constructor() {}
}
