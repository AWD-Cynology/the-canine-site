import { Routes } from '@angular/router';
import { GalleryComponent } from '../components/gallery/gallery.component';
import { QuizComponent } from '../components/quiz/quiz.component';
import { FavoritesComponent } from '../components/favorites/favorites.component';
import { HomeComponent } from '../components/home/home.component';
import { AuthGuard } from '../services/auth.guard';
import { ForumComponent } from '../components/forum/forum.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: '', component: HomeComponent },
    { path: 'gallery', component: GalleryComponent, canActivate: [AuthGuard] },
    { path: 'quiz', component: QuizComponent, canActivate: [AuthGuard] },
    { path: 'favorites', component: FavoritesComponent, canActivate: [AuthGuard] },
    { path: 'forum', component: ForumComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
];
