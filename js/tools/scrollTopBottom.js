Website.initBackToTop = () => {

  Website.helpers = {

    ...Website.helpers,

    backToBottomButton_dom: document.querySelector('.tool-scroll-to-bottom'),

    backtotop() {
      document.body.scrollIntoView({
        behavior: "smooth"
      });
    },

    backToBottom() {
      document.querySelector(".main-content-footer").scrollIntoView({
        behavior: "smooth"
      });
    },

    initBackToTop() {
      this.back2TopButton_dom.addEventListener('click', () => {
        this.backtotop();
      });
    },

    initBackToBottom() {
      this.backToBottomButton_dom.addEventListener('click', () => {
        this.backToBottom();
      });
    },
  }

  Website.helpers.initBackToTop();
  Website.helpers.initBackToBottom();

}
