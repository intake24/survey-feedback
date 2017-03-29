import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WelcomeComponent} from './welcome.component';
import {WelcomeRoutingModule} from "./welcome-routing.module";
import {WelcomeFormComponent} from "./welcome-form/welcome-form.component";
import {ThanksComponent} from './thanks/thanks.component';
import {SharedModule} from "../shared/shared.module";
import {IconFrameComponent} from './icon-frame/icon-frame.component';
import {AnimateModule} from "../../animations/animate.module";
import {WelcomeModalComponent} from "./welcome-modal/welcome-modal.component";
import {BootstrapMaterialModule} from "../../bootstrap-material/bootstrap-material.module";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    SharedModule,
    AnimateModule,
    BootstrapMaterialModule,
    FormsModule
  ],
  declarations: [WelcomeComponent,
    WelcomeFormComponent,
    ThanksComponent,
    IconFrameComponent,
    WelcomeModalComponent]
})
export class WelcomeModule {
}
