"use client";

import { Badge, Button, Flex, Image, Typography } from "antd";
import { useEffect, useState } from "react";
import { useModel } from "@/app/api/listPage/useModel";

const CarTypeSearch = () => {
  // format dữ liệu trả về sau này
  const { data: models = [] } = useModel();

  const [activeModelId, setActiveModelId] = useState<number | null>(null); //model hiện tại đang mở submenu
  const [selectedModelIds, setSelectedModelIds] = useState<number[]>([]); // danh sách Model
  const [selectedSubModelIds, setSelectedSubModelIds] = useState<number[]>([]); //danh sách SubModel
  const [isOpen, setIsOpen] = useState(true);

  // toggle submodel
  const toggleSubModel = (id: number) => {
    setSelectedSubModelIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((subId) => subId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const toggleModel = (id: number) => {
    setSelectedModelIds((prev) => {
      if (prev.includes(id)) {
        // Bỏ chọn model => clear subModel thuộc model đó
        setSelectedSubModelIds((prevSub) =>
          prevSub.filter((subId) => {
            const model = models.find((m) => m.id === id);
            return !model?.subModels.some((sub) => sub.id === subId);
          })
        );
        // nếu đã chọn
        return prev.filter((modelId) => modelId !== id);
      } else {
        // nếu chưa chọn
        return [...prev, id];
      }
    });
  };

  return (
    <Flex
      vertical
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      {/* Search by models */}
      <Flex
        vertical
        gap={20}
        style={{
          padding: "16px",
          borderTop: isOpen
            ? "none"
            : "1px solid var(--base-stroke-color-base-stroke-20, #E0E0E3)",
          borderBottom: isOpen
            ? "none"
            : "1px solid var(--base-stroke-color-base-stroke-20, #E0E0E3)",
          borderRight: isOpen
            ? "none"
            : "1px solid var(--base-stroke-color-base-stroke-20, #E0E0E3)",
          borderLeft: (() => {
            if (isOpen) return "none";
            return selectedModelIds.length > 0
              ? "6px solid var(--primary-stroke-color-primary-stroke-80, #4F4C6B)"
              : "1px solid var(--base-stroke-color-base-stroke-20, #E0E0E3)";
          })(),
          borderRadius: "4px",
        }}
      >
        <Flex justify="space-between">
          <Typography.Text>차종</Typography.Text>
          <Flex gap={8}>
            <Badge
              count={selectedModelIds.length}
              style={{
                backgroundColor: "#3533CC",
                color: "white",
                fontSize: 13,
                fontWeight: 700,
                fontFamily: "Noto Sans KR",
                width: 20,
                height: 20,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "50%",
              }}
            />
            <Image
              src="/images/listPage/icon-chevron-down.svg"
              preview={false}
              width={20}
              height={20}
              onClick={() => setIsOpen((prev) => !prev)}
              style={{
                cursor: "pointer",
                color: "#3533CC",
                transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s ease",
              }}
            />
          </Flex>
        </Flex>

        {/* Models bên trong */}
        {isOpen && (
          <Flex
            vertical
            gap={4}
            style={{
              height: "212px",
              padding: "12px",
              borderRadius: 4,
              border:
                "1px solid var(--base-stroke-color-base-stroke-30, #CBCFD6)",
              overflowY: "scroll",
            }}
          >
            <Flex vertical gap={4}>
              {models.map((model) => {
                const isActive = activeModelId === model.id;
                const isModelSelected = selectedModelIds.includes(model.id);

                return (
                  <div key={model.id}>
                    {/* Model */}
                    <Flex
                      onClick={() => {
                        toggleModel(model.id);
                        setActiveModelId(isActive ? null : model.id);
                      }}
                      style={{
                        width: "100%",
                        height: "32px",
                        padding: "0 12px",
                        fontWeight: isModelSelected ? 700 : 400,
                        background: isModelSelected
                          ? "var(--primary-bg-color-primary-bg-10, #DCE4FE)"
                          : "var(--button-tertiary-bg-enabled, white)",
                        borderRadius: 2,
                        justifyContent: "space-between",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                    >
                      <Typography.Text>{model.modelName}</Typography.Text>

                      {isModelSelected && (
                        <Image
                          src="/images/listPage/icon-close.svg"
                          preview={false}
                          width={20}
                          height={20}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleModel(model.id);
                            setActiveModelId(null);
                          }}
                        />
                      )}
                    </Flex>

                    {/* SubModels */}
                    {isActive && model.subModels.length > 0 && (
                      <Flex
                        vertical
                        gap={4}
                        style={{
                          marginLeft: 12,
                          marginTop: 4,
                        }}
                      >
                        {model.subModels.map((subModel) => {
                          const isSubSelected = selectedSubModelIds.includes(
                            subModel.id
                          );

                          return (
                            <Flex
                              align="center"
                              justify="center"
                              key={subModel.id}
                              onClick={() => toggleSubModel(subModel.id)}
                              style={{
                                height: "32px",
                                padding: "0 12px",
                                borderRadius: 4,
                                alignItems: "center",
                                justifyContent: "space-between",
                                cursor: "pointer",
                                display: "flex",
                                fontWeight: isSubSelected ? 700 : 400,
                              }}
                            >
                              <Typography.Text>
                                {subModel.subModelName}
                              </Typography.Text>

                              {isSubSelected && (
                                <Image
                                  src="/images/listPage/icon-close.svg"
                                  preview={false}
                                  width={16}
                                  height={16}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleSubModel(subModel.id);
                                  }}
                                />
                              )}
                            </Flex>
                          );
                        })}
                      </Flex>
                    )}
                  </div>
                );
              })}
            </Flex>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default CarTypeSearch;
