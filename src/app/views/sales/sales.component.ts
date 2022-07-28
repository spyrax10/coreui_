import { Component, OnInit } from '@angular/core';

import { SalesChartsData, IChartProps } from './sales-charts-data';

interface IType {variation: string;}
@Component({
  templateUrl: 'sales.component.html',
  styleUrls: ['sales.component.scss']
})
export class SalesComponent implements OnInit {
  constructor(private chartsData: SalesChartsData) {
  }

  public maxYear: number = new Date().getFullYear();
  public minYear : number = 2010;
  
  public year_range() {

    var ret_arr = [];

    for(let i = this.minYear; i <= this.maxYear; i++) {
      ret_arr.push(i);
    }
    ret_arr.sort((a, b) => b - a);
    return ret_arr;
  }

  public date_range(month: number = 0, year: number = 0) {
    month = month == 0 ? new Date().getMonth() : month;
    year = year == 0 ? new Date().getFullYear() : year;
    var ret_arr = [];

    for(let i = 1; i <= 7; i++) {
      let days: string = month.toString() + "/" + i.toString() + "/" + year.toString();
      ret_arr.push(days);
    }
    return ret_arr;
  }

  public type: IType[] = [
    {variation: 'Day'}, {variation: 'Month'}, {variation: 'Year'}
  ]
  
  public mainChart: IChartProps = {};
  public chart: Array<IChartProps> = [];

  ngOnInit(): void {
    this.initCharts();
  }

  initCharts(): void {
    this.mainChart = this.chartsData.mainChart;
  }

  setTrafficPeriod(value: string = '', year: number = 0, date_to: any = ''): void {

    this.SelectedType(value);
    this.SelectedYear(year);
    this.DateToChange(date_to);
    
    this.chartsData.initMainChart(
      value, year, 
      this.dateFrom, 
      date_to.value
    );
    this.initCharts();
  }

  selectedFilter = '';
  selectedYear = 0;
  dateFrom = '';
  dateTo: any = '';
	SelectedType(value: string): void {
		this.selectedFilter = value;
    this.dateFrom = '';
    this.dateTo = '';
	}

  SelectedYear(value: number) : void {
    this.selectedYear = value;
  }

  DateFromChange($event: any = '') {
    this.dateFrom = $event != '' ? this.parseDate($event.value) : '';
  }

  DateToChange($event: any = '') {
    this.dateTo = $event != '' ? this.parseDate($event.value) : '';
  }

  public parseDate(date: any) {
    var d = new Date(Date.parse(date));
    //Bug: Why Add 1 Month?
    return d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();
  }
}
