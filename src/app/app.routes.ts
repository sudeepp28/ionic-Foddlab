import { Routes } from '@angular/router';

export const routes: Routes = [
 
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full',
  },
  {
    path: 'tabs',
    loadComponent: () => import('./pages/tabs/tabs.page').then( m => m.TabsPage),
    children:[{
      path:'',
      redirectTo:'/tabs/home',
      pathMatch:"full"
    },
      {
    path: 'home',
    loadComponent: () => import('./pages/tabs/home/home.page').then( m => m.HomePage)
  },
  {
    path: 'accounts',
    loadComponent: () => import('./pages/tabs/accounts/accounts.page').then( m => m.AccountsPage)
  },
   {
    path: 'explore',
    loadComponent: () => import('./pages/tabs/explore/explore.page').then( m => m.ExplorePage)
  },
  {
    path: 'wishlist',
    loadComponent: () => import('./pages/tabs/wishlist/wishlist.page').then( m => m.WishlistPage)
  }, {
    path: 'orders',
    loadComponent: () => import('./pages/tabs/orders/orders.page').then( m => m.OrdersPage)
  },
  
  
    ]
  },
 
  {
    path: 'dishes/:id',
    loadComponent: () => import('./pages/dishes/dishes.page').then( m => m.DishesPage)
  },
  {
    path: 'cart',
    loadComponent: () => import('./pages/cart/cart.page').then( m => m.CartPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/tabs/accounts/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/tabs/accounts/register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.page').then( m => m.ProfilePage)
  },
  {
    path: 'settings',
    loadComponent: () => import('./pages/settings/settings.page').then( m => m.SettingsPage)
  },
 
 
  
 
  
 
];
