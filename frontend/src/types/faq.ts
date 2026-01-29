import { Category } from "@/enums/category.enum";

export interface FaqCards {
  id: number;
  title: string;
  category: Category;
  fileAttachment: string;
  fileAttachmentName?: string;
  content: string;
  isTemporarySave: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FaqResponse {
  items: FaqCards[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  search: string;
}
