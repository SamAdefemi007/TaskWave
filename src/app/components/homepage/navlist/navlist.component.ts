import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { Observable, combineLatest, map, shareReplay } from 'rxjs';

@Component({
  selector: 'app-navlist',
  standalone: true,
  imports: [MatListModule, CommonModule],
  templateUrl: './navlist.component.html',
  styleUrl: './navlist.component.css'
})
export class NavlistComponent {

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
