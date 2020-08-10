import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/common/api-service/api.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable, Observer, Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';

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
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss'],
})
export class TimetableComponent implements OnInit {
  /** for table */
  subscription: Subscription[] = [];

  displayedColumns: string[] = [
    'id',
    'idemployee',
    'idshift',
    'starttime',
    'endtime',
    'startdate',
    'enddate',
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

  constructor(private api: ApiService, public dialog: MatDialog) { }

  employees: any[] = [];
  shifts: any[] = [];
  ngOnInit() {
    // get trains
    this.getTimetable();
    this.getEmployees();
    this.getShifts();
  }

  shift: any = {
    name: '',
    starttime: '',
    endtime: '',
  };
  /**
   * get Data getTimetable
   */
  getTimetable() {
    this.api
      .excuteAllByWhat({ idCompany: this.api.idCompany }, '1200')
      .subscribe((data) => {
        data = this.shift;
      });

    this.api
      .excuteAllByWhat({ idCompany: this.api.idCompany }, '1200')
      .subscribe((data) => {

        // set data for table
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  /**
   * get Data shifts
   */
  getShifts() {
    this.api
      .excuteAllByWhat({ idCompany: this.api.idCompany }, '1100')
      .subscribe((data) => {
        // set data for table
        this.shifts = data;
      });
  }

  /**
   * get Name shifts By Id
   * @param id
   */
  getNameShiftById(id) {
    return this.shifts.filter((e) => e.id == id)[0]?.name;
  }

  /**
   * get start shifts By Id
   * @param id
   */
  getStartShiftById(id) {
    return this.shifts.filter((e) => e.id == id)[0]?.starttime;
  }

  /**
   * get end shifts By Id
   * @param id
   */
  getEndShiftById(id) {
    return this.shifts.filter((e) => e.id == id)[0]?.endtime;
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
   * on insert data
   * @param event
   */
  onInsertData() {
    const dialogRef = this.dialog.open(TimetableDialog, {
      width: '400px',
      data: { type: 0, id: 0 },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getTimetable();
      }
    });
  }

  /**
   * on update data
   * @param event
   */
  onUpdateData(row) {
    const dialogRef = this.dialog.open(TimetableDialog, {
      width: '400px',
      data: { type: 1, input: row },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getTimetable();
      }
    });
  }
}

/**
 * Component show thông tin để insert hoặc update
 */
@Component({
  selector: 'timetable-dialog',
  templateUrl: 'timetable-dialog.html',
  styleUrls: ['./timetable.component.scss'],
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
export class TimetableDialog implements OnInit {
  date = new FormControl(moment());
  observable: Observable<any>;
  observer: Observer<any>;
  type: number;
  idCompany: number;

  // init input value
  input: any = {
    idemployee: '',
    idshift: '',
    startdate: '',
    enddate: '',
  };

  constructor(
    public dialogRef: MatDialogRef<TimetableDialog>,
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

  employees: any[] = [];
  shifts: any[] = [];

  /**
   * ngOnInit
   */
  ngOnInit() {
    this.getEmployeeOption();
    this.getShiftOption();
  }

  getEmployeeOption() {
    this.api
      .excuteAllByWhat({ idCompany: this.api.idCompany }, '400')
      .subscribe((data) => {
        // set data for table
        this.employees = data;
      });
  }

  getShiftOption() {
    this.api
      .excuteAllByWhat({ idCompany: this.api.idCompany }, '1100')
      .subscribe((data) => {
        // set data for table
        this.shifts = data;
      });
  }

  /**
   * on ok click
   */
  onOkClick(): void {
    // convert data time
    this.input.startdate = new Date(this.input.startdate);
    this.input.startdate = this.api.formatDate(this.input.startdate);

    this.input.enddate = new Date(this.input.enddate);
    this.input.enddate = this.api.formatDate(this.input.enddate);

    this.api
      .excuteAllByWhat(this.input, '' + Number(1201 + this.type) + '')
      .subscribe((data) => {
        this.api.showSuccess('Xử Lý Thành Công!');
      });
    if (this.type == 1) {
      this.dialogRef.close(true);
    }
  }  

  /**
   * onDeleteClick
   */
  onDeleteClick() {
    this.api.excuteAllByWhat(this.input, '1203').subscribe((data) => {
      this.dialogRef.close(true);
      this.api.showSuccess('Xử Lý Xóa Thành Công!');
    });
  }

  /**
   * onNoClick
   */
  onNoClick() {
    this.dialogRef.close(true);
  }
}
