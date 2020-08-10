#include<iostream>
#include<bits/stdc++.h>
#include <dir.h> 
#include <process.h> 
//#include <boost/algorithm/string.hpp> 

using namespace std;

vector<string> split(string str,string delimiter){  
	vector<string> result;
	size_t pos = 0; 
	while ((pos = str.find(delimiter)) != string::npos) {
	   	result.push_back(str.substr(0, pos)); 
	    str.erase(0, pos + delimiter.length());
	} 
	result.push_back(str.substr(0, str.length()-1)); 
	return result;
}

/**
* genHtml
*/
void genDialogHtml(string table, string tableUppercase, vector<string> result, string fileNameFormat){ 
	string fileName = fileNameFormat + "/"+ fileNameFormat + "-dialog.html";
	ofstream cout (fileName.c_str());
	  
	cout<<"<mat-card class=\"border border-info\">	"<<endl; 
	cout<<"    <div class=\"alert alert-info text-center\" role=\"alert\">	"<<endl; 
	cout<<"        <h5 class=\"text-uppercase font-weight-bolder\">Thông tin "<<tableUppercase<<"</h5>	"<<endl; 
	cout<<"    </div>	"<<endl; 
	cout<<"	"<<endl; 
	cout<<"    <mat-card-content class=\"custom-overflow\">	"<<endl; 


	for(int i=1;i<result.size();i++){ 
		char firstUpper = toupper(result[i][0]);
		string uppercaseParam =  firstUpper + result[i].substr(1);
		
		cout<<"        <!-- "<<result[i]<<" field -->	"<<endl;
		cout<<"        <mat-form-field class=\"example-full-width\">	"<<endl;
		cout<<"          <input matInput [(ngModel)]=\"input."<<result[i]<<"\" [required]=\"'true'\" placeholder=\""<<uppercaseParam<<"\">	"<<endl;
		cout<<"        </mat-form-field>	"<<endl;
		cout<<"	"<<endl;
	} 
	cout<<"    </mat-card-content>	"<<endl; 
	cout<<"	"<<endl; 
	cout<<"    <div class=\"text-center\">	"<<endl; 
	cout<<"        <button *ngIf=\"type == 1\" (click)=\"onDeleteClick()\" class=\"btn btn-danger custom-margin-button\" mat-button>Xóa	"<<endl; 
	cout<<"        </button>	"<<endl; 
	cout<<"        <button class=\"btn btn-warning custom-margin-button\" mat-button [mat-dialog-close]=\"data.animal\">Đóng</button>	"<<endl; 
	cout<<"        <button cdkFocusInitial (click)=\"onOkClick()\" class=\"btn btn-info custom-margin-button\" mat-button>Đồng	"<<endl; 
	cout<<"            ý</button>	"<<endl; 
	cout<<"    </div>	"<<endl; 
	cout<<"	"<<endl; 
	cout<<"</mat-card>	"<<endl;  
}

