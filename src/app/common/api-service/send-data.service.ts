import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable()
export class SendDataService {
    data$: Observable<any>;
    language$: Observable<any>;
    private sendData = new Subject<any>();
    private sendDataLanguage = new Subject<any>();

    constructor() {
        this.data$ = this.sendData.asObservable();
        this.language$ = this.sendDataLanguage.asObservable();
    }

    /**
     * set Data Send
     * @param data 
     */
    setDataSend(data) {
        this.sendData.next(data);
    }

    /**
     * set Data Language
     * @param data 
     */
    setDataLanguage(data) {
        this.sendDataLanguage.next(data);
    }
}