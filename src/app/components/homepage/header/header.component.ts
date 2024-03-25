import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable, combineLatest } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LogoComponent } from "../logo/logo.component";
import { NavlistComponent } from "../navlist/navlist.component";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
    standalone: true,
    imports: [
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatListModule,
        MatIconModule,
        AsyncPipe,
        LogoComponent,
        NavlistComponent, CommonModule
    ]
})
export class HeaderComponent {
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    isTablet$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Tablet).pipe(
        map(result => result.matches),
        shareReplay()
    );

  isMobileDevice$: Observable<boolean> = combineLatest([this.isHandset$, this.isTablet$])
    .pipe(
      map(([isHandset, isTablet]) => isHandset || isTablet),
      shareReplay(1) // Ensure that subscribers share the same subscription and replay the last emission
    );

  
}