/**
* genHtml
*/
void genHtml(string table, string tableUppercase, vector<string> result, string fileNameFormat){ 
	string fileName = fileNameFormat + "/"+ fileNameFormat + ".component.html";
	ofstream cout (fileName.c_str());
	  
	cout<<"<mat-card class=\"title-block\">                                                                                "<<endl;
    cout<<"    <div class=\"row\">                                                                                         "<<endl;
    cout<<"        <div class=\"col-md-12 title-main\">                                                                    "<<endl;
    cout<<"            <p>Quản Lý Người Dùng</p>                                                                           "<<endl;
    cout<<"        </div>                                                                                                  "<<endl;
    cout<<"    </div>                                                                                                      "<<endl;
    cout<<"</mat-card>                                                                                                     "<<endl;
    cout<<"                                                                                                                "<<endl;
    cout<<"<!-- select-top -->                                                                                             "<<endl;
    cout<<"<mat-card class=\"system-custom\">                                                                              "<<endl;
    cout<<"    <div class=\"row\">                                                                                         "<<endl;
    cout<<"        <div class=\"col-md-6 col-xs-12\">                                                                      "<<endl;
    cout<<"            <mat-form-field class=\"example-full-width\">                                                       "<<endl;
    cout<<"                <mat-label>Tên Người Dùng</mat-label>                                                           "<<endl;
    cout<<"                <input matInput placeholder=\"Nhập tên người dùng...\" />                                       "<<endl;
    cout<<"            </mat-form-field>                                                                                   "<<endl;
    cout<<"        </div>                                                                                                  "<<endl;
    cout<<"        <div class=\"col-md-6\">                                                                                "<<endl;
    cout<<"            <div class=\"example-button-row contain-button-filter\">                                            "<<endl;
    cout<<"                <button class=\"mb-2 mr-2 btn-transition btn btn-outline-primary button-filter\">Lọc            "<<endl;
    cout<<"                </button>                                                                                       "<<endl;
    cout<<"            </div>                                                                                              "<<endl;
    cout<<"        </div>                                                                                                  "<<endl;
    cout<<"    </div>                                                                                                      "<<endl;
    cout<<"</mat-card>                                                                                                     "<<endl;
    cout<<"<!--  end select-top -->                                                                                        "<<endl;
    cout<<"                                                                                                                "<<endl;
    cout<<"<!-- button crud -->                                                                                            "<<endl;
    cout<<"<mat-card class=\"button-system-custom title-header-crud\">                                                     "<<endl;
    cout<<"    <div class=\"row\">                                                                                         "<<endl;
    cout<<"        <div class=\"col-md-12\">                                                                               "<<endl;
    cout<<"            <a class=\"button-action acept\" (click)=\"onInsertData()\">                                        "<<endl;
    cout<<"                <i class=\"fa fa-fw\" aria-hidden=\"true\" title=\"Thêm mới\"></i>                             "<<endl;
    cout<<"                <span>Thêm mới</span>                                                                           "<<endl;
    cout<<"            </a>                                                                                                "<<endl;
    cout<<"            <div class=\"clear\"></div>                                                                         "<<endl;
    cout<<"        </div>                                                                                                  "<<endl;
    cout<<"    </div>                                                                                                      "<<endl;
    cout<<"                                                                                                                "<<endl;
    cout<<"    <mat-form-field>                                                                                            "<<endl;
    cout<<"        <input matInput (keyup)=\"applyFilter($event.target.value)\" placeholder=\"Tìm kiếm giao dịch\">        "<<endl;
    cout<<"    </mat-form-field>                                                                                           "<<endl;
    cout<<"</mat-card>                                                                                                     "<<endl;
    cout<<"<!-- end button crud-->                                                                                         "<<endl;

	cout<<"	"<<endl;
	cout<<"<div class=\"mat-elevation-z8\">	"<<endl;
	cout<<"<table mat-table [dataSource]=\"dataSource\" matSort>	"<<endl;
	cout<<"	"<<endl;
	 
	for(int i=0;i<result.size();i++){
		char firstUpper = toupper(result[i][0]);
		string uppercaseParam =  firstUpper + result[i].substr(1);
		
		cout<<"        <!-- "<<result[i]<<" Column -->	"<<endl;
		cout<<"        <ng-container matColumnDef=\""<<result[i]<<"\">	"<<endl;
		cout<<"          <th mat-header-cell *matHeaderCellDef mat-sort-header> "<<uppercaseParam<<" </th>	"<<endl;
		cout<<"          <td mat-cell *matCellDef=\"let element\"> {{element."<<result[i]<<"}} </td>	"<<endl;
		cout<<"        </ng-container>	"<<endl;
		cout<<"	"<<endl;
	}  

	cout<<"	"<<endl;
	cout<<"	"<<endl;
	cout<<"<tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>	"<<endl;
	cout<<"<tr mat-row (dblclick)=\"onUpdateData(row)\" class=\"example-element-row\" *matRowDef=\"let row; columns: displayedColumns;\">	"<<endl;
	cout<<"</tr>	"<<endl;
	cout<<"</table>	"<<endl;
	cout<<"	"<<endl;
	cout<<"<mat-paginator [pageSizeOptions]=\"[5, 10, 20, 40]\" showFirstLastButtons></mat-paginator>	"<<endl;
	cout<<"</div>	"<<endl;

}

