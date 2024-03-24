import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  $userSubscription!: Subscription;
  isUserAuthenticated: boolean = false;
  constructor() {}

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.$userSubscription.unsubscribe();
  }

  onLogout() {}
}
