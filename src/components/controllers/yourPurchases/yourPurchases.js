import db from "@/fb";
import { reactive, toRefs } from "vue";
export const yourPurchases = () => {
  const state = reactive({
    listOfPurchases: [],
  });
  const getPurchases = async () => {
    let purchases = await db
      .collection(`${localStorage.getItem("user-id")}purchases`)
      .get();
    for (let i = 0; i < purchases.docs.length; i++) {
      const purchasesObj = Object.assign(
        { id: purchases.docs[i].id },
        purchases.docs[i].data()
      );
      state.listOfPurchases.push(purchasesObj);
    }
    console.log(state.listOfPurchases);
  };
  return { getPurchases, ...toRefs(state) };
};
