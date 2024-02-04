import { Routes } from '@angular/router';
import { GalleryComponent } from '../components/gallery/gallery.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    { path: '', component: AppComponent },
    { path: 'gallery', component: GalleryComponent },
];
