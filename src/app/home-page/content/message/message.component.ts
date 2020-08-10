import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/common/api-service/api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable, Observer, Subscription } from 'rxjs';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  /** for table */
  subscription: Subscription[] = [];

  displayedColumns: string[] = ['id', 'iduser', 'idemployee', 'isuser', 'isemployee', 'content', 'startdate'];

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
  employees: any[] = [];

  ngOnInit() {

    // get trains	
    this.getMessage();
    this.getUsers();
    this.getEmployees();
  }

  /**	
   * get Data getMessage  	
   */
  getMessage() {
    this.api.excuteAllByWhat({ 'idCompany': this.api.idCompany }, '600')
      .subscribe(data => {
        // set data for table	
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
  }

  /**
  * get Users
  */
  getUsers() {
    this.api.excuteAllByWhat({ 'idCompany': this.api.idCompany }, '1300')
      .subscribe(data => {
        // set data for table	
        this.users = data;
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
* get Employees
*/
  getEmployees() {
    this.api.excuteAllByWhat({ 'idCompany': this.api.idCompany }, '400')
      .subscribe(data => {
        // set data for table	
        this.employees = data;
      })
  }

  /**
  * get Name Employees By Id  
  * @param id 
  */
  getNameEmployeesById(id) {
    return this.employees.filter(e => e.id == id)[0]?.fullname;
  }


  /**	
   * on insert data	
   * @param event 	
   */
  onInsertData() {
    const dialogRef = this.dialog.open(MessageDialog, {
      width: '400px',
      data: { type: 0, id: 0 }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getMessage();
      }
    });
  }

  /**	
   * on update data	
   * @param event 	
   */
  onUpdateData(row) {
    const dialogRef = this.dialog.open(MessageDialog, {
      width: '400px',
      data: { type: 1, input: row }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getMessage();
      }
    });
  }
}


/**	
 * Component show thông tin để insert hoặc update	
 */
@Component({
  selector: 'message-dialog',
  templateUrl: 'message-dialog.html',
  styleUrls: ['./message.component.scss']
})
export class MessageDialog implements OnInit {

  observable: Observable<any>;
  observer: Observer<any>;
  type: number;
  idCompany: number;

  // init input value	
  input: any = {
    iduser: '',
    idemployee: '',
    isuser: '',
    isemployee: '',
    content: '',
    startdate: '',
  };

  constructor(
    public dialogRef: MatDialogRef<MessageDialog>,
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
  employees: any[] = [];
  /**	
   * ngOnInit	
   */
  ngOnInit() {
    this.getUserOption();
    this.getEployeeOption()
  }

  getUserOption() {
    this.api.excuteAllByWhat({ 'idCompany': this.api.idCompany }, '1300')
      .subscribe(data => {
        // set data for table	
        this.users = data;
      })
  }

  getEployeeOption() {
    this.api.excuteAllByWhat({ 'idCompany': this.api.idCompany }, '400')
      .subscribe(data => {
        // set data for table	
        this.employees = data;
      })
  }

  /**	
   * on ok click	
   */
  onOkClick(): void {
    // convert data time	
    // this.input.born = new Date(this.input.born);	
    // this.input.born = this.api.formatDate(this.input.born);	

    this.api.excuteAllByWhat(this.input, '' + Number(601 + this.type) + '').subscribe(data => {
      this.dialogRef.close(true);
      this.api.showSuccess("Xử Lý Thành Công!");
    });
  }

  /**	
   * onDeleteClick	
   */
  onDeleteClick() {
    this.api.excuteAllByWhat(this.input, '603').subscribe(data => {
      this.dialogRef.close(true);
      this.api.showSuccess("Xử Lý Xóa Thành Công!");
    });
  }
}	
