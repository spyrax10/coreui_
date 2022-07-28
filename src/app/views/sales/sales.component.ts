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

  public date_range() {
    //Bug: Why Add 1 Month?
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
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
    this.setSubTitle();

    this.chartsData.initMainChart(
      value, year, 
      this.dateFrom, 
      date_to.value
    );
    this.initCharts();
  }

  selectedFilter = '';
  selectedYear = 0;
  public dateFrom = '';
  public dateTo = '';
  subTitle = '';

  setSubTitle() {
    if (this.dateFrom != '' && this.dateTo != '') {
      this.subTitle = this.parseDate(this.dateFrom, true) + " - " + this.parseDate(this.dateTo, true);
    }
  }
	SelectedType(value: string): void {
		this.selectedFilter = value;
    this.subTitle = '';
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

  public parseDate(date: any, in_word: boolean = false) {
    var d = new Date(Date.parse(date));
    //Bug: Why Add 1 Month?
    if (in_word) {
      return d.toDateString();
    }
    else {
      return d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();
    }
  }
}
