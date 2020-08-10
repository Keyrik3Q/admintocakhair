import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  ViewChildren,
  QueryList,
} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable, Observer, Subscription } from 'rxjs';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import {
  MatMomentDateModule,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment } from 'moment';
import { FormControl } from '@angular/forms';
import { ApiService } from 'src/app/common/api-service/api.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Booking } from 'src/app/common/_models/10booking.models';

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
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class BookingComponent implements OnInit {
  dateStart = new FormControl(moment().format('DD-MM-YYYY'));
  dateEnd = new FormControl(moment().format('DD-MM-YYYY'));
  /** for table */
  subscription: Subscription[] = [];

  displayedColumns: string[] = [
    'id',
    'idbranch',
    'idservice',
    'iduser',
    'userphone',
    'idemployee',
    'dateorder',
    'timeorder',
    'status',
    'startdate',
    'statuscare',
  ];

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

  //data fillter
  branchId: String = '0';
  statusId: String = '3';
  startDates: string = '';
  endDates: string = '';

  //data models
  branches: any[] = [];
  services: any[] = [];
  employees: any[] = [];
  users: any[] = [];
  booking: Booking;

  constructor(private api: ApiService, public dialog: MatDialog) {}

  status: any[] = [
    { value: '0', viewValue: 'Đã đặt' },
    { value: '1', viewValue: 'Đã cắt' },
    { value: '2', viewValue: 'Đã hủy' },
  ];

  // translate status
  getStatus(status): string {
    switch (status) {
      case (this.booking.status = '0'):
        return 'Đã đặt';
      case (this.booking.status = '1'):
        return 'Đã cắt';
      case (this.booking.status = '2'):
        return 'Đã hủy';
    }
    return '';
  }

  // getStatuscare(statuscare): string {
  //   switch (statuscare) {
  //     case (this.booking.statuscare = '0'):
  //       return '';
  //     case (this.booking.statuscare = '1'):
  //       return &#10004;
  //   }
  //   return '';
  // }

  /**
   * ngOnInit
   */
  ngOnInit() {
    this.onLoadDataBranch();
    this.getBranches();
    this.getEmployees();
    this.getServices();
    this.getUsers();
  }

  /**
   * get Data branchs
   */
  getBranches() {
    this.api
      .excuteAllByWhat({ idCompany: this.api.idCompany }, '200')
      .subscribe((data) => {
        // set data for table
        this.branches = data;
      });
  }

  /**
   * get Name Branches By Id
   * @param id
   */
  getNameBranchesById(id) {
    return this.branches.filter((e) => e.id == id)[0]?.name;
  }

  /**
   * get Data employee
   */
  getEmployees() {
    this.api
      .excuteAllByWhat({ idCompany: this.api.idCompany }, '400')
      .subscribe((data) => {
        // set data for table
        this.employees = data;
      });
  }

  /**
   * get Name Employee By Id
   * @param id
   */
  getNameEmployeesById(id) {
    return this.employees.filter((e) => e.id == id)[0]?.fullname;
  }

  /**
   * get Services
   */
  getServices() {
    this.api
      .excuteAllByWhat({ idCompany: this.api.idCompany }, '1000')
      .subscribe((data) => {
        // set data for table
        this.services = data;
      });
  }

  /**
   * get Name Service By Id
   * @param id
   */
  getNameServiceById(id) {
    return this.services.filter((e) => e.id == id)[0]?.name;
  }

  /**
   * get Data users
   */
  getUsers() {
    this.api
      .excuteAllByWhat({ idCompany: this.api.idCompany }, '1300')
      .subscribe((data) => {
        // set data for table
        this.users = data;
      });
  }

  /**
   * get Name Branches By Id
   * @param id
   */
  getNameUsersById(id) {
    return this.users.filter((e) => e.id == id)[0]?.fullname;
  }

  getPhoneUsersById(id) {
    return this.users.filter((e) => e.id == id)[0]?.phone;
  }

  // status dropdown
  status1: any[] = [
    { value: '3', viewValue: 'Tất cả' },
    { value: '0', viewValue: 'Đã đặt' },
    { value: '1', viewValue: 'Đã cắt' },
    { value: '2', viewValue: 'Đã hủy' },
  ];

  branch: any[] = [];
  branchNoAll: any[] = [];

  // on load data branch
  onLoadDataBranch() {
    const param = {};
    this.subscription.push(
      this.api.excuteAllByWhat(param, '200').subscribe((data) => {
        if (data.length > 0) {
          this.branchNoAll = data;
          let temp = [
            {
              id: '0',
              name: 'Tất cả chi nhánh',
            },
          ];
          data.forEach((element) => {
            temp.push(element);
          });
          this.branch = temp;
        }
      })
    );
    this.onFillterClick();
  }

  /**
   * onFillterClick
   */
  onFillterClick() {
    const param = {
      branch: this.branchId,
      status: this.statusId,
      startDate:
        this.startDates == ''
          ? '0'
          : this.api.formatDate(new Date(this.startDates)),
      endDate:
        this.endDates == ''
          ? '0'
          : this.api.formatDate(new Date(this.endDates)),
    };
    console.log(param);
    this.subscription.push(
      this.api.excuteAllByWhat(param, '107').subscribe((data) => {
        if (data.length > 0) {
          // set data for table
          this.dataSource = new MatTableDataSource(data);
          this.booking = data;
        } else {
          this.dataSource = new MatTableDataSource([]);
        }
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    );
  }

  /**
   * on insert data
   * @param event
   */
  onInsertData() {
    const dialogRef = this.dialog.open(BookingDialog, {
      width: '400px',
      data: { type: 0, id: 0 },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.onFillterClick();
      }
    });
  }

  /**
   * on update data
   * @param event
   */
  onUpdateData(row) {
    const dialogRef = this.dialog.open(BookingDialog, {
      width: '400px',
      data: { type: 1, input: row },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.onFillterClick();
      }
    });
  }
}

