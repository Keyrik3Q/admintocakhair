import { Component, OnInit, Inject, ViewChild, Output, EventEmitter } from '@angular/core';
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
import moment, * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment } from 'moment';


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
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  /** for table */
  subscription: Subscription[] = [];

  displayedColumns: string[] = ['id', 'idbooking', 'idemployee', 'iduser', 'startdate', 'rate', 'question1', 'question2', 'question3', 'feedback'];

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

  employees: any[] = [];
  users: any[] = [];
  constructor(
    private api: ApiService,
    public dialog: MatDialog
  ) { }

  input: any = {
    idbooking: '',
    idemployee: '',
    iduser: '',
    startdate: '',
    rate: '',
    question1: '',
    question2: '',
    question3: '',
    feedback: '',
  };

  // translate answer 
  getAnswer(answer): string {
    switch (answer) {
      case this.input.question1 = '0':
        return 'Rất Hài Lòng';
      case this.input.question = '1':
        return 'Hài Lòng';
      case this.input.question = '2':
        return 'Không hài lòng';
      case this.input.question = '3':
        return 'Rất không hài lòng';
    }    return '';
  }

  ngOnInit() {
    // get trains	
    this.getEmployees();
    this.getUsers();
    // get trains	
    this.getComment();
  }



  /**	
   * get Data employee  	
   */
  getEmployees() {
    this.api.excuteAllByWhat({ 'idCompany': this.api.idCompany }, '400')
      .subscribe(data => {
        // set data for table	
        this.employees = data;
      })
  }

  /**
 * get Name Employee By Id
 * @param id 
 */
  getNameEmployeesById(id) {
    return this.employees.filter(e => e.id == id)[0]?.fullname;
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
   * get Data getComment  	
   */
  getComment() {
    this.api.excuteAllByWhat({ 'idCompany': this.api.idCompany }, '300')
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
    const dialogRef = this.dialog.open(CommentDialog, {
      width: 'fit-conent',
      data: { type: 0, id: 0 }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getComment();
      }
    });
  }

  /**	
   * on update data	
   * @param event 	
   */
  onUpdateData(row) {
    const dialogRef = this.dialog.open(CommentDialog, {
      width: 'fit-conent',
      data: { type: 1, input: row }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getComment();
      }
    });
  }
}


/**	
 * Component show thông tin để insert hoặc update	
 */
@Component({
  selector: 'comment-dialog',
  templateUrl: 'comment-dialog.html',
  styleUrls: ['./comment.component.scss'],
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
export class CommentDialog implements OnInit {
  @Output() userTimeChange: EventEmitter<any> = new EventEmitter();
  date = new FormControl(moment());
  observable: Observable<any>;
  observer: Observer<any>;
  type: number;
  idCompany: number;

  // init input value	
  input: any = {
    idbooking: '',
    idemployee: '',
    iduser: '',
    startdate: '',
    rate: '',
    question1: '',
    question2: '',
    question3: '',
    feedback: '',
  };

  constructor(
    public dialogRef: MatDialogRef<CommentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private api: ApiService,
    public dialog: MatDialog
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

  employees: any[] = [];
  users: any[] = [];

  // data source for combobox answer
  answers: any[] = [
    { value: '0', viewValue: 'Rất Hài Lòng' },
    { value: '1', viewValue: 'Hài Lòng' },
    { value: '2', viewValue: 'Không hài lòng' },
    { value: '3', viewValue: 'Rất không hài lòng' }
  ];

  /**	
   * ngOnInit	
   */
  ngOnInit() {
    this.getEmployeeOption();
    this.getUserOption();
  }

  getEmployeeOption() {
    this.api.excuteAllByWhat({ 'idCompany': this.api.idCompany }, '400')
      .subscribe(data => {
        // set data for table	
        this.employees = data;
      })
  }

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
    this.input.startdate = moment(this.input.startdate).format('YYYY-MM-DD HH:mm:ss');

    this.api.excuteAllByWhat(this.input, '' + Number(301 + this.type) + '').subscribe(data => {
      this.dialogRef.close(true);
      this.api.showSuccess("Xử Lý Thành Công!");
    });
  }

  /**	
   * onDeleteClick	
   */
  onDeleteClick() {
    this.api.excuteAllByWhat(this.input, '303').subscribe(data => {
      this.dialogRef.close(true);
      this.api.showSuccess("Xử Lý Xóa Thành Công!");
    });
  }
}	
