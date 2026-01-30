"use client";

import { useCreateNoticeMutation } from "@/app/api/notice/useCreationNoticeMutation";
import { useNoticeDetailQuery } from "@/app/api/notice/useNoticeDetailQuery";
import { useUpdateNoticeMutation } from "@/app/api/notice/useUpdateNoticeMutation";
import noticeUploadFile from "@/hooks/useNoticeFileUpload";
import { noticeFormState } from "@/store/noticeStore.atom";
import { Button, Flex, Form, Input, message, Typography } from "antd";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";

// Dynamic import với tắt SSR
const Editor = dynamic(
  () => import("@tinymce/tinymce-react").then((mod) => mod.Editor),
  { ssr: false },
);

interface NoticeFormProps {
  noticeId?: string | null;
}

const getFileNameFromUrl = (url: string) => {
  const urlObj = new URL(url);
  return urlObj.searchParams.get("filename") || url.split("/").pop();
};

const NoticeForm = ({ noticeId }: NoticeFormProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // giữ tên file đã chọn trên UI
  const router = useRouter();
  const createNoticeMutation = useCreateNoticeMutation();
  const updateNoticeMutation = useUpdateNoticeMutation();
  const fetchNoticeDetailQuery = useNoticeDetailQuery(noticeId || "");
  const [noticeForm, setNoticeForm] = useRecoilState(noticeFormState);

  const fileInputRef = useRef<HTMLInputElement>(null); //trường hợp: bạn upload xong nhưng input file vẫn giữ file cũ trong DOM

  useEffect(() => {
    setNoticeForm({
      title: "",
      content: "",
      fileAttachment: "",
      isTemporarySave: false,
    });
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNoticeForm((prev) => ({
      ...prev,
      title: e.target.value,
    }));
  };

  console.log("Form content:", noticeForm.content);

  const handleContentChange = (content: string) => {
    setNoticeForm((prev) => ({
      ...prev,
      content: content,
    }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const uploadedUrl = await noticeUploadFile(file); // ✅ Gọi upload function

      setSelectedFile(file);
      setNoticeForm((prev) => ({
        ...prev,
        fileAttachment: uploadedUrl, // ✅ Lưu URL đã upload
        fileAttachmentName: file.name,
      }));

      message.success("파일 업로드 성공!");
    } catch (error) {
      message.error("파일 업로드 실패");
      console.error("Upload error:", error);
    }
  };

  const handleConfirm = () => {
    if (noticeId) {
      // Update mode
      updateNoticeMutation.mutate(
        {
          id: noticeId!,
          data: {
            ...noticeForm,
            isTemporarySave: false,
          },
        },
        {
          onSuccess: () => {
            message.success("업데이트 성공!");
            router.push(`/notice`);
          },
          onError: (error: any) => {
            console.error("업데이트 실패:", error);
          },
        },
      );
    } else {
      // Create mode
      createNoticeMutation.mutate({
        ...noticeForm,
        isTemporarySave: false,
      });
    }
  };

  const handleTemporarySave = () => {
    if (noticeId) {
      updateNoticeMutation.mutate(
        {
          id: noticeId!,
          data: {
            ...noticeForm,
            isTemporarySave: true,
          },
        },
        {
          onSuccess: () => {
            message.success("업데이트 성공!");
            router.push(`/notice`);
          },
          onError: (error: any) => {
            console.error("업데이트 실패:", error);
          },
        },
      );
    } else {
      createNoticeMutation.mutate({
        ...noticeForm,
        isTemporarySave: true,
      });
    }
  };

  const handleCancel = () => {
    // Reset form khi cancel
    setNoticeForm({
      title: "",
      content: "",
      fileAttachment: "",
      isTemporarySave: false,
    });
    router.back();
  };

  useEffect(() => {
    if (fetchNoticeDetailQuery.data && noticeId) {
      setNoticeForm({
        title: fetchNoticeDetailQuery.data.title,
        content: fetchNoticeDetailQuery.data.content,
        fileAttachment: fetchNoticeDetailQuery.data.fileAttachment || "",
        fileAttachmentName:
          fetchNoticeDetailQuery.data.fileAttachmentName || "",
        isTemporarySave: fetchNoticeDetailQuery.data.isTemporarySave,
      });

      // Hiển thị tên gốc nếu có
      if (fetchNoticeDetailQuery.data.fileAttachmentName) {
        const fakeFile = new File(
          [],
          fetchNoticeDetailQuery.data.fileAttachmentName,
          { type: "image/jpeg" },
        );
        setSelectedFile(fakeFile);
      }
    }
  }, [fetchNoticeDetailQuery.data, noticeId, setNoticeForm]);

  return (
    <Flex vertical align="center" gap={"80px"} style={{ marginBottom: "80px" }}>
      <Typography.Text
        style={{
          width: "100%",
          textAlign: "center",
          color: "var(--base-fg-color-base-fg-70, #37373E)",
          fontSize: 28,
          fontFamily: "Noto Sans KR",
          fontWeight: "700",
          wordWrap: "break-word",
        }}
      >
        공지사항
      </Typography.Text>

      <Flex vertical gap={"40px"} style={{ width: "100%" }}>
        <Flex vertical gap={"16px"}>
          <Flex align="center" gap={16} style={{ height: "40px" }}>
            <Typography.Text
              style={{ width: "100px", flexShrink: 0, display: "inline-block" }}
            >
              글제목
            </Typography.Text>
            <Input
              placeholder="글제목을 입력해주세요."
              style={{ height: "100%" }}
              value={noticeForm.title}
              onChange={handleTitleChange}
            />
          </Flex>

          <Flex align="center" gap={16} style={{ height: "40px" }}>
            <Typography.Text
              style={{ width: "100px", flexShrink: 0, display: "inline-block" }}
            >
              파일첨부
            </Typography.Text>
            <input
              type="file"
              id="file-upload"
              ref={fileInputRef}
              hidden
              onChange={handleFileChange}
            />

            <Input
              placeholder="선택된 파일 없음"
              style={{ height: "100%", width: "458px" }}
              disabled
              readOnly
              value={selectedFile?.name || ""}
            />
            <Button
              data-icon="none"
              data-shownumber="true"
              data-size="middle"
              data-state="enabled"
              data-style="tertiary"
              style={{
                width: "75px",
                height: "100%",
                paddingLeft: 12,
                paddingRight: 12,
                background: "var(--button-tertiary-bg-enabled, white)",
                borderRadius: 2,
                outline:
                  "1px var(--button-tertiary-stroke-enabled, #CECED3) solid",
                outlineOffset: "-1px",
                justifyContent: "center",
                alignItems: "center",
                gap: 4,
                display: "inline-flex",
              }}
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              <div
                style={{
                  color: "var(--button-tertiary-fg-enabled, #666670)",
                  fontSize: 14,
                  fontFamily: "Noto Sans KR",
                  fontWeight: "700",
                  wordWrap: "break-word",
                }}
              >
                파일선택
              </div>
            </Button>
          </Flex>
        </Flex>

        <Editor
          apiKey="dttcf1ulrpqltrzmq790n50l71y4tde3gubprnr5siyurx8v"
          init={{
            plugins:
              "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
            toolbar:
              "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
          }}
          onEditorChange={handleContentChange}
          value={noticeForm.content}
        />
      </Flex>

      <Flex gap={10}>
        <Button
          data-icon="none"
          data-shownumber="true"
          data-size="large"
          data-state="enabled"
          data-style="primary"
          style={{
            width: "200px",
            height: "48px",
            paddingLeft: 16,
            paddingRight: 16,
            background: "var(--button-primary-bg-enabled, #2F2C4D)",
            borderRadius: 2,
            justifyContent: "center",
            alignItems: "center",
            gap: 4,
            display: "inline-flex",
          }}
          onClick={handleConfirm}
        >
          <span
            style={{
              color: "var(--button-primary-fg, white)",
              fontSize: 14,
              fontFamily: "Noto Sans KR",
              fontWeight: "700",
              wordWrap: "break-word",
            }}
          >
            확인
          </span>
        </Button>

        <Button
          data-icon="none"
          data-shownumber="true"
          data-size="large"
          data-state="enabled"
          data-style="secondary"
          style={{
            width: "200px",
            height: "48px",
            paddingLeft: 16,
            paddingRight: 16,
            background: "var(--button-secondary-bg-enabled, white)",
            borderRadius: 2,
            outline:
              "1px var(--button-secondary-stroke-enabled, #4F4C6B) solid",
            outlineOffset: "-1px",
            justifyContent: "center",
            alignItems: "center",
            gap: 4,
            display: "inline-flex",
          }}
          onClick={handleTemporarySave}
        >
          <span
            style={{
              color: "var(--button-secondary-fg-enabled, #4F4C6B)",
              fontSize: 14,
              fontFamily: "Noto Sans KR",
              fontWeight: "700",
              wordWrap: "break-word",
            }}
          >
            임시저장
          </span>
        </Button>

        <Button
          data-icon="none"
          data-shownumber="true"
          data-size="large"
          data-state="enabled"
          data-style="tertiary"
          style={{
            width: "200px",
            height: "48px",
            paddingLeft: 16,
            paddingRight: 16,
            background: "var(--button-tertiary-bg-enabled, white)",
            borderRadius: 2,
            outline: "1px var(--button-tertiary-stroke-enabled, #CECED3) solid",
            outlineOffset: "-1px",
            justifyContent: "center",
            alignItems: "center",
            gap: 4,
            display: "inline-flex",
          }}
          onClick={handleCancel}
        >
          <span
            style={{
              color: "var(--button-tertiary-fg-enabled, #666670)",
              fontSize: 14,
              fontFamily: "Noto Sans KR",
              fontWeight: "700",
              wordWrap: "break-word",
            }}
          >
            취소
          </span>
        </Button>
      </Flex>
    </Flex>
  );
};

export default NoticeForm;
