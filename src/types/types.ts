
export type TypesOfRoles = "Admin" | "Account Manager" | "Resource Manager" | "Staffer";

export type ActionType = "Create" | "Update" | "Delete";

export type Type = "Clients" | "Projects" | "Positions" | "Openings" | "Applications" | "People" | "Users";

export type ProjectStatus = "In Preparation" | "Active" | "Closed";

export type ClosedStatus = "Completed" | "Cancelled";

export type PostingType = "New Headcount" | "Backfill Replacement";

export type OpeningStatus = "New" | "Filled" | "Closed" | "In progress" | "On standby";

export type OpeningReason = "InProgress" | "OnStandby" | "Hired" | "Replacement" | "Budget Problem" | "Filled By Itself" |
"Filled By Another" | "No replied";

export type ApplicationStatus = "Accepted" | "Rejected" | "Scheduled For Interview" | "Waiting on Client Response" |
"On Hold";

export type Gender = "Male" | "Female" | "Nonbinary" | "Did Not Wanted To Say";

export type JobGrade = "C3" | "C4" | "C5" | "C6";

export type TechStack = "Java" | "React" | "Python" | "Automation" | "Golang" | "Javascript" | "NET" | "Angular" | 
"Appian" | "PowerApps" | "ManualTester" | "Kotlin" | "UX"| "iOS";

export type ProposedAction = "Project Search" | "Using In internal project" | "Upskilling CrossTraining" |
"Backup Shadow other projects" | "Resource Pool" | "No action required" | "Others" | "Attrition"; 

export type StatusReason = "In training" | "Induction orientation" | "Shadow resources" |
"Awaiting client confirmation joining" | "Maternity leave" | "Sabbatical other leave" | "Previous client attrition" |
"Previous client HCReduction" | "Transition between projects" | "No available projects" | "Internal project" |
"Moved to billing" | "Performance issues PIP" | "Other" | "Intern"; 


export type Division = "BRAZIL" | "MEXICO" | "CSA" | "USA";

export type Region = "CDMX" | "CUU" | "HMO" | "MID" | "SLP" | "CAMPINA" | "SAO PAULO" | "COLOMBIA" | "PERU" | "COSTA RICA" |
"ARGENTINA" | "DOMINICANA" | "DALLAS" | "PHOENIX";

export type PeopleStatus = "Pipeline" | "Bench" | "Billing";

export type EmployeeStatus = "On Hired" | "Layoff" | "Resigned";