/**
* gen css
*/
void genCss(string table, string tableUppercase, vector<string> result, string fileNameFormat){ 
	string fileName =  fileNameFormat + "/"+ fileNameFormat + ".component.scss";
	ofstream cout (fileName.c_str());
	  
	cout<<".example-full-width {"<<endl;
    cout<<"    width: 100%;"<<endl;
    cout<<"}"<<endl;
    cout<<".mr-20 {"<<endl;
    cout<<"    margin-right: 20px;"<<endl;
    cout<<"}"<<endl;
    cout<<".title-block {"<<endl;
    cout<<"    background: #2bbbad;"<<endl;
    cout<<"    color: #fff;"<<endl;
    cout<<"    font-size: 18px;"<<endl;
    cout<<"    border-bottom-left-radius: 0px;"<<endl;
    cout<<"    border-bottom-right-radius: 0px;"<<endl;
    cout<<"    padding-top: 11px;"<<endl;
    cout<<"    padding-bottom: 11px;"<<endl;
    cout<<"}"<<endl;
    cout<<".title-main {"<<endl;
    cout<<"    p {"<<endl;
    cout<<"        margin-bottom: 0px;"<<endl;
    cout<<"        font-size: 15px;"<<endl;
    cout<<"    }"<<endl;
    cout<<"}"<<endl;
    cout<<".custom-border {"<<endl;
    cout<<"    padding: 10px;"<<endl;
    cout<<"    margin-bottom: 10px;"<<endl;
    cout<<"    margin-left: 5px;"<<endl;
    cout<<"    margin-right: 15px;"<<endl;
    cout<<"}"<<endl;
    cout<<""<<endl;
    cout<<".custom-overflow {"<<endl;
    cout<<"    max-height: 350px;"<<endl;
    cout<<"    overflow-y: auto;"<<endl;
    cout<<"}"<<endl;
    cout<<""<<endl;
    cout<<".custom-margin-button {"<<endl;
    cout<<"    margin-right: 10px;"<<endl;
    cout<<"}"<<endl;
    cout<<""<<endl;
    cout<<"td,"<<endl;
    cout<<"th {"<<endl;
    cout<<"    width: "<<floor(100/result.size())<<"%;"<<endl;
    cout<<"}"<<endl;
    cout<<""<<endl;
    cout<<"table {"<<endl;
    cout<<"    width: 100%;"<<endl;
    cout<<"}"<<endl;
    cout<<""<<endl;
    cout<<".mat-form-field {"<<endl;
    cout<<"    font-size: 14px;"<<endl;
    cout<<"    width: 100%;"<<endl;
    cout<<"}"<<endl;
    cout<<""<<endl;
    cout<<".example-form {"<<endl;
    cout<<"    min-width: 150px;"<<endl;
    cout<<"    max-width: 500px;"<<endl;
    cout<<"    width: 100%;"<<endl;
    cout<<"}"<<endl;
    cout<<""<<endl;
    cout<<".example-full-width {"<<endl;
    cout<<"    width: 100%;"<<endl;
    cout<<"}"<<endl;
    cout<<""<<endl;
    cout<<".example-button-row button,"<<endl;
    cout<<".example-button-row a {"<<endl;
    cout<<"    margin-right: 8px;"<<endl;
    cout<<"}"<<endl;
    cout<<".system-custom {"<<endl;
    cout<<"    box-shadow: 0 0.46875rem 2.1875rem rgba(4, 9, 20, 0.03), 0 0.9375rem 1.40625rem rgba(4, 9, 20, 0.03),"<<endl;
    cout<<"        0 0.25rem 0.53125rem rgba(4, 9, 20, 0.05), 0 0.125rem 0.1875rem rgba(4, 9, 20, 0.03);"<<endl;
    cout<<"    border-width: 0;"<<endl;
    cout<<"    transition: all 0.2s;"<<endl;
    cout<<"    margin-bottom: 20px;"<<endl;
    cout<<"    border-top-left-radius: 0px;"<<endl;
    cout<<"    border-top-right-radius: 0px;"<<endl;
    cout<<"}"<<endl;
    cout<<".button-system-custom {"<<endl;
    cout<<"    border-bottom-left-radius: 0px;"<<endl;
    cout<<"    border-bottom-right-radius: 0px;"<<endl;
    cout<<"    border-top-left-radius: 0px;"<<endl;
    cout<<"    border-top-right-radius: 0px;"<<endl;
    cout<<"}"<<endl;
    cout<<".button-system-custom-footer {"<<endl;
    cout<<"    box-shadow: none;"<<endl;
    cout<<"    border-bottom: 1px solid #e2e2e2;"<<endl;
    cout<<"}"<<endl;
    cout<<".title-header-crud {"<<endl;
    cout<<"    box-shadow: none;"<<endl;
    cout<<"    border-top-left-radius: 4px;"<<endl;
    cout<<"    border-top-right-radius: 4px;"<<endl;
    cout<<"}"<<endl;
    cout<<".button-system-custom-after {"<<endl;
    cout<<"    border-radius: 0px;"<<endl;
    cout<<"}"<<endl;
    cout<<".button-filter {"<<endl;
    cout<<"    padding: 6px 33px;"<<endl;
    cout<<"    border-color: #2bbbad;"<<endl;
    cout<<"    color: #2bbbad;"<<endl;
    cout<<"}"<<endl;
    cout<<".button-filter:hover {"<<endl;
    cout<<"    background: #2bbbad;"<<endl;
    cout<<"    color: #fff;"<<endl;
    cout<<"}"<<endl;
    cout<<".contain-button-filter {"<<endl;
    cout<<"    padding-top: 8px;"<<endl;
    cout<<"}"<<endl;
    cout<<".button-action {"<<endl;
    cout<<"    width: 110px;"<<endl;
    cout<<"    float: left;"<<endl;
    cout<<"    text-align: center;"<<endl;
    cout<<"    @media (max-width: 576px) {"<<endl;
    cout<<"        width: 103px;"<<endl;
    cout<<"    }"<<endl;
    cout<<"    span {"<<endl;
    cout<<"        font-size: 16px;"<<endl;
    cout<<"    }"<<endl;
    cout<<"    i {"<<endl;
    cout<<"        padding-right: 10px;"<<endl;
    cout<<"        font-size: 18px;"<<endl;
    cout<<"    }"<<endl;
    cout<<"}"<<endl;
    cout<<".button-action.add {"<<endl;
    cout<<"    color: #33b5e5;"<<endl;
    cout<<"}"<<endl;
    cout<<".button-action.acept {"<<endl;
    cout<<"    color: #00c851;"<<endl;
    cout<<"}"<<endl;
    cout<<""<<endl;
    cout<<".button-action.del {"<<endl;
    cout<<"    color: #ff4444;"<<endl;
    cout<<"}"<<endl;
    cout<<".clear {"<<endl;
    cout<<"    clear: both;"<<endl;
    cout<<"}"<<endl;
    cout<<"th {"<<endl;
    cout<<"    color: #fff;"<<endl;
    cout<<"    font-size: 15px;"<<endl;
    cout<<"    letter-spacing: 0.7px;"<<endl;
    cout<<"}"<<endl;
    cout<<""<<endl;
    cout<<".mat-header-row {"<<endl;
    cout<<"    background: #2bbbad !important;"<<endl;
    cout<<"    text-transform: uppercase;"<<endl;
    cout<<"    height: 50px;"<<endl;
    cout<<"}"<<endl;
    cout<<""<<endl;
    cout<<"tr.mat-row:hover {"<<endl;
    cout<<"    background: #e0f2f1;"<<endl;
    cout<<"}"<<endl;
    cout<<""<<endl;
    cout<<".example-form.form-sort {"<<endl;
    cout<<"    max-width: 65px !important;"<<endl;
    cout<<"    min-width: 65px !important;"<<endl;
    cout<<"}"<<endl;
    cout<<".icon-acept,"<<endl;
    cout<<".icon-sort-up,"<<endl;
    cout<<".icon-sort-down {"<<endl;
    cout<<"    font-size: 18px;"<<endl;
    cout<<"}"<<endl;
    cout<<".icon-acept {"<<endl;
    cout<<"    color: #00c851;"<<endl;
    cout<<"}"<<endl;
    cout<<".icon-sort-up {"<<endl;
    cout<<"    color: #ff8800;"<<endl;
    cout<<"}"<<endl;
    cout<<".icon-sort-down {"<<endl;
    cout<<"    color: #ffbb33;"<<endl;
    cout<<"}"<<endl;
    cout<<".icon-update {"<<endl;
    cout<<"    font-size: 17px;"<<endl;
    cout<<"    color: #33b5e5;"<<endl;
    cout<<"}"<<endl;
    cout<<"// check"<<endl;
    cout<<".mat-checkbox-indeterminate.mat-accent .mat-checkbox-background,"<<endl;
    cout<<".mat-checkbox-checked.mat-accent .mat-checkbox-background {"<<endl;
    cout<<"    background-color: #2bbaac !important;"<<endl;
    cout<<"}"<<endl;
    cout<<".mat-checkbox-checked:not(.mat-checkbox-disabled).mat-accent .mat-ripple-element,"<<endl;
    cout<<".mat-checkbox:active:not(.mat-checkbox-disabled).mat-accent .mat-ripple-element {"<<endl;
    cout<<"    background: #2bbaac !important;"<<endl;
    cout<<"}"<<endl;
    cout<<".mb-20 {"<<endl;
    cout<<"    margin-bottom: 20px;"<<endl;
    cout<<"}"<<endl;
    cout<<".box-shadow {"<<endl;
    cout<<"    box-shadow: 0 0.46875rem 2.1875rem rgba(4, 9, 20, 0.03), 0 0.9375rem 1.40625rem rgba(4, 9, 20, 0.03),"<<endl;
    cout<<"        0 0.25rem 0.53125rem rgba(4, 9, 20, 0.05), 0 0.125rem 0.1875rem rgba(4, 9, 20, 0.03);"<<endl;
    cout<<"}"<<endl;
    cout<<".button-system-custom.button-system-custom-footer {"<<endl;
    cout<<"    box-shadow: -4px 0px 0px 0px #e2e2e285;"<<endl;
    cout<<"}"<<endl;
    cout<<"// thêm mới"<<endl;
    cout<<".button-update,"<<endl;
    cout<<".button-destroy {"<<endl;
    cout<<"    padding: 6px 33px;"<<endl;
    cout<<"    border-color: #2bbbad;"<<endl;
    cout<<"    background: #2bbbad;"<<endl;
    cout<<"}"<<endl;
    cout<<".text-red {"<<endl;
    cout<<"    color: #ff0000;"<<endl;
    cout<<"    font-size: 17px;"<<endl;
    cout<<"}"<<endl;
    cout<<".mh-50 {"<<endl;
    cout<<"    min-height: 60px;"<<endl;
    cout<<"}"<<endl;



}


