const PBSDK_availableTypes = ["REFUND", "CHARGE"];
const PBSDK_transactionResultCodes = {
  2000: "RESULT_CODE_APPROVED",
  2001: "RESULT_CODE_FAILED",
  1001: "CODE_SUCCESS",
  2002: "CODE_FAILED",
  2003: "CODE_FAILED_TERMINAL_NOT_INITIALIZED",
  2004: "CODE_FAILED_TERMINAL_INITIALIZATION_FAILED",
  2005: "CODE_FAILED_TRANSACTION_NOT_FOUND",
  2006: "CODE_FAILED_SHIFT_NOT_OPENED",
  2007: "CODE_ABORTED",
};
const PBSDK_apnAuthType = ["NO_AUTH", "PAP", "CHAP", "PAP_OR_CHAP"];
const PBSDK_availableCurrencies = [
  "ZAR",
  "YER",
  "XCD",
  "VND",
  "USD",
  "UAH",
  "TWD",
  "TTD",
  "TRY",
  "TND",
  "THB",
  "SGD",
  "SEK",
  "SCR",
  "SAR",
  "RUB",
  "RSD",
  "RON",
  "QAR",
  "PLN",
  "PKR",
  "PHP",
  "PEN",
  "PAB",
  "OMR",
  "NZD",
  "NOK",
  "NGN",
  "MYR",
  "MXN",
  "MUR",
  "MOP",
  "MAD",
  "LRD",
  "LKR",
  "LBP",
  "KZT",
  "KYD",
  "KWD",
  "KRW",
  "KES",
  "JOD",
  "JMD",
  "JPY",
  "INR",
  "ILS",
  "IDR",
  "HUF",
  "HRK",
  "HNL",
  "HKD",
  "GTQ",
  "GHS",
  "GBP",
  "EUR",
  "EGP",
  "DZD",
  "DOP",
  "DKK",
  "CZK",
  "CRC",
  "COP",
  "CNY",
  "CLP",
  "CHF",
  "CAD",
  "BZD",
  "BWP",
  "BSD",
  "BRL",
  "BOB",
  "BND",
  "BMD",
  "BHD",
  "BGN",
  "BDT",
  "BBD",
  "AZN",
  "AUD",
  "ARS",
  "AMD",
  "ALL",
  "AFN",
  "AED",
  "UNKNOWN",
];

// States
let _PBSDK_callbackTransactionResponse = () => {};
let _PBSDK_callbackQueryResponse = () => {};

// EventListeners
const PBSDK_onTransactionCreated = (transactionReference) => {
  return _PBSDK_callbackTransactionResponse(
    "TransactionCreated",
    transactionReference
  );
};
const PBSDK_onTransactionResponse = (transactionResponseDataObject) => {
  const data = JSON.parse(transactionResponseDataObject);

  data.transactionResponse.codeStatus =
    PBSDK_transactionResultCodes[data.transactionResponse.code] ||
    data.transactionResponse.code;

  return _PBSDK_callbackTransactionResponse("TransactionResponse", data);
};
const PBSDK_onQueryResponse = (queryResponseDataObject) => {
  const data = JSON.parse(transactionResponseDataObject);

  data.codeStatus = PBSDK_transactionResultCodes[data.code] || data.code;

  return _PBSDK_callbackQueryResponse("QueryResponse", data);
};

// Error Handlers
const PBSDK_onError = (type, error) => {
  if (type === "transaction") {
    return _PBSDK_callbackTransactionResponse("TransactionError", error);
  }

  if (type === "query") {
    return _PBSDK_callbackQueryResponse("QueryError", error);
  }
};

// Fetchers
window.PBSDK_getTerminalData = () =>
  JSON.parse(PaybyrdSettingsSDK.getTerminalData());
window.PBSDK_getAppData = () => JSON.parse(PaybyrdSettingsSDK.getAppData());
window.PBSDK_installApp = (apkPath) =>
  JSON.parse(PaybyrdSettingsSDK.installApp(apkPath));
window.PBSDK_reboot = (apkPath) => JSON.parse(PaybyrdSettingsSDK.reboot());
window.PBSDK_getPaybyrdSDKVersion = () =>
  PaybyrdSettingsSDK.getPaybyrdSDKVersion();
window.PBSDK_isPaybyrdWebSDK = () => PaybyrdSettingsSDK.isPaybyrdWebSDK();

window.PBSDK_configureApn = (data) => {
  if (!data.alias) {
    return {
      isSuccessful: false,
      errorCode: "REQUIRED_APN_ALIAS",
      errorMessage: "APN Alias is required",
    };
  }

  if (!data.name) {
    return {
      isSuccessful: false,
      errorCode: "REQUIRED_APN_ALIAS",
      errorMessage: "APN Alias is required",
    };
  }

  return JSON.parse(PaybyrdSettingsSDK.configureApn(JSON.stringify(data)));
};

