import { reactive, toRefs } from "vue";
import db, { storage } from "@/fb";
import { getDownloadURL, ref } from "firebase/storage";
import router from "@/router";
export const customerProducts = () => {
  const state = reactive({
    category: "",
    comingData: [],
  });

  /**************** Get Data from firebase  ************** */
  const getStorageData = async (param) => {
    state.comingData = [];
    //first i get text data from firestore collection
    const categData = await db
      .collection(`${localStorage.getItem("user-param")}${param}`)
      .get();
    // second i get images  from firebase storage
    for (let i = 0; i < categData.docs.length; i++) {
      await getDownloadURL(
        ref(
          storage,
          `${localStorage.getItem("user-param")}${param}/${
            categData.docs[i].data().productImage
          }`
        )
      ).then((download_url) => {
        let Textobj = Object.assign(
          { id: categData.docs[i].id },
          categData.docs[i].data(),
          { productImg: download_url }
        );
        state.comingData.push(Textobj);
      });
      state.comingData = Array.from(new Set(state.comingData));
    }
    //console.log(state.comingData);
  };
  const storeValue = (param) => {
    localStorage.setItem("category", param);
  };
  const onChangeValue = async () => {
    storeValue(state.category);
    await getStorageData(state.category);
  };
  const buyOperation = (item) => {
    localStorage.setItem("product-id", item.id);
    router.push({ name: "buyOperation" });
  };
  return { ...toRefs(state), getStorageData, onChangeValue, buyOperation };
};
