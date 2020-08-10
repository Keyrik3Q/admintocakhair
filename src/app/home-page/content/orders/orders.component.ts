import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/common/api-service/api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable, Observer, Subscription } from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  /** for table */
  subscription: Subscription[] = [];

  displayedColumns: string[] = ['id', 'idproduct', 'iduser', 'status', 'startdate', 'amount'];

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
  products: any[] = [];
  input: any = {
    idproduct: '',
    iduser: '',
    status: '',
    startdate: '',
    amount: '',
  };

  // translate status 
  getStatus(status): string {
    switch (status) {
      case this.input.status = '0':
        return 'Đã đặt';
      case this.input.status = '1':
        return 'Đã cắt';
      case this.input.status = '2':
        return 'Đã hủy';
    }    return '';
  }

  ngOnInit() {

    // get trains	
    this.getOrders();
    this.getUsers();
    this.getProducts();
  }

  /**	
   * get Data getOrders  	
   */
  getOrders() {
    this.api.excuteAllByWhat({ 'idCompany': this.api.idCompany }, '800')
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
  * get products
  */
  getProducts() {
    this.api.excuteAllByWhat({ 'idCompany': this.api.idCompany }, '900')
      .subscribe(data => {
        // set data for table	
        this.products = data;
      })
  }

  /**
  * get Name products By Id
  * @param id 
  */
  getNameProductById(id) {
    return this.products.filter(e => e.id == id)[0]?.productname;
  }


  /**	
   * on insert data	
   * @param event 	
   */
  onInsertData() {
    const dialogRef = this.dialog.open(OrdersDialog, {
      width: '400px',
      data: { type: 0, id: 0 }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getOrders();
      }
    });
  }

  /**	
   * on update data	
   * @param event 	
   */
  onUpdateData(row) {
    const dialogRef = this.dialog.open(OrdersDialog, {
      width: '400px',
      data: { type: 1, input: row }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getOrders();
      }
    });
  }
}


/**	
 * Component show thông tin để insert hoặc update	
 */
@Component({
  selector: 'orders-dialog',
  templateUrl: 'orders-dialog.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersDialog implements OnInit {

  observable: Observable<any>;
  observer: Observer<any>;
  type: number;
  idCompany: number;

  // init input value	
  input: any = {
    idproduct: '',
    iduser: '',
    status: '',
    startdate: '',
    amount: '',
  };

  constructor(
    public dialogRef: MatDialogRef<OrdersDialog>,
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
  products: any[] = [];
  statusId: any[] = [
    { value: '0', viewValue: 'Đã đặt' },
    { value: '1', viewValue: 'Đã cắt' },
    { value: '2', viewValue: 'Đã hủy' },
  ];

  /**	
   * ngOnInit	
   */
  ngOnInit() {
    this.getUserOption();
    this.getProductOption();
  }

  getUserOption() {
    this.api.excuteAllByWhat({ 'idCompany': this.api.idCompany }, '1300')
      .subscribe(data => {
        // set data for table	
        this.users = data;
      })
  }
  getProductOption() {
    this.api.excuteAllByWhat({ 'idCompany': this.api.idCompany }, '900')
      .subscribe(data => {
        // set data for table	
        this.products = data;
      })
  }


  /**	
   * on ok click	
   */
  onOkClick(): void {
    // convert data time	
    // this.input.born = new Date(this.input.born);	
    // this.input.born = this.api.formatDate(this.input.born);	

    this.api.excuteAllByWhat(this.input, '' + Number(801 + this.type) + '').subscribe(data => {
      this.dialogRef.close(true);
      this.api.showSuccess("Xử Lý Thành Công!");
    });
  }

  /**	
   * onDeleteClick	
   */
  onDeleteClick() {
    this.api.excuteAllByWhat(this.input, '803').subscribe(data => {
      this.dialogRef.close(true);
      this.api.showSuccess("Xử Lý Xóa Thành Công!");
    });
  }
}	
