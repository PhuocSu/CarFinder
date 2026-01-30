import { Category } from "@/enums/category.enum";

// đẻ get => hiển thị
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

// để get
export interface FaqResponse {
  items: FaqCards[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  search: string;
}

// để post
export interface FaqForm {
  title: string;
  category: Category;
  fileAttachment?: string;
  content: string;
  isTemporarySave?: boolean;
}
