import { Routes } from '@angular/router';
import { GalleryComponent } from '../components/gallery/gallery.component';
import { QuizComponent } from '../components/quiz/quiz.component';
import { FavoritesComponent } from '../components/favorites/favorites.component';
import { HomeComponent } from '../components/home/home.component';
// import { UsernameInputComponent } from '../components/username-input/username-input.component';
import { AuthGuard } from '../services/auth.guard';
import { ForumComponent } from '../components/forum/forum.component';
import { GeneralForumComponent } from '../components/discussions/general/general.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';


export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: '', component: HomeComponent },
    { path: 'gallery', component: GalleryComponent, canActivate: [AuthGuard] },
    { path: 'quiz', component: QuizComponent, canActivate: [AuthGuard] },
    { path: 'favorites', component: FavoritesComponent, canActivate: [AuthGuard] },
    { path: 'forum', component: ForumComponent, canActivate: [AuthGuard] },
    { path: 'discussion/general', component: GeneralForumComponent, canActivate: [AuthGuard] },
    // { path: 'enter-username', component: UsernameInputComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

];
