const lookup = Object.freeze({
  ALIAS_DESCRIPTION: 'dlos_lookup_detail.description',
  COLLATERAL_ATTACHMENT_INDV: 'ColAttchAmtIndv',
  COLLATERAL_ATTACHMENT_CORP: 'ColAttchAmtCorp',
  GUARANTOR_PROFILE: 'GuarantorProfile',
  GUARANTOR_DEBTOR_RELATION: 'GuarantorDebtorRelation',
  SECOND_GUARANTOR_PROFILE: 'SecondGuarantorProfile',
  HOME_OWNERSIP: 'HomeOwnership',
  BUSINESS_OWNERSHIP: 'BusinessOwnership',
  INDUSTRIAL_SECTOR: 'IndustrialSector',
  MANUFACTURE: 'Manufacture',
  BUSINESS_TYPE: 'BusinessType',
  BUSINESS_FOUNDER_INDV: 'BusinessFounderIndividual',
  BUSINESS_FOUNDER_CORP: 'BusinessFounderCorporate',
  BUSINESS_SCALE: 'BusinessScale',
  MARKETING_AREA: 'MarketingArea',
  WALK_IN_PCT: 'RetailBasedOnWalkinCustomer',
  YES_NO: 'YesNo',
  YES_NO_DK: 'YesNoDontKnow',
  BUSINESS_STRATEGY: 'BusinessStrategy',
  FACILITY_TYPE: 'FacilityType',
  FACILITY_TYPE_MUR: 'FacilityTypeMUR',
  FACILITY_NAME: 'FacilityName',
  CURRENCY: 'Currency',
  INSTALMENT: 'Instalment',
  BI_CHECKING: 'BIChecking',
  COLLATERAL_PROPERTY: 'CollateralPropertyLOS',
  REJECTION_CNT: 'CheckRejection',
  COLLATERAL_STATUS: 'CollateralStatus',
  GUARANTOR_TYPE: 'GuarantorType',
  GUARANTOR_COVERAGE: 'GuarantorCoverage',
  FREQUENCY: 'Frequency',
  SALES_FREQ: 'SalesFreq',
  PAYMENT_FREQ: 'PaymentFreq',
  TIMELY_PYMNT: 'TimelyPymt',
  SUPPLIER_DEPENDENCY: 'SupDependency',
  ADDITIONAL_INFO: 'AdditionalInfo',
  GOODS_SERVICES_QUALITY: 'GoodsServicesQuality',
  GOODS_SERVICES_PURCH_FREQ: 'GoodsServicesPurchFreq',
  BUYER_DEPENDENCY: 'BuyDependency',
  GENDER: 'Gender',
  PROGRAM_PRODUCT: 'ProductProgram',
  RESIDENT_STATUS: 'ResidentStatus',
  DEBTOR_SOURCE: 'DebtorSource',
  LEGAL_ENTITY: 'LegalEntity',
  COLLATERAL_TYPE: 'CollateralType',
  COLLATERAL_DOCUMENT: 'CollateralDocument',
  DEBITUR_TYPE: 'DebiturType',
  DEBITUR_TYPE_MUR: 'DebiturTypeMUR',
  CITY: 'City',
  PROVINCE: 'Province',
  POSITION: 'Position',
  CITY_CODE: 'CollateralCity',
  CREDIT_PURPOSE: 'CreditPurpose',
  SUBMISSION_STATUS: 'SubmissionStatus',
  ID_CARD: 'IDCard',
  BANK_NAME: 'BankName',
  MORAL_OBLIGATION: 'MoralObligation'
});

