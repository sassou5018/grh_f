import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutModule } from './layout/app.layout.module';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { RefreshInterceptor } from './interceptors/refresh.interceptor';
import { AuthService, authFactory } from './services/authservice/auth.service';
import { CollabformComponent } from './components/collabform/collabform.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputMaskModule } from 'primeng/inputmask';
import { CalendarModule } from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarModule } from 'primeng/sidebar';
import { BadgeModule } from 'primeng/badge';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RippleModule } from 'primeng/ripple';
import { RouterModule } from '@angular/router';
import { AppConfigModule } from './layout/config/config.module';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { AvatarModule } from 'primeng/avatar';
import { ChipModule } from 'primeng/chip';
import { ButtonModule } from 'primeng/button';
import {MultiSelectModule} from 'primeng/multiselect';
import { CheckboxModule } from 'primeng/checkbox';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FileUploadModule } from 'primeng/fileupload';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { TableComponent } from './components/dashboard/table/table.component';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { FilesDialogComponent } from './components/dashboard/files-dialog/files-dialog.component';
import {TooltipModule} from 'primeng/tooltip';
import { ConsultComponent } from './components/dashboard/consult/consult.component';
import { AvantagestableComponent } from './components/dashboard/consult/avantagestable/avantagestable.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { UpdateDialogComponent } from './components/dashboard/update-dialog/update-dialog.component';
import { UpdateComponent } from './components/dashboard/update/update.component';
import { StatsComponent } from './components/dashboard/stats/stats.component';
import { ChartModule } from 'primeng/chart';
@NgModule({
  declarations: [
    AppComponent,
    CollabformComponent,
    DashboardComponent,
    TableComponent,
    FilesDialogComponent,
    ConsultComponent,
    AvantagestableComponent,
    UpdateDialogComponent,
    UpdateComponent,
    StatsComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    DropdownModule,
    FormsModule,
    InputTextModule,
    InputTextareaModule,
    InputMaskModule,
    CalendarModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,

    SidebarModule,
    BadgeModule,
    RadioButtonModule,
    InputSwitchModule,
    RippleModule,
    RouterModule,
    AppConfigModule,
    OverlayPanelModule,
    AvatarModule,
    ChipModule,
    ButtonModule,
    MultiSelectModule,
    CheckboxModule,
    AutoCompleteModule,
    FileUploadModule,
    ProgressBarModule,
    ToastModule,
    TableModule,
    DynamicDialogModule,
    TooltipModule,
    BreadcrumbModule,
    ConfirmDialogModule,
    ChartModule,

    
  ],
  providers: [
    // { provide: APP_INITIALIZER, useFactory: authFactory, multi: true, deps: [AuthService] },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: RefreshInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
