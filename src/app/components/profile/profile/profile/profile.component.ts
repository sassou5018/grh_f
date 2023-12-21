import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IUser } from 'src/app/interfaces/IAuth';
import { AuthService } from 'src/app/services/authservice/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [AuthService]
})
export class ProfileComponent{
  @Input() user!: IUser;

  @Output() logout = new EventEmitter<void>();


  logoutfn(){
    this.logout.emit();
  }
}
