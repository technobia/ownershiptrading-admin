export const getSearchObject = (search) => search
  .slice(1)
  .split('&')
  .reduce((result, item) => {
    const [key, value] = item.split("=");
    result[key] = value;
    return result;
  }, {});
