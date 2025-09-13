import { Component } from '@angular/core';
import { Highlight } from 'ngx-highlightjs';
import { HeadlineComponent } from '../../../headline/headline.component';

@Component({
  selector: 'app-python-gil-threads',
  templateUrl: './python-gil-threads.component.html',
  imports: [Highlight, HeadlineComponent],
})
export class PythonGilThreadsComponent {
  codeThreads = `# CPU-bound: Threads bringen wegen des GILs oft wenig
import threading

def cpu_task(n):
    s = 0
    for i in range(n):
        s += i*i
    return s

threads = [threading.Thread(target=cpu_task, args=(10_000_000,)) for _ in range(4)]
for t in threads: t.start()
for t in threads: t.join()`;

  codeProcesses = `# Lösung: Multiprocessing umgeht das GIL für CPU-bound Workloads
from multiprocessing import Process

def cpu_task(n):
    s = 0
    for i in range(n):
        s += i*i
    return s

procs = [Process(target=cpu_task, args=(10_000_000,)) for _ in range(4)]
for p in procs: p.start()
for p in procs: p.join()`;

  constructor() {}
}
