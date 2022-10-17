import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from "@auth0/angular-jwt";
import { RecaptchaModule, RecaptchaSettings, RecaptchaV3Module, RECAPTCHA_SETTINGS, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { Auth0, environment} from '../environments/environment';
import { SearchFilterPipe } from '../app/_services/search-filter.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
// Import routing module
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
// Import app component
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { IconModule, IconSetService } from '@coreui/icons-angular';

import {
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
  PerfectScrollbarModule,
} from 'ngx-perfect-scrollbar';

// Import containers
import {
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
} from './containers';

import {
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  ModalModule,
  NavModule,
  ProgressModule,
  SharedModule,
  SidebarModule,
  TableModule,
  TabsModule,
  UtilitiesModule,
} from '@coreui/angular';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: false,
};

const APP_CONTAINERS = [
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
];

export function tokenGetter() { 
  return localStorage.getItem("jwt"); 
}

@NgModule({
  declarations: [AppComponent, SearchFilterPipe, ...APP_CONTAINERS],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    AvatarModule,
    BreadcrumbModule,
    FooterModule,
    DropdownModule,
    GridModule,
    HeaderModule,
    SidebarModule,
    IconModule,
    PerfectScrollbarModule,
    NavModule,
    ButtonModule,
    FormModule,
    UtilitiesModule,
    ButtonGroupModule,
    ReactiveFormsModule,
    SidebarModule,
    SharedModule,
    TabsModule,
    ListGroupModule,
    ProgressModule,
    BadgeModule,
    ListGroupModule,
    CardModule,
    MaterialModule,
    RecaptchaV3Module,
    RecaptchaModule,
    ModalModule,
    TableModule,
    NgxPaginationModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:44382"],
        disallowedRoutes: []
      }
    }),
    AuthModule.forRoot(Auth0)
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy, //(HashLocationStrategy) remove # from url
    },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: {
        siteKey: environment.siteKey
      }
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
    IconSetService,
    Title
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}