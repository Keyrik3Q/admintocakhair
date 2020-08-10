import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Security } from './security';
import { Router } from '@angular/router';
@Injectable()
export class ApiService {
    private url = "";
    private getAllWhatUrl = "";
    private getImageUrl = "";
    private audio = new Audio();
    protected se: Security = new Security();   
    public idCompany: any;

    // CONSTAINT URL
    SERVER_URL: string = "https://hoctienganhphanxa.com/hce/sunkun/src/Controller/Upload.php";
    FRONTEND_URL: string = "https://hoctienganhphanxa.com/hce/AKHair/src/Controller/SelectAllByWhat.php";
    BACKEND_URL: string = "https://hoctienganhphanxa.com/hce/AKHair/src/Controller/SelectAllByWhat.php";
    // SERVER_CV_URL: string = "https://hoctienganhphanxa.com/hoctienganhphanxa.com/hce/youngpinejobapi/Controller/UploadCV.php";

    // authorize
    // public staffSubject: BehaviorSubject<any>;
    // public companySubject: BehaviorSubject<any>;
    // public candidateSubject: BehaviorSubject<any>;
    // public currentStaff: Observable<any>;
    // public currentCompany: Observable<any>;
    // public currentCandidate: Observable<any>;

    // authrize
    public sysmemberSubject: BehaviorSubject<any>;

    public currentSysMember: Observable<any>;

    constructor(public httpClient: HttpClient,
        private toastrService: ToastrService,
        private router: Router
    ) {
        // this.staffSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('staffSubject')));
        // this.companySubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('companySubject')));
        // this.candidateSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('candidateSubject')));

        // this.currentStaff = this.staffSubject.asObservable();
        // this.currentCompany = this.companySubject.asObservable();
        // this.currentCandidate = this.candidateSubject.asObservable();

        this.sysmemberSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('sysmemberSubject')));

        this.currentSysMember = this.sysmemberSubject.asObservable();

        this.url = this.BACKEND_URL;
    }

    /**
     * 
     * @param param 
     * @param what 
     */
    excuteAllByWhat(param: any, what: string, frontend?: boolean): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };

        // set param
        param.what = what;

        // set url
        this.getAllWhatUrl = this.url;

        if (frontend) {
            this.getAllWhatUrl = this.FRONTEND_URL;
        }

        console.log('Param input', frontend);
        console.log('Param input', JSON.stringify(param));
        return this.httpClient.post<any>(this.getAllWhatUrl, JSON.stringify(param), httpOptions)
            .pipe(map((response: Response) => {
                return response;
            }));
    }

    /**
     * get Staff Value
     */
    // public get getStaffValue(): any {
    //     return this.staffSubject.value;
    // }

    /**
     * get company Value
     */
    // public get getCompanyValue(): any {
    //     return this.companySubject.value;
    // }

    // /**
    //  * get candidate Value
    //  */
    // public get getCandidateValue(): any {
    //     return this.candidateSubject.value;
    // }

    /**
     * logout Staff
     */
    // public logoutStaff() {
    //     localStorage.removeItem('staffSubject');
    //     this.router.navigate(['/login']);
    // }

    // /**
    //  * logout company
    //  */
    // public logoutCompany() {
    //     localStorage.removeItem('companySubject');
    //     this.router.navigate(['/logincompany']);
    // }

    // /**
    //  * logout candidate
    //  */
    // public logoutCandidate() {
    //     localStorage.removeItem('candidateSubject');
    //     this.router.navigate(['/logincandidate']);
    // }

    /**
     * upload image
     * @param formData 
     */
    public upload(formData) {
        return this.httpClient.post<any>(this.SERVER_URL, formData, {
            reportProgress: true,
            observe: 'events'
        });
    }

    // /**
    //  * upload Curriculum Vitae
    //  * @param formData 
    //  */
    // public uploadCV(formData) {
    //     return this.httpClient.post<any>(this.SERVER_CV_URL, formData, {
    //         reportProgress: true,
    //         observe: 'events'
    //     });
    // }

    /**
     * get SysMember Value
     */
    public get getSysMemberValue(): any {
        if(this.sysmemberSubject.value==null){
            this.sysmemberSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('sysmemberSubject')));
        }
        return this.sysmemberSubject.value;
    }    

    /**
     * logout SysMember
     */
    public logoutSysMember() {
        localStorage.removeItem('sysmemberSubject');
        this.sysmemberSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('sysmemberSubject')));
        this.router.navigate(['']);
    }

    /**
     * convert To Data
     * @param data 
     */
    convertToData(data): any[] {
        data = JSON.parse(data + '');
        let result: any[] = [];
        data.forEach(item => {
            item.fields.id = item.pk;
            result.push(item.fields);
        });
        return result;
    }

    /**
     * 
     * @param date 
     */
    formatDate(date: Date): string {
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return date.getFullYear() + '-'
            + (month > 9 ? month : ('0' + month)) + '-'
            + (day > 9 ? day : ('0' + day));
    }

    /**
    * formatDateToDDMMYYYY
    * @param date 
    */
    formatDateToDDMMYYYY(date = new Date): string {
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return (day > 9 ? day : ('0' + day)) + '-'
            + (month > 9 ? month : ('0' + month)) + '-'
            + date.getFullYear();
    }

    /**
     * format Html Tag
     * @param content 
     */
    formatHtmlTag(content) {
        let result: string;
        let dummyElem = document.createElement('DIV');
        dummyElem.innerHTML = content;
        document.body.appendChild(dummyElem);
        result = dummyElem.textContent;
        document.body.removeChild(dummyElem);
        return result;
    }


    /**
     * 
     * @param param 
     * @param what 
     */
    excuteAllByWhatWithUrl(url: string, param: any, what: string): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'my-auth-token',
                'Access-Control-Allow-Origin': '*',
            })
        };
        this.getAllWhatUrl = this.url + what;
        console.log('Param input', JSON.stringify(param));
        return this.httpClient.post<any>(url, JSON.stringify(param), httpOptions)
            .pipe(map((response: Response) => response.json()));
    }

    public showError(mess: string) {
        this.toastrService.error('AKHair!', mess, {
            timeOut: 1500,
            progressBar: true
        });
    }

    public showSuccess(mess: string) {
        this.toastrService.success('AKHair!', mess + '!', {
            timeOut: 1500,
            progressBar: true
        });
    }

    public showWarning(mess: string) {
        this.toastrService.warning('AKHair!', mess + '!', {
            timeOut: 1500,
            progressBar: true
        });
    }

    public playSuccess() {
        this.audio = new Audio();
        this.audio.src = "../../assets/sounds/beep-02.wav";
        this.audio.load();
        this.audio.play();
    }

    public playError() {
        this.audio = new Audio();
        this.audio.src = "../../assets/sounds/beep-05.wav";
        this.audio.load();
        this.audio.play();
    }

    /**
      * bỏ dấu tiếng việt để search
    */
    private cleanAccents(str: string): string {
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");
        // Combining Diacritical Marks
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // huyền, sắc, hỏi, ngã, nặng 
        str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // mũ â (ê), mũ ă, mũ ơ (ư)
        return str;
    }
}