import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/api.services/author.Service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent  implements OnInit {

  @Output() close =new EventEmitter()
  constructor(private authServce:AuthService) { }

  ngOnInit() {}

  onClose(){
    this.close.emit()
  }
  onLogout(){
    this.authServce.logout()
    this.close.emit()
    window.location.reload();
    
  }
}
