import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-tab',
  templateUrl: './order-tab.component.html',
  styleUrls: ['./order-tab.component.scss'],
})
export class OrderTabComponent  implements OnInit {
  @Output() close=new EventEmitter()
  @Input() orderId:any
  constructor(private router:Router) { }

  ngOnInit() {}

  onClose(){
    this.close.emit()
  }
  goTo(){
    this.router.navigate(['order-details',this.orderId])
    this.close.emit()
  }
}
