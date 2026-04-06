import { Injectable, inject, computed } from '@angular/core';
import { OrganizationService } from './organization.service';
import { DashboardStats, Report, QuickAction, Activity } from '../models/dashboard.model';

const MOCK_STATS: Record<string, DashboardStats> = {
  'org-1': {
    totalStudents: 65, totalSites: 14, totalCourses: 3, scheduledEvaluations: 1256,
    newStudentsThisMonth: 3, newSitesThisMonth: 2, newCoursesThisMonth: 13, newEvaluationsThisMonth: 7,
  },
  'org-2': {
    totalStudents: 120, totalSites: 22, totalCourses: 8, scheduledEvaluations: 2340,
    newStudentsThisMonth: 8, newSitesThisMonth: 4, newCoursesThisMonth: 2, newEvaluationsThisMonth: 15,
  },
  'org-3': {
    totalStudents: 89, totalSites: 18, totalCourses: 5, scheduledEvaluations: 1890,
    newStudentsThisMonth: 5, newSitesThisMonth: 3, newCoursesThisMonth: 1, newEvaluationsThisMonth: 11,
  },
};

const MOCK_REPORTS: Record<string, Report[]> = {
  'org-1': [
    { id: 'r1', name: 'Q4 Financial Summary', updatedBy: 'Sarah Brown', updatedDate: 'Feb 5, 2025', status: 'COMPLETED', category: 'Finance' },
    { id: 'r2', name: 'Marketing Campaign Analysis', updatedBy: 'Sarah Brown', updatedDate: 'Feb 5, 2025', status: 'UNDER REVIEW', category: 'Marketing' },
    { id: 'r3', name: 'User Engagement Metrics', updatedBy: 'Sarah Brown', updatedDate: 'Feb 5, 2025', status: 'COMPLETED', category: 'Analytics' },
    { id: 'r4', name: 'Product Roadmap Review', updatedBy: 'Sarah Brown', updatedDate: 'Feb 5, 2025', status: 'COMPLETED', category: 'Finance' },
    { id: 'r5', name: 'Customer Satisfaction Survey', updatedBy: 'Sarah Brown', updatedDate: 'Feb 5, 2025', status: 'UNDER REVIEW', category: 'Product' },
    { id: 'r6', name: 'Security Audit Report', updatedBy: 'Sarah Brown', updatedDate: 'Feb 5, 2025', status: 'COMPLETED', category: 'Finance' },
    { id: 'r7', name: 'Q4 Financial Summary', updatedBy: 'Sarah Brown', updatedDate: 'Feb 5, 2025', status: 'UNDER REVIEW', category: 'Customer Success' },
    { id: 'r8', name: 'Q4 Financial Summary', updatedBy: 'Sarah Brown', updatedDate: 'Feb 5, 2025', status: 'COMPLETED', category: 'Finance' },
    { id: 'r9', name: 'Q4 Financial Summary', updatedBy: 'Sarah Brown', updatedDate: 'Feb 5, 2025', status: 'COMPLETED', category: 'Finance' },
    { id: 'r10', name: 'Annual Performance Report', updatedBy: 'John Doe', updatedDate: 'Jan 15, 2025', status: 'COMPLETED', category: 'HR' },
    { id: 'r11', name: 'Budget Allocation Review', updatedBy: 'Sarah Brown', updatedDate: 'Mar 1, 2025', status: 'UNDER REVIEW', category: 'Finance' },
    { id: 'r12', name: 'Student Retention Analysis', updatedBy: 'Mark Wilson', updatedDate: 'Feb 20, 2025', status: 'COMPLETED', category: 'Analytics' },
    { id: 'r13', name: 'Compliance Training Report', updatedBy: 'Sarah Brown', updatedDate: 'Feb 10, 2025', status: 'COMPLETED', category: 'Compliance' },
    { id: 'r14', name: 'Technology Infrastructure Review', updatedBy: 'Tech Team', updatedDate: 'Jan 28, 2025', status: 'UNDER REVIEW', category: 'IT' },
    { id: 'r15', name: 'Accreditation Preparation Report', updatedBy: 'Sarah Brown', updatedDate: 'Mar 5, 2025', status: 'COMPLETED', category: 'Compliance' },
  ],
  'org-2': [
    { id: 'r1', name: 'Enrollment Trends Report', updatedBy: 'Mike Chen', updatedDate: 'Mar 1, 2025', status: 'COMPLETED', category: 'Analytics' },
    { id: 'r2', name: 'Faculty Review Summary', updatedBy: 'Jane Smith', updatedDate: 'Feb 28, 2025', status: 'UNDER REVIEW', category: 'HR' },
    { id: 'r3', name: 'Research Grant Analysis', updatedBy: 'Mike Chen', updatedDate: 'Feb 25, 2025', status: 'COMPLETED', category: 'Finance' },
    { id: 'r4', name: 'Student Outcomes Report', updatedBy: 'Jane Smith', updatedDate: 'Feb 20, 2025', status: 'COMPLETED', category: 'Analytics' },
    { id: 'r5', name: 'Campus Safety Audit', updatedBy: 'Mike Chen', updatedDate: 'Feb 15, 2025', status: 'UNDER REVIEW', category: 'Compliance' },
    { id: 'r6', name: 'Technology Upgrade Plan', updatedBy: 'Tech Lead', updatedDate: 'Feb 10, 2025', status: 'COMPLETED', category: 'IT' },
    { id: 'r7', name: 'Budget Forecast Q2', updatedBy: 'Jane Smith', updatedDate: 'Mar 5, 2025', status: 'UNDER REVIEW', category: 'Finance' },
    { id: 'r8', name: 'Diversity & Inclusion Report', updatedBy: 'Mike Chen', updatedDate: 'Feb 8, 2025', status: 'COMPLETED', category: 'HR' },
    { id: 'r9', name: 'Library Resources Review', updatedBy: 'Jane Smith', updatedDate: 'Jan 30, 2025', status: 'COMPLETED', category: 'Operations' },
  ],
  'org-3': [
    { id: 'r1', name: 'Clinical Rotation Summary', updatedBy: 'Lisa Park', updatedDate: 'Mar 3, 2025', status: 'COMPLETED', category: 'Clinical' },
    { id: 'r2', name: 'Student Placement Report', updatedBy: 'Lisa Park', updatedDate: 'Feb 27, 2025', status: 'UNDER REVIEW', category: 'Analytics' },
    { id: 'r3', name: 'Facility Assessment', updatedBy: 'Tom Green', updatedDate: 'Feb 22, 2025', status: 'COMPLETED', category: 'Operations' },
    { id: 'r4', name: 'Instructor Evaluation', updatedBy: 'Lisa Park', updatedDate: 'Feb 18, 2025', status: 'COMPLETED', category: 'HR' },
    { id: 'r5', name: 'Accreditation Progress', updatedBy: 'Tom Green', updatedDate: 'Feb 12, 2025', status: 'UNDER REVIEW', category: 'Compliance' },
    { id: 'r6', name: 'Equipment Inventory', updatedBy: 'Lisa Park', updatedDate: 'Feb 5, 2025', status: 'COMPLETED', category: 'Operations' },
  ],
};

