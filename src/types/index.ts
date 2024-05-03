export interface Person {
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

export interface Opening {
  id: number;
  opening_status: OpeningStatus; // Part of a type.
  opening_reason: OpeningReason; // Part of a type.
  start_date: Date;
  has_expiration_date: boolean;
  position_id: number;
  person_id: number;
  person: Person;
}

export interface Position {
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

export interface Project {
  id: number;
  project_title: string;
  project_description: string;
  start_date: Date;
  has_expiration_date: boolean;
  general_status: ProjectStatus; // Part of a type.
  positions?: Position[];
  client_id: number;
  has_expiration?: Date;
  client_name?: string;
  expiration?: Date; 
}

// Roles interface.
export interface Role {
  id: number;
  role_name: TypesOfRoles; // Part of an Enum.
  users: User[];
}

// User Interface.
export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  division: Division; // Part of a type.
  roles: Role[];
}

// RoleUserRelation interface.
export interface RoleUserRelation {
  role_id: number; // Foreign key.
  user_id: number; // Foreign key.
}

// Ticket Log interface.
export interface TicketLog {
  ticket_id: number;
  action: Action; // Part of a type.
  user_id: number; // Foreign key.
  entity_id: number; // Foreign key.
}

// Entity interface.
export interface Entity {
  id: number;
  type: Type; // Part of a type.
  isDeleted: boolean;
  belongs_to_id: number; // Foreign key.
}

// Employee interface.
export interface Employee {
  id: number;
  job_title: string;
  salary: number;
  job_grade: JobGrade; // Part of a type.
  proposed_action: ProposedAction; // Part of en Enum.
  employee_status: EmployeeStatus; // Part of en Enum.
  employee_reason: StatusReason;
  contract_start_date: Date;
  last_movement_at: Date;
  person_id: number; // Foreign Key.
}

// Client interface.
export interface Client {
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
export interface ClientEmployeeRelation {
  client_id: number; // Foreign key.
  employee_id: number; // Foreign key.
}

// ExpirationDateProject interface.
export interface ExpirationDateProject {
  id: number;
  expiration_date: Date;
  project_id: number; // Foreign key.
}

// ClosedProject interface.
export interface ClosedProject {
  id: number;
  closed_status: ClosedStatus; // Part of a type.
  closed_reason: string;
  project_id: number; // Foreign key.
}

// ExpirationDateOpening interface.
export interface ExpirationDateOpening {
  id: number;
  expiration_date: Date;
  opening_id: number; // Foreign key.
}

// Applications interface.
export interface Application {
  id: number;
  application_status: ApplicationStatus; // Part of a type,
  position_id: number; // Foreign key.
  person_id: number; // Foreign key.
}

// Candidate interface.
export interface Candidate {
  id: number;
  expected_salary: number;
  person_id: number; // Foreign key.
}

// Bench interface.
export interface Bench {
  id: number;
  employee_id: number; // Foreign key.
  candidate_id: number; // Foreign key.
}

// Billing interface.
export interface Billing {
  id: number;
  employee_id: number; // Foreign key.
}