/**
* gen component
*/
void genComponent(string table, string tableUppercase, vector<string> result, int ans, string fileNameFormat){ 
	string fileName =  fileNameFormat + "/"+ fileNameFormat + ".component.ts";
	ofstream cout (fileName.c_str()); 
	  
	cout<<"import { Component, OnInit, Inject, ViewChild } from '@angular/core';	"<<endl;
	cout<<"import { ApiService } from '../../../common/api-service/api.service';	"<<endl;
	cout<<"import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';	"<<endl;
	cout<<"import { MatTableDataSource } from '@angular/material/table';      "<<endl;
	cout<<"import { MatPaginator } from '@angular/material/paginator';        "<<endl;
	cout<<"import { MatSort } from '@angular/material/sort';                  "<<endl;
	
	cout<<"import { Observable, Observer, Subscription } from 'rxjs';	"<<endl;
	cout<<"	"<<endl;
	cout<<"@Component({	"<<endl;
	cout<<"  selector: 'app-"<<fileNameFormat<<"',	"<<endl;
	cout<<"  templateUrl: './"<<fileNameFormat<<".component.html',	"<<endl;
	cout<<"  styleUrls: ['./"<<fileNameFormat<<".component.scss']	"<<endl;
	cout<<"})	"<<endl;
	cout<<"export class "<<tableUppercase<<"Component implements OnInit {	"<<endl;
	cout<<"	"<<endl;
	cout<<"  /** for table */	"<<endl;
	cout<<"  subscription: Subscription[] = [];	"<<endl;
	cout<<"	"<<endl;

	string param = "";
	for(int i=0;i<result.size();i++){
		if(i<result.size()-1){
			param +="'"+result[i]+"', ";
		}else{
			param +="'"+result[i]+"'";
		}
	}
	cout<<"  displayedColumns: string[] = ["<<param<<"];	"<<endl; 

	cout<<"	"<<endl;
	cout<<"  dataSource: MatTableDataSource<any>;	"<<endl;
	cout<<"	"<<endl;
	cout<<"  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;	"<<endl;
	cout<<"  @ViewChild(MatSort, { static: false }) sort: MatSort;	"<<endl;
	cout<<"	"<<endl;
	cout<<"  applyFilter(filterValue: string) {	"<<endl;
	cout<<"    this.dataSource.filter = filterValue.trim().toLowerCase();	"<<endl;
	cout<<"	"<<endl;
	cout<<"    if (this.dataSource.paginator) {	"<<endl;
	cout<<"      this.dataSource.paginator.firstPage();	"<<endl;
	cout<<"    }	"<<endl;
	cout<<"  }	"<<endl;
	cout<<"  /** for table */	"<<endl;
	cout<<"	"<<endl;
	cout<<"  constructor(	"<<endl;
	cout<<"    private api: ApiService,	"<<endl;
	cout<<"    public dialog: MatDialog	"<<endl;
	cout<<"  ) { }	"<<endl;
	cout<<"	"<<endl;
	cout<<"	"<<endl;
	cout<<"  ngOnInit() {	"<<endl;
	cout<<"	"<<endl;
	cout<<"    // get trains	"<<endl;
	cout<<"    this.get"<<tableUppercase<<"();	"<<endl;
	cout<<"  }	"<<endl;
	cout<<"	"<<endl;
	cout<<"  /**	"<<endl;
	cout<<"   * get Data get"<<tableUppercase<<"  	"<<endl;
	cout<<"   */	"<<endl;
	cout<<"  get"<<tableUppercase<<"() {	"<<endl;
	cout<<"    this.api.excuteAllByWhat({ 'idCompany': this.api.idCompany }, '"<<ans*10<<"')	"<<endl;
	cout<<"      .subscribe(data => {	"<<endl;  
	cout<<"        // set data for table	"<<endl;
	cout<<"        this.dataSource = new MatTableDataSource(data);	"<<endl;
	cout<<"        this.dataSource.paginator = this.paginator;	"<<endl;
	cout<<"        this.dataSource.sort = this.sort;	"<<endl;
	cout<<"      })	"<<endl;
	cout<<"	"<<endl;
	cout<<"  }	"<<endl;
	cout<<"	"<<endl;
	cout<<"  /**	"<<endl;
	cout<<"   * on insert data	"<<endl;
	cout<<"   * @param event 	"<<endl;
	cout<<"   */	"<<endl;
	cout<<"  onInsertData() {	"<<endl;
	cout<<"    const dialogRef = this.dialog.open("<<tableUppercase<<"Dialog, {	"<<endl;
	cout<<"      width: '400px',	"<<endl;
	cout<<"      data: { type: 0, id: 0 }	"<<endl;
	cout<<"    });	"<<endl;
	cout<<"	"<<endl;
	cout<<"    dialogRef.afterClosed().subscribe(result => { 	"<<endl;
	cout<<"      if (result) { 	"<<endl;
	cout<<"        this.get"<<tableUppercase<<"();	"<<endl;
	cout<<"      }	"<<endl;
	cout<<"    });	"<<endl;
	cout<<"  }	"<<endl;
	cout<<"	"<<endl;
	cout<<"  /**	"<<endl;
	cout<<"   * on update data	"<<endl;
	cout<<"   * @param event 	"<<endl;
	cout<<"   */	"<<endl;
	cout<<"  onUpdateData(row) {	"<<endl;
	cout<<"    const dialogRef = this.dialog.open("<<tableUppercase<<"Dialog, {	"<<endl;
	cout<<"      width: '400px',	"<<endl;
	cout<<"      data: { type: 1, input: row }	"<<endl;
	cout<<"    });	"<<endl;
	cout<<"	"<<endl;
	cout<<"    dialogRef.afterClosed().subscribe(result => { 	"<<endl;
	cout<<"      if (result) { 	"<<endl;
	cout<<"        this.get"<<tableUppercase<<"();	"<<endl;
	cout<<"      }	"<<endl;
	cout<<"    });	"<<endl;
	cout<<"  }	"<<endl;
	cout<<"}	"<<endl;
	cout<<"	"<<endl;
	cout<<"	"<<endl;
	cout<<"/**	"<<endl;
	cout<<" * Component show thông tin để insert hoặc update	"<<endl;
	cout<<" */	"<<endl;
	cout<<"@Component({	"<<endl;
	cout<<"  selector: '"<<fileNameFormat<<"-dialog',	"<<endl;
	cout<<"  templateUrl: '"<<fileNameFormat<<"-dialog.html',	"<<endl;
	cout<<"  styleUrls: ['./"<<fileNameFormat<<".component.scss']	"<<endl;
	cout<<"})	"<<endl;
	cout<<"export class "<<tableUppercase<<"Dialog implements OnInit {	"<<endl;
	cout<<"	"<<endl;
	cout<<"  observable: Observable<any>;	"<<endl;
	cout<<"  observer: Observer<any>;	"<<endl;
	cout<<"  type: number;	"<<endl;
	cout<<"  idCompany: number;	"<<endl;
	cout<<"	"<<endl;
	
	cout<<"  // init input value	"<<endl;
	cout<<"  input: any = {	"<<endl;
	
	for(int i=1;i<result.size();i++){
		cout<<"    "<<result[i]<<": '',	"<<endl;
	} 
	
	cout<<"  };	"<<endl;
	
	cout<<"	"<<endl;
	
	cout<<"  constructor(	"<<endl;
	cout<<"    public dialogRef: MatDialogRef<"<<tableUppercase<<"Dialog>,	"<<endl;
	cout<<"    @Inject(MAT_DIALOG_DATA) public data: any,	"<<endl;
	cout<<"    private api: ApiService	"<<endl;
	cout<<"  ) {	"<<endl;
	cout<<"    this.type = data.type;	"<<endl;
	cout<<"    this.input.idCompany = this.api.idCompany;	"<<endl;
	cout<<"	"<<endl;
	cout<<"    // nếu là update	"<<endl;
	cout<<"    if (this.type == 1) {	"<<endl;
	cout<<"      this.input = data.input;	"<<endl;
	cout<<"    }	"<<endl;
	cout<<"	"<<endl;
	cout<<"    console.log('data nhan duoc ', this.data);	"<<endl;
	cout<<"	"<<endl;
	cout<<"    // xử lý bất đồng bộ	"<<endl;
	cout<<"    this.observable = Observable.create((observer: any) => {	"<<endl;
	cout<<"      this.observer = observer;	"<<endl;
	cout<<"    });	"<<endl;
	cout<<"  }	"<<endl;
	cout<<"	"<<endl;
	cout<<"  /**	"<<endl;
	cout<<"   * ngOnInit	"<<endl;
	cout<<"   */	"<<endl;
	cout<<"  ngOnInit() {	"<<endl;
	cout<<"	"<<endl;
	cout<<"  }	"<<endl;
	cout<<"	"<<endl;
	cout<<"	"<<endl;
	cout<<"  /**	"<<endl;
	cout<<"   * on ok click	"<<endl;
	cout<<"   */	"<<endl;
	cout<<"  onOkClick(): void {	"<<endl;
	cout<<"    // convert data time	"<<endl;
	cout<<"    // this.input.born = new Date(this.input.born);	"<<endl;
	cout<<"    // this.input.born = this.api.formatDate(this.input.born);	"<<endl;
	cout<<"	"<<endl;
	cout<<"      this.api.excuteAllByWhat(this.input, ''+ Number("<<ans*10 + 1<<" + this.type) +'').subscribe(data => {	"<<endl;
	cout<<"        this.dialogRef.close(true);	"<<endl;
	cout<<"        this.api.showSuccess(\"Xử Lý Thành Công!\");	"<<endl;
	cout<<"      });	"<<endl;
	cout<<"  }	"<<endl;
	cout<<"	"<<endl;
	cout<<"  /**	"<<endl;
	cout<<"   * onDeleteClick	"<<endl;
	cout<<"   */	"<<endl;
	cout<<"  onDeleteClick() {	"<<endl;
	cout<<"    this.api.excuteAllByWhat(this.input, '"<<ans*10+3<<"').subscribe(data => {	"<<endl;
	cout<<"      this.dialogRef.close(true);	"<<endl;
	cout<<"      this.api.showSuccess(\"Xử Lý Xóa Thành Công!\");	"<<endl;
	cout<<"    });	"<<endl;
	cout<<"  }	"<<endl;
	cout<<"}	"<<endl;

}

