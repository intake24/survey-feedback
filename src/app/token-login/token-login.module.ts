import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TokenLoginComponent } from './token-login.component';
import {TokenLoginRoutingModule} from "./token-login-routing.module";

@NgModule({
  imports: [
    CommonModule,
    TokenLoginRoutingModule
  ],
  declarations: [TokenLoginComponent]
})
export class TokenLoginModule { }
