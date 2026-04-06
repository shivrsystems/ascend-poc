import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardComponent } from './dashboard';

describe('DashboardComponent', () => {
  let component: DashboardComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DashboardComponent, RouterTestingModule.withRoutes([])],
    });
    component = TestBed.createComponent(DashboardComponent).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have sep as default active tab', () => {
    expect(component.activeTab()).toBe('sep');
  });

  it('should have page 1 as default', () => {
    expect(component.currentPage()).toBe(1);
  });

  it('should have pageSize of 9', () => {
    expect(component.pageSize).toBe(9);
  });

  it('should have 4 stat cards', () => {
    expect(component.stats().length).toBe(4);
  });

  it('should have Total Students as first stat', () => {
    expect(component.stats()[0].label).toBe('Total Students');
    expect(component.stats()[0].value).toBe(65);
  });

  it('should switch tabs', () => {
    component.setTab('evaluation');
    expect(component.activeTab()).toBe('evaluation');
  });

  it('should reset page when switching tabs', () => {
    component.setPage(2);
    component.setTab('sep');
    expect(component.currentPage()).toBe(1);
  });

  it('should paginate reports correctly', () => {
    const reports = component.paginatedReports();
    expect(reports.length).toBeLessThanOrEqual(9);
  });

  it('should calculate total pages', () => {
    expect(component.totalPages()).toBeGreaterThanOrEqual(1);
  });

  it('should calculate total reports', () => {
    expect(component.totalReports()).toBe(15);
  });

  it('should return green for green activity color', () => {
    expect(component.getActivityColor('green')).toBe('#0F9255');
  });

  it('should return blue for blue activity color', () => {
    expect(component.getActivityColor('blue')).toBe('#1F72D0');
  });

  it('should return default color for unknown', () => {
    expect(component.getActivityColor('unknown')).toBe('#0F9255');
  });

  it('should set page correctly', () => {
    component.setPage(2);
    expect(component.currentPage()).toBe(2);
  });
});
