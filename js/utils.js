/* global function */

Website.initHelpers = () => {
  Website.helpers = {
    html_dom: document.querySelector("html"),
    page_dom: document.querySelector(".window-container"),
    pageHeader_dom: document.querySelector(".page-header"),
    homeBanner_dom: document.querySelector(".home-banner-container"),
    pjaxBar_dom: document.querySelector(".pjax-progress-bar"),
    pjaxIcon_dom: document.querySelector(".pjax-progress-icon"),
    back2TopButton_dom: document.querySelector(".tool-scroll-to-top"),
    toolsList: document.querySelector(".hidden-tools"),
    toggleButton: document.querySelector(".toggle-tools-list"),
    innerHeight: window.innerHeight,
    pjaxProgressBarTimer: null,
    prevScrollValue: 0,
    fontSizeLevel: 0,

    // Scroll Style
    updateScrollStyle() {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight =
        window.innerHeight || document.documentElement.clientHeight;
      const percent = Math.round(
        (scrollTop / (scrollHeight - clientHeight)) * 100
      );
      const percentDom = this.back2TopButton_dom.querySelector(".percent");
      this.back2TopButton_dom.classList.toggle(
        "show",
        percent !== 0 && percent !== undefined
      );
      percentDom.innerHTML = percent.toFixed(0);
      this.pageHeader_dom.classList.remove("hide");
      this.prevScrollValue = scrollTop;
    },

    // register window scroll event
    registerWindowScroll() {
      window.addEventListener("scroll", () => {
        // style handle when scroll
        this.updateScrollStyle();

        // navbar shrink
        navbarShrink.init();

        // auto hide tools
        var y = window.pageYOffset;
        var height = document.body.scrollHeight;
        var windowHeight = window.innerHeight;
        var toolList = document.getElementsByClassName(
          "right-side-container"
        );

        for (var i = 0; i < toolList.length; i++) {
          var tools = toolList[i];
          if (y <= 0) {
            if (location.pathname !== "/") {
              //console.log(location.pathname)
            } else {
              tools.classList.add("hide");
            }
          } else if (y + windowHeight >= height - 20) {
            tools.classList.add("hide");
          } else {
            tools.classList.remove("hide");
          }
        }
      });
    },

    toggleToolsList() {
      this.toggleButton.addEventListener("click", () => {
        this.toolsList.classList.toggle("show");
      });
    },

    // get dom element height
    getElementHeight(selectors) {
      const dom = document.querySelector(selectors);
      return dom ? dom.getBoundingClientRect().height : 0;
    },

    // init first screen height
    initFirstScreenHeight() {
      this.homeBanner_dom &&
        (this.homeBanner_dom.style.height = this.innerHeight + "px");
    },

    // init page height handle
    initPageHeightHandle() {
      if (this.homeBanner_dom) return;
      const temp_h1 = this.getElementHeight(".page-header");
      const temp_h2 = this.getElementHeight(".main-content-body");
      const temp_h3 = this.getElementHeight(".main-content-footer");
      const allDomHeight = temp_h1 + temp_h2 + temp_h3;
      const innerHeight = window.innerHeight;
      const pb_dom = document.querySelector(".main-content-footer");
      if (allDomHeight < innerHeight) {
        const marginTopValue = Math.floor(innerHeight - allDomHeight);
        if (marginTopValue > 0) {
          pb_dom.style.marginTop = `${marginTopValue - 2}px`;
        }
      }
    },

    // big image viewer
    imageViewer() {
      let isBigImage = false;

      const showHandle = (maskDom, isShow) => {
        document.body.style.overflow = isShow ? "hidden" : "auto";
        if (isShow) {
          maskDom.classList.add("active");
        } else {
          maskDom.classList.remove("active");
        }
      };

      const imageViewerDom = document.querySelector(".image-viewer");
      const targetImg = document.querySelector(".image-viewer img");
      imageViewerDom &&
        imageViewerDom.addEventListener("click", () => {
          isBigImage = false;
          showHandle(imageViewerDom, isBigImage);
        });

      const imgDoms = document.querySelectorAll(".markdown-body img");

      if (imgDoms.length) {
        imgDoms.forEach((img) => {
          img.addEventListener("click", () => {
            isBigImage = true;
            showHandle(imageViewerDom, isBigImage);
            targetImg.setAttribute("src", img.getAttribute("src"));
          });
        });
      } else {
        this.page_dom.removeChild(imageViewerDom);
      }
    },

    // set how long ago language
    setHowLongAgoLanguage(p1, p2) {
      return p2.replace(/%s/g, p1);
    },

    getHowLongAgo(timestamp) {
      const time_span = {
        second: "%s 秒前",
        minute: "%s 分钟前",
        hour: "%s 小时前",
        day: "%s 天前",
        week: "%s 周前",
        month: "%s 个月前",
        year: "%s 年前",
      };
      const l = time_span;

      const __Y = Math.floor(timestamp / (60 * 60 * 24 * 30) / 12);
      const __M = Math.floor(timestamp / (60 * 60 * 24 * 30));
      const __W = Math.floor(timestamp / (60 * 60 * 24) / 7);
      const __d = Math.floor(timestamp / (60 * 60 * 24));
      const __h = Math.floor((timestamp / (60 * 60)) % 24);
      const __m = Math.floor((timestamp / 60) % 60);
      const __s = Math.floor(timestamp % 60);

      if (__Y > 0) {
        return this.setHowLongAgoLanguage(__Y, l.year);
      } else if (__M > 0) {
        return this.setHowLongAgoLanguage(__M, l.month);
      } else if (__W > 0) {
        return this.setHowLongAgoLanguage(__W, l.week);
      } else if (__d > 0) {
        return this.setHowLongAgoLanguage(__d, l.day);
      } else if (__h > 0) {
        return this.setHowLongAgoLanguage(__h, l.hour);
      } else if (__m > 0) {
        return this.setHowLongAgoLanguage(__m, l.minute);
      } else if (__s > 0) {
        return this.setHowLongAgoLanguage(__s, l.second);
      }
    },

    relativeTimeInHome() {
      const post = document.querySelectorAll(
        ".home-article-meta-info .home-article-date"
      );
      post &&
        post.forEach((v) => {
          const nowDate = Date.now();
          const postDate = new Date(v.dataset.date.split(" GMT")[0]).getTime();
          const finalDays = Math.floor(
            (nowDate - postDate) / (60 * 60 * 24 * 1000)
          );
          if (finalDays < 7) {
            v.innerHTML = this.getHowLongAgo(
              Math.floor((nowDate - postDate) / 1000)
            );
          }
        });
    },

    // loading progress bar start
    pjaxProgressBarStart() {
      this.pjaxProgressBarTimer && clearInterval(this.pjaxProgressBarTimer);
      this.pjaxBar_dom.style.width = "0";
      this.pjaxIcon_dom.classList.add("show");

      let width = 1;
      const maxWidth = 99;

      this.pjaxBar_dom.classList.add("show");
      this.pjaxBar_dom.style.width = width + "%";

      this.pjaxProgressBarTimer = setInterval(() => {
        width += 5;
        if (width > maxWidth) width = maxWidth;
        this.pjaxBar_dom.style.width = width + "%";
      }, 100);
    },

    // loading progress bar end
    pjaxProgressBarEnd() {
      this.pjaxProgressBarTimer && clearInterval(this.pjaxProgressBarTimer);
      this.pjaxBar_dom.style.width = "100%";

      const temp_1 = setTimeout(() => {
        this.pjaxBar_dom.classList.remove("show");
        this.pjaxIcon_dom.classList.remove("show");

        const temp_2 = setTimeout(() => {
          this.pjaxBar_dom.style.width = "0";
          clearTimeout(temp_1), clearTimeout(temp_2);
        }, 200);
      }, 200);
    },
  };

  // init scroll
  Website.helpers.registerWindowScroll();

  // toggle show tools list
  Website.helpers.toggleToolsList();

  // init page height handle
  Website.helpers.initPageHeightHandle();

  // init first screen height
  Website.helpers.initFirstScreenHeight();

  // big image viewer handle
  Website.helpers.imageViewer();

  // set how long ago in home article block
  Website.helpers.relativeTimeInHome();
};
