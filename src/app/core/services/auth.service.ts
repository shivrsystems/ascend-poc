import { Injectable, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly router = inject(Router);

  private readonly _user = signal<User | null>(null);

  readonly user = computed(() => this._user());
  readonly isAuthenticated = computed(() => this._user() !== null);

  signIn(username: string, _password: string): boolean {
    this._user.set({
      id: 'u1',
      name: 'John Doe',
      email: username || 'john.doe@atitesting.com',
      avatar: '',
      role: 'Admin',
      organizationId: 'org-1',
    });
    return true;
  }

  signOut(): void {
    this._user.set(null);
    this.router.navigate(['/sign-in']);
  }
}
