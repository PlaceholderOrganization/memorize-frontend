# www.MemoryGym.dk (frontend)

## Gruppekontrakt

|                           |          |                                                   |
|---------------------------|:--------:|:--------------------------------------------------:|
| Lotte Face Eliasson       | lott4328 | [GitHub Profile](https://github.com/LotteEliasson) |
| Mikkel Olsen              | mikk39k3 | [GitHub Profile](https://github.com/Selmerr)       |
| Jakob Agger Johannessen   | jako894n | [GitHub Profile](https://github.com/jakobagger)    |
| Hannan Ahmed Mohamad Noor | hann7575 | [GitHub Profile](https://github.com/Hannanxnoor)   |
| Dan Viktor Jørgensen      | danx8076 | [GitHub Profile](https://github.com/davijoe)       |

## Project Setup

### Repos and Cloud
- 3 Static Web Apps on Azure to host **frontend** for each branch
- 3 Web Apps on **Azure** to host **backend** for each branch
- 2 Repositories. One for backend + one for frontend
- 1 VM on **Azure** to host a containerized **MySQL** database using **Docker**

### Branching Strategy
Our branching strategy incorporates several key elements commonly used in collaborative software development.

We use the <b>'main'</b> branch as our released codebase. For new developments, we create feature branches from our development branch. Once a feature is complete, we initiate a pull request to merge it into the <b>'development'</b> branch. This triggers automated builds and tests via GitHub Actions, and if successful, the changes are deployed to Azure Dev Web App service. When the sprint is complete, we deploy our successfully deployed development branch to our staging branch for further testing. When customer accepts the changes, we merge staging into main

<b>Key elements in strategy</b>
1. <b>Main Branch (live production)</b><br>
2. <b>Staging Branch (pre-production)</b><br>
3. <b>Development Branch (continous development)</b><br>
4. <b>Feature Branches</b>
5. <b>Pull Requests (Approval required from another team member)</b>
6. <b>Continuous Integration (CI) with GitHub Actions</b>
7. <b>Deployment with Azure Web App Service</b>
8. <b>Merging Staging into Master</b>

## Formalities

- **Daily Scrum Stand-up at 9am**
- **Workdays**: Monday - Friday
- **Work hours**: 09:00 to 16:00
- **Location**: Online or KEA
- **Customer Meetings**: Tuesdays - Exact time to scheduled no later than the preceding day.

### Meeting Discipline
- Agenda to be shared at least the day before the meeting.
- Everyone should be punctual.
- All members are expected to come prepared, having reviewed the agenda and any related materials.

### Contact
- **Primary Communication Channel**: Discord
- **Secondary Communication Channel**: Smoke signals / Telepathy
