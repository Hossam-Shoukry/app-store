export const nav = {
  namespaced: true,
  state: {
    navItnit: "1",
    init: localStorage.getItem("init"),
    color: "",
  },
  mutations: {
    //set root color on page mount
    ColorsOnMount() {
      document.documentElement.style.setProperty(
        "--main-color",
        localStorage.getItem("main-color")
      );
    },

    MyColor(state, payload) {
      localStorage.setItem("main-color", payload.target.dataset.color);
      localStorage.setItem("init", payload.target.dataset.init);
      state.init = localStorage.getItem("init");
      document.documentElement.style.setProperty(
        "--main-color",
        payload.target.dataset.color
      );
    },
    navItnitColor(state, payload) {
      state.navItnit = payload.target.dataset.navinit;
    },
  },
};
