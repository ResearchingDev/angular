import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DashboardService } from 'src/app/services/dashboard.service';

import {
  ApexAxisChartSeries,
  ApexNonAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexResponsive,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip,
  ApexTitleSubtitle,
  ApexGrid
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  responsive: ApexResponsive[];
  colors: string[];
  labels: string[];
  title: ApexTitleSubtitle;
  grid: ApexGrid;
};
@Component({
  selector: 'app-dashboard',
  standalone: true,
    imports: [RouterModule,ReactiveFormsModule,CommonModule,NgApexchartsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  year : any;
  chartOptions:any;
  constructor(public DashboardService:DashboardService){
    this.year = new Date().getFullYear();
    this.DashboardService.getDashboardClientData(this.year).subscribe((response:any)=>{
      this.chartInitialization(response);
    });
  }
  chartInitialization(response: any){
    this.chartOptions = {
      series: response,
      chart: {
        type: 'bar',
        height: 350
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept','Oct','Nov','Dec']
      },
      yaxis: {
        title: {
          text: 'Client Count'
        }
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return + val + ' persons added';
          }
        }
      }
    };
  }
}
