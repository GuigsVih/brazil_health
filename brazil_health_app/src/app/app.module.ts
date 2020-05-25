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
import { HomeComponent } from './pages/home/home.component';
import { PacientDatasComponent } from './pages/pacient-datas/pacient-datas.component';
import { RegisterComponent } from './pages/register/register.component';
import { NativePageTransitions } from '@ionic-native/native-page-transitions/ngx';
import { SocialLoginModule, AuthServiceConfig, FacebookLoginProvider } from 'angularx-social-login';
import { SearchComponent } from './pages/search/search.component';
import { registerLocaleData } from '@angular/common';
import localeBr from '@angular/common/locales/pt';
import localeBrExtra from '@angular/common/locales/extra/pt';
import { NgxMaskModule } from 'ngx-mask'


registerLocaleData(localeBr, 'br', localeBrExtra);

const config = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("566846387561882"),
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    AuthComponent,
    HomeComponent,
    PacientDatasComponent,
    RegisterComponent,
    SearchComponent
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
    SocialLoginModule,
    AppRoutingModule,
    NgxMaskModule.forRoot({})
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthGuard,
    NativePageTransitions,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'en' },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: AuthServiceConfig, useFactory: provideConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