window.PBSDK_configureMobileDataRoaming = (data) => {
  if (data.isEnabled == "undefined") {
    return {
      isSuccessful: false,
      errorCode: "REQUIRED_IS_ENABLED",
      errorMessage: "Enable parameter is required",
    };
  }

  return JSON.parse(
    PaybyrdSettingsSDK.configureMobileDataRoaming(JSON.stringify(data))
  );
};

window.PBSDK_configureKioskiApp = (data) => {
  if (!data.appPackage) {
    return {
      isSuccessful: false,
      errorCode: "REQUIRED_APP_PACKAGE",
      errorMessage: "app package is required",
    };
  }

  if (!data.appActivity) {
    return {
      isSuccessful: false,
      errorCode: "REQUIRED_APP_ACTIVITY",
      errorMessage: "app activity is required",
    };
  }

  if (data.isNavigationKeysEnabled == "undefined") {
    return {
      isSuccessful: false,
      errorCode: "REQUIRED_NAVIGATION_KEYS",
      errorMessage: "navigation keys parameter is required",
    };
  }

  if (data.isStatusBarEnabled == "undefined") {
    return {
      isSuccessful: false,
      errorCode: "REQUIRED_STATUS_BAR",
      errorMessage: "status bar parameter is required",
    };
  }

  return JSON.parse(
    PaybyrdSettingsSDK.configureKioskiApp(JSON.stringify(data))
  );
};

window.PBSDK_setPaymentAppAutomaticPrinting = (data) => {
  if (!data.config) {
    return {
      isSuccessful: false,
      errorCode: "REQUIRED_CONFIG",
      errorMessage: "config is required",
    };
  }

  return JSON.parse(
    PaybyrdSettingsSDK.setPaymentAppAutomaticPrinting(JSON.stringify(data))
  );
};

window.PBSDK_setPaymentAppResultScreen = (data) => {
  if (!data.config) {
    return {
      isSuccessful: false,
      errorCode: "REQUIRED_CONFIG",
      errorMessage: "config is required",
    };
  }

  return JSON.parse(
    PaybyrdSettingsSDK.setPaymentAppResultScreen(JSON.stringify(data))
  );
};

window.PBSDK_setPaymentAppConfiguration = (data) => {
  if (!data.config) {
    return {
      isSuccessful: false,
      errorCode: "REQUIRED_CONFIG",
      errorMessage: "config is required",
    };
  }

  if (data.isEnabled == "undefined") {
    return {
      isSuccessful: false,
      errorCode: "REQUIRED_CONFIG_IS_ENABLED",
      errorMessage: "config enabled is required",
    };
  }

  return JSON.parse(
    PaybyrdSettingsSDK.setPaymentAppConfiguration(JSON.stringify(data))
  );
};

// Handlers
window.PBSDK_queryTransaction = (data, callbackResponse = () => {}) => {
  _PBSDK_callbackQueryResponse = callbackResponse;

  if (!data.amount) {
    return PBSDK_onError("query", {
      code: "REQUIRED_AMOUNT",
      message: "Amount is required.",
    });
  }

  if (!data.transactionId) {
    return PBSDK_onError("query", {
      code: "REQUIRED_TRANSACTION_ID",
      message: "Transaction ID is required.",
    });
  }

  if (!data.type || !PBSDK_availableTypes.includes(data.type)) {
    return PBSDK_onError("query", {
      code: "INVALID_TYPE",
      message: "Provided type not available.",
    });
  }

  return PaybyrdPaymentSDK.queryTransaction(JSON.stringify(data));
};
window.PBSDK_startTransaction = (data = {}, callbackResponse = () => {}) => {
  _PBSDK_callbackTransactionResponse = callbackResponse;

  if (!data.amount) {
    return PBSDK_onError("transaction", {
      code: "REQUIRED_AMOUNT",
      message: "Amount is required.",
    });
  }

  if (!data.currency || !PBSDK_availableCurrencies.includes(data.currency)) {
    return PBSDK_onError("transaction", {
      code: "INVALID_CURRENCY",
      message: "Provided currency not available.",
    });
  }

  if (!data.type || !PBSDK_availableTypes.includes(data.type)) {
    return PBSDK_onError("transaction", {
      code: "INVALID_TYPE",
      message: "Provided type not available.",
    });
  }

  return PaybyrdPaymentSDK.startTransaction(JSON.stringify(data));
};
