"use client";

import { useCreateMomoPaymentMutation } from "@/app/api/payments/momo/useCreateMomoPaymentMutation";
import { buyMyCarFormState } from "@/store/buyMyCar.atom";
import { CloseOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Divider,
  Flex,
  Image,
  Modal,
  Row,
  Typography,
} from "antd";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { useVehicleDetailQuery } from "@/app/api/productDetail/useProductDetailQuery";
import { getVehicleFullName } from "@/utils/getVehicleFullName";
import { formatNumber } from "@/utils/formatNumber";
import { calculateFinalPrice } from "@/utils/countPrice";
import { formatDate } from "@/utils/formatDate";
import formatDateTime from "@/utils/formatDateTime";
import { authState } from "@/store/authStore.atom";
import useFetchIndividualQuery from "@/app/api/users/useFetchIndividualQuery";
import useFetchBusinessQuery from "@/app/api/users/useFetchBusinessQuery";
import useFetchAgencyQuery from "@/app/api/users/useFetchAgencyQuery";
import { generateOrderId } from "@/utils/generate-order-id";
import { createdPurchaseContractState } from "@/store/createdPurchaseContractState.atom";
import { useContractByIdQuery } from "@/app/api/purchaseContract/useContractByIdQuery";
import { useSearchParams } from "next/navigation";
import { Contract } from "@/types/purchaseContract";

const cellBaseStyle: React.CSSProperties = {
  padding: 12,
  display: "flex",
  alignItems: "center",
  outline: "1px solid var(--base-stroke-color-base-stroke-20, #E0E0E3)",
  outlineOffset: "-0.5px",
};

const labelStyle: React.CSSProperties = {
  ...cellBaseStyle,
  background: "var(--base-bg-color-base-bg-5, #F9F9F9)",
  color: "var(--base-fg-color-base-fg-60, #4A4A50)",
  fontSize: 14,
  fontFamily: "Noto Sans KR",
  fontWeight: 400,
  height: "100%",
};

const valueStyle: React.CSSProperties = {
  ...cellBaseStyle,
  color: "var(--base-fg-color-base-fg-70, #37373E)",
  fontSize: 14,
  fontFamily: "Noto Sans KR",
  fontWeight: 400,
  height: "100%",
};

const sectionHeaderStyle: React.CSSProperties = {
  width: "100%",
  height: "42px",
  paddingLeft: 20,
  paddingRight: 20,
  paddingTop: 8,
  paddingBottom: 8,
  background: "var(--base-bg-color-base-bg-10, #F2F2F3)",
  overflow: "hidden",
  outline: "1px var(--base-stroke-color-base-stroke-20, #E0E0E3) solid",
  outlineOffset: "-0.50px",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  gap: 10,
  display: "inline-flex",
};

const sectionTitleStyle: React.CSSProperties = {
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: 4,
  display: "flex",
};

const sectionTitleTextStyle: React.CSSProperties = {
  textAlign: "center",
  color: "var(--base-fg-color-base-fg-60, #4A4A50)",
  fontSize: 18,
  fontFamily: "Noto Sans KR",
  fontWeight: "700",
  wordWrap: "break-word",
};

const tableContainerStyle: React.CSSProperties = {
  width: "100%",
  background: "var(--base-bg-color-base-bg-0, white)",
  outline: "1px solid var(--base-stroke-color-base-stroke-20, #E0E0E3)",
  outlineOffset: "-0.5px",
};