/**
* gen module
*/
void genModule(string table, string tableUppercase, vector<string> result, string fileNameFormat){ 
	string fileName =  fileNameFormat + "/"+ fileNameFormat + ".module.ts";
	ofstream cout (fileName.c_str());
	  
  
	cout<<"import { NgModule } from '@angular/core';	"<<endl;
	cout<<"import { CommonModule } from '@angular/common';	"<<endl;
	cout<<"import { "<<tableUppercase<<"Component, "<<tableUppercase<<"Dialog } from './"<<fileNameFormat<<".component';	"<<endl;
	cout<<"import { TransferHttpCacheModule } from '@nguniversal/common';	"<<endl;
	cout<<"import { RouterModule } from '@angular/router';	"<<endl;
	cout<<"import { FormsModule, ReactiveFormsModule } from '@angular/forms';	"<<endl;
	cout<<"import { MatCardModule } from '@angular/material/card';              "<<endl;
	cout<<"import { MatCheckboxModule } from '@angular/material/checkbox';      "<<endl;
	cout<<"import { MatPaginatorModule } from '@angular/material/paginator';    "<<endl;
	cout<<"import { MatSelectModule } from '@angular/material/select';          "<<endl;
	cout<<"import { MatSortModule } from '@angular/material/sort';              "<<endl;
	cout<<"import { MatTableModule } from '@angular/material/table';            "<<endl;
	cout<<"import { MatInputModule } from '@angular/material/input';            "<<endl;
	cout<<"import { MatButtonModule } from '@angular/material/button';          "<<endl;
	cout<<"import {MatRadioModule} from '@angular/material/radio';              "<<endl;
	cout<<"import {MatDatepickerModule} from '@angular/material/datepicker';  "<<endl;  
	cout<<"import {MatNativeDateModule} from '@angular/material/core';        "<<endl;
	cout<<"import {MatDialogModule} from '@angular/material/dialog';          "<<endl;
	cout<<"	"<<endl;
	cout<<"@NgModule({	"<<endl;
	cout<<"  declarations: ["<<tableUppercase<<"Component, "<<tableUppercase<<"Dialog],	"<<endl;
	cout<<"  imports: [	"<<endl;
	cout<<"    TransferHttpCacheModule,	"<<endl;
	cout<<"    CommonModule,	"<<endl;
	cout<<"    RouterModule.forChild([	"<<endl;
	cout<<"      {	"<<endl;
	cout<<"        path: '', component: "<<tableUppercase<<"Component, children: [	"<<endl;
	cout<<"        ],	"<<endl;
	cout<<"      }	"<<endl;
	cout<<"    ]),	"<<endl;
	cout<<"    FormsModule,	"<<endl;
	cout<<"    ReactiveFormsModule,	"<<endl;
	cout<<"	"<<endl;
	cout<<"    MatInputModule,	"<<endl;
	cout<<"    MatDatepickerModule,	"<<endl;
	cout<<"    MatNativeDateModule,	"<<endl;
	cout<<"    MatSelectModule,	"<<endl;
	cout<<"    MatRadioModule,	"<<endl;
	cout<<"    MatDialogModule,	"<<endl;
	cout<<"    MatCardModule,	"<<endl;
	cout<<"    MatSortModule,	"<<endl;
	cout<<"    MatTableModule,	"<<endl;
	cout<<"    MatPaginatorModule,	"<<endl;
	cout<<"    MatButtonModule,	"<<endl;
	cout<<"    MatCheckboxModule,	"<<endl; 
	cout<<"  ],	"<<endl;
	cout<<"  entryComponents: ["<<tableUppercase<<"Dialog]	"<<endl;
	cout<<"})	"<<endl;
	cout<<"export class "<<tableUppercase<<"Module { }	"<<endl;

}

