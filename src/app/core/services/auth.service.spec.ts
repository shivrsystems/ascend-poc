import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  const navigate = vi.fn().mockResolvedValue(true);

  beforeEach(() => {
    navigate.mockClear();
    TestBed.configureTestingModule({
      providers: [{ provide: Router, useValue: { navigate } }],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not be authenticated initially', () => {
    expect(service.isAuthenticated()).toBe(false);
  });

  it('should have null user initially', () => {
    expect(service.user()).toBeNull();
  });

  it('should authenticate on signIn', () => {
    service.signIn('test@test.com', 'password');
    expect(service.isAuthenticated()).toBe(true);
  });

  it('should set user on signIn', () => {
    service.signIn('test@test.com', 'password');
    expect(service.user()).not.toBeNull();
    expect(service.user()?.name).toBe('John Doe');
  });

  it('should set email from username on signIn', () => {
    service.signIn('admin@ati.com', 'password');
    expect(service.user()?.email).toBe('admin@ati.com');
  });

  it('should default email when username is empty', () => {
    service.signIn('', 'password');
    expect(service.user()?.email).toBe('john.doe@atitesting.com');
  });

  it('should set role as Admin', () => {
    service.signIn('test', 'pass');
    expect(service.user()?.role).toBe('Admin');
  });

  it('should return true from signIn', () => {
    const result = service.signIn('user', 'pass');
    expect(result).toBe(true);
  });

  it('should clear user on signOut', () => {
    service.signIn('test', 'pass');
    expect(service.isAuthenticated()).toBe(true);
    service.signOut();
    expect(service.isAuthenticated()).toBe(false);
    expect(service.user()).toBeNull();
  });

  it('should set organizationId to org-1', () => {
    service.signIn('test', 'pass');
    expect(service.user()?.organizationId).toBe('org-1');
  });

  it('should have user id u1', () => {
    service.signIn('test', 'pass');
    expect(service.user()?.id).toBe('u1');
  });
});