const definedName = Object.freeze({
  COLLATERAL_ATTACHMENT_INDV: 'col_attch_amt_indv_desc',
  COLLATERAL_ATTACHMENT_CORP: 'col_attch_amt_corp_desc',
  GUARANTOR_PROFILE: 'guarantor_profile_desc',
  SECOND_GUARANTOR_PROFILE: 'second_guarantor_profile_desc',
  GUARANTOR_TYPE: 'guarantor_type_desc',
  GUARANTOR_COVERAGE: 'guarantor_coverage_desc',
  GUARANTOR_DEBTOR_RELATION: 'guarantorDebtorRelation_desc',
  COVENANT_FREQ: 'cov_header_freq_code_desc',
  COVENANT_EXIST: 'cov_header_existing_condition_code_desc',
  PRECENDENT_EXIST: 'precedent_header_existing_condition_code_desc',
  DRAWDOWN_EXIST: 'drawdown_header_existing_condition_code_desc',
  HOME_OWNERSIP: 'homeOwnershipStatus_desc',
  INDUSTRIAL_SECTOR: 'ind_sec_code_desc',
  GENDER: 'genderCode_desc',
  PROGRAM_PRODUCT: 'programProduct_desc',
  RESIDENT_STATUS: 'residentStatus_desc',
  DEBTOR_SOURCE: 'sourceOfDebtor_desc',
  INSTALMENT: 'inst_type_code_desc',
  FACILITY_NAME: 'fac_name_code_desc',
  FACILITY_NAME_OTH: 'fac_name_desc',
  FACILITY_TYPE: 'fac_type_code_desc',
  CURRENCY: 'curr_code_desc',
  LEGAL_ENTITY: 'legalEntityCode_desc',
  IS_BI_LIST: 'is_bi_list_desc',
  BI_CHECK_LAST_3MOS: 'bi_check_last_3mos_desc',
  IS_BUSINESS_MIN_2YEARS: 'is_business_min_2years_desc',
  IS_BUSINESS_NON_INDUSTRY: 'is_business_nonIndustry_desc',
  POSITIVE_CHECK: 'positive_check_desc',
  IS_SUPPLIER_VERIFIIED: 'is_supplier_verified_code_desc',
  SALES_FREQ: 'sales_freq_code_desc',
  PAYMENT_FREQ: 'payment_freq_code_desc',
  TIMELY_PYMNT: 'timely_pymt_code_desc',
  IS_CONT_RELATION: 'is_cont_relation_code_desc',
  IS_NEG_INFO: 'is_neg_info_code_desc',
  GOODS_SERVICES_QUALITY: 'goods_services_quality_code_desc',
  IS_BUYER_VERIFIED: 'is_buyer_verified_code_desc',
  GOODS_SERVICES_PURCH_FREQ: 'goods_services_purch_freq_cnt_desc',
  BUYER_DEPENDENCY: 'main_buy_dependency_code_desc',
  COLLATERAL_TYPE: 'collateralType_desc',
  COLLATERAL_DOCUMENT: 'collateralDocument_desc',
  COLLATERAL_EXISTING: 'collateralExisting_desc',
  COLLATERAL_STATUS: 'collateralStatus_desc',
  REUSE_COL_BTPN: 'reuse_collateral_btpn_desc',
  IS_CROSS_COLLATERAL: 'isCrossCollateral_desc',
  IS_LTV: 'isLTV_desc',
  IS_PRODUCTIVE_ASSET: 'isProductiveAsset_desc',
  COLLATERAL_PROPERTY: 'collateralProperty_desc',
  IS_TAKEOVER: 'is_takeover_desc',
  BI_LAST_3MOS_CODE: 'bi_last_3mos_code_desc',
  BI_COLLECT_LAST_2MOS: 'bi_collect_last_2mos_desc',
  BI_COLLECT_LAST_1MOS: 'bi_collect_last_1mos_desc',
  DEBITUR_TYPE: 'debiturType_desc',
  CITY: 'businessCityCode_desc',
  PROVINCE: 'businessProvinceCode_desc',
  COLL_TYPE: 'coll_type_desc',
  DATI_II: 'datiII_desc',
  MANAGEMENT_POSITION: 'managementPosition_desc',
  CITY_CODE: 'cityCode_desc',
  CREDIT_PURPOSE: 'credit_purpose_code_desc',
  SUBMISSION_STATUS: 'submission_sts_code_desc',
  HAS_UL_FACILITY: 'has_ul_fac_code_desc',
  OTHER_BUSINESS_TYPE: 'other_business_type_code_desc',
  ADDITIONAL_INFO: 'additional_info_desc',
  ID_CARD: 'id_card_desc',
  BANK_NAME: 'bank_name_desc',
  MORAL_OBLIGATION: 'moral_obligation_desc'
});

const customerScale = Object.freeze({
  CUSTOMER_SCALE_SMALL: 'SMES',
  CUSTOMER_SCALE_LARGE: 'SMEL',
  CUSTOMER_SCALE_MUR: 'MUR'
});

