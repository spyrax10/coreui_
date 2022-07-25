import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

import { SalesChartsData, IChartProps } from './sales-charts-data';

interface IType {
  variation: string;
}

@Component({
  templateUrl: 'sales.component.html',
  styleUrls: ['sales.component.scss']
})
export class SalesComponent implements OnInit {
  constructor(private chartsData: SalesChartsData) {
  }

  public type: IType[] = [
    {variation: 'Day'}, {variation: 'Month'}, {variation: 'Year'}, {variation: 'Brand'}
  ]
  
  public mainChart: IChartProps = {};
  public chart: Array<IChartProps> = [];

  ngOnInit(): void {
    this.initCharts();
  }

  initCharts(): void {
    this.mainChart = this.chartsData.mainChart;
  }

  setTrafficPeriod(value: string): void {
    this.chartsData.initMainChart(value);
    this.initCharts();
  }
}
