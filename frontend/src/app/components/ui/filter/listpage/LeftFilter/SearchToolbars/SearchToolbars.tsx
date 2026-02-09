"use client";

import { Button, Flex, Image, Typography } from "antd";
import styles from "./SearchToolbars.module.scss";
import { useVehicleFilter } from "@/hooks/useVehicleFilter";
import { useCallback, useEffect, useState } from "react";
import RecentSearchModal from "./RecentSearchModal/RecentSearchModal";
import { useRecoilState, useRecoilValue } from "recoil";
import { recentSearchHistoryState } from "@/store/RecentSearchHistory.atom";
import { vehicleFilterState } from "@/store/VehicleFilter.atom";
import addRecentSearch, { isSameFilter, shouldSaveRecentSearch } from "@/utils/addRecentSearch";
import { useSaveRecentSearchMutation } from "@/app/api/recentlySearchHistory/useSaveRecentSearchMutation";

const SearchToolbars = () => {
  const { resetAllFilters } = useVehicleFilter();
  const [modalVisible, setModalVisible] = useState(false);
  const [history, setHistory] = useRecoilState(recentSearchHistoryState);
  const filter = useRecoilValue(vehicleFilterState);
  const { mutate: saveHistory } = useSaveRecentSearchMutation();


  // Track previous filter to detect actual changes
  const [previousFilter, setPreviousFilter] = useState(filter);
 
  // Only save on page leave, not on every filter change
  useEffect(() => {
    const onBeforeUnload = () => {
      if (shouldSaveRecentSearch(filter) && !isSameFilter(filter, previousFilter)) {
        setHistory((prev) => addRecentSearch(prev, filter));
        saveHistory(filter);
      }
    };
 
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
      // Only save when actually leaving page, not on filter changes
      if (shouldSaveRecentSearch(filter) && !isSameFilter(filter, previousFilter)) {
        setHistory((prev) => addRecentSearch(prev, filter));
        saveHistory(filter);
      }
    };
  }, []); // Empty dependency array - only run once
 
  // Update previous filter when it actually changes significantly
  useEffect(() => {
    if (!isSameFilter(filter, previousFilter)) {
      setPreviousFilter(filter);
    }
  }, [filter, previousFilter]);
 
  const handleReset = () => {
    // Save current filter BEFORE reset
    if (shouldSaveRecentSearch(filter)) {
      setHistory((prev) => addRecentSearch(prev, filter));
      saveHistory(filter);
    }
    resetAllFilters();
  };

  return (
    <>
      <Flex
        gap={8}
        style={{
          width: "100%",
          padding: "0px 0px 13px",
          borderBottom:
            "1px solid var(--base-stroke-color-base-stroke-20, #E2E4E8)",
        }}
      >
        <Button
          style={{
            height: "40px",
            flex: 1,
            borderRadius: 2,
            border: "1px solid var(--button-tertiary-stroke-enabled, #CECED3)",
            background: "var(--button-tertiary-bg-enabled, #FFF)",
          }}
          onClick={() => setModalVisible(true)}
        >
          <Image
            src="/images/listPage/icon-list.svg"
            preview={false}
            width={24}
            height={24}
          />
          <Typography.Text className={styles.button__search__title}>
            최근 검색 조건
          </Typography.Text>
        </Button>
        <Button
          style={{
            height: "40px",
            flex: 1,
            borderRadius: 2,
            border: "1px solid var(--button-tertiary-stroke-enabled, #CECED3)",
            background: "var(--button-tertiary-bg-enabled, #FFF)",
          }}
          onClick={handleReset}
        >
          <Image
            src="/images/listPage/icon-reload.svg"
            preview={false}
            width={24}
            height={24}
          />
          <Typography.Text className={styles.button__search__title}>
            초기화
          </Typography.Text>
        </Button>
      </Flex>

      <RecentSearchModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
};

export default SearchToolbars;
