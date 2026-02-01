import api from "@/lib/axios";

const useUploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await api.post("/faq/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data.url as string;
};

export default useUploadFile;