import { Component } from '@angular/core';

interface IBranch {
  short_name: string; 
  long_name: string;
  address: string;
  sales_value: number; 
  invty_value: number;
  last_update: any;
}

interface IItem {item_name: string; icon: string; total_sales: string; sales_percentage: number}

@Component({
  templateUrl: 'salesBR.component.html',
  styleUrls: ['salesBR.component.scss']
})


export class SalesBRComponent {
  constructor() {
  }

  public branch: IBranch[] = [
    {
      short_name: 'Luzon', 
      long_name: 'Luzon Branch Inc.',
      address: 'Quezon Street, Brgy. Tutuban, Quezon City 6431',
      sales_value: 22,
      invty_value: 78,
      last_update: 'June 15, 2022'
    }, 
    {
      short_name: 'Visayas',
      long_name: 'Visayas Branch Inc.',
      address: 'Mactan Street, Brgy. Lapu Lapu, Cebu City, Cebu 8969',
      sales_value: 16,
      invty_value: 84,
      last_update: 'July 10, 2022'
    }, 
    {
      short_name: 'Mindanao',
      long_name: 'Mindanao Branch Inc.',
      address: 'Purok Nangka, Brgy. Arororgan, Marihatag, Surigao Del Sur 8954',
      sales_value: 33,
      invty_value: 67,
      last_update: 'August 11, 2022'
    },
    {
      short_name: 'Baclayon',
      long_name: 'Baclayon Branch Inc.',
      address: 'Purok 5, Brgy. Montana, Baclayon, Bohol 6301',
      sales_value: 44,
      invty_value: 56,
      last_update: 'January 05, 2022'
    }
  ]

  public item: IItem[] = [
    {
      item_name: 'Organic Search',
      icon: 'cibGoogle',
      total_sales: '191,235',
      sales_percentage: 56
    },
    {
      item_name: 'Facebook',
      icon: 'cibFacebook',
      total_sales: '51,223',
      sales_percentage: 15
    },
    {
      item_name: 'Twitter',
      icon: 'cibTwitter',
      total_sales: '37,564',
      sales_percentage: 11
    },
    {
      item_name: 'LinkedIn',
      icon: 'cibLinkedin',
      total_sales: '27,319',
      sales_percentage: 8
    },
    {
      item_name: 'Github',
      icon: 'cibGithub',
      total_sales: '89,319',
      sales_percentage: 59
    }
  ]

}
