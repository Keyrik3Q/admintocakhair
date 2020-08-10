import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

// import { AuthenticationService } from 'src/app/common/_services';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginCookie } from 'src/app/common/core/login-cookie';
import { ApiService } from 'src/app/common/api-service/api.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

    sysmemberid:number;
    menuFlag: boolean = false;
    menuMobileFlag: boolean = false;
    settingButton: boolean = false;
    searchFlag: boolean = false;
    isMobile: boolean = false;
    today: Date = new Date();
    employee: any;

    subscription: Subscription[] = [];

    // model permission
    booking: boolean = false;
    branch: boolean = false;
    comment: boolean = false;
    employee1: boolean = false;
    invite: boolean = false;
    message: boolean = false;
    notificate: boolean = false;
    orders: boolean = false;
    product: boolean = false;
    service: boolean = false;
    shift: boolean = false;
    timetable: boolean = false;
    user: boolean = false;
    timekeeping: boolean = false;

    constructor(private login: LoginCookie,
        public api: ApiService,
        // private authenticationService: AuthenticationService,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.employee = this.api.sysmemberSubject.value;
        this.sysmemberid =  this.api.getSysMemberValue.id;
        this.isMobile = this.isMobileDevice();
            const param = {
                'id':this.sysmemberid,
            }
            this.subscription.push(this.api.excuteAllByWhat(param, '408').subscribe(data => {

                // load current permission
                if (data[0].role.search('0') >= 0) {
                    this.booking = true;
                    this.branch = true;
                    this.comment = true;
                    this.employee1 = true;
                    this.invite = true;
                    this.message = true;
                    this.notificate = true;
                    this.orders = true;
                    this.product = true;
                    this.service = true;
                    this.shift = true;
                    this.timetable = true;
                    this.user = true;
                    this.timekeeping = true;
                }
                if (data[0].role.search('1') >= 0){
                    this.booking = true;
                    this.branch = true;
                    this.comment = true;
                    this.employee1 = true;
                    this.invite = true;
                  
                    
                }
            }
        ));
    }

    isMobileDevice() {
        return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
    };

    /**
     * on Request To Be A Partner Click
     */
    // onRequestToBeAPartnerClick() {
    //     this.sentMailForUser();

    //     this.api.showSuccess('Request to be a partner of you being processing, please wait reponse');
    // }

    /**
    * sent Mail to user
    */
    // sentMailForUser() {
    //     const from = 'no-reply@ttfxprime.com';
    //     const to = 'support@ttfxprime.com';
    //     let subject = 'Request to be a Partner';
    //     let message = ` 
    //         <p>Hi Admin,</p>
    //         <p>Have one user request to be a Partner please check:</p>
    //         <p>Email: `+ this.api.user.email + `</p>  
    //         <p>Username: `+ this.api.user.username + `</p>  
    //         <p>Phone: `+ this.api.user.phone + `</p>  
    //         <p>Born: `+ this.api.user.born + `</p>  
    //         <p>Address: `+ this.api.user.address + `</p>   
    //         <p>CMND: `+ this.api.user.link + `</p>   
    //         <p>Thanks.</p> 
    //         <p><strong>----</strong></p>
    //         <img style="width: 200px; height: 80px" src="http://ttfxprime.com/logo.PNG">
    //         <p><strong>Department Support </strong></p>
    //         <p>TTFX Prime Trading International Ltd</p> 
    //         <p>E: <a href="mailto:support@ttfxprime.com">support@ttfxprime.com</a>&nbsp; | &nbsp;W: TTFXPrime.com &nbsp;&nbsp;|&nbsp; T: +12 845-892&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
    //     `;
    //     this.api.sentMail(from, to, subject, message).subscribe(data => { });
    // }

    /**
     * onLogoutClick
     */
    onLogoutClick() {
        // this.authenticationService.logout();
        // this.router.navigate(['/login']);
    }

    /**
     * onLogoutClick
     */
    onLogoutStaffClick() {
        // this.authenticationService.logout();
        // this.router.navigate(['/login-staff']);
    }

    //log out SysMember
    logOutSysMember() {
        this.api.logoutSysMember();
    }
}
