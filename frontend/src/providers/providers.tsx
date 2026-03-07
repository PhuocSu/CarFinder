'use client';

import { useInitAuth } from '@/hooks/useInitAuth';
import useInitCompareCars from '@/hooks/useInitCompareCars';
import useInitFavoriteCars from '@/hooks/useInitFavoriteCars';
import { useAuthSync } from '@/hooks/useAuthSync';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';

function InitApp() {
  // Khởi tạo trạng thái xác thực từ localStorage
  // Đảm bảo user đăng nhập vẫn được giữ sau khi refresh trang
  useInitAuth();
  useAuthSync();

  // Khởi tạo danh sách xe yêu thích từ localStorage và API
  // Đảm bảo trạng thái favorite được đồng bộ và hiển thị đúng
  useInitFavoriteCars();

  useInitCompareCars();
  return null;
}

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <InitApp />
        {children}
      </QueryClientProvider>
    </RecoilRoot>
  );
}