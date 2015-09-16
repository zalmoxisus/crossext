ex.browser = 'chrome';

ex.getURL = function (url) {
  return chrome.extension.getURL(url);
};
