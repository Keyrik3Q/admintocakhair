import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// import { AuthenticationService } from '../common/_services';
import { Md5 } from 'ts-md5';
import { ApiService } from '../common/api-service/api.service';
import { Employee } from '../common/_models/40employee.models';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    model
    username: string;
    password: any;
    typeLogin: string = '0';

    constructor(private router: Router,
        private api: ApiService,
        // private authenticationService: AuthenticationService
    ) { 
    }

    input: Employee;

    //data password
    passwordOld: string;
    passwordMd5: string='';

    ngOnInit() {
        // clear all cookie
        // this.api.cookie.clearAll();
        localStorage.removeItem('sysmemberSubject');
        this.input = {
            phone: "",
            password: "",
        };
    }

    /**
   * onChangePasswordMD5
   */
    onChangePasswordMD5() {
        this.passwordMd5 = Md5.hashStr(this.passwordOld).toString()
    }


    onLoginClick() {
        this.onChangePasswordMD5();
        this.input.password = this.passwordMd5;
        this.api.excuteAllByWhat(this.input, "407").subscribe((data) => {
            if (data.length > 0) {
                localStorage.setItem('sysmemberSubject', JSON.stringify(data[0]));
                this.api.sysmemberSubject.next(data[0]);

                this.api.showSuccess("Đăng Nhập Thành Công ");
                this.router.navigate(['/manager']);
                // setTimeout(() => {
                //     window.location.reload();
                // }, 1000);
            } else {
                this.api.showError("Username hoặc Password đã sai");
            }
        });
    }

    // /**
    //  * on Enter press
    //  * @param e 
    //  */
    onEnter(e) {
        if (e.keyCode == 13) {
            // this.onLoginClick();
        }
    }

    // /**
    //  * 
    //  */
    // onLoginClick() {
    //     // clear all cookie
    //     this.api.cookie.clearAll();

    //     if (this.username && this.password) {
    //         // mã hóa password
    //         let md5 = new Md5();
    //         md5.appendStr(this.password); 

    //         // username is email
    //         const param = { 'email': this.username, 'password': md5.end() };

    //         this.api.excuteAllByWhat(param, "17").subscribe(data => {
    //             if (data.length > 0) {
    //                 // save data to cookie
    //                 localStorage.setItem('isUserLogin', '1');
    //                 localStorage.setItem('isStaffLogin', '0');
    //                 localStorage.setItem('user', JSON.stringify(data[0]));
    //                 localStorage.setItem('currentUser', JSON.stringify(data[0]));

    //                 // store user details and jwt token in local storage to keep user logged in between page refreshes
    //                 this.authenticationService.currentUserSubject.next(data[0]);

    //                 this.api.showSuccess('Login success');
    //                 setTimeout(() => {
    //                     this.router.navigate(['/a1-user']);
    //                 }, 500);
    //             } else {
    //                 this.api.showError('Username or Password invalid');
    //             }
    //         });
    //     } else {
    //         this.api.showError('Please input full Username and Password!');
    //     } 
    // }

    // /**
    //  * on Foget Password Click
    //  */
    // onFogetPasswordClick() {

    // }

}
