import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {UploadFormComponentComponent} from './upload-form-component/upload-form-component.component';
import {NZ_I18N} from 'ng-zorro-antd/i18n';
import {fr_FR} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import fr from '@angular/common/locales/fr';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NzTypographyModule} from "ng-zorro-antd/typography";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {NzUploadModule} from "ng-zorro-antd/upload";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzTagModule} from "ng-zorro-antd/tag";
import {NzNoAnimationModule} from "ng-zorro-antd/core/no-animation";
import {NzMessageService} from "ng-zorro-antd/message";

import {IconDefinition} from '@ant-design/icons-angular';

import {DeleteOutline, DownloadOutline, InboxOutline} from '@ant-design/icons-angular/icons';

const icons: IconDefinition[] = [DeleteOutline, DownloadOutline, InboxOutline];

registerLocaleData(fr);

@NgModule({
  declarations: [
    AppComponent,
    UploadFormComponentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzTypographyModule,
    NzFormModule,
    NzInputModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzCheckboxModule,
    NzUploadModule,
    NzIconModule.forRoot(icons),
    NzTagModule,
    NzNoAnimationModule
  ],
  providers: [{provide: NZ_I18N, useValue: fr_FR}, NzMessageService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
