type TypesOfRoles = "Admin" | "Account Manager" | "Resource Manager" | "Staffer";

type ActionType = "Create" | "Update" | "Delete";

type Type = "Clients" | "Projects" | "Positions" | "Openings" | "Applications" | "People" | "Users";

type ProjectStatus = "In Preparation" | "Active" | "Closed";

type ClosedStatus = "Completed" | "Cancelled";

type PostingType = "New Headcount" | "Backfill Replacement";

type OpeningStatus = "New" | "Filled" | "Closed" | "In progress" | "On standby";

type OpeningReason = "InProgress" | "OnStandby" | "Hired" | "Replacement" | "Budget Problem" | "Filled By Itself" |
"Filled By Another" | "No replied";

type ApplicationStatus = "Accepted" | "Rejected" | "Scheduled For Interview" | "Waiting on Client Response" |
"On Hold";

type Gender = "Male" | "Female" | "Nonbinary" | "Did Not Wanted To Say";

type JobGrade = "C3" | "C4" | "C5" | "C6";

type TechStack = "Java" | "React" | "Python" | "Automation" | "Golang" | "Javascript" | "NET" | "Angular" | 
"Appian" | "PowerApps" | "ManualTester" | "Kotlin" | "UX"| "iOS";

type ProposedAction = "Project Search" | "Using In internal project" | "Upskilling CrossTraining" |
"Backup Shadow other projects" | "Resource Pool" | "No action required" | "Others" | "Attrition"; 

type StatusReason = "In training" | "Induction orientation" | "Shadow resources" |
"Awaiting client confirmation joining" | "Maternity leave" | "Sabbatical other leave" | "Previous client attrition" |
"Previous client HCReduction" | "Transition between projects" | "No available projects" | "Internal project" |
"Moved to billing" | "Performance issues PIP" | "Other" | "Intern"; 


type Division = "BRAZIL" | "MEXICO" | "CSA" | "USA";

type Region = "CDMX" | "CUU" | "HMO" | "MID" | "SLP" | "CAMPINA" | "SAO PAULO" | "COLOMBIA" | "PERU" | "COSTA RICA" |
"ARGENTINA" | "DOMINICANA" | "DALLAS" | "PHOENIX";

type PeopleStatus = "Pipeline" | "Bench" | "Billing";

type EmployeeStatus = "On Hired" | "Layoff" | "Resigned";
  
interface Person { 
id: number;
first_name: string;
last_name: string;
profile_picture: string;
gender: Gender; // Part of a type.
phone: string;
email: string;
title: string;
tech_stack: TechStack; // Part of a type.
division: Division; // Part of a type.
region: Region; // Part of a type.
status: PeopleStatus; // Part of a type.
movement_reason: string;
}

interface Opening {
id: number;
opening_status: OpeningStatus; // Part of a type.
opening_reason: OpeningReason; // Part of a type.
start_date: Date;
has_expiration_date: boolean;
position_id: number;
person_id: number;
person: Person;
}

interface Position {
id: number;
position_title: string;
division: Division; // Part of a type.
region: Region; // Part of a type.
tech_stack: TechStack; // Part of a type.
bill_rate: number;
posting_type: PostingType; // Part of a type.
is_cross_division: boolean;
is_exclusive: boolean;
working_hours: number;
openings: Opening[];
project_id: number;
}

interface Project {
id: number;
project_title: string;
project_description: string;
start_date: Date;
has_expiration_date: boolean;
general_status: ProjectStatus; // Part of a type.
positions: Position[];
client_id: number;
}

// Roles interface.
interface Role { 
id: number;
role_name: TypesOfRoles; // Part of a type.
users: User[];
}

// User Interface.
interface User {
id: number;
username: string;
password: string;
email: string;
division: Division; // Part of a type.
roles: Role[];
}

// RoleUserRelation interface.
interface RoleUserRelation { 
role_id: number; // Foreign key.
user_id: number; // Foreign key.
}

// Ticket Log interface.
interface TicketLog { 
id: number;
action: ActionType; // Part of a type.
user_id: number; // Foreign key.
entity_id: number; // Foreign key.
}

// Entity interface.
interface Entity {
id: number;
type: Type; // Part of a type.
isDeleted: boolean;
belongs_to_id: number; // Foreign key.
}

// Employee interface.
interface Employee {
id: number;
job_title: string;
salary: number;
job_grade: JobGrade; // Part of a type.
proposed_action: ProposedAction; // Part of a type.
employee_status: EmployeeStatus; // Part of a type.
employee_reason: StatusReason;
contract_start_date: Date; 
last_movement_at: Date;
person_id: number; // Foreign Key.
}

// Client interface.
interface Client {
id: number;
contract_pdf_url: string;
logo_url: string;
client_name: string;
client_desc: string;
high_growth: boolean;
division: Division; // Part of a type.
projects: Project[];
employees: Employee[];
}

// ClientEmployeeRelation interface.
interface ClientEmployeeRelation {
client_id: number; // Foreign key.
employee_id: number; // Foreign key.
}

// ExpirationDateProject interface.
interface ExpirationDateProject { // Falta. (ruta con minusculas)
id: number;
expiration_date: Date;
project_id: number; // Foreign key. 
}

// ClosedProject interface.
interface ClosedProject {
id: number;
closed_status: ClosedStatus; // Part of a type.
closed_reason: string;
project_id: number; // Foreign key.
}

// ExpirationDateOpening interface.
interface ExpirationDateOpening { 
id: number;
expiration_date: Date;
opening_id: number; // Foreign key.
}

// Applications interface.
interface Application {
id: number;
application_status: ApplicationStatus; // Part of a type,
position_id: number; // Foreign key.
person_id: number; // Foreign key.
}

// Candidate interface.
interface Candidate {
id: number;
expected_salary: number;
person_id: number; // Foreign key.
}


interface CreatePersonAttributes extends Optional<Person, 'id' | 'profile_picture' | 'movement_reason'> {}
interface CreateOpeningAttributes extends Optional<Opening, 'person_id' | 'person'> {}
interface CreatePositionAttributes extends Optional<Position, 'id'> {}
interface CreateProjectAttributes extends Optional<Project, 'id'> {}
interface CreateRoleAttributes extends Optional<Role, 'users'> {}
interface CreateUserAttributes extends Optional<User, 'id'> {}
interface createEmployeeAttributes extends Optional<Employee, 'id'> {}
interface CreateClientAttributes extends Optional<Client, 'employees'> {}
interface CreateCandidateAttributes extends Optional<Candidate, 'id'> {}
