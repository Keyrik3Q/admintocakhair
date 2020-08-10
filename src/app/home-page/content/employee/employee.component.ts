import { Component, OnInit, Inject, ViewChild } from '@angular/core';
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
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  /** for table */
  subscription: Subscription[] = [];

  displayedColumns: string[] = ['id', 'idbranch', 'fullname', 'phone', 'born', 'password', 'image', 'job', 'startworking', 'exp'];

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


  ngOnInit() {
    // get trains	
    this.getBranches();
    // this.getBranchesOption();
    this.onLoadDataEmployeee();
  }

  branchId: String = '0';
  
  //   /**
  //  * get Data branchs
  //  */
  branchNoAll: any[] = [];
  branch: any[] = [];

  // on load data branch
  onLoadDataEmployeee() {
    const param = {};
    this.subscription.push(
      this.api.excuteAllByWhat(param, '200').subscribe((data) => {
        if (data.length > 0) {
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
    };
    console.log(param);
    this.subscription.push(
      this.api.excuteAllByWhat(param, '409').subscribe((data) => {
        if (data.length > 0) {
          // set data for table
          this.dataSource = new MatTableDataSource(data);
        } else {
          this.dataSource = new MatTableDataSource([]);
        }
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    );
  }

  branches: any[] = [];
  branche: any[] = [];
  /**	
* get Data branchs
*/
  getBranches() {
    this.api.excuteAllByWhat({ 'idCompany': this.api.idCompany }, '200')
      .subscribe(data => {
        // set data for table	
        this.branche = data;
      })
  }

  /**
  * get Name Branches By Id
  * @param id 
  */
  getNameBranchesById(id) {
    return this.branche.filter(e => e.id == id)[0]?.name;
  }



  /**	
   * on insert data	
   * @param event 	
   */
  onInsertData() {
    const dialogRef = this.dialog.open(EmployeeDialog, {
      width: '400px',
      data: { type: 0, id: 0 }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onLoadDataEmployeee();
      }
    });
  }

  /**	
   * on update data	
   * @param event 	
   */
  onUpdateData(row) {
    const dialogRef = this.dialog.open(EmployeeDialog, {
      width: '400px',
      data: { type: 1, input: row }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onLoadDataEmployeee();
      }
    });
  }
}


/**	
 * Component show thông tin để insert hoặc update	
 */
@Component({
  selector: 'employee-dialog',
  templateUrl: 'employee-dialog.html',
  styleUrls: ['./employee.component.scss'],
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
export class EmployeeDialog implements OnInit {
  date = new FormControl(moment().format('DD-MM-YYYY'));
  observable: Observable<any>;
  observer: Observer<any>;
  type: number;
  idCompany: number;

  // init input value	
  input: any = {
    idbranch: '',
    fullname: '',
    phone: '',
    born: '',
    password: '',
    image: '',
    job: '',
    startworking: '',
    exp: '',
  };

  /**
   * constructor EmployeeDialog
   * 
   */
  constructor(
    public dialogRef: MatDialogRef<EmployeeDialog>,
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

  // bingding modal
  branches: any[] = [];

  /**	
   * ngOnInit	
   */
  ngOnInit() {
    this.getBranches();
  }

  getBranches() {
    this.api.excuteAllByWhat({ 'idCompany': this.api.idCompany }, '200')
      .subscribe(data => {
        // set data for table	
        this.branches = data;
      })
  }

  /**
* get Name Branches By Id
* @param id 
*/
  getNameBranchesById(id) {
    return this.branches.filter(e => e.id == id)[0]?.name;
  }



  /**	
   * on ok click	
   */
  onOkClick(): void {
    // convert data time	
    this.input.born = new Date(this.input.born);
    this.input.born = this.api.formatDate(this.input.born);

    this.input.startdate = new Date(this.input.startdate);
    this.input.startdate = this.api.formatDate(this.input.startdate);

    this.api.excuteAllByWhat(this.input, '' + Number(401 + this.type) + '').subscribe(data => {
      this.dialogRef.close(true);
      this.api.showSuccess("Xử Lý Thành Công!");
    });
  }

  /**	
   * onDeleteClick	
   */
  onDeleteClick() {
    this.api.excuteAllByWhat(this.input, '403').subscribe(data => {
      this.dialogRef.close(true);
      this.api.showSuccess("Xử Lý Xóa Thành Công!");
    });
  }
}	
