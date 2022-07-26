import { Injectable } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/utils/src';
import { SalesComponent } from './sales.component';
import { SwalService } from '../../../_services/swal-service';
import { ApiHttpService } from '../../../_services/api-http.service';
import { Constants } from '../../../_config/constant';

export interface IChartProps {
  data?: any;
  labels?: any;
  options?: any;
  colors?: any;
  type?: any;
  legend?: any;

  [propName: string]: any;
}


@Injectable({
  providedIn: 'any'
})
export class SalesChartsData {

  constructor(public swalService: SwalService, public api: ApiHttpService) {
    this.initMainChart();
  }

  public mainChart: IChartProps = {};

  public random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  initMainChart(period: string = 'Month', year: number = 0, 
    date_from: string = '', date_to: string = '') {

    const saleFunction = new SalesComponent(this);

    const brandSuccess = getStyle('--cui-success') ?? '#4dbd74';
    const brandInfo = getStyle('--cui-info') ?? '#20a8d8';
    const brandInfoBg = hexToRgba(getStyle('--cui-info'), 10) ?? '#20a8d8';
    const brandDanger = getStyle('--cui-danger') || '#f86c6b';
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday',
      'Friday', 'Saturday', 'Sunday'
    ];

    let labels: string[] = [];
    if (period === 'Month') {
      labels = months;
    }
    else if (period == 'Year') {
      if (year == 0) {
        saleFunction.year_range().forEach(element => {
          labels.push(element.toString());
        });
      }
      else {
        labels = months;
      }
    }
    else {

      if (date_from == '' && date_to == '') {
        saleFunction.date_range().forEach(element => {
          labels.push(element);
        });
      }
      else {
      
        if (new Date(date_to) > new Date(date_from)) {

          let currentDate = new Date(date_from);

          while (currentDate <= new Date(date_to)) {
            labels.push(saleFunction.parseDate(new Date(currentDate)));
            currentDate.setDate(currentDate.getDate() + 1);
          }
        }
        else {
          this.swalService.commonSwalEnd(
            'Invalid Date Range!',
            'warning'
          );
          saleFunction.date_range().forEach(element => {
            labels.push(element);
          });
        }
      }
    }

    // mainChart
    this.mainChart['elements'] = labels.length > 0 ? labels.length : 12;
    this.mainChart['Data1'] = [];
    this.mainChart['Data2'] = [];
    this.mainChart['Data3'] = [];
  
    // generate random values for mainChart
    for (let i = 0; i <= this.mainChart['elements']; i++) {
      this.mainChart['Data1'].push(this.random(50, 240));
      this.mainChart['Data2'].push(this.random(20, 160));
      this.mainChart['Data3'].push(65);
    }

    const colors = [
      {
        // brandInfo
        backgroundColor: brandInfoBg,
        borderColor: brandInfo,
        pointHoverBackgroundColor: brandInfo,
        borderWidth: 2,
        fill: true
      },
      {
        // brandSuccess
        backgroundColor: 'transparent',
        borderColor: brandSuccess || '#4dbd74',
        pointHoverBackgroundColor: '#fff'
      },
      {
        // brandDanger
        backgroundColor: 'transparent',
        borderColor: brandDanger || '#f86c6b',
        pointHoverBackgroundColor: brandDanger,
        borderWidth: 1,
        borderDash: [8, 5]
      }
    ];

    const datasets = [
      {
        data: this.mainChart['Data1'],
        label: 'Current',
        ...colors[0]
      },
      {
        data: this.mainChart['Data2'],
        label: 'Previous',
        ...colors[1]
      },
      {
        data: this.mainChart['Data3'],
        label: 'BEP',
        ...colors[2]
      }
    ];

    const plugins = {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          labelColor: function(context: any) {
            return {
              backgroundColor: context.dataset.borderColor
            };
          }
        }
      }
    };

    const options = {
      maintainAspectRatio: false,
      plugins,
      scales: {
        x: {
          grid: {
            drawOnChartArea: false
          }
        },
        y: {
          beginAtZero: true,
          max: 250,
          ticks: {
            maxTicksLimit: 5,
            stepSize: Math.ceil(250 / 5)
          }
        }
      },
      elements: {
        line: {
          tension: 0.4
        },
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3
        }
      }
    };

    this.mainChart.type = 'line';
    this.mainChart.options = options;
    this.mainChart.data = {
      datasets,
      labels
    };
  }

}
