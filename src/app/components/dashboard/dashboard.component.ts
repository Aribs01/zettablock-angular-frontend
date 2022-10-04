import { Component, OnInit } from '@angular/core';
import { ApiData } from 'src/app/schemas/data';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  allApiData: ApiData[] = []
  currentRows: ApiData[] = []

  totalNumberOfData: number = 0
  paginationBlocks: number = 0
  noOfRows: number = 10
  loading: boolean = false

  tiles:any[] = []
  activePage: number = 0
  more: [boolean] = [false]

  search: string = ''
  test: any
  userdata:any

  singleData: ApiData = {
    createdAt: new Date(),
    name: '',
    updatedAt: new Date(),
    type: '',
    id: '',
    operationName: '',
    description: '',
    variables: undefined,
    query: undefined,
  }
  apiDesc:boolean = false

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getApiDataFunction()
  }

  getApiDataFunction(){
    this.dataService.getApiData().subscribe((data)=>{
      this.allApiData = data
      this.totalNumberOfData = data.length
      this.paginationBlocks = Math.ceil(data.length/10)

      for(let no = 0; no < this.paginationBlocks; no++){
        this.tiles.push(no)
      }
      
    })
    this.getRows()
  }

  getRows(first:number=0){
    this.loading = true
    this.activePage = first
    setTimeout(() =>{
      if(this.allApiData){
        this.currentRows = this.allApiData.slice(first, this.noOfRows+first)
        this.loading = false
      }
    }, 1000)
  }

  viewMoreAction(){
    // console.log(item.id);
    if (this.more = [true]) {
      this.more = [false]
    }
    this.more = [true]
  }

  deleteApiData(item:any){
    this.singleData = {...item}
    // console.log(this.singleData);
    this.dataService.removeApiData(parseInt(this.singleData.id)).subscribe(()=>{
      // console.log("success");
      this.getApiDataFunction()
    })
  }

  editApiDescription(item:any){
    this.singleData = {...item}
    // console.log(this.singleData);
    this.apiDesc = true
  }

  transform(value: any, searchValue: any) {
    if (!searchValue) return value;
    return value.filter((v:any) => 
    v.name.toLowerCase().indexOf(searchValue.toLowerCase()) > -1 || 
    v.size.toLowerCase().indexOf(searchValue.toLowerCase()) > -1)

  }

}
