import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Navbar } from './components/navbar/navbar';
import { Sidebar } from './components/sidebar/sidebar';

import { provideHttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Navbar,
    Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('onf-frontend');
}

