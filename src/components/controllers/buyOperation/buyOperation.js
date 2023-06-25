import db, { storage } from "@/fb";
import router from "@/router";
import { getDownloadURL, ref } from "firebase/storage";
import { reactive, toRefs } from "vue";
export const buyOperation = () => {
  const state = reactive({
    productName: "",
    productDescription: "",
    productObj: {},
    amount: [1, 2, 3, 4],
    price: 1,
    productPrice: "",
    customerData: "",
    listOfUsers: [],
    customerName: "",
    successMsg: "",
  });
  const getProduct = async () => {
    const product = await db
      .collection(
        `${localStorage.getItem("user-param")}${localStorage.getItem(
          "category"
        )}`
      )
      .doc(localStorage.getItem("product-id"))
      .get();
    await getDownloadURL(
      ref(
        storage,
        `${localStorage.getItem("user-param")}${localStorage.getItem(
          "category"
        )}/${product.data().productImage}`
      )
    ).then((urlImg) => {
      state.productObj = Object.assign({ id: product.id }, product.data(), {
        img: urlImg,
      });
    });
    state.productPrice = state.productObj.productPrice;
    console.log(state.productObj);
  };
  const getCustomer = async () => {
    const customer = await db.collection("users").get();
    for (let i = 0; i < customer.docs.length; i++) {
      state.listOfUsers.push(customer.docs[i].data());
    }
    state.customerData = state.listOfUsers.filter((data) => {
      return data.userId == localStorage.getItem("user-id");
    });
    state.customerName = state.customerData[0].email;
  };
  const sendRequest = async () => {
    db.collection(`${localStorage.getItem("user-param")}requests`).add({
      requestImg: state.productObj.img,
      requestName: state.productObj.productName,
      requestDescription: state.productObj.productDescription,
      requestPrice: state.productPrice,
      requestAmount: state.price,
      requestEmail: state.customerName,
      requestCategory: localStorage.getItem("category"),
      requestStatuse: "confirm order",
      userId: localStorage.getItem("user-id"),
      requestId: state.productObj.id,
    });
    db.collection(`${localStorage.getItem("user-id")}purchases`).add({
      requestImg: state.productObj.img,
      requestName: state.productObj.productName,
      requestDescription: state.productObj.productDescription,
      requestPrice: state.productPrice,
      requestAmount: state.price,
      requestEmail: state.customerName,
      requestCategory: localStorage.getItem("category"),
      requestStatuse: "not confirmed",
      userId: localStorage.getItem("user-id"),
      requestId: state.productObj.id,
    });
    state.successMsg = "Order Has Been Sent";
    setTimeout(() => {
      state.successMsg = "";
      router.push({ name: "customerProducts" });
    }, 3000);
  };
  return { ...toRefs(state), getProduct, getCustomer, sendRequest };
};
