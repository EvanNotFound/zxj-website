/* global function */

window.addEventListener("DOMContentLoaded", () => {
  Website.localStorageKey = "WEBSITE-STATUS";

  Website.styleStatus = {
    isExpandPageWidth: false,
    isDark: false,
    fontSizeLevel: 0,
    isOpenPageAside: true,
  };

  // set styleStatus to localStorage
  Website.setStyleStatus = () => {
    localStorage.setItem(
      Website.localStorageKey,
      JSON.stringify(Website.styleStatus)
    );
  };

  // get styleStatus from localStorage
  Website.getStyleStatus = () => {
    let temp = localStorage.getItem(Website.localStorageKey);
    if (temp) {
      temp = JSON.parse(temp);
      for (let key in Website.styleStatus) {
        Website.styleStatus[key] = temp[key];
      }
      return temp;
    } else {
      return null;
    }
  };

  Website.refresh = () => {
    Website.initHelpers();
    navbarShrink.init();
    Website.initModeToggle();
    Website.initBackToTop();
    Website.initCopyCode();
    Website.initLazyLoad();
  };
  Website.refresh();
});
