"use client";

import { useModelQuery } from "@/app/api/listPage/useModelQuery";
import { useDeleteRecentSearchMutation } from "@/app/api/recentlySearchHistory/useDeleteRecentSearchMutation";
import { useRecentSearchHistoryQuery } from "@/app/api/recentlySearchHistory/useRecentSearchHistoryQuery";
import { VEHICLE_BADGE_OPTIONS } from "@/constants/homepage/vehicleBadgeOptions";
import { useVehicleFilter } from "@/hooks/useVehicleFilter";
import { formatSearchFilterTokens } from "@/utils/formatSearchFilter";
import { CloseOutlined } from "@ant-design/icons";
import { Flex, Modal } from "antd";

const RecentSearchModal = ({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) => {
  const { data: models = [] } = useModelQuery();
  const { data: history = [] } = useRecentSearchHistoryQuery();
  const { mutate: deleteHistory } = useDeleteRecentSearchMutation();
  const { updateFilter } = useVehicleFilter();

  const handleItemClick = (item: any, onClose: () => void) => {
    const filters = item.filters ?? item;

    updateFilter({
      search: filters.search || "",
      badges: filters.badges || [],
      modelIds: filters.modelIds || [],
      subModelIds: filters.subModelIds || [],
      yearMin: filters.yearMin,
      yearMax: filters.yearMax,
      priceMin: filters.priceMin,
      priceMax: filters.priceMax,
      mileageMin: filters.mileageMin,
      mileageMax: filters.mileageMax,
      fuelTypes: (filters.fuelTypes ?? filters.fuelTypes) || [],
      exColors: filters.exColors || [],
      inColors: filters.inColors || [],
      sortBy: filters.sortBy,
      order: filters.order,
    });

    onClose(); // Close modal
  };

  const renderTokens = (ts: ReturnType<typeof formatSearchFilterTokens>) => (
    <div>
      {ts.map((t, i) =>
        t.bold ? (
          <strong key={i}>{t.text}</strong>
        ) : (
          <span key={i}>{t.text}</span>
        ),
      )}
    </div>
  );

  return (
    <div>
      <Flex>
        <Modal
          title="최근 검색 조건"
          centered
          open={visible}
          onCancel={onClose}
          footer={null}
          width={{
            xs: "90%",
            sm: "80%",
            md: "70%",
            lg: "60%",
            xl: "50%",
            xxl: "40%",
          }}
        >
          {history.map((item: any) => {
            const filters = item.filters ?? item;

            const line1Tokens = formatSearchFilterTokens(
              { modelIds: filters.modelIds, subModelIds: filters.subModelIds },
              { models, badgeOptions: VEHICLE_BADGE_OPTIONS },
            );

            const line2Tokens = formatSearchFilterTokens(
              {
                badges: filters.badges,
                yearMin: filters.yearMin,
                yearMax: filters.yearMax,
                priceMin: filters.priceMin,
                priceMax: filters.priceMax,
                mileageMin: filters.mileageMin,
                mileageMax: filters.mileageMax,
              },
              { models, badgeOptions: VEHICLE_BADGE_OPTIONS },
            );

            const line3Tokens = formatSearchFilterTokens(
              {
                fuelTypes: filters.fuelTypes ?? filters.fuelType,
                exColors: filters.exColors,
                inColors: filters.inColors,
              },
              { models, badgeOptions: VEHICLE_BADGE_OPTIONS },
            );

            return (
              <Flex
                key={item.id}
                justify="space-between"
                style={{
                  cursor: "pointer",
                  padding: "16px",
                  marginBottom: "8px",
                  border:
                    "1px solid var(--base-stroke-color-base-stroke-20, #E0E0E3)",
                }}
                onClick={() => handleItemClick(item, onClose)}
              >
                <Flex vertical>
                  {renderTokens(line1Tokens)}
                  {renderTokens(line2Tokens)}
                  {renderTokens(line3Tokens)}
                </Flex>

                <CloseOutlined
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteHistory(item.id);
                  }}
                />
              </Flex>
            );
          })}
        </Modal>
      </Flex>
    </div>
  );
};

export default RecentSearchModal;
