import { Routes } from '@angular/router';
import { GalleryComponent } from '../components/gallery/gallery.component';
import { AppComponent } from './app.component';
import { QuizComponent } from '../components/quiz/quiz.component';
import { FavoritesComponent } from '../components/favorites/favorites.component';

export const routes: Routes = [
    { path: '', component: AppComponent },
    { path: 'gallery', component: GalleryComponent },
    { path: 'quiz', component: QuizComponent },
    { path: 'favorites', component: FavoritesComponent }
];
