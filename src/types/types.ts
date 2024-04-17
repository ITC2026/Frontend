
export type TypesOfRoles = "Admin" | "Account" | "Resource" | "Staffer";

export type Action = "Create" | "Update" | "Delete";

export type Type = "Clients" | "Projects" | "Positions" | "Openings" | "Applications" | "People" | "Users";

export type ProjectStatus = "In Preparation" | "Active" | "Closed";

export type ClosedStatus = "Completed" | "Cancelled";

export type PostingType = "New Head Count" | "Back-Fill Replacement";

export type OpeningStatus = "New" | "Filled" | "Closed" | "In Progress" | "On Standby";

export type OpeningReason = "In Progress" | "On Standby" | "Hired" | "Replacement" | "Budget Problem" | "Filled By Itself" |
"Filled By Another" | "No replied";

export type ApplicationStatus = "Accepted" | "Schedule For Interview" | "Rejected";

export type Gender = "Male" | "Female" | "Nonbinary" | "Not Wanted To Say";

export type JobGrade = "C3"| "C4" | "C5" | "C6";

export type TechStack = "Java" | "React" | "Python" | "Automation" | "Golang" | "Javascript" | ".NET" | "Angular" | 
"Appian" | "PowerApps" | "Manual Tester" | "Kotlin" | "UX"| "iOS";

export type ProposedAction = "Project Search" | "Using In Internal Project" | "Upskilling Crosstraining" |
"Backup / Shadow other projects" | "Resouce Pool" | "No Action Required" | "Others" | "Attrition"; 

export type StatusReason = "In Training" | "Induction / Orientation" | "Shadow Resources" |
"Awaiting Client Confirmation Joining" | "Maternity Leave" | "Sabbatical / Other Leave" | "Previous Client Attrition" |
"Previous Client HC Reduction" | "Transition Between Projects" | "No Available Projects" | "Internal Project" |
"Moved To Billing" | "Performance Issues / PIP" | "Other" | "Intern"; 


export type Division = "BRAZIL" | "MEXICO" | "CSA" | "USA";

export type Region = "CDMX" | "CUU" | "HMO" | "MID" | "SLP" | "CAMPINA" | "SAO PAULO" | "COLOMBIA" | "PERU" | "COSTA RICA" |
"ARGENTINA" | "DOMINICANA" | "DALLAS" | "PHOENIX";

export type PeopleStatus = "Pipeline" | "Bench" | "Billing";

export type EmployeeStatus = "On Hired" | "Layoff" | "Resigned";
