import { Component, OnInit, Inject, ViewChild, ɵConsole } from '@angular/core';
import { ApiService } from 'src/app/common/api-service/api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable, Observer, Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment } from 'moment';

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD-MM-YYYY',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'MM YYYY',
    dateA11yLabel: 'DDDD',
    monthYearA11yLabel: 'MM YYYY',
  },
};

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss']
})
export class InviteComponent implements OnInit {

  /** for table */
  subscription: Subscription[] = [];

  displayedColumns: string[] = ['id', 'iduser', 'idinvite', 'startdate'];

  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  /** for table */

  constructor(
    private api: ApiService,
    public dialog: MatDialog
  ) { }

  users: any[] = [];

  ngOnInit() {
    this.getUsers();
    // get trains	
    this.getInvite();
  }

  /**
  * get Users
  */
  getUsers() {
    this.api.excuteAllByWhat({ 'idCompany': this.api.idCompany }, '1300')
      .subscribe(data => {
        // set data for table	
        this.users = data;
        console.log(this.users);
      })
  }

  /**
 * get Name Users By Id
 * @param id 
 */
  getNameUsersById(id) {
    return this.users.filter(e => e.id == id)[0]?.fullname;
  }

   /**
 * get phone Users By Id
 * @param id 
 */
  gePhoneUsersById(id) {
    return this.users.filter(e => e.id == id)[0]?.phone;
  }

  /**	
   * get Data getInvite  	
   */
  getInvite() {
    this.api.excuteAllByWhat({ 'idCompany': this.api.idCompany }, '500')
      .subscribe(data => {
        // set data for table	
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })

  }

  /**	
   * on insert data	
   * @param event 	
   */
  onInsertData() {
    const dialogRef = this.dialog.open(InviteDialog, {
      width: '400px',
      data: { type: 0, id: 0 }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getInvite();
      }
    });
  }

  /**	
   * on update data	
   * @param event 	
   */
  onUpdateData(row) {
    const dialogRef = this.dialog.open(InviteDialog, {
      width: '400px',
      data: { type: 1, input: row }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getInvite();
      }
    });
  }
}


/**	
 * Component show thông tin để insert hoặc update	
 */
@Component({
  selector: 'invite-dialog',
  templateUrl: 'invite-dialog.html',
  styleUrls: ['./invite.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class InviteDialog implements OnInit {
  date = new FormControl(moment());
  observable: Observable<any>;
  observer: Observer<any>;
  type: number;
  idCompany: number;

  // init input value	
  input: any = {
    iduser: '',
    idinvite: '',
    startdate: '',
  };

  constructor(
    public dialogRef: MatDialogRef<InviteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private api: ApiService
  ) {
    this.type = data.type;
    this.input.idCompany = this.api.idCompany;

    // nếu là update	
    if (this.type == 1) {
      this.input = data.input;
    }

    console.log('data nhan duoc ', this.data);

    // xử lý bất đồng bộ	
    this.observable = Observable.create((observer: any) => {
      this.observer = observer;
    });
  }

  users: any[] = [];

  /**	
   * ngOnInit	
   */
  ngOnInit() {
    this.getUserOption();
  }
  /**
   * get User Option
   */
  getUserOption() {
    this.api.excuteAllByWhat({ 'idCompany': this.api.idCompany }, '1300')
      .subscribe(data => {
        // set data for table	
        this.users = data;
      })
  }


  /**	
   * on ok click	
   */
  onOkClick(): void {
    // convert data time	
    // this.input.born = new Date(this.input.born);	
    // this.input.born = this.api.formatDate(this.input.born);	

    this.api.excuteAllByWhat(this.input, '' + Number(501 + this.type) + '').subscribe(data => {
      this.dialogRef.close(true);
      this.api.showSuccess("Xử Lý Thành Công!");
    });
  }

  /**	
   * onDeleteClick	
   */
  onDeleteClick() {
    this.api.excuteAllByWhat(this.input, '503').subscribe(data => {
      this.dialogRef.close(true);
      this.api.showSuccess("Xử Lý Xóa Thành Công!");
    });
  }
}	