/**
 * Component show thông tin để insert hoặc update
 */
@Component({
  selector: 'booking-dialog',
  templateUrl: 'booking-dialog.html',
  styleUrls: ['./booking.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class BookingDialog implements OnInit {
  date = new FormControl(moment().format('YYYY-MM-DD'));
  observable: Observable<any>;
  observer: Observer<any>;
  type: number;
  idCompany: number;

  // init input value
  input: any = {
    idbranch: '',
    idservice: '',
    iduser: '',
    idemployee: '',
    dateorder: '',
    timeorder: '',
    status: '',
    startdate: '',
    statuscare: '',
  };

  constructor(
    public dialogRef: MatDialogRef<BookingDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private api: ApiService
  ) {
    this.type = data.type;
    this.input.idCompany = this.api.idCompany;

    // nếu là update
    if (this.type == 1) {
      this.input = data.input;
    } 
    // xử lý bất đồng bộ
    this.observable = Observable.create((observer: any) => {
      this.observer = observer;
    });
  }

  statusDialog: any[] = [
    { value: '0', viewValue: 'Đã đặt' },
    { value: '1', viewValue: 'Đã cắt' },
    { value: '2', viewValue: 'Đã hủy' },
  ];

  //data models
  branches: any[] = [];
  services: any[] = [];
  employees: any[] = [];
  users: any[] = [];

  /**
   * ngOnInit
   */
  ngOnInit() {
    this.getBranchesOption();
    this.getServiceOption();
    this.getEmployeeOption();
    this.getUserOption();
  }

  /**
   * get Data branchs
   */
  getBranchesOption() {
    this.api
      .excuteAllByWhat({ idCompany: this.api.idCompany }, '200')
      .subscribe((data) => {
        // set data for table
        this.branches = data;
      });
  }

  /**
   * get Data service
   */
  getServiceOption() {
    this.api
      .excuteAllByWhat({ idCompany: this.api.idCompany }, '1000')
      .subscribe((data) => {
        // set data for table
        this.services = data;
      });
  }

  /**
   * get Data employee
   */
  getEmployeeOption() {
    this.api
      .excuteAllByWhat({ idCompany: this.api.idCompany }, '400')
      .subscribe((data) => {
        // set data for table
        this.employees = data;
      });
  }

  /**
   * get Data user
   */
  getUserOption() {
    this.api
      .excuteAllByWhat({ idCompany: this.api.idCompany }, '1300')
      .subscribe((data) => {
        // set data for table
        this.users = data;
      });
  }

  checkStatuscare() {
    this.input.statuscare = 1;
  }

  /**
   * on ok click
   */
  onOkClick(): void {
    // convert data time
    this.date = new FormControl(moment().format('YYYY-MM-DD'));
    this.input.startdate = moment(this.input.startdate).format('YYYY-MM-DD');
    this.input.dateorder = moment(this.input.dateorder).format('YYYY-MM-DD');

    this.api
      .excuteAllByWhat(this.input, '' + Number(101 + this.type) + '')
      .subscribe((data) => {
        this.dialogRef.close(true);
        this.api.showSuccess('Xử Lý Thành Công!');
      });
  }

  /**
   * onDeleteClick
   */
  onDeleteClick() {
    this.api.excuteAllByWhat(this.input, '103').subscribe((data) => {
      console.log(data);
      this.dialogRef.close(true);
      this.api.showSuccess('Xử Lý Xóa Thành Công!');
    });
  }
}