string formatNameFile(string table){
	string str="";
	for(int i=0;i<table.length()-1;i++){ 
		str+=tolower(table[i]);
		if(table[i+1]<97 && table[i+1]>64){
			str+="-";
		}
	}
	str+=table[table.length()-1];
	return str;
}

int main(){
	ifstream cin ("input-angular.txt");
	
	string s,temp,table, param1, param2, param3, param4,fileNameFormat;
	vector<string> result;
	int n,pos,ans=1;
	cin>>n;
	while(n--){
		cin>>s; 
		table = s.substr(0,s.find("(")); 
		
		char firstUpper = toupper(table[0]);
		string tableUppercase =  firstUpper + table.substr(1);
		
		
		temp = s.substr(s.find("(") +1 ,s.length()-1);
		result = split(temp,",");
		 
		// create directory
		fileNameFormat = formatNameFile(table); 
		int check; 
	    string dirname = fileNameFormat;  
	    mkdir(dirname.c_str());   
		
		// gen dialog html 
		genDialogHtml(table, tableUppercase, result, fileNameFormat);
		
		// gen html 
		genHtml(table, tableUppercase, result, fileNameFormat);
		
		// gen css
		genCss(table, tableUppercase, result, fileNameFormat); 
		
		// gen component
		genComponent(table, tableUppercase, result,ans, fileNameFormat);
		
		// gen module
		genModule(table, tableUppercase, result, fileNameFormat);
		
        ans++;
	} 
	return 0;
}

