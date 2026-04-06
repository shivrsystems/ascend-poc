# /add-org-data — Add a new organization with mock data

Add a new organization to the per-org data switching system.

## Usage
Provide the organization name and short name.

## Steps

1. Add the organization to `src/app/core/services/organization.service.ts`:
   - Add new entry to the organizations array with unique id (e.g., `org-4`)

2. Add mock data for the new org in each service:
   - `src/app/core/services/dashboard.service.ts` — Add stats, reports, activities
   - `src/app/core/services/clinical-sites.service.ts` — Add clinical sites
   - `src/app/core/services/curriculum.service.ts` — Add curricula

3. Follow the existing data patterns:
   - Dashboard stats: totalStudents, totalSites, totalCourses, scheduledEvaluations + monthly changes
   - Reports: id, name, updatedBy, updatedDate, status (COMPLETED/UNDER REVIEW), category
   - Clinical Sites: id, name, location, status (ACTIVE/INACTIVE/BALANCED), students, courses, optional alerts
   - Curricula: id, name, createdDate, lastUpdated, studyOptions, status (PUBLISHED/DRAFT)

4. Update tests to account for new org:
   - Update any tests that assert exact org counts

5. Run `npm run test:unit` and `npm run build`
