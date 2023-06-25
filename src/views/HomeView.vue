<template>
  <Header />
  <v-container>
    <input type="text" placeholder="name" v-model="name" />
    <label v-bind="url"></label>
    <input type="file" ref="myfile" accept=".jpg , .png" />
    <v-btn :loading="loading" color="red" @click="upload()">upload</v-btn>
    <v-row class="mt-16">
      <v-col
        cols="4"
        v-for="(img, index) in Array.from(new Set(comingData))"
        :key="img"
      >
        <v-card height="200" class="text-center">
          <v-avatar size="150">
            <img :src="img" alt="" class="w-100" />
          </v-avatar>
          <v-card-actions>
            <v-btn @click="delImage(img, index)" variant="elevated" color="red"
              >Delete</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
//import db from "../fb";
import Header from "@/components/Header.vue";
import { defineComponent } from "vue";
import { storage } from "@/fb";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
//import cloudImage from "@/components/css/cloudImage.vue";
// Components
//https://stackoverflow.com/questions/61990786/get-url-of-uploaded-file-in-firebase-storage-with-vuejs
export default defineComponent({
  name: "HomeView",
  data() {
    return {
      loading: false,
      name: "",
      url: "",
      path: "",
      data: [],
      comingData: localStorage.getItem("images")
        ? JSON.parse(localStorage.getItem("images"))
        : [],
    };
  },
  //path="folder/243271324_3138080093077721_2161572754375302890_n.jpg"

  components: {
    Header,
  },
  mounted() {
    this.getStorageData(this.comingData);
  },
  methods: {
    async upload() {
      this.loading = true;
      const storageRef = ref(
        storage,
        `folder/${this.$refs.myfile.files[0].name}`
      );
      await uploadBytes(storageRef, this.$refs.myfile.files[0]).then(
        (snapshot) => console.log("file uploaded")
      );
      this.data.push(this.$refs.myfile.files[0].name);
      console.log(this.$refs.myfile.files[0]);
      this.getStorageData(this.data);
      this.loading = false;
    },
    async getStorageData(param) {
      for (let i = 0; i < this.data.length; i++) {
        await getDownloadURL(ref(storage, `folder/${param[i]}`)).then(
          (download_url) => this.comingData.push(download_url)
        );
        this.comingData = Array.from(new Set(this.comingData));
        localStorage.setItem("images", JSON.stringify(this.comingData));
      }
    },

    delImage(img, index) {
      this.comingData.splice(index, 1);
      localStorage.images = JSON.stringify(
        Array.from(new Set(this.comingData))
      );
      deleteObject(ref(storage, `${img}`));
      console.log(index);
      console.log(img);
      console.log(this.comingData);
    },
  },
});
</script>
<style lang="css"></style>
