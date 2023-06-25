import { reactive } from "vue";
export const randomBackground = () => {
  const state = reactive({
    listOfBackGroundImgs: [
      "furniture.jpg",
      "iphone.jpg",
      "laptop.jpg",
      "sport.jpg",
    ],
    displayRandomImg: "",
  });
  let randomBackGround = () => {
    state.displayRandomImg =
      state.listOfBackGroundImgs[
        Math.floor(Math.random() * state.listOfBackGroundImgs.length)
      ];
    return state.displayRandomImg;
  };
  return { randomBackGround };
};
