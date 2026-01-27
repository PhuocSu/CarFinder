export interface NoticeCards {
  id: number;
  title: string;
  fileAttachment: string;
  content: string;
  isTemporarySave: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NoticeResponse {
  items: NoticeCards[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
