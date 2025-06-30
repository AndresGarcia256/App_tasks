import {Routes} from '@angular/router';
export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./shared/components/layout/layout.js').then(m => m.Layout),
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./business/dashboard/dashboard.js').then(m => m.Dashboard)
            },
            {
                path: 'profile',
                loadComponent: () => import('./business/profile/profile.js').then(m => m.Profile)
            },
            {
                path: 'tables',
                loadComponent: () => import('./business/tables/tables.js').then(m => m.Tables)
            },
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: 'login',
        loadComponent: () => import('./auth/login/login.js').then(m => m.Login),
        
    },
        {
        path: 'register',
        loadComponent: () => import('./auth/register/register.js').then(m => m.Register),
        
    },
    {
        path: '**',
        redirectTo: 'dashboard'
    }

    
];