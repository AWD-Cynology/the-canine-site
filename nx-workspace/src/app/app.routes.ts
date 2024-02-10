import { Routes } from '@angular/router';
import { GalleryComponent } from '../components/gallery/gallery.component';
import { QuizComponent } from '../components/quiz/quiz.component';
import { FavoritesComponent } from '../components/favorites/favorites.component';
import { HomeComponent } from '../components/home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'gallery', component: GalleryComponent },
    { path: 'quiz', component: QuizComponent },
    { path: 'favorites', component: FavoritesComponent }
];
