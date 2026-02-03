"use client";

import { Badge, Button, Flex, Image, Typography } from "antd";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { vehicleFilterState } from "@/store/VehicleFilter.atom";
import { useModelQuery } from "@/app/api/listPage/useModelQuery";

const ModelSearch = () => {
  // format dữ liệu trả về sau này
  const { data: models = [] } = useModelQuery();
  const [filter, setFilter] = useRecoilState(vehicleFilterState);
  const selectedModelIds = filter.modelIds ?? [];
  const selectedSubModelIds = filter.subModelIds ?? [];
  const [activeModelId, setActiveModelId] = useState<number | null>(null); //model hiện tại đang mở submenu
  const [isOpen, setIsOpen] = useState(true);

  // toggle submodel
  const toggleSubModel = (subModelId: number) => {
  setFilter((prev) => ({
    ...prev,
    subModelIds: prev.subModelIds?.includes(subModelId)
      ? prev.subModelIds.filter((id) => id !== subModelId)
      : [...(prev.subModelIds || []), subModelId],
    page: 1,
  }));
};


  const toggleModel = (modelId: number) => {
  setFilter((prev) => {
    const isSelected = prev.modelIds?.includes(modelId);

    const model = models.find((m) => m.id === modelId);
    const subIdsOfModel = model?.subModels.map((s) => s.id) ?? [];

    return {
      ...prev,
      modelIds: isSelected
        ? prev.modelIds?.filter((id) => id !== modelId)
        : [...(prev.modelIds || []), modelId],

      subModelIds: isSelected
        ? prev.subModelIds?.filter((id) => !subIdsOfModel.includes(id))
        : prev.subModelIds,

      page: 1,
    };
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
                            subModel.id,
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

export default ModelSearch;
