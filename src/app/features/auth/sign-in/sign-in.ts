import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule, MatIconModule, MatCheckboxModule],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.scss',
})
export class SignInComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly username = signal('');
  readonly password = signal('');
  readonly keepSignedIn = signal(false);
  readonly isLoading = signal(false);

  readonly stats = [
    { value: '18k+', label: 'Students' },
    { value: '18k+', label: 'Courses' },
    { value: '99%', label: 'Uptime' },
  ];

  readonly features = [
    { icon: 'description', label: 'SEP & evaluation reports', bgColor: '#302F7A' },
    { icon: 'verified_user', label: 'Compliance tracking', bgColor: '#00473A' },
    { icon: 'trending_up', label: 'Real-time analytics', bgColor: '#5A3010' },
  ];

  onSignIn(): void {
    if (!this.username() || !this.password()) return;
    this.isLoading.set(true);
    setTimeout(() => {
      this.authService.signIn(this.username(), this.password());
      this.isLoading.set(false);
      this.router.navigate(['/dashboard']);
    }, 500);
  }
}
