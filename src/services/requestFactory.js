import axios from 'axios';
import localStorage from "src/utils/localStorage";

const requestClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://api.chin2shin.com/v3",
  headers: {
    "Authorization": `Bearer ${localStorage.get("token", "")}`
  }
});

const cancelListener = {};

class RequestFactory {
  static send(request, data = {}, headers = {}) {
    cancelListener[request.url] = cancelListener[request.url] || {};

    // Cancel request before if we have
    if (request.takeLatest && cancelListener[request.url].source) {
      cancelListener[request.url].source.cancel();
    }
    // Update request source
    cancelListener[request.url].source = axios.CancelToken.source();
    let config = {
      ...request,
      cancelToken: cancelListener[request.url].source.token
    };

    // Use params if it's get method
    if (request.method.toLowerCase() === 'get') {
      config.params = data;
    } else {
      config.data = data;
    }

    // Modify headers
    config.headers = headers;

    return requestClient(config);
  }
}

export default RequestFactory;
