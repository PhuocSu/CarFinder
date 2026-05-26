export const getCurrentStep = (statusContract: string) => {
    console.log("getCurrentStep status =", JSON.stringify(statusContract));
    
  switch (statusContract) {
    case "DRAFTED":
      return 0;
    case "ACTIVE":
      return 1;
    case "COMPLETED":
      return 2;
    default:
      return 0;
  }
};

export const getActionButtonText = (statusContract: string) => {
  switch (statusContract) {
    case "DRAFTED":
      return "결제하기";
    case "ACTIVE":
      return "잔금 결제";
    case "COMPLETED":
      return "결제완료";
    default:
      return "결제하기";
  }
};
