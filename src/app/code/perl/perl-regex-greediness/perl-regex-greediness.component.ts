import { Component } from '@angular/core';
import { Highlight } from 'ngx-highlightjs';
import { HeadlineComponent } from '../../../headline/headline.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-perl-regex-greediness',
  templateUrl: './perl-regex-greediness.component.html',
  imports: [Highlight, HeadlineComponent, TranslateModule],
})
export class PerlRegexGreedinessComponent {
  codeGreedy = `my $s = 'a123b456c';
$s =~ /a(.*)b/;      # greedy: $1 = '123b456'
print $1, "\n";`;

  codeLazy = `my $s = 'a123b456c';
$s =~ /a(.*?)b/;    # non-greedy (lazy): $1 = '123'
print $1, "\n";`;

  constructor() {}
}
