export interface EventCards {
  id: number;
  title: string;
  subTitle: string;
  fileAttachment: string;
  fileAttachmentName?: string;
  startDate: string;
  endDate: string;
  content: string;
  isTemporarySave: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface EventResponse {
  items: EventCards[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  search: string;
}

export interface EventForm {
  title: string;
  subTitle: string;
  fileAttachment?: string;
  fileAttachmentName?: string;
  startDate: string;
  endDate: string;
  content: string;
  isTemporarySave?: boolean;
}
