<template>
  <Header />
  <div class="text-h3 font-weight-bold mt-2 text-center">Hello {{ name }}</div>
  <div class="text-center mt-10">
    <v-btn @click="getData()" color="red">get Data</v-btn>
  </div>
</template>
<script>
import db from "@/fb";
import Header from "@/components/Header.vue";
export default {
  name: "FeedPage",
  data() {
    return {
      name: localStorage.getItem("user-name"),
      email: "hossamshoukry@yahoo.com",
      password: "hassom@147852",
      listOfData: [],
    };
  },
  components: {
    Header,
  },
  methods: {
    async getData() {
      const data = (await db.collection("users").get()).docs.map((doc) => {
        this.listOfData.push(doc.data());
        return this.listOfData.dept == "seller";
      });
      const myData = this.listOfData.filter((doc) => {
        return doc.dept == "seller";
      });

      if (
        myData[0].dept == "seller" &&
        myData[0].email == this.email &&
        myData[0].password == this.password
      ) {
        console.log("iam seller");
      } else {
        console.log("iam not seller");
      }
    },
  },
};
</script>
