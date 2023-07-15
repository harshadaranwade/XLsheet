import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import {AfterViewInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  
})
export class AppComponent {
  title = 'xlassignment';
  displayedColumns: string[] = ['OrderDate','Region','City','Category','Product','Quantity','UnitPrice','TotalPrice'];
  dataSource!: MatTableDataSource<any> ;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;


  onFileChange(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (e: any) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      //======To get only specific sheet data=======//
      const sheetName='FoodSales';
      const worksheet=workbook.Sheets[sheetName];
      const databyname= XLSX.utils.sheet_to_json(worksheet);
      console.log(databyname);
      //======to iterate sheets and get all data console=====/
      // workbook.SheetNames.forEach(sheet=>{
      //   const data=XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
      //   console.log(data);
      // })
     // console.log(workbook);

      this.dataSource = new MatTableDataSource(databyname);
      console.log(this.dataSource);
         this.dataSource.paginator = this.paginator ;
         this.dataSource.sort  = this.sort;


      
    };
   

   
  }

  showdata(){
   
  }


  // importData() {

    
  //  // Do whatever you want with the imported data
  //   //console.log(this.dataSource);

  //   // Example: Save the imported data as a JSON file
  //   const jsonWorkbook = XLSX.utils.book_new();
  //   const jsonWorksheet = XLSX.utils.json_to_sheet(this.dataSource);
  //   XLSX.utils.book_append_sheet(jsonWorkbook, jsonWorksheet, 'FoodSales');
  //   const jsonBuffer = XLSX.write(jsonWorkbook, { type: 'array', bookType: 'xlsx' });
  //   const jsonData = new Blob([jsonBuffer], { type: 'application/octet-stream' });
  //   saveAs(jsonData, 'exported_data.xlsx');
  //   console.log(jsonData)
  // }
}
