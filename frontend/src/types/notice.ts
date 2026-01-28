export interface NoticeCards {
  id: number;
  title: string;
  fileAttachment: string;
  fileAttachmentName?: string;
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
  search: string;
}

export interface NoticeForm {
  title: string;
  fileAttachment?: string;
  fileAttachmentName?: string;
  content: string;
  isTemporarySave?: boolean;
}
