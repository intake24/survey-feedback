import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome.component';
import {WelcomeRoutingModule} from "./welcome-routing.module";
import {WelcomeFormComponent} from "./welcome-form/welcome-form.component";
import { ThanksComponent } from './thanks/thanks.component';
import {SharedModule} from "../shared/shared.module";
import { IconFrameComponent } from './icon-frame/icon-frame.component';

@NgModule({
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    SharedModule
  ],
  declarations: [WelcomeComponent, WelcomeFormComponent, ThanksComponent, IconFrameComponent]
})
export class WelcomeModule { }
