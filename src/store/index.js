import { createStore } from "vuex";
import { contact } from "./contact";
import { skills } from "./skills";
import { nav } from "./nav";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import router from "@/router";

export default createStore({
  state: {
    isloggedIn: false,
  },

  getters: {},

  mutations: {
    logOut(state) {
      onAuthStateChanged(getAuth(), (user) => {
        if (user) {
          state.isloggedIn = true;
        } else {
          state.isloggedIn = false;
        }
      });
    },
    handleSignOut(state) {
      localStorage.clear();
      signOut(getAuth()).then(() => {
        router.push({ name: "signIn" });
      });
    },
  },

  actions: {},

  modules: {
    skills: skills,
    contact: contact,
    nav: nav,
  },
});
