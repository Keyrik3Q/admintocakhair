// import { Component, OnInit } from '@angular/core';
// import { Router, ActivatedRoute } from '@angular/router';
// import { ApiService } from '../common/api-service/api.service';
// import { AuthenticationService } from '../common/_services';
// import { Md5 } from 'ts-md5';

// @Component({
//     selector: 'app-login-staff',
//     templateUrl: './login-staff.component.html',
//     styleUrls: ['./login-staff.component.scss']
// })
// export class LoginStaffComponent implements OnInit {

//     // model
//     username: string;
//     password: string;
//     typeLogin: string = '0';

//     constructor(private router: Router,
//         private api: ApiService,
//         private authenticationService: AuthenticationService
//     ) { }

//     ngOnInit() {
//         // clear all cookie
//         this.api.cookie.clearAll();
//     }

//     /**
//      * on Enter press
//      * @param e 
//      */
//     onEnter(e) {
//         if (e.keyCode == 13) {
//             this.onLoginClick();
//         }
//     }

//     /**
//      * 
//      */
//     onLoginClick() {
//         // clear all cookie
//         this.api.cookie.clearAll();

//         // mã hóa password
//         let md5 = new Md5();
//         md5.appendStr(this.password);

//         // staff login / username is email
//         const param = { 'email': this.username, 'password': md5.end() };
//         this.api.excuteAllByWhat(param, "47").subscribe(data => {
//             if (data.length > 0) {
//                 // save data to cookie
//                 localStorage.setItem('isUserLogin', '0');
//                 localStorage.setItem('isStaffLogin', '1');
//                 localStorage.setItem('staff', JSON.stringify(data[0]));
//                 localStorage.setItem('currentUser', JSON.stringify(data[0]));

//                 // save permission
//                 localStorage.setItem('permission',JSON.stringify(data[0].permission));

//                 // store user details and jwt token in local storage to keep user logged in between page refreshes
//                 this.authenticationService.currentUserSubject.next(data[0]);

//                 this.api.showSuccess('Login success');
//                 setTimeout(() => {
//                     this.router.navigate(['/b1-manager-user']);
//                 }, 500);
//             } else {
//                 this.api.showError('Username or Password invalid');
//             }
//         });
//     }

//     /**
//      * on Foget Password Click
//      */
//     onFogetPasswordClick() {

//     }

// }
