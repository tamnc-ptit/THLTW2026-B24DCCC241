export type MemberRole = "member" | "leader" | "vice" | "admin";
export type ClubStatus = boolean; // true = hoạt động, false = ngừng
export type Status = "pending" | "approved" | "rejected";

export interface Application {
  id: number;
  name: string;
  email: string;
  phone?: string;
  clubId: number;
  joinDate: string;    
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  note?: string;
}
export interface Club {
  id: number;
  name: string;
  avatar?: string; // optional để tránh lỗi khi chưa có ảnh
  foundedDate: string; // ISO string (yyyy-mm-dd)
  descriptionHtml: string; // lưu HTML
  president: string;
  isActive: ClubStatus;
}

export interface Member {
  id: number;
  name: string;
  email: string;
  phone: string;
  joinDate: string; // ISO string
  role: MemberRole;
  clubId: number;
}


export interface ClubFormValues {
  name: string;
  avatar?: string;
  foundedDate: string;
  descriptionHtml: string;
  president: string;
  isActive: ClubStatus;
}

export interface ClubFilter {
  keyword?: string;
  isActive?: ClubStatus;
  president?: string;
  fromDate?: string;
  toDate?: string;
  sortBy?: "name" | "foundedDate";
  order?: "asc" | "desc";
}


export interface ClubState {
  clubs: Club[];
  loading: boolean;
  selectedClub?: Club;
}


export interface MemberState {
  members: Member[];
  loading: boolean;
}


export interface ClubTableProps {
  data: Club[];
  loading?: boolean;
  onEdit: (club: Club) => void;
  onDelete: (id: number) => void;
  onViewMembers: (club: Club) => void;
}


export interface ClubFormModalProps {
  open: boolean;
  initialValues?: Club;
  onSubmit: (values: ClubFormValues) => void;
  onCancel: () => void;
}


export interface MemberListModalProps {
  open: boolean;
  members: Member[];
  loading?: boolean;
  onClose: () => void;
}