const QUICK_ACTIONS: QuickAction[] = [
  { id: 'qa1', label: 'Evaluation Reports', icon: 'description' },
  { id: 'qa2', label: 'Create Evaluation Form', icon: 'edit_note' },
  { id: 'qa3', label: 'Compliance Requirement', icon: 'verified_user' },
  { id: 'qa4', label: 'Add Course', icon: 'add' },
  { id: 'qa5', label: 'Active Students', icon: 'person_search' },
];

const MOCK_ACTIVITIES: Record<string, Activity[]> = {
  'org-1': [
    { id: 'a1', text: 'reports pending review', count: 3, timestamp: 'Updated 2 hours ago', color: 'green' },
    { id: 'a2', text: 'New compliance deadline added', timestamp: 'Yesterday', color: 'blue' },
    { id: 'a3', text: 'compliance checks passed', count: 85, timestamp: 'Yesterday', color: 'green' },
    { id: 'a4', text: 'reports pending review', count: 7, timestamp: 'Yesterday', color: 'amber' },
    { id: 'a5', text: 'New compliance deadline added', timestamp: 'Last week', color: 'blue' },
    { id: 'a6', text: 'reports pending review', count: 3, timestamp: 'Last week', color: 'amber' },
    { id: 'a7', text: 'scheduled evaluations reports', count: 3, timestamp: 'Last month', color: 'blue' },
    { id: 'a8', text: 'reports pending review', count: 7, timestamp: 'Last month', color: 'amber' },
  ],
  'org-2': [
    { id: 'a1', text: 'new student registrations', count: 12, timestamp: 'Updated 1 hour ago', color: 'green' },
    { id: 'a2', text: 'Course material updated', timestamp: '3 hours ago', color: 'blue' },
    { id: 'a3', text: 'faculty evaluations completed', count: 25, timestamp: 'Yesterday', color: 'green' },
    { id: 'a4', text: 'pending approvals', count: 4, timestamp: 'Yesterday', color: 'amber' },
    { id: 'a5', text: 'New research grant submitted', timestamp: 'Last week', color: 'blue' },
  ],
  'org-3': [
    { id: 'a1', text: 'clinical placements confirmed', count: 8, timestamp: 'Updated 30 mins ago', color: 'green' },
    { id: 'a2', text: 'Facility inspection scheduled', timestamp: '2 hours ago', color: 'blue' },
    { id: 'a3', text: 'student evaluations completed', count: 45, timestamp: 'Yesterday', color: 'green' },
    { id: 'a4', text: 'equipment maintenance requests', count: 3, timestamp: 'Last week', color: 'amber' },
  ],
};

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private readonly orgService = inject(OrganizationService);

  readonly stats = computed<DashboardStats>(() =>
    MOCK_STATS[this.orgService.currentOrgId()] ?? MOCK_STATS['org-1']
  );

  readonly reports = computed<Report[]>(() =>
    MOCK_REPORTS[this.orgService.currentOrgId()] ?? MOCK_REPORTS['org-1']
  );

  readonly quickActions = computed<QuickAction[]>(() => QUICK_ACTIONS);

  readonly activities = computed<Activity[]>(() =>
    MOCK_ACTIVITIES[this.orgService.currentOrgId()] ?? MOCK_ACTIVITIES['org-1']
  );
}
