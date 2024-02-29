import { Routes } from '@angular/router';
import { GalleryComponent } from '../components/gallery/gallery.component';
import { QuizComponent } from '../components/quiz/quiz.component';
import { FavoritesComponent } from '../components/favorites/favorites.component';
import { HomeComponent } from '../components/home/home.component';
import { UsernameInputComponent } from '../components/username-input/username-input.component';
import { AuthGuard } from '../services/auth.guard';
import { ForumComponent } from '../components/forum/forum.component';


export const routes: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'gallery', component: GalleryComponent, canActivate: [AuthGuard] },
    { path: 'quiz', component: QuizComponent, canActivate: [AuthGuard] },
    { path: 'favorites', component: FavoritesComponent, canActivate: [AuthGuard] },
    { path: 'forum', component: ForumComponent, canActivate: [AuthGuard] },
    { path: 'enter-username', component: UsernameInputComponent },

];
