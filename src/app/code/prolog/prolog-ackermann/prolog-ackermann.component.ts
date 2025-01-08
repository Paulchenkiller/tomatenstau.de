import { Component, OnInit } from '@angular/core';
import { Highlight } from 'ngx-highlightjs';
import { HeadlineComponent } from '../../../headline/headline.component';

@Component({
  selector: 'app-prolog-ackermann',
  templateUrl: './prolog-ackermann.component.html',
  styleUrls: ['./prolog-ackermann.component.css'],
  imports: [Highlight, HeadlineComponent],
})
export class PrologAckermannComponent implements OnInit {
  code1 = `f(n', x', y') = f(n, f(n', x, y), x)`;
  code2 = `a(0,m) = m + 1\na(n,0) = a(n - 1, 1)\na(n,m) = a(n - 1, a(n, m - 1))`;
  code3 = `% Basisfall
ackermann(0,Int,Ergebnis) :-
    Ergebnis is Int+1.
% Erste Rekursionsfall
ackermann(Int, 0, Ergebnis) :-
    % nur positive Zahlen erlaubt
    Int>0,
    % siehe Funktionsvorschrift
    IntM1 is Int-1,
    ackermann(IntM1, 1, Ergebnis).
ackermann(Int1, Int2, Ergebnis) :-
    Int1>0,
    Int2>0,
    % siehe Funktionsvorschrift
    Int1M1 is Int1-1,
    Int2M1 is Int2-1,
    % da keine "nested" Aufrufe möglich, erst das gekapselte damit es
    % unifiziert werden kann und dann entsprechend den anderen Aufruf
    ackermann(Int1, Int2M1, Zwischenergebnis),
    ackermann(Int1M1, Zwischenergebnis, Ergebnis).`;
  code4 = `ackermann(4,3,L).`;
  code5 = `ERROR: Stack limit (1.0Gb) exceeded
ERROR:   Stack sizes: local: 0.9Gb, global: 79.7Mb, trail: 26.6Mb
ERROR:   Stack depth: 2,685, last-call: 0%, Choice points: 3,485,825
ERROR:   In:
ERROR:     [2,685] user:ackermann(0, 827, _20894784)
ERROR:     [2,684] user:ackermann(1, 826, _20894806)
ERROR:     [2,683] user:ackermann(1, 827, _20894828)
ERROR:     [2,682] user:ackermann(1, 828, _20894850)
ERROR:     [2,681] user:ackermann(1, 829, _20894872)
ERROR:
ERROR: Use the --stack_limit=size[KMG] command line option or
ERROR: ?- set_prolog_flag(stack_limit, 2_147_483_648). to double the limit.`;
  code6 = `ackermann(3,4,L).\nL = 125`;
  emptyLanguages = [];

  constructor() {
    // do nothing
  }

  ngOnInit(): void {}
}
