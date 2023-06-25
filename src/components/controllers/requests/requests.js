import db, { storage } from "@/fb";
import { getDownloadURL, ref } from "firebase/storage";
import { reactive, toRefs } from "vue";

export const requests = () => {
  const state = reactive({
    requestsObj: {},
    listOfreaquests: [],
    listOfConfirmRequests: [],
    confirmed: "Confirm Order",
    loading: false,
  });
  const getRequests = async () => {
    state.listOfreaquests = [];
    const requests = await db
      .collection(`${localStorage.getItem("user-id")}requests`)
      .get();
    for (let i = 0; i < requests.docs.length; i++) {
      state.requestsObj = Object.assign(
        { id: requests.docs[i].id },
        requests.docs[i].data()
      );

      state.listOfreaquests.push(state.requestsObj);
    }
    state.listOfreaquests = Array.from(new Set(state.listOfreaquests));
    console.log(state.listOfreaquests);
  };
  const confirmRequest = async (request) => {
    state.loading = true;
    state.listOfConfirmRequests = [];
    const confirmReq = await db.collection(`${request.userId}purchases`).get();
    for (let i = 0; i < confirmReq.docs.length; i++) {
      const confirmReqObj = Object.assign(
        { id: confirmReq.docs[i].id },
        confirmReq.docs[i].data()
      );

      state.listOfConfirmRequests.push(confirmReqObj);
    }
    const filterConfirmReq = state.listOfConfirmRequests.filter((filter) => {
      return filter.requestImg == request.requestImg;
    });
    console.log(filterConfirmReq);
    //  console.log(state.listOfConfirmRequests);
    db.collection(`${request.userId}purchases`)
      .doc(filterConfirmReq[0].id)
      .update({
        requestAmount: filterConfirmReq[0].requestAmount,
        requestCategory: filterConfirmReq[0].requestCategory,
        requestDescription: filterConfirmReq[0].requestDescription,
        requestEmail: filterConfirmReq[0].requestEmail,
        requestId: filterConfirmReq[0].requestId,
        requestImg: filterConfirmReq[0].requestImg,
        requestName: filterConfirmReq[0].requestName,
        requestPrice: filterConfirmReq[0].requestPrice,
        requestStatuse: "order confirmed",
        userId: filterConfirmReq[0].userId,
      });
    db.collection(`${localStorage.getItem("user-id")}requests`)
      .doc(request.id)
      .update({
        requestAmount: filterConfirmReq[0].requestAmount,
        requestCategory: filterConfirmReq[0].requestCategory,
        requestDescription: filterConfirmReq[0].requestDescription,
        requestEmail: filterConfirmReq[0].requestEmail,
        requestId: filterConfirmReq[0].requestId,
        requestImg: filterConfirmReq[0].requestImg,
        requestName: filterConfirmReq[0].requestName,
        requestPrice: filterConfirmReq[0].requestPrice,
        requestStatuse: "order confirmed",
        userId: filterConfirmReq[0].userId,
      });
    getRequests();
    state.loading = false;
  };
  return { getRequests, ...toRefs(state), confirmRequest };
};
