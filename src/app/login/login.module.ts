import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { ApiService } from '../common/api-service/api.service';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginCookie } from '../common/core/login-cookie';
import { MatSelectModule } from '@angular/material/select';
// import { AuthenticationService } from '../common/_services';

@NgModule({
    declarations: [LoginComponent],
    imports: [
        TransferHttpCacheModule,
        CommonModule,
        RouterModule.forChild([
            {
                path: '', component: LoginComponent
            }
        ]),
        FormsModule,
        ReactiveFormsModule,

        MatSelectModule,

    ],
    providers: [
        // AuthenticationService,
        ApiService,
        LoginCookie
    ],
})
export class LoginModule { }