const PurchaseContractDraft = ({
  visible,
  onClose,
  onSubmit,
  submitLoading,
}: {
  visible: boolean;
  onClose: () => void;
  onSubmit: () => Promise<Contract | null>;
  submitLoading: boolean;
}) => {
  const { mutate, isPending } = useCreateMomoPaymentMutation();
  // const orderId = generateOrderId();
  const formData = useRecoilValue(buyMyCarFormState);

  const searchParams = useSearchParams();
  const vehicleId = searchParams.get("id");
  const { data: vehicle } = useVehicleDetailQuery(vehicleId || null);

  const { user } = useRecoilValue(authState);

  const individualQuery = useFetchIndividualQuery(
    user?.role === "INDIVIDUAL" ? user?.sub?.toString() : undefined,
  );

  const businessQuery = useFetchBusinessQuery(
    user?.role === "BUSINESS" ? user?.sub?.toString() : undefined,
  );

  const agencyQuery = useFetchAgencyQuery(
    user?.role === "AGENCY" ? user?.sub?.toString() : undefined,
  );

  const buyerData =
    user?.role === "INDIVIDUAL"
      ? individualQuery.data
      : user?.role === "BUSINESS"
        ? businessQuery.data
        : user?.role === "AGENCY"
          ? agencyQuery.data
          : null;
  const buyerName = String(buyerData?.custName ?? "");
  const buyerRegistrationNumber = String(buyerData?.bnsmRegNo ?? "");

  return (
    <Modal
      open={visible}
      onCancel={onClose} // click vào backdrop ddeeer tắt
      closable={false}
      footer={null}
      width={1200}
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Flex vertical style={{ width: "100%" }}>
        <Flex
          style={{
            width: "100%",
            height: "100%",
            paddingTop: 16,
            paddingBottom: 16,
            background: "white",
          }}
          justify="space-between"
          align="center"
        >
          {/* Nút "인쇄하기" */}
          <Button
            type="default"
            size="small"
            style={{
              height: 32,
              paddingLeft: 12,
              paddingRight: 12,
              borderRadius: 2,
              border: "1px solid #CECED3",
              color: "#666670",
              fontSize: 13,
              fontWeight: 400,
            }}
          >
            인쇄하기
          </Button>

          {/* Icon đóng (X) */}
          <Button
            type="text"
            icon={<CloseOutlined />}
            onClick={onClose}
            style={{
              width: 28,
              height: 28,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        </Flex>

        <Flex
          vertical
          style={{
            width: "100%",
            height: "100%",
            gap: 36,
          }}
        >
          {/* Logo + Title */}
          <Flex align="center" gap={8}>
            <img
              src="/images/logo/KGM logo.png"
              alt="logo"
              style={{ width: 63, height: 42 }}
            />

            {/* Khối màu (thay thế bằng CSS hoặc background nếu cần) */}
            <div
              style={{
                width: 127,
                height: 20,
                display: "flex",
                position: "relative",
              }}
            >
              <Image
                src="/images/logo/KGM brandname.svg"
                alt="KGM brandname"
                style={{ width: "100%", height: "100%" }}
                preview={false}
              />
            </div>

            {/* Divider dọc */}
            <Divider
              type="vertical"
              style={{
                height: 28,
                borderColor: "#2E1A47",
              }}
            />

            {/* Tiêu đề */}
            <Typography.Text
              style={{
                color: "#2E1A47",
                fontSize: 24,
                fontWeight: 700,
                lineHeight: "26px",
              }}
            >
              인증중고차
            </Typography.Text>
          </Flex>

          {/* Thanh thông tin */}
          <Flex
            style={{
              width: "100%",
              padding: "12px 40px",
              borderTop: "1px solid #E5E5EC",
            }}
            justify="space-between"
            align="center"
          >
            <Typography.Text
              style={{
                color: "#4A4A50",
                fontSize: 18,
                fontFamily: "Noto Sans KR",
                lineHeight: "28px",
              }}
            >
              [고객용]
            </Typography.Text>

            <Typography.Text
              style={{
                color: "#4A4A50",
                fontSize: 18,
                fontFamily: "Noto Sans KR",
                lineHeight: "28px",
              }}
            >
              지점정보 : 서울특별시 강서구 양천로53길 30, 803,804
            </Typography.Text>
          </Flex>

          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Typography.Text
              style={{
                color: "var(--base-fg-color-base-fg-70, #37373E)",
                fontSize: 28,
                fontFamily: "Noto Sans KR",
                fontWeight: "700",
                wordWrap: "break-word",
              }}
            >
              자동차 매매 계약서
            </Typography.Text>
          </div>
        </Flex>
      </Flex>

      <Flex
        vertical
        gap={20}
        style={{ width: "100%", padding: "0 40px", marginTop: "40px" }}
      >
        <div>
          {/* section 1: CT-001 CONT_NO, CT-001 DLV_HOPE_DT, ST-001 BRANCH, ST-001 REP_NM */}
          <div style={tableContainerStyle}>
            {/* Row 1 */}
            <Row>
              <Col span={6}>
                <div style={labelStyle}>계약등록번호</div>
              </Col>
              <Col span={6}>
                <div style={valueStyle}>-</div>
              </Col>
              <Col span={6}>
                <div style={labelStyle}>배송요청일/장소</div>
              </Col>
              <Col span={6}>
                <div style={valueStyle}>
                  {formData.desiredDeliveryDate} / 지점
                </div>
              </Col>
            </Row>

            {/* Row 2 */}
            <Row>
              <Col span={6}>
                <div style={labelStyle}>지점</div>
              </Col>
              <Col span={6}>{/* <div style={valueStyle}></div> */}</Col>
              <Col span={6}>
                <div style={labelStyle}>담당자</div>
              </Col>
              <Col span={6}>
                <div style={valueStyle}>우연수</div>
              </Col>
            </Row>
          </div>

          {/* section 2: Vehicle Information */}
          <div style={sectionHeaderStyle}>
            <div style={sectionTitleStyle}>
              <div style={sectionTitleTextStyle}>■ 차량정보</div>
            </div>
          </div>

          <div style={tableContainerStyle}>
            <Row>
              <Col span={6}>
                <div style={labelStyle}>차명</div>
              </Col>
              <Col span={6}>
                <div style={valueStyle}>{vehicle?.brandName}</div>
              </Col>
              <Col span={6}>
                <div style={labelStyle}>모델명</div>
              </Col>
              <Col span={6}>
                <div style={valueStyle}>
                  {vehicle?.subModel?.model?.modelName ?? "-"}
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <div style={labelStyle}>차량번호</div>
              </Col>
              <Col span={6}>
                <div style={valueStyle}>{vehicle?.carRegNo || "-"}</div>
              </Col>
              <Col span={6}>
                <div style={labelStyle}>차대번호</div>
              </Col>
              <Col span={6}>
                <div style={valueStyle}>-</div>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <div style={labelStyle}>최초등록일</div>
              </Col>
              <Col span={6}>
                <div style={valueStyle}>
                  {formatDate(vehicle?.firstRegDate || "")}
                </div>
              </Col>
              <Col span={6}>
                <div style={labelStyle}>형식연도</div>
              </Col>
              <Col span={6}>
                <div style={valueStyle}>{vehicle?.manufacturerYear || "-"}</div>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <div style={labelStyle}>주행거리</div>
              </Col>
              <Col span={6}>
                <div style={valueStyle}>
                  {formatNumber(vehicle?.mileage || 0)} km
                </div>
              </Col>
              <Col span={6}>
                <div style={labelStyle}>배기량</div>
              </Col>
              <Col span={6}>
                <div style={valueStyle}>
                  {vehicle?.engineDisplacement || "-"}
                </div>
              </Col>
            </Row>
          </div>

          {/* section 3: Vehicle Payment */}
          <div style={sectionHeaderStyle}>
            <div style={sectionTitleStyle}>
              <div style={sectionTitleTextStyle}>■ 차량대금</div>
            </div>
          </div>

          <div style={tableContainerStyle}>
            <Row>
              <Col span={6}>
                <div style={labelStyle}>차량가격</div>
              </Col>
              <Col span={18}>
                <div style={valueStyle}>
                  CT-001 SALE_AMT (= AD_PRC when LIST_TP : 02 or HOT_PRC when
                  LIST_TP : 01)
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <div style={labelStyle}>명의이전비</div>
              </Col>
              <Col span={18}>
                <div style={valueStyle}>0원</div>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <div style={labelStyle}>관리비용</div>
              </Col>
              <Col span={18}>
                <div style={valueStyle}>0원</div>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <div style={labelStyle}>배송비</div>
              </Col>
              <Col span={18}>
                <div style={valueStyle}>0원</div>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <div style={labelStyle}>기타금액</div>
              </Col>
              <Col span={18}>
                <div style={valueStyle}>₩0</div>
              </Col>
            </Row>
            <Row>
              <Col
                span={6}
                style={{
                  width: "100%",
                  height: "100%",
                  padding: 12,
                  background: "var(--base-bg-color-base-bg-5, #F9F9F9)",
                  overflow: "hidden",
                  outline:
                    "1px var(--base-stroke-color-base-stroke-20, #E0E0E3) solid",
                  outlineOffset: "-0.50px",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  display: "inline-flex",
                }}
              >
                <div
                  style={{
                    color: "var(--base-fg-color-base-fg-60, #4A4A50)",
                    fontSize: 14,
                    fontFamily: "Noto Sans KR",
                    fontWeight: "700",
                    wordWrap: "break-word",
                  }}
                >
                  총 입금 합계
                </div>
              </Col>
              <Col span={18}>
                <div style={valueStyle}>
                  {formatNumber(
                    calculateFinalPrice(
                      vehicle?.basePrice || 0,
                      vehicle?.discountPercent || 0,
                    ),
                  )}
                  원
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <div style={labelStyle}>가상입금계좌</div>
              </Col>
              <Col span={18}>
                <div style={valueStyle}>
                  우리은행 28699256118968 케이지모빌리티 (주) 인증중고차 박명애
                </div>
              </Col>
            </Row>
          </div>
        </div>

        <div
          style={{
            color: "var(--base-fg-color-base-fg-70, #37373E)",
            fontSize: 14,
            fontFamily: "Noto Sans KR",
            fontWeight: "400",
            wordWrap: "break-word",
          }}
        >
          ※ 당사는 차량대금을 현금으로 수령하지 않습니다. 계약서에 명시되어 있는
          가상입금계좌로 입금을 해주시기 바랍니다. 위 계좌 외 입금 건은
          차량대금으로 인정되지 않습니다
        </div>

        {/* section 4: Customer Information */}
        <div>
          <div style={sectionHeaderStyle}>
            <div style={sectionTitleStyle}>
              <div style={sectionTitleTextStyle}>■ 인적사항</div>
            </div>
          </div>

          <div style={tableContainerStyle}>
            <Row>
              <Col span={6}>
                <div style={valueStyle}>매도자 (갑)</div>
              </Col>
              <Col span={18}>
                <Row>
                  <Col span={6}>
                    <div style={labelStyle}>성명</div>
                  </Col>
                  <Col span={6}>
                    <div style={valueStyle}>케이지모빌리티 주식회사</div>
                  </Col>
                  <Col span={6}>
                    <div style={labelStyle}>사업자번호</div>
                  </Col>
                  <Col span={6}>
                    <div style={valueStyle}>257-85-02407</div>
                  </Col>
                </Row>
                <Row>
                  <Col span={6}>
                    <div style={labelStyle}>주소</div>
                  </Col>
                  <Col span={18}>
                    <div style={valueStyle}>
                      서울특별시 강서구 양천로53길 30, 803호 804호(가양동,
                      서서울모터리움)
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col span={6}>
                    <div style={labelStyle}>담당자</div>
                  </Col>
                  <Col span={6}>
                    <div style={valueStyle}>우연수</div>
                  </Col>
                  <Col span={6}>
                    <div style={labelStyle}>전화번호</div>
                  </Col>
                  <Col span={6}>
                    <div style={valueStyle}>1577-1240</div>
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row>
              <Col span={6}>
                <div style={valueStyle}>매수자 (을)</div>
              </Col>
              <Col span={18}>
                <Row>
                  <Col span={6}>
                    <div style={labelStyle}>성명</div>
                  </Col>
                  <Col span={6}>
                    <div style={valueStyle}>{buyerName}</div>
                  </Col>
                  <Col span={6}>
                    <div style={labelStyle}>주민/사업자 등록번호</div>
                  </Col>
                  <Col span={6}>
                    <div style={valueStyle}>{buyerRegistrationNumber}</div>
                  </Col>
                </Row>
                <Row>
                  <Col span={6}>
                    <div style={labelStyle}>주소</div>
                  </Col>
                  <Col span={18}>
                    <div style={valueStyle}>
                      경상북도 상주시 봉양1길 126 (무양동, 지엘리베라움 아파트)
                      103동 1002호
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col span={6}>
                    <div style={labelStyle}>연락처</div>
                  </Col>
                  <Col span={6}>
                    <div style={valueStyle}>{formData.homePhone}</div>
                  </Col>
                  <Col span={6}>
                    <div style={labelStyle}>이메일</div>
                  </Col>
                  <Col span={6}>
                    <div style={valueStyle}>{formData.email}</div>
                  </Col>
                </Row>
                <Row>
                  <Col span={6}>
                    <div style={labelStyle}>개인/사업자 여부 확인</div>
                  </Col>
                  <Col span={6}>
                    <div style={valueStyle}>개인</div>
                  </Col>
                  <Col span={6}>
                    <div style={labelStyle}>증빙여부</div>
                  </Col>
                  <Col span={6}>
                    <div style={valueStyle}>현금영수증</div>
                  </Col>
                </Row>
                <Row>
                  <Col span={6}>
                    <div style={labelStyle}>이전비 잔금수령방법</div>
                  </Col>
                  <Col span={6}>
                    <div style={valueStyle}>환급계좌</div>
                  </Col>
                  <Col span={6}>
                    <div style={labelStyle}>환급계좌/예금주</div>
                  </Col>
                  <Col span={6}>
                    <div style={valueStyle}>
                      농협은행 301011111111112 (박하연)
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col span={6}>
                    <div style={labelStyle}>이전등록증 우편물 수령지</div>
                  </Col>
                  <Col span={18}>
                    <div style={valueStyle}>
                      경상북도 상주시 봉양1길 126 (무양동, 지엘리베라움 아파트)
                      103동 1002호
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <div style={labelStyle}>계약일자</div>
              </Col>
              <Col span={6}>
                <div style={labelStyle}>
                  {formatDateTime(new Date().toISOString())}
                </div>
              </Col>
              <Col span={6}>
                <div style={labelStyle}>구매자</div>
              </Col>
              <Col span={6}>
                <div style={valueStyle}>박하연</div>
              </Col>
            </Row>
          </div>
        </div>
      </Flex>

      {/* Action Buttons */}
      <div
        style={{
          width: "100%",
          marginTop: "80px",
          justifyContent: "center",
          alignItems: "center",
          gap: 12,
          display: "inline-flex",
          padding: "0 40px 40px",
        }}
      >
        <Button
          style={{
            width: 200,
            height: 48,
            background: "var(--button-tertiary-bg-enabled, white)",
            border: "1px solid var(--button-tertiary-stroke-enabled, #CECED3)",
            borderRadius: 2,
            color: "var(--button-tertiary-fg-enabled, #666670)",
            fontSize: 14,
            fontFamily: "Pretendard",
            fontWeight: "700",
          }}
        >
          계약해약
        </Button>
        <Button
          type="primary"
          style={{
            width: 200,
            height: 48,
            background: "var(--button-primary-bg-enabled, #2F2C4D)",
            border: "none",
            borderRadius: 2,
            color: "var(--button-primary-fg, white)",
            fontSize: 14,
            fontFamily: "Pretendard",
            fontWeight: "700",
          }}
          onClick={async () => {
            const createdContract = await onSubmit();
            if (!createdContract) return;

            mutate({ contractId: createdContract.id, amount: 500000 });
          }}
        >
          제출하기
        </Button>
      </div>
    </Modal>
  );
};

export default PurchaseContractDraft;
