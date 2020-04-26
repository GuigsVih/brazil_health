import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { AuthComponent } from './pages/auth/auth.component';
import { metaReducers, reducers } from './reducers';
import { authReducer } from './reducers/auth.reducers';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './effects/auth.effects';
import { AuthGuard } from './guards/auth.guard';
import { AuthInterceptor } from './helpers/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    AuthComponent
  ],
  entryComponents: [],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forRoot([AuthEffects]),
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'en' },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
