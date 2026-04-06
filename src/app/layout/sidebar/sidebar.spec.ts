import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SidebarComponent } from './sidebar';

describe('SidebarComponent', () => {
  let component: SidebarComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SidebarComponent, RouterTestingModule.withRoutes([])],
    });
    component = TestBed.createComponent(SidebarComponent).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not be expanded initially', () => {
    expect(component.isExpanded()).toBe(false);
  });

  it('should toggle to expanded', () => {
    component.toggle();
    expect(component.isExpanded()).toBe(true);
  });

  it('should toggle back to collapsed', () => {
    component.toggle();
    component.toggle();
    expect(component.isExpanded()).toBe(false);
  });

  it('should have 9 nav items', () => {
    expect(component.navItems.length).toBe(9);
  });

  it('should have Dashboard as first nav item', () => {
    expect(component.navItems[0].label).toBe('Dashboard');
  });

  it('should have Settings as last nav item', () => {
    expect(component.navItems[8].label).toBe('Settings');
  });

  it('should have routes starting with /', () => {
    component.navItems.forEach(item => {
      expect(item.route.startsWith('/')).toBe(true);
    });
  });

  it('should have icons for all nav items', () => {
    component.navItems.forEach(item => {
      expect(item.icon.length).toBeGreaterThan(0);
    });
  });

  it('should have unique routes', () => {
    const routes = component.navItems.map(i => i.route);
    expect(new Set(routes).size).toBe(routes.length);
  });

  it('should have Clinical Sites nav item', () => {
    const item = component.navItems.find(i => i.label === 'Clinical Sites');
    expect(item).toBeTruthy();
    expect(item?.route).toBe('/clinical-sites');
  });

  it('should have Curriculum nav item', () => {
    const item = component.navItems.find(i => i.label === 'Curriculum');
    expect(item).toBeTruthy();
    expect(item?.route).toBe('/curriculum');
  });
});
