import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver, AfterContentInit, ComponentRef, TemplateRef } from '@angular/core';
import { AuthFormComponent } from './auth-form/auth-form.component'
import { User } from './auth-form/auth-form.interface';

@Component({
  selector: 'app-root',
  template: `

    <div>
      <button (click)="destroyComponent()">
        Destroy
      </button>
      <button (click)="moveComponent()">
        Move
      </button>
      <div #entry> </div>
      <template #tmpl let-name let-location="location">
        {{ name }} {{location}}
      </template>
    
    </div>
   
    <div>
      <ng-container 
        [ngTemplateOutlet]="tmpl"
        [ngTemplateOutletContext] ="ctx">
      </ng-container>
    </div>
   
  `
})
export class AppComponent implements AfterContentInit {
  component:ComponentRef<AuthFormComponent>
  
  @ViewChild('entry', { read: ViewContainerRef }) entry: ViewContainerRef;
  @ViewChild('tmpl') tmpl:TemplateRef<any>; 
  constructor(
    private resolver: ComponentFactoryResolver
  ) {} 
 
  ctx = {
    $implicit: 'Semarkand',
    location: 'Uzbekistan'
  }

  ngAfterContentInit(): void {
    //instanciate and inject template

    /*this.entry.createEmbeddedView(this.tmpl, {
      $implicit: 'Semarkand',
      location: 'Uzbekistan'
    })*/

    const authFormFactory = this.resolver
          .resolveComponentFactory(AuthFormComponent)
    
    this.entry.createComponent(authFormFactory);
    this.component = this.entry.createComponent(authFormFactory, 0);
    this.component.instance.title = "Create Account"; 
    this.component.instance.submitted.subscribe(this.loginUser) 
    
  }
  moveComponent() {
    this.entry.move(this.component.hostView, 1)
  }

  destroyComponent() {
    this.component.destroy()
  }

  loginUser(user: User) {
    console.log('Login', user);
  }

}