const uploadCode = Object.freeze({
  XLSM: 'XLSM',
  FPK: 'FPK'
});

const uploadType = Object.freeze({
  FPK: 'FPK',
  MKKMUR: 'MKKMUR',
  MKKSME: 'MKKSME',
  MKKCOMM: 'MKKCOMMERCIAL',
  MEMO: 'MEMO'
});

const dealType = Object.freeze({
  SME_COMM_DEAL_TYPE: [
    { dealType: 'CS', loanType: 'PRK' },
    { dealType: 'CZ', loanType: 'PRK' },
    { dealType: 'MAB', loanType: 'PAB' },
    { dealType: 'MAR', loanType: 'PAB' },
    { dealType: 'MPB', loanType: 'PB' },
    { dealType: 'MAC', loanType: 'PAB' },
    { dealType: 'MPR', loanType: 'PB' },
    { dealType: 'CT', loanType: 'PRK' },
    { dealType: 'MAH', loanType: 'PAB' },
    { dealType: 'MAG', loanType: 'PAB' },
    { dealType: 'MPL', loanType: 'PB' },
    { dealType: 'MAS', loanType: 'PAB' },
    { dealType: 'MAL', loanType: 'PAB' },
    { dealType: 'MAM', loanType: 'PAB' },
    { dealType: 'CX', loanType: 'PRK' },
    { dealType: 'MPG', loanType: 'PB' },
    { dealType: 'CQ', loanType: 'PRK' },
    { dealType: 'CT', loanType: 'PRK' },
    { dealType: 'MHI', loanType: 'PAB' },
    { dealType: 'MHP', loanType: 'PAB' },
    { dealType: 'MCI', loanType: 'PAB' },
    { dealType: 'MCP', loanType: 'PAB' },
    { dealType: 'MTI', loanType: 'PAB' },
    { dealType: 'MTP', loanType: 'PAB' },
    { dealType: 'MAN', loanType: 'PAB' },
    { dealType: 'MAO', loanType: 'PAB' },
    { dealType: 'MPN', loanType: 'PB' },
    { dealType: 'CW', loanType: 'PRK' },
    { dealType: 'CE', loanType: 'PRK' }
  ],
  MUR_DEAL_TYPE: [
    { dealType: 'UM1', loanType: 'PAB' },
    { dealType: 'UM2', loanType: 'PAB' },
    { dealType: 'UM3', loanType: 'PAB' },
    { dealType: 'UM4', loanType: 'PAB' },
    { dealType: 'UB2', loanType: 'PB' },
    { dealType: 'UB3', loanType: 'PB' },
    { dealType: 'UA1', loanType: 'PB' },
    { dealType: 'UD1', loanType: 'PB' },
    { dealType: 'UK1', loanType: 'PAB' },
    { dealType: 'UK2', loanType: 'PAB' },
    { dealType: 'UK3', loanType: 'PAB' },
    { dealType: 'CC', loanType: 'PRK' },
    { dealType: 'CG', loanType: 'PRK' },
    { dealType: 'UM5', loanType: 'PAB' },
    { dealType: 'UP2', loanType: 'PAB' },
    { dealType: 'UP3', loanType: 'PAB' },
    { dealType: 'UP4', loanType: 'PAB' },
    { dealType: 'UR1', loanType: 'PB' },
    { dealType: 'UR2', loanType: 'PB' },
    { dealType: 'UR3', loanType: 'PB' },
    { dealType: 'UM6', loanType: 'PAB' },
    { dealType: 'UM7', loanType: 'PAB' },
    { dealType: 'UM8', loanType: 'PAB' },
    { dealType: 'CI', loanType: 'PRK' },
    { dealType: 'UB5', loanType: 'PB' }
  ]
});

