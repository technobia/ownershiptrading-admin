import map from "lodash/map";
import find from "lodash/find";

export function getAccountManagers(tags = []) {
  return tags.reduce((result, item) => {
    if (result.hasOwnProperty(item.AM)) {
      result[item.AM] += 1;
    } else if (!!item.AM) {
      result[item.AM] = 1;
    }
    return result;
  }, {})
}

export function getAccountManagerOptions(tags = []) {
  const accountManager = getAccountManagers(tags);
  return map(accountManager, (value, key) => ({ value: key, label: key }));
}

export function getPlacementOptions(tags = []) {
  return tags.map((item) => ({
    value: item.tag_id,
    label: `${item.tag_id}${item.adv_id ? ` - ${item.adv_id}` : ""}`
  }))
}

export function getExitsTags(tags, options) {
  return tags.filter(item => find(options, { value: item }));
}

export function getImageURL(imageURL) {
  return `https://files.chin2shin.com/banners/files/${imageURL}`;
}

export function getImageName(imageURL) {
  return imageURL.replace("https://files.chin2shin.com/banners/files/", "");
}
