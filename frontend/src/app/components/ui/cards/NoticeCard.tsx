"use client";



import { Button, Flex, Image, Typography } from "antd";

import { NoticeCards } from "@/types/notice";

import { useRouter } from "next/navigation";

import api from "@/lib/axios";

import { useState } from "react";

import NoticeDeleteAcceptModal from "../notice_Event_Faq/notice/NoticeDeleteAcceptModal";

import { useDeleteNoticeMutation } from "@/app/api/notice/useDeleteNoticeMutation";



interface NoticeCardProps {

  notice: NoticeCards;

}



const NoticeCard = ({ notice }: NoticeCardProps) => {

  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const deleteMutation = useDeleteNoticeMutation();



  const handleDeleteModalOpen = () => {

    setIsModalOpen(true);

  };



  const handleDeleteModalClose = () => {

    setIsModalOpen(false);

  };



  const handleDeleteModalConfirm = () => {

    deleteMutation.mutate(notice.id, {

      onSuccess: () => {

        setIsModalOpen(false);

      },

    });

  };



  const handleEdit = () => {

    router.push(`/notice/write?id=${notice.id}`);

  };



  return (

    <Flex

      vertical

      style={{

        width: "100%",

        height: "100%",

        padding: "5px 0",

      }}

    >

      <Flex

        style={{

          width: "100%",

          paddingTop: 16,

          paddingBottom: 16,

          borderBottom: "1px solid #E0E0E3",

          gap: 12,

        }}

        align="center"

        justify="space-between"

      >

        {/* Left content */}

        <Flex

          vertical

          style={{ flex: 1, gap: 12 }}

          align="center"

          justify="center"

        >

          <Flex

            style={{ width: "100%" }}

            justify="space-between"

            align="center"

          >

            <Flex

              style={{

                display: "flex",

                flexDirection: "row",

                alignItems: "center",

                gap: 8,

              }}

            >

              <Typography.Text

                strong

                style={{

                  fontSize: 16,

                  color: "#37373E",

                  fontFamily: "Noto Sans KR",

                }}

              >

                {notice.title}

              </Typography.Text>



              {notice.isTemporarySave && (

                <div

                  style={{

                    padding: "2px 6px",

                    background: "#555555",

                    borderRadius: 8,

                    display: "flex",

                    alignItems: "center",

                    justifyContent: "center",

                    cursor: "pointer",

                  }}

                  onClick={() => router.push(`/notice/write?id=${notice.id}`)}

                >

                  <span

                    style={{

                      color: "white",

                      fontSize: 10,

                      fontFamily: "Noto Sans KR",

                      fontWeight: 400,

                    }}

                  >

                    임시저장

                  </span>

                </div>

              )}

            </Flex>



            <Typography.Text

              style={{

                fontSize: 14,

                color: "#4A4A50",

                fontFamily: "Pretendard",

              }}

            >

              {new Date(notice.createdAt).toLocaleDateString("en-CA")}

            </Typography.Text>

          </Flex>

        </Flex>



        {/* Buttons */}

        <Flex style={{ width: "120px" }} gap={8}>

          <Button

            size="small"

            style={{

              height: 32,

              paddingLeft: 12,

              paddingRight: 12,

              background: "white",

              border: "1px solid #CECED3",

              borderRadius: 2,

              color: "#666670",

              fontSize: 13,

              fontFamily: "Pretendard",

              fontWeight: 400,

            }}

            onClick={handleEdit}

          >

            수정

          </Button>

          <Button

            size="small"

            style={{

              height: 32,

              paddingLeft: 12,

              paddingRight: 12,

              background: "white",

              border: "1px solid #CECED3",

              borderRadius: 2,

              color: "#666670",

              fontSize: 13,

              fontFamily: "Pretendard",

              fontWeight: 400,

            }}

            onClick={handleDeleteModalOpen}

          >

            삭제

          </Button>

        </Flex>



        {/* Icon placeholder */}

        <Image

          src="/images/dropdown-icon.svg"

          alt="DropdownIcon"

          width={24}

          height={24}

          preview={false}

        />

      </Flex>



      <NoticeDeleteAcceptModal

        open={isModalOpen}

        onOk={handleDeleteModalConfirm} 

        onCancel={handleDeleteModalClose} 

        loading={deleteMutation.isPending}

      />

    </Flex>

  );

};



export default NoticeCard;

