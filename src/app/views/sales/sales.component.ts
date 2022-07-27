import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

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

  setTrafficPeriod(value: string = '', year: number = 0): void {
    this.SelectedType(value);
    this.SelectedYear(year);
    this.chartsData.initMainChart(value, year);
    this.initCharts();
  }

  selectedFilter = '';
  selectedYear = 0;
	SelectedType(value:string): void {
		this.selectedFilter = value;
	}

  SelectedYear(value:number) : void {
    this.selectedYear = value;
  }
}
