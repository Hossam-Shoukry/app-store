import db from "@/fb";
import router from "@/router";
import { reactive, toRefs } from "vue";

export const cutomer = () => {
  const state = reactive({
    listOfSellers: [],
    sellers: "",
    selelrName: [],
    displaySellerName: [],
  });

  const getSellers = async () => {
    state.listOfSellers = [];
    const users = await db.collection("users").get();

    for (let i = 0; i < users.docs.length; i++) {
      state.listOfSellers.push(users.docs[i].data());
    }
    state.sellers = state.listOfSellers.filter((seller) => {
      return seller.dept == "Seller";
    });
    for (let i = 0; i < state.sellers.length; i++) {
      state.selelrName.push(
        state.sellers[i].email.slice(0, state.sellers[i].email.indexOf("@"))
      );
      const sellerObj = Object.assign({
        sellerName: state.selelrName[i],
        id: state.sellers[i].userId,
      });
      state.displaySellerName.push(sellerObj);
    }
    localStorage.setItem(
      "sellers-info",
      JSON.stringify(state.displaySellerName)
    );
    console.log(state.displaySellerName);
  };

  const redirect = (seller) => {
    router.push({
      name: "customerProducts",
    });
    localStorage.setItem("user-param", seller.id);
    localStorage.setItem("seller-name", seller.sellerName);
  };
  return { ...toRefs(state), getSellers, redirect };
};
