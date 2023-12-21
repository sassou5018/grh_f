import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { AuthService } from '../services/authservice/auth.service';
import { IUser } from '../interfaces/IAuth';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit {

    show=false;

    items!: MenuItem[];

    user: IUser | undefined;

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService, private authService: AuthService) { }


    logout(){
        this.authService.logout();
    }


    toggle(){
        this.show = !this.show;
    }

    ngOnInit(): void {
        this.user = this.authService.user;
    }

    ngOnChanges(){
        
    }

    ngAfterViewInit(){
        console.log("from topbar",this.authService.user);
    }
}
