import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { FormsModule } from "@angular/forms";
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { ToastrModule } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './Commom/confirmation-dialog/confirmation-dialog.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NetworkInterceptor } from './network.interceptor';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ChatComponent } from './chat/chat.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ProfileComponent } from './profile/profile.component';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    SignupComponent,
    ConfirmationDialogComponent,
    ChatComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatSlideToggleModule,
    FormsModule,
    MatTooltipModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
    provideFirestore(() => getFirestore()),
    ToastrModule.forRoot({
      progressBar:true,
      progressAnimation: 'increasing',
      tapToDismiss: true,
      timeOut:3000,
      positionClass: 'toast-top-center',
    }),
    MatDialogModule,
    HttpClientModule,
    MatProgressBarModule,
    MatAutocompleteModule,
    MatMenuModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: NetworkInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
