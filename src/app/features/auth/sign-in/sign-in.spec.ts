import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SignInComponent } from './sign-in';

describe('SignInComponent', () => {
  let component: SignInComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SignInComponent, RouterTestingModule.withRoutes([])],
    });
    component = TestBed.createComponent(SignInComponent).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have empty username initially', () => {
    expect(component.username()).toBe('');
  });

  it('should have empty password initially', () => {
    expect(component.password()).toBe('');
  });

  it('should not be loading initially', () => {
    expect(component.isLoading()).toBe(false);
  });

  it('should have keepSignedIn as false', () => {
    expect(component.keepSignedIn()).toBe(false);
  });

  it('should have 3 stats', () => {
    expect(component.stats.length).toBe(3);
  });

  it('should have 3 features', () => {
    expect(component.features.length).toBe(3);
  });

  it('should have students stat with 18k+', () => {
    expect(component.stats[0].value).toBe('18k+');
    expect(component.stats[0].label).toBe('Students');
  });

  it('should have features with bgColors', () => {
    component.features.forEach(f => {
      expect(f.bgColor).toMatch(/^#[0-9A-F]{6}$/i);
    });
  });

  it('should not call signIn when username is empty', () => {
    component.username.set('');
    component.password.set('test');
    component.onSignIn();
    expect(component.isLoading()).toBe(false);
  });

  it('should not call signIn when password is empty', () => {
    component.username.set('test');
    component.password.set('');
    component.onSignIn();
    expect(component.isLoading()).toBe(false);
  });

  it('should update username signal', () => {
    component.username.set('newuser');
    expect(component.username()).toBe('newuser');
  });
});
