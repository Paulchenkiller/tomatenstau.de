import { Routes } from '@angular/router';

export const CODE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./code.component').then((m) => m.CodeComponent),
  },
  {
    path: 'perl',
    data: { breadcrumb: 'Perl', logo: 'keyboard' },
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./perl/perl-index/perl-index.component').then((m) => m.PerlIndexComponent),
      },
      {
        path: 'regex-greediness',
        data: { breadcrumb: 'Regex Greedy/Lazy', logo: 'arrows-left-right' },
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./perl/perl-regex-greediness/perl-regex-greediness.component').then(
                (m) => m.PerlRegexGreedinessComponent,
              ),
          },
        ],
      },
      {
        path: 'context',
        data: { breadcrumb: 'Kontext', logo: 'list' },
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./perl/perl-context/perl-context.component').then(
                (m) => m.PerlContextComponent,
              ),
          },
        ],
      },
    ],
  },
  {
    path: 'python',
    data: { breadcrumb: 'Python', logo: ['fab', 'python'] },
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./python/python-index/python-index.component').then(
            (m) => m.PythonIndexComponent,
          ),
      },
      {
        path: 'mutable-default',
        data: { breadcrumb: 'Mutable Default', logo: 'exclamation' },
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./python/python-mutable-default/python-mutable-default.component').then(
                (m) => m.PythonMutableDefaultComponent,
              ),
          },
        ],
      },
      {
        path: 'gil-threads',
        data: { breadcrumb: 'GIL & Threads', logo: 'spinner' },
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./python/python-gil-threads/python-gil-threads.component').then(
                (m) => m.PythonGilThreadsComponent,
              ),
          },
        ],
      },
    ],
  },
  {
    path: 'java',
    data: { breadcrumb: 'Java', logo: 'mug-hot' },
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./java/java-index/java-index.component').then((m) => m.JavaIndexComponent),
      },
      {
        path: 'equals-hashcode',
        data: { breadcrumb: 'equals & hashCode', logo: 'equals' },
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./java/java-equals-hashcode/java-equals-hashcode.component').then(
                (m) => m.JavaEqualsHashcodeComponent,
              ),
          },
        ],
      },
      {
        path: 'concurrent-modification',
        data: { breadcrumb: 'ConcurrentModification', logo: 'code-branch' },
        children: [
          {
            path: '',
            loadComponent: () =>
              import(
                './java/java-concurrent-modification/java-concurrent-modification.component'
              ).then((m) => m.JavaConcurrentModificationComponent),
          },
        ],
      },
    ],
  },
  {
    path: 'javascript',
    data: { breadcrumb: 'JavaScript/TypeScript', logo: 'code' },
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./javascript/javascript-index/javascript-index.component').then(
            (m) => m.JavascriptIndexComponent,
          ),
      },
      {
        path: 'closures-scope',
        data: { breadcrumb: 'Closures & Scope', logo: 'code' },
        children: [
          {
            path: '',
            loadComponent: () =>
              import(
                './javascript/javascript-closures-scope/javascript-closures-scope.component'
              ).then((m) => m.JavascriptClosuresScopeComponent),
          },
        ],
      },
      {
        path: 'hoisting-tdz',
        data: { breadcrumb: 'Hoisting & TDZ', logo: 'code' },
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./javascript/javascript-hoisting-tdz/javascript-hoisting-tdz.component').then(
                (m) => m.JavascriptHoistingTdzComponent,
              ),
          },
        ],
      },
      {
        path: 'async-await',
        data: { breadcrumb: 'async/await', logo: 'code' },
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./javascript/javascript-async-await/javascript-async-await.component').then(
                (m) => m.JavascriptAsyncAwaitComponent,
              ),
          },
        ],
      },
      {
        path: 'this-arrow',
        data: { breadcrumb: 'this & Arrow', logo: 'code' },
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./javascript/javascript-this-arrow/javascript-this-arrow.component').then(
                (m) => m.JavascriptThisArrowComponent,
              ),
          },
        ],
      },
      {
        path: 'ts-structural-typing',
        data: { breadcrumb: 'TS Structural Typing', logo: 'code' },
        children: [
          {
            path: '',
            loadComponent: () =>
              import(
                './javascript/typescript-structural-typing/typescript-structural-typing.component'
              ).then((m) => m.TypescriptStructuralTypingComponent),
          },
        ],
      },
    ],
  },
  {
    path: 'haskell',
    data: { breadcrumb: 'Haskell', logo: 'code' },
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./haskell/haskell-index/haskell-index.component').then(
            (m) => m.HaskellIndexComponent,
          ),
      },
      {
        path: 'purity-io',
        data: { breadcrumb: 'Purity & IO', logo: 'code' },
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./haskell/haskell-purity-io/haskell-purity-io.component').then(
                (m) => m.HaskellPurityIoComponent,
              ),
          },
        ],
      },
      {
        path: 'lazy-evaluation',
        data: { breadcrumb: 'Lazy Evaluation', logo: 'code' },
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./haskell/haskell-lazy-evaluation/haskell-lazy-evaluation.component').then(
                (m) => m.HaskellLazyEvaluationComponent,
              ),
          },
        ],
      },
      {
        path: 'typeclasses',
        data: { breadcrumb: 'Typeclasses', logo: 'code' },
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./haskell/haskell-typeclasses/haskell-typeclasses.component').then(
                (m) => m.HaskellTypeclassesComponent,
              ),
          },
        ],
      },
      {
        path: 'monads',
        data: { breadcrumb: 'Monaden', logo: 'code' },
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./haskell/haskell-monads/haskell-monads.component').then(
                (m) => m.HaskellMonadsComponent,
              ),
          },
        ],
      },
      {
        path: 'pattern-matching',
        data: { breadcrumb: 'Pattern Matching', logo: 'code' },
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./haskell/haskell-pattern-matching/haskell-pattern-matching.component').then(
                (m) => m.HaskellPatternMatchingComponent,
              ),
          },
        ],
      },
    ],
  },
  {
    path: 'prolog',
    data: { breadcrumb: 'Prolog', logo: 'brain' },
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./prolog/prolog-index/prolog-index.component').then(
            (m) => m.PrologIndexComponent,
          ),
      },
      {
        path: 'ackermann',
        data: { breadcrumb: 'Ackermann', logo: 'superscript' },
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./prolog/prolog-ackermann/prolog-ackermann.component').then(
                (m) => m.PrologAckermannComponent,
              ),
          },
        ],
      },
      {
        path: 'hanoi',
        data: { breadcrumb: 'Hanoi', logo: 'gopuram' },
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./prolog/prolog-hanoi/prolog-hanoi.component').then(
                (m) => m.PrologHanoiComponent,
              ),
          },
        ],
      },
    ],
  },
];
