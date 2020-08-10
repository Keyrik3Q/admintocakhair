// import { Component, OnInit } from '@angular/core';
// import { Router, ActivatedRoute } from '@angular/router';
// import { ApiService } from '../common/api-service/api.service';
// import { User } from '../common/_models/10user.models';

// @Component({
//     selector: 'app-verifier',
//     templateUrl: './verifier.component.html',
//     styleUrls: ['./verifier.component.scss']
// })
// export class VerifierComponent implements OnInit {
//     user: User;
//     repassword: string;

//     constructor(private router: Router,
//         private api: ApiService,
//         private activatedRoute: ActivatedRoute
//     ) { }

//     /**
//      * ng On Init
//      */
//     ngOnInit() {
//         // clear all cookie
//         this.api.cookie.clearAll();

//         let params = this.activatedRoute.snapshot.params;

//         this.user = {
//             idstaff: params.idstaff != 'undefined' ? params.idstaff : '',
//             username: decodeURI(params.username),
//             password: params.password,
//             address: '',
//             phone: params.phone,
//             born: '',
//             email: params.email,
//         };

//         console.log('veriferLink', this.user);

//         // check user exists
//         this.api.excuteAllByWhat({ username: this.user.username }, '15').subscribe(data => {
//             if (data.length > 0) {
//                 this.api.showWarning('Link error please check again');
//                 this.router.navigate(['/login']);
//             } else {
//                 this.api.excuteAllByWhat(this.user, '11').subscribe(data => {
//                     // verifier account for user success
//                     this.sentMailForUser();

//                     this.api.showWarning('Verifer Success Please login to use');
//                     this.router.navigate(['/login']);
//                 })
//             }
//         });
//     }

//     /**
//      * sent Mail to user
//      */
//     sentMailForUser() {
//         const from = 'support@ttfxprime.com';
//         const to = this.user.email;
//         let subject = 'Request Approved Successfully';
//         let message = `
//             <p>Hi `+ this.user.username + `</p> 
//             <p>A New Acount has been Registered Details</p>
//             <p>Name: `+ this.user.username + `<br /> Email: ` + this.user.email + `</p>
//             <p><strong>Acount</strong> Approved Successfully</p>
//             <p>Thanks.</p>
//             <p><strong>----</strong></p>
//             <img style="width: 200px; height: 80px" src="http://ttfxprime.com/logo.PNG">
//             <p><strong>Department Support </strong></p>
//             <p>TTFX Prime Trading International Ltd</p> 
//             <p>E: <a href="mailto:support@ttfxprime.com">support@ttfxprime.com</a>&nbsp; | &nbsp;W: TTFXPrime.com &nbsp;&nbsp;|&nbsp; T: +12 845-892&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
//         `;
//         this.api.sentMail(from, to, subject, message).subscribe(data => { });
//     }

// }
