<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  name: "App",
  components: {},
  mounted() {
    this.logOut();
  },
  methods: {
    ...mapMutations(["logOut"]),
  },

  data: () => ({
    //
  }),
};
</script>
