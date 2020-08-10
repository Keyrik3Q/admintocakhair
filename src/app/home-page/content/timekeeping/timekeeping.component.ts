import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ApiService } from '../../../common/api-service/api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable, Observer, Subscription } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-timekeeping',
  templateUrl: './timekeeping.component.html',
  styleUrls: ['./timekeeping.component.scss']
})
export class TimekeepingComponent implements OnInit {

  /** for table */
  subscription: Subscription[] = [];

  displayedColumns: string[] = ['select' ,'id', 'idemployee', 'datestart', 'dateend', 'status', 'description', 'type'];

  dataSource: MatTableDataSource<any>;

  selection = new SelectionModel<any>(true, []);

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    if (this.dataSource) {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }
    return null;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
  /** for table */

  constructor(
    private api: ApiService,
    public dialog: MatDialog
  ) { }
  input: any = {
    idemployee: '',
    datestart: '',
    dateend: '',
    status: '',
    description: '',
    type: '',
  };

  employees: any[] = [];
  getStatus(status): string {
    switch (status) {
      case this.input.status = '0':
        return 'Đang chờ duyệt';
      case this.input.status = '1':
        return 'Đã duyệt';
      case this.input.status = '2':
        return 'Không duyệt';
    }    return '';
  }

  ngOnInit() {

    // get trains	
    this.getTimekeeping();
    this.getEmployees();
  }

  /**	
   * get Data getTimekeeping  	
   */
  getTimekeeping() {
    this.api.excuteAllByWhat({ 'idCompany': this.api.idCompany }, '1400')
      .subscribe(data => {
        // set data for table	
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })

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
   * on Accept Click
   */
  onAcceptClick() {
    // get listid selection example: listId='1,2,6'
    let listId = '';
    this.selection.selected.forEach(item => {
      if (listId == '') {
        listId += item.id
      } else {
        listId += ',' + item.id;
      }
    });

    const param = { 'listid': listId }

    // start update status approved to one
    if (listId !== '') {
      this.api.excuteAllByWhat(param, '1407').subscribe(data => {
        // load data grid
        this.getTimekeeping(); 

        // show toast success
        this.api.showSuccess('Duyệt thành công ');
      });
    } else {
      // show toast warning
      this.api.showWarning('Vui lòng chọn 1 mục để duyệt ')
    }
    this.selection = new SelectionModel<any>(true, []);
  }

  /**	
   * on insert data	
   * @param event 	
   */
  onInsertData() {
    const dialogRef = this.dialog.open(TimekeepingDialog, {
      width: '400px',
      data: { type: 0, id: 0 }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getTimekeeping();
        this.selection = new SelectionModel<any>(true, []);
      }
    });
  }  

  /**	
   * on update data	
   * @param event 	
   */
  onUpdateData(row) {
    const dialogRef = this.dialog.open(TimekeepingDialog, {
      width: '400px',
      data: { type: 1, input: row }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getTimekeeping();
        this.selection = new SelectionModel<any>(true, []);
      }
    });
  }
}


/**	
 * Component show thông tin để insert hoặc update	
 */
@Component({
  selector: 'timekeeping-dialog',
  templateUrl: 'timekeeping-dialog.html',
  styleUrls: ['./timekeeping.component.scss']
})
export class TimekeepingDialog implements OnInit {

  observable: Observable<any>;
  observer: Observer<any>;
  type: number;
  idCompany: number;

  // init input value	
  input: any = {
    idemployee: '',
    datestart: '',
    dateend: '',
    status: '',
    description: '',
    type: '',
  };

  constructor(
    public dialogRef: MatDialogRef<TimekeepingDialog>,
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

  employees: any[] = [];
  notifications: any[] = [
    { value: '0', viewValue: 'Đang chờ duyệt' },
    { value: '1', viewValue: 'Đã duyệt' },
    { value: '2', viewValue: 'Không duyệt' },
  ];

  /**	
   * ngOnInit	
   */
  ngOnInit() {
    this.getEmployeeOption();
  }

  getEmployeeOption() {
    this.api
      .excuteAllByWhat({ idCompany: this.api.idCompany }, '400')
      .subscribe((data) => {
        // set data for table
        this.employees = data;
      });
  }

  /**	
   * on ok click	
   */
  onOkClick(): void {
    // convert data time	
    this.input.datestart = new Date(this.input.datestart);
    this.input.dateend = new Date(this.input.dateend);
    this.input.datestart = this.api.formatDate(this.input.datestart);
    this.input.dateend = this.api.formatDate(this.input.dateend);

    this.api.excuteAllByWhat(this.input, '' + Number(1401 + this.type) + '').subscribe(data => {
      this.dialogRef.close(true);
      this.api.showSuccess("Xử Lý Thành Công!");
    });
  }

  /**	
   * onDeleteClick	
   */
  onDeleteClick() {
    this.api.excuteAllByWhat(this.input, '1403').subscribe(data => {
      this.dialogRef.close(true);
      this.api.showSuccess("Xử Lý Xóa Thành Công!");
    });
  }
}	
