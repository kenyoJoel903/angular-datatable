import { Component, OnInit  } from '@angular/core';

import { HttpClient, HttpResponse, HttpHeaders  } from '@angular/common/http';
import { UserTeam } from './_model/user-team';
import { DataTablesResponse } from './_model/_utils/table-response';
import { DatatableAttachments } from './_model/_utils/config-datatable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  dtOptions: any = {};
  teams: UserTeam[];



  constructor(private http: HttpClient){}

  ngOnInit(){
    let that = this;

    /*this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 3,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
console.log(dataTablesParameters);
        that.http.get<DataTablesResponse>("http://geoserver.geodir.co/builder.api/services/teams-dt",{
          headers: that.getHeaders(),
          params: dataTablesParameters
        }).subscribe(resp =>{
          console.log("DATATABLE",resp);
          that.teams = resp.data;
          callback({
            recordsTotal: resp.recordsTotal,
            recordsFiltered: resp.recordsFiltered,
            data: []
          });
        })
      },
      columns: [{data: 'id', name:'id'}]
    };*/
    this.dtOptions = {
      ajax: {
        url: "http://geoserver.geodir.co/builder.api/services/teams-dt",
        type: 'GET',
        headers: { 'Authorization': 'bearer a049e19d-c241-41f6-95b6-669166cbea7b' }
      },
      columns: [
          {data: 'id', title: 'N&deg;'},
          {data: 'layerDataPerfil.team.name', title: 'Equipo'},
          {data: 'user.username', title: 'Usuario'}
      ],
      columnDefs:[{
        "targets": 0,
        data: "id",
        "render": (data, type, row, meta)=>{
          return `<b>${data}</b>`;
        }
      }],
      select: true,
      dom: DatatableAttachments.dom,
      buttons:[
        'columnsToggle',
        'colvis',
        'copy',
        'excel',
        'print',
        {text: 'Mapas', extend: 'selectedSingle', className:'btn btnAttach2 ml-1', action: (e, dt, node, config)=>{
          let index = dt.row({selected: true }).index();
          let row = dt.row({selected: true }).context[0]["aoData"][index];
          that.listMapas(row._aData['id']);
        }}
      ],
      processing: true,
      serverSide: true,
      pagingType: 'full_numbers',
      pageLength: 10
    };
  }


  listMapas(id:number){
    console.log("mapas " , id);
  }

  private getHeaders(){
    let access_token = "a049e19d-c241-41f6-95b6-669166cbea7b";
    let headers = new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json');
    return headers;
  }

}