const routes = Object.freeze({
  P_ROOT: '/',
  G_ROOT: '/',
  G_ID: '/:id',
  v1: '/v1',
  v2: '/v2',
  P_v2: '/v2',
  v0_ID: '/v0/:id',
  v1_ID: '/v1/:id',
  v2_ID: '/v2/:id',
  V2: '/V2',
  V2_ID: '/V2/:id',
  V2_POS_ID: '/v2/pos/:id',
  V2_SUM_ID: '/v2/sum/:id',
  TABLENAME: '/:tableName',
  CRN: '/crn/:crn',
  CIF_CORP: '/companyDocument/cif/:cif',
  CIF_INDV: '/personalData/cif/:cif',
  SAVE_DEDUP: '/saveDedup',
  TEST: '/test',
  DEDUP_INTERNAL: '/searchPerseoranganInternal',
  DEDUP_CUSTOMER: '/getDuplicateCustomer',
  DEDUP_DOWNLOAD: '/downloadDedupResult/:id',
  P_FIN_GET_YEAR: '/fetchInputYear',
  P_FIN_GET_RPT: '/fetchLaporan',
  P_FIN_GET_POS: '/fetchPos',
  P_FIN_GET_OTHER: '/fetchLaporanLainSmes',
  P_FIN_SAV_POS: '/savePos',
  G_FIN_SUM_DPR: '/fetchSumHppDepresiasi/:id/:lobtype',
  P_MEMO: '/memo',
  G_MEMO_ID: '/memo/:id',
  G_MEMO_DL_ID: '/memo/download/:id',
  G_HOME: '',
  P_SUBMIT: '/submit',
  P_LOGOUT: '/out',
  P_LOGIN_BYPASS: '/bypass',
  G_LOOK: '/',
  G_LOOK_XLS: '/xls/',
  G_PAGE_PICKER: '/picker',
  P_PAGE_FETCH: '/fetch',
  P_PAGE_REPORT: '/report',
  G_ROLE_GROUP: '/group',
  G_ROLE_ID: '/role/:id',
  G_ROLE_FIND: '/find',
  G_ROLE_FIND_CODE: '/find/code',
  P_ROLE_INS: '/insert',
  P_ROLE_UPD_ID: '/update/:id',
  P_ROLE_DEL_ID: '/delete/:id',
  G_ROLE_DL: '/downloadRole',
  P_SOFF_UPL: '/upload-generate',
  G_TASK_ROLE_ID: '/role-id/:id',
  P_TASK_ROLE_INSGRP: '/insert-group',
  P_TASK_ROLE_UPD: '/update',
  P_TASK_ROLE_INS: '/insert',
  G_TASK_ID: '/task/:id'
});

const activityEntity = Object.freeze({
  USER_MANAGEMENT: { type: 'User', url: null, workflow: '/user/actionWorkflow' },
  ROLE_MANAGEMENT: { type: 'Role', url: null, workflow: '/task-role/actionWorkflow' },
  MKK_SME_MANAGEMENT: { type: 'MkkSme', url: 'mkk-entry', workflow: '/mkk-sme/v1/actionWorkflow' },
  MKK_COMM_MANAGEMENT: { type: 'MkkCommercial', url: 'mkk-entry-commercial', workflow: '/mkk-sme/v1/actionWorkflow' },
  MKK_MUR_MANAGEMENT: { type: 'MkkMur', url: 'mkk-entry-mur', workflow: '/mkk-mur/v1/actionWorkflow' }
});

const actionWfStatus = Object.freeze({
  APPROVE: 'ActivityStatus_Approve',
  REJECT: 'ActivityStatus_Reject'
});

const actionOpStatus = Object.freeze({
  NEW: 'ActivityStatus_New',
  UPDATE: 'ActivityStatus_Update'
});

const userRole = Object.freeze({
  RCR: 'RCR',
  ACM: 'ACM',
  SAMM: 'SAMM',
  SAMC: 'SAMC',
  ABL: 'ABL',
  RBL: 'RBL'
});

const jwtError = Object.freeze({
  TokenExpiredError: {
    message: 'Webtoken is expired',
    error: 'Token Expired'
  }
})

const itemStatus = Object.freeze({
  AVAILABLE: 'Tersedia'
})

const schedulerStatus = Object.freeze({
  INPROGRESS: 'INPROGRESS',
  DONE: 'DONE',
  FAILED: 'FAILED'
})

module.exports = {
  lookup,
  definedName,
  customerScale,
  uploadCode,
  routes,
  dealType,
  activityEntity,
  actionWfStatus,
  actionOpStatus,
  uploadType,
  userRole,
  jwtError,
  itemStatus,
  schedulerStatus
};
