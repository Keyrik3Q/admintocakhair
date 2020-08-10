import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';  
import { RouterModule } from '@angular/router';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { LoginCookie } from '../common/core/login-cookie'; 
import { AuthGuard } from '../common/_helpers/auth.guard';
import { ApiService } from '../common/api-service/api.service';

@NgModule({
    declarations: [
        HomePageComponent,   
    ],
    imports: [
        TransferHttpCacheModule,
        CommonModule,
        RouterModule.forChild([
            {
                path: '', component: HomePageComponent, children: [
                    {
                        path: '',
                        loadChildren: () => import('./menu/menu.module').then(m => m.MenuModule),
                        canActivate: [AuthGuard],
                        // data: { roles: ['admin','staff']}
                    },                    
                ],
            }
        ]), 

    ],
    providers: [LoginCookie, ApiService]
})
export class HomePageModule { }
