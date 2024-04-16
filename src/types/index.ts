export interface Person {
  id: number;
  first_name: string;
  last_name: string;
  profile_picture: string;
  gender: string;
  phone: string;
  email: string;
  title: string;
  tech_stack: string;
  division: string;
  region: string;
  status: string;
  movement_reason: string;
}

export interface Opening {
  id: number;
  opening_status: string;
  opening_reason: string;
  start_date: Date;
  has_expiration_date: boolean;
  position_id: number;
  person_id: number;
  person: Person;
}

export interface Position {
  id: number;
  position_title: string;
  division: string;
  region: string;
  tech_stack: string;
  bill_rate: number;
  posting_type: string;
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
  general_status: string;
  positions: Position[];
  client_id: number;
}
