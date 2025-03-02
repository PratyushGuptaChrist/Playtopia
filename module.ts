import {TooltipModule} from 'ngx-bootstrap/tooltip';

@NgModule({
    declaration: [AppComponent],
    imports: [TooltipModule, forRoot()],
    bootstrap: [AppComponent]
})
export class AppModule{}