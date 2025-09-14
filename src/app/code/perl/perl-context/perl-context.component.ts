import { Component } from '@angular/core';
import { Highlight } from 'ngx-highlightjs';
import { HeadlineComponent } from '../../../headline/headline.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-perl-context',
  templateUrl: './perl-context.component.html',
  imports: [Highlight, HeadlineComponent, TranslateModule],
})
export class PerlContextComponent {
  codeListVsScalar = `my $text = 'foo 42 bar 7 baz';
my @matches = ($text =~ /(\d+)/g);   # List-Kontext: @matches = (42, 7)
my $count   = () = ($text =~ /(\d+)/g); # Skalar-Kontext-Trick: Anzahl = 2
print scalar(@matches), " Treffer\n"; # 2
print $count, " Treffer\n";          # 2`;

  codeWantarray = `sub f {
  return wantarray ? (1,2,3) : 3; # gibt in List-Kontext 1,2,3 zurück, sonst 3
}
my @l = f();      # (1,2,3)
my $s = f();      # 3`;

  constructor() {}
}
