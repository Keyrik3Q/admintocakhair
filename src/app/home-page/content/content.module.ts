
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ContentComponent } from "./content.component";
import { RouterModule } from "@angular/router";
import { TransferHttpCacheModule } from "@nguniversal/common";
import { ApiService } from "../../common/api-service/api.service";

@NgModule({
    declarations: [ContentComponent],
    imports: [
        TransferHttpCacheModule,
        CommonModule,
        RouterModule.forChild([
            {
                // ng g module home-page/content/sellTicket --module content
                // ng g c home-page/content/sellTicket

                path: "",
                component: ContentComponent,
                children: [
                    {
                        path: 'booking',
                        loadChildren: () => import('./booking/booking.module').then(m => m.BookingModule),
                    },
                    {
                        path: 'branch',
                        loadChildren: () =>
                            import('./branch/branch.module').then(
                                m => m.BranchModule
                            )
                    },
                    {
                        path: 'comment',
                        loadChildren: () =>
                            import('./comment/comment.module').then(
                                m => m.CommentModule
                            )
                    },
                    {
                        path: 'employee',
                        loadChildren: () =>
                            import('./employee/employee.module').then(
                                m => m.EmployeeModule
                            )
                    },
                    {
                        path: 'invite',
                        loadChildren: () =>
                            import('./invite/invite.module').then(
                                m => m.InviteModule
                            )
                    },
                    {
                        path: 'message',
                        loadChildren: () =>
                            import('./message/message.module').then(
                                m => m.MessageModule
                            )
                    },
                    {
                        path: 'notificate',
                        loadChildren: () =>
                            import('./notificate/notificate.module').then(
                                m => m.NotificateModule
                            )
                    },
                    {
                        path: 'orders',
                        loadChildren: () =>
                            import('./orders/orders.module').then(
                                m => m.OrdersModule
                            )
                    },
                    {
                        path: 'product',
                        loadChildren: () =>
                            import('./product/product.module').then(
                                m => m.ProductModule
                            )
                    },
                    {
                        path: 'service',
                        loadChildren: () =>
                            import('./service/service.module').then(
                                m => m.ServiceModule
                            )
                    },
                    {
                        path: 'shift',
                        loadChildren: () =>
                            import('./shift/shift.module').then(
                                m => m.ShiftModule
                            )
                    },
                    {
                        path: 'timetable',
                        loadChildren: () =>
                            import('./timetable/timetable.module').then(
                                m => m.TimetableModule
                            )
                    },
                    {
                        path: 'user',
                        loadChildren: () =>
                            import('./user/user.module').then(
                                m => m.UserModule
                            )
                    },
                    {
                        path: 'timekeeping',
                        loadChildren: () =>
                            import('./timekeeping/timekeeping.module').then(
                                m => m.TimekeepingModule
                            )
                    },
                ],
            },
        ]),
    ],
    providers: [ApiService],
    entryComponents: [],
})
export class ContentModule { }

