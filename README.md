# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/00758670-21f5-4a78-b0af-5e5cab1a12b1

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/00758670-21f5-4a78-b0af-5e5cab1a12b1) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/00758670-21f5-4a78-b0af-5e5cab1a12b1) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## Modal Components Reference

### 1.  **Security Dashboard (`Dashboard.tsx`)**

*   **Element:** `+ New Incident` button
    *   **Modal Function:** New Incident Form
    *   **Fields:** Site selector, date/time picker, incident type dropdown, description textarea, involved parties input, submit button.
*   **Element:** `Report Incident` button (Quick Actions)
    *   **Modal Function:** (Same as `+ New Incident`)
*   **Element:** `Start Patrol` button
    *   **Modal Function:** Start Patrol Form
    *   **Fields:** Officer selector, route selector, start time, "Start" button.
*   **Element:** `Risk Assessment` button
    *   **Modal Function:** New Risk Assessment Form
    *   **Fields:** Site selector, date, assessor name, risk description, "Save" button.
*   **Element:** `Staff Schedule` button
    *   **Modal Function:** Staff Schedule Viewer
    *   **Fields:** Calendar or list view of staff schedules.

### 2.  **Site Management (`Sites.tsx`)**

*   **Element:** `+ Add New Site` button
    *   **Modal Function:** New Site Form
    *   **Fields:** Site name, address, contact person, "Save" button.
*   **Element:** Site Card (e.g., "Gerehu LDS Stake")
    *   **Modal Function:** Site Details Viewer
    *   **Fields:** Site details, assigned officers, recent incidents, patrol history.

### 3.  **Incident Management (`Incidents.tsx`)**

*   **Element:** `View Details` button
    *   **Modal Function:** Incident Details Viewer
    *   **Fields:** Full incident information, status history, involved parties, attachments.
*   **Element:** `Update Status` button
    *   **Modal Function:** Update Incident Status Form
    *   **Fields:** Status dropdown, notes textarea, "Save" button.

### 4.  **Patrol Management (`Patrols.tsx`)**

*   **Element:** `+ Schedule Patrol` button
    *   **Modal Function:** Schedule Patrol Form
    *   **Fields:** Officer selector, route selector, date/time picker, "Schedule" button.
*   **Element:** `View Route` button
    *   **Modal Function:** Patrol Route Viewer
    *   **Fields:** Map with route, list of checkpoints.
*   **Element:** `Details` button
    *   **Modal Function:** Patrol Details Viewer
    *   **Fields:** Full patrol information, officer, times, duration, checkpoint status.

### 5.  **Risk Management (`Risk.tsx`)**

*   **Element:** `+ Identify New Hazard` button
    *   **Modal Function:** New Hazard Form
    *   **Fields:** Site selector, location description, hazard description, risk level, "Save" button.
*   **Element:** `Update Status` button
    *   **Modal Function:** Update Hazard Status Form
    *   **Fields:** Status dropdown, mitigation notes, "Save" button.
*   **Element:** `View Details` button
    *   **Modal Function:** Hazard Details Viewer
    *   **Fields:** Full hazard information, location, description, mitigation actions.

### 6.  **Reports & Analytics (`Reports.tsx`)**

*   **Element:** `Generate Report` button
    *   **Modal Function:** Generate Report Form
    *   **Fields:** Report type, date range, sites, "Generate" button.
*   **Element:** `View Online` button
    *   **Modal Function:** Report Viewer
    *   **Fields:** Display of the selected report.

### 7.  **System Administration (`Admin.tsx`)**

*   **Element:** `+ Add User` button
    *   **Modal Function:** New User Form
    *   **Fields:** Name, email, role, assigned sites, "Save" button.
*   **Element:** `Edit User` button
    *   **Modal Function:** Edit User Form
    *   **Fields:** (Same as New User Form, pre-filled).
*   **Element:** `View Permissions` button
    *   **Modal Function:** User Permissions Viewer
    *   **Fields:** List of permissions for the user.
*   **Element:** `Deactivate` button
    *   **Modal Function:** Deactivate User Confirmation
    *   **Fields:** Confirmation message, "Deactivate" button.
*   **Element:** `Role Management` button
    *   **Modal Function:** Role Management Interface
    *   **Fields:** List of roles, permissions for each role, add/edit/delete role buttons.
*   **Element:** `System Settings` button
    *   **Modal Function:** System Settings Editor
    *   **Fields:** Various system-wide settings.
*   **Element:** `Audit Logs` button
    *   **Modal Function:** Audit Log Viewer
    *   **Fields:** Filterable list of system actions.

### 8.  **System Settings (`Settings.tsx`)**

*   **Element:** `Backup Now` button
    *   **Modal Function:** Backup Confirmation
    *   **Fields:** Confirmation message, "Backup" button.
*   **Element:** `API Configuration` button
    *   **Modal Function:** API Configuration Editor
    *   **Fields:** API keys, integration settings.
*   **Element:** `Database Settings` button
    *   **Modal Function:** Database Settings Editor
    *   **Fields:** Connection strings, other database settings.
*   **Element:** `Email Configuration` button
    *   **Modal Function:** Email Configuration Editor
    *   **Fields:** SMTP server settings, email templates.
*   **Element:** `System Logs` button
    *   **Modal Function:** System Log Viewer
    *   **Fields:** Filterable list of system logs.
