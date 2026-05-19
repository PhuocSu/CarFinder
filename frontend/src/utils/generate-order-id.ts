import { v4 as uuidv4 } from 'uuid';

export const generateOrderId = (): string => {
  // Kết quả: ORD-1747123456789-a1b2c3d4
  const timestamp = Date.now();
  const uuid = uuidv4().split('-')[0]; // lấy 8 ký tự đầu của UUID
  return `ORD-${timestamp}-${uuid}`;
};