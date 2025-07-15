export interface PipedriveOwner {
  id: number;
  name: string;
  email: string;
  has_pic: number;
  pic_hash: string | null;
  active_flag: boolean;
  value: number;
}

export interface PipedriveOrganization {
  id: number;
  owner_id: PipedriveOwner;
  name: string;
  open_deals_count: number;
  related_open_deals_count: number;
  closed_deals_count: number;
  related_closed_deals_count: number;
  email_messages_count: number;
  people_count: number;
  activities_count: number;
  done_activities_count: number;
  undone_activities_count: number;
  files_count: number;
  notes_count: number;
  followers_count: number;
  won_deals_count: number;
  related_won_deals_count: number;
  lost_deals_count: number;
  related_lost_deals_count: number;
  active_flag: boolean;
  picture_id: string | null;
  country_code: string | null;
  first_char: string;
  update_time: string;
  delete_time: string | null;
  add_time: string;
  visible_to: string;
  next_activity_date: string | null;
  next_activity_time: string | null;
  next_activity_id: number | null;
  last_activity_id: number | null;
  last_activity_date: string | null;
  label: string | null;
  label_ids: string[];
  address: string;
  address_subpremise: string | null;
  address_street_number: string;
  address_route: string;
  address_sublocality: string | null;
  address_locality: string;
  address_admin_area_level_1: string | null;
  address_admin_area_level_2: string | null;
  address_country: string;
  address_postal_code: string;
  address_formatted_address: string;
  website: string | null;
  linkedin: string | null;
  industry: string | null;
  annual_revenue: number | null;
  employee_count: number | null;
  owner_name: string;
  cc_email: string;
  company_id: number;
  // Allow additional string keys for extensibility
  [key: string]: any;
}
