import { Component } from '@angular/core';
import { Employee } from './employees';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
  animations:[
    trigger('listAnimation',[

      transition('* => *',[

        query(':enter',style({opacity:0}),{optional:true}),

        query(':enter',stagger('300ms',[
          animate('1s ease-in',keyframes([
            style({opacity:0, transform:'translateY(-75px)', offset:0}),
            style({opacity:.5, transform:'translateY(35px)', offset:0.3}),
            style({opacity:1, transform:'translateY(0px)', offset:1}),
          ]))
        ]), {optional:true}),

        

      ])

    ])

  ]
})
export class ContactUsComponent {


  employees:Employee[]=[
    {id:1,name:"John Smith",position:"Branch Manager",email:"john.smith@andibank.com",phone:"555-1234"},
    {id:2,name:"Sarah Johnson",position:"Assistant Branch Manager",email:"sarah.johnson@andibank.com",phone:"555-5678"},
    {id:3,name:"Michael Lee",position:"Loan Officer",email:"michael.lee@andibank.com",phone:"555-9876"},
    {id:4,name:"Emily Chen",position:"Customer Service Representative",email:"emily.chen@andibank.com",phone:"555-4321"},
    {id:5,name:"David Brown",position:"Financial Advisor",email:"david.brown@andibank.com",phone:"555-6789"},
    {id:6,name:"Rachel Davis",position:"Teller",email:"rachel.davis@andibank.com",phone:"555-2345"},
    {id:7,name:"Ryan Rodriguez",position:"Mortgage Specialist",email:"ryan.rodriguez@andibank.com",phone:"555-7890"},
    {id:8,name:"Kimberly Wilson",position:"Investment Banker",email:"kimberly.wilson@andibank.com",phone:"555-3456"},
    {id:9,name:"James Thompson",position:"Business Banker",email:"james.thompson@andibank.com",phone:"555-9012"},
    {id:10,name:"Lisa Hernandez",position:"Credit Analyst",email:"lisa.hernandez@andibank.com",phone:"555-6543"},
    {id:11,name:"Andrew Kim",position:"Wealth Management Advisor",email:"andrew.kim@andibank.com",phone:"555-1987"},
    {id:12,name:"Amantha Lee",position:"Operations Manager",email:"amantha.lee@andibank.com",phone:"555-3210"}
  ]
}
