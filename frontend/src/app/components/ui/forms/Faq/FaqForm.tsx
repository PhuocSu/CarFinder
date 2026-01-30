"use client";

import { Editor } from "@tinymce/tinymce-react";
import { Button, Flex, Input, message, Select, Typography } from "antd";
import { Category } from "@/enums/category.enum";
import { useRecoilState } from "recoil";
import useCreateFaqMutation from "@/app/api/faq/useCreateFaqMutation";
import React, { useEffect, useRef, useState } from "react";
import { faqFormState } from "@/store/faqStore.atom";
import { useRouter } from "next/navigation";
import { useUpdateFaqMutation } from "@/app/api/faq/useUpdateFaqMutation";
import { useFaqDetailQuery } from "@/app/api/faq/useFaqDetailQuery";
import faqUploadFile from "@/hooks/useFaqFileUpload";

const FAQ_CATEGORY_OPTIONS = [
  {
    value: Category.VEHICLE_AND_CONTRACT_PROCEDURE,
    label: "차량 및 계약 절차 관련",
  },
  { value: Category.CONTRACT_CONDITIONS, label: "계약 조건 관련" },
  { value: Category.PAYMENT_AND_COSTS, label: "결제/비용 관련" },
  { value: Category.VEHICLE_ACCEPTANCE, label: "인수관련" },
  { value: Category.OTHERS, label: "기타" },
];

interface FaqFormProps {
  faqId?: string | null;
}

const FaqForm = ({ faqId }: FaqFormProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const router = useRouter();
  const [faqForm, setFaqForm] = useRecoilState(faqFormState);
  const createFaqMutation = useCreateFaqMutation();
  const updateFaqMutation = useUpdateFaqMutation();
  const fetchFaqDetailQuery = useFaqDetailQuery(faqId || "");

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setFaqForm({
      title: "",
      content: "",
      fileAttachment: "",
      category: Category.VEHICLE_AND_CONTRACT_PROCEDURE,
      isTemporarySave: false,
    });
  }, []);

  useEffect(() => {
    if (fetchFaqDetailQuery.data && faqId) {
      setFaqForm({
        title: fetchFaqDetailQuery.data.title,
        content: fetchFaqDetailQuery.data.content,
        fileAttachment: fetchFaqDetailQuery.data.fileAttachment || "",
        category: fetchFaqDetailQuery.data.category,
        isTemporarySave: fetchFaqDetailQuery.data.isTemporarySave,
      });
    }
  }, [fetchFaqDetailQuery.data, faqId, setFaqForm]);

  console.log("FAQ form data:", fetchFaqDetailQuery.data);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFaqForm((prev) => ({
      ...prev,
      title: e.target.value,
    }));
  };

  const handleCategoryChange = (value: Category) => {
    setFaqForm((prev) => ({
      ...prev,
      category: value,
    }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const uploadedUrl = await faqUploadFile(file); // ✅ Gọi upload function

      setSelectedFile(file);
      setFaqForm((prev) => ({
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

  const handleContentChange = (content: string) => {
    setFaqForm((prev) => ({
      ...prev,
      content: content,
    }));
  };

  const handleConfirm = () => {
    if (faqId) {
      updateFaqMutation.mutate({
        id: faqId!,
        data: {
          ...faqForm,
          
          isTemporarySave: false,
        },
      });
    } else {
      createFaqMutation.mutate({
        ...faqForm,
      });
    }
  };

  const handleTemporarySave = () => {
    if (faqId) {
      updateFaqMutation.mutate({
        id: faqId!,
        data: {
          ...faqForm,
          isTemporarySave: true,
        },
      });
    } else {
      createFaqMutation.mutate({
        ...faqForm,
        isTemporarySave: true,
      });
    }
  };

  const handleCancel = () => {
    setFaqForm({
      title: "",
      content: "",
      fileAttachment: "",
      category: Category.VEHICLE_AND_CONTRACT_PROCEDURE,
      isTemporarySave: false,
    });
    router.back();
  };

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
        자주묻는 질문
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
              value={faqForm.title}
              onChange={handleTitleChange}
            />
          </Flex>

          {/* category */}
          <Flex align="center" gap={16} style={{ height: "40px" }}>
            <Typography.Text
              style={{ width: "100px", flexShrink: 0, display: "inline-block" }}
            >
              질문 주제
            </Typography.Text>

            <Select
              style={{
                height: "100%",
                width: "542px",
                display: "flex",
                justifyContent: "center",
              }}
              placeholder="질문의 주제를 선택해주세요."
              value={faqForm.category}
              onChange={handleCategoryChange}
              options={FAQ_CATEGORY_OPTIONS}
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
          value={faqForm.content}
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

export default FaqForm;
