import { createRouter, createWebHistory } from "vue-router";
//import HomeView from "../views/HomeView.vue";
import Feed from "@/views/feed.vue";
import SignIn from "@/views/signIn.vue";
import Register from "@/views/Register.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Customer from "@/views/customer.vue";
import Seller from "@/views/seller.vue";
import customerProducts from "@/views/customerProducts.vue";
import BuyOperation from "@/views/buyOperation.vue";
import Requests from "@/views/requests.vue";
import yourPurchases from "@/views/yourPurchases.vue";
import Error from "@/views/error.vue";
const routes = [
  /*{
    path: "/",
    name: "home",
    component: HomeView,
  },*/
  {
    path: "/feed",
    name: "feed",
    component: Feed,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/",
    name: "signIn",
    component: SignIn,
  },
  {
    path: "/customer",
    name: "customer",
    component: Customer,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/seller",
    name: "seller",
    component: Seller,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/customerProducts",
    name: "customerProducts",
    component: customerProducts,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/buyOperation",
    name: "buyOperation",
    component: BuyOperation,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/requests",
    name: "requests",
    component: Requests,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/purchases",
    name: "purchases",
    component: yourPurchases,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/:catchAll(.*)",
    name: "error",
    component: Error,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
// to avoid sign out when reload page
const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListner = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListner();
        resolve(user);
      },
      reject
    );
  });
};

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      alert("you don't have access!");
      next("/signIn");
    }
  } else {
    next();
  }
});
export default router;
