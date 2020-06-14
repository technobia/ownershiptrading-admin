// Tags
export const GET_TAG_LIST = domain => ({
  method: "get",
  url: `/${domain}/tags`
});
export const SAVE_TAG_ITEM = domain => ({
  method: "post",
  url: `/${domain}/tags`
});
export const GET_TAG_BY_ID = (domain, id) => ({
  method: "get",
  url: `/${domain}/tags/${id}`
});

// Creatives
export const GET_CREATIVES_LIST = domain => ({
  method: "get",
  url: `/${domain}/creatives`
});


// Dashboard
export const GET_DAILY_DATA_REPORT_DETAIL = domain => ({
  method: "get",
  url: `/${domain}/report/rt`
});
export const GET_DAILY_TAG_REPORT_DETAIL = domain => ({
  method: "get",
  url: `/${domain}/report/rt/tags`
});
export const GET_MONTHLY_DATA_REPORT_DETAIL = domain => ({
  method: "get",
  url: `/${domain}/report/rt/month`
});


// Report
export const GET_REPORT_ID = domain => ({
  method: "post",
  url: `/${domain}/report`
});
export const RUN_REPORT = (domain, id) => ({
  method: "get",
  url: `/${domain}/report/${id}`
});
