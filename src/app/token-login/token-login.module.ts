import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TokenLoginComponent} from './token-login.component';
import {TokenLoginRoutingModule} from './token-login-routing.module';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    TokenLoginRoutingModule,
    SharedModule
  ],
  declarations: [TokenLoginComponent]
})
export class TokenLoginModule { }
