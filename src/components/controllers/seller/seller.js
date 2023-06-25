import { toRefs } from "vue";
import { reactive } from "vue";
import db, { storage } from "@/fb";
import {
  getDownloadURL,
  uploadBytes,
  ref,
  deleteObject,
} from "firebase/storage";
export const seller = () => {
  const state = reactive({
    delDialog: false,
    loading: false,
    productName: "",
    productPrice: "",
    productDescription: "",
    productImage: "",
    dialog: false,
    comingData: [],
    send: "Submit",
    mode: "send",
    temp: "",
    img: "",
    category: "",
    productCategory: "",
    inputRules: [(v) => v.length > 4 || "minimum characters are 4"],
    errMessage: "",
    listOfimgs: [],
    filterImgs: "",
    delproductName: "",
    delproductPrice: "",
    delproductDescription: "",
    delImg: "",
    delId: "",
  });

  const addNewProduct = () => {
    state.send = "Submit";
    state.mode = "send";
    state.productName = "";
    state.productPrice = "";
    state.productDescription = "";
    state.productCategory = "";
  };
  /******* Make Vaslidation for images to avoid errors ****** */
  const validationDataImg = async (value, param) => {
    state.listOfimgs = [];
    const imgs = await db
      .collection(`${localStorage.getItem("user-id")}${value}`)
      .get();

    for (let i = 0; i < imgs.docs.length; i++) {
      state.listOfimgs.push(imgs.docs[i].data().productImage);
    }
    state.filterImgs = state.listOfimgs.filter((img) => {
      return param.imgRef.files[0].name == img;
    });
    console.log(state.listOfimgs);
    console.log(state.filterImgs);
  };
  /************ Send Data  *********/
  const sendData = async (param) => {
    await validationDataImg(state.productCategory, param);
    // i get all imgs in firestore collection to make validations
    if (state.filterImgs.length > 0) {
      state.errMessage =
        "image name is exist before please rename your image with onother name";
      setTimeout(() => {
        state.errMessage = "";
      }, 5000);
    } else {
      if ((await param.form.validate()).errors.length == 0) {
        state.loading = true;
        // first i add the text data
        if (state.mode == "send") {
          db.collection(
            `${localStorage.getItem("user-id")}${state.productCategory}`
          ).add({
            productName: state.productName,
            productPrice: state.productPrice,
            productDescription: state.productDescription,
            productId: localStorage.getItem("user-id"),
            productImage: param.imgRef.files[0].name,
          });
          // second i add the image
          const storageRef = ref(
            storage,
            `${`${localStorage.getItem("user-id")}${state.productCategory}`}/${
              param.imgRef.files[0].name
            }`
          );
          await uploadBytes(storageRef, param.imgRef.files[0]).then(
            (snapshot) => console.log("file uploaded")
          );
          getStorageData(state.productCategory);
        } else {
          state.send = "update";
          db.collection(
            `${localStorage.getItem("user-id")}${state.productCategory}`
          )
            .doc(state.temp)
            .update({
              productName: state.productName,
              productPrice: state.productPrice,
              productDescription: state.productDescription,
              productId: localStorage.getItem("user-id"),
              productImage: param.imgRef.files[0].name,
            });
          const storageRef = ref(
            storage,
            `${localStorage.getItem("user-id")}${state.productCategory}/${
              param.imgRef.files[0].name
            }`
          );
          await uploadBytes(storageRef, param.imgRef.files[0]).then(
            (snapshot) => console.log("file uploaded")
          );
          // delete old img from firebase storage
          deleteObject(ref(storage, `${state.img}`));
          state.mode = "send";
          state.send = "Submit";
          state.productName = "";
          state.productPrice = "";
          state.productDescription = "";
          state.dialog = false;
          getStorageData(state.productCategory);
        }

        state.loading = false;
      }
    }
  };

  /**************** Get Data from firebase  ************** */
  const getStorageData = async (param) => {
    state.comingData = [];
    //first i get text data from firestore collection
    const categData = await db
      .collection(`${localStorage.getItem("user-id")}${param}`)
      .get();
    // second i get images  from firebase storage
    for (let i = 0; i < categData.docs.length; i++) {
      await getDownloadURL(
        ref(
          storage,
          `${localStorage.getItem("user-id")}${param}/${
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
    //  console.log(state.comingData);
  };

  /**************** Delete Data  ************** */
  const showDelData = (item, index) => {
    // state.delDialog = true;
    state.delproductName = item.productName;
    state.delproductDescription = item.productDescription;
    state.delproductPrice = item.productPrice;
    state.delImg = item.productImg;
    state.temp = index;
    state.delId = item.id;
  };

  const deletData = async () => {
    state.comingData.splice(state.temp, 1);
    db.collection(`${localStorage.getItem("user-id")}${state.category}`)
      .doc(state.delId)
      .delete();
    deleteObject(ref(storage, `${state.delImg}`));
    state.delDialog = false;
  };
  /**************** Update Data  ************** */
  const updateData = (item) => {
    state.mode = "update";
    state.send = "update";
    state.temp = item.id;
    state.img = item.productImg;
    state.dialog = true;
    state.productName = item.productName;
    state.productPrice = item.productPrice;
    state.productDescription = item.productDescription;
    state.productCategory = state.category;
  };
  const onChangeValue = () => {
    localStorage.setItem("category", state.category);
    getStorageData(state.category);
  };

  return {
    ...toRefs(state),
    sendData,
    getStorageData,
    deletData,
    updateData,
    addNewProduct,
    onChangeValue,
    validationDataImg,
    showDelData,
  };
};
