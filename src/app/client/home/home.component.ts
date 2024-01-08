import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import {Chart, registerables} from 'node_modules/chart.js'
Chart.register(...registerables);
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  ngOnInit(): void {
    this.RenderChart();
    localStorage.removeItem("c")
  }

  
  RenderChart(){
    const myChart=new Chart("piechart",
    {
      type: 'line',
      data:{
        labels:['Jan','Feb','Mar','Apr','May','Jun',
        'Jul','Aug','Sep','Oct','Nov','Dec'
      ],
        datasets:[{
          label:'# of Approved Loans',
          data: [80,95,70,100,120,90,78,115,150,125,111,155],
          backgroundColor: [
            'rgba(255,99,132,0.2)',
            'rgba(54,162,235,0.2)',
            'rgba(255,206,86,0.2)',
            'rgba(75,192,192,0.2)',
            'rgba(153,102,255,0.2)',
            'rgba(255,159,64,0.2)',
            'rgba(255,99,132,0.2)',
            'rgba(54,162,235,0.2)',
            'rgba(255,206,86,0.2)',
            'rgba(75,192,192,0.2)',
            'rgba(153,102,255,0.2)',
            'rgba(255,159,64,0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54,162,235,1)',
            'rgba(255,206,86,1)',
            'rgba(75,192,192,1)',
            'rgba(153,102,255,1)',
            'rgba(255,159,64,1)',
            'rgba(255,99,132,0.2)',
            'rgba(54,162,235,0.2)',
            'rgba(255,206,86,0.2)',
            'rgba(75,192,192,0.2)',
            'rgba(153,102,255,0.2)',
            'rgba(255,159,64,0.2)'
          ],
          borderWidth:1
        }]
      },
      options:{
        scales:{
          y:{
            beginAtZero:true
          }
        }
      }
    },
    );

  }

}
