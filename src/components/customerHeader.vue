<template>
  <v-app-bar flat color="black">
    <!--      
-->
    <v-app-bar-nav-icon
      class="hidden-lg-and-up"
      @click="drawer = !drawer"
    ></v-app-bar-nav-icon>
    <v-toolbar-title class="ml-10">Wellcome {{ userName }} </v-toolbar-title>
    <div>
      <v-btn
        :to="{ name: 'purchases' }"
        class="hidden-md-and-down text-capitalize"
        >your purchases
        <v-icon class="ml-2">mdi-cash-multiple</v-icon>
      </v-btn>
      <v-btn
        class="hidden-md-and-down mr-10"
        v-if="isloggedIn"
        @click="handleSignOut()"
        >LogOut
        <v-icon>mdi-exit-to-app</v-icon>
      </v-btn>
    </div>
  </v-app-bar>
  <v-navigation-drawer color="black" v-model="drawer">
    <v-list>
      <v-list-item>
        <v-icon>mdi-view-dashboard</v-icon>
        <v-btn variant="text" class="text-capitalize">navigation list</v-btn>
      </v-list-item>
      <v-list-item class="mt-5">
        <v-icon>mdi-cash-multiple</v-icon>
        <v-btn
          variant="text"
          :to="{ name: 'purchases' }"
          class="text-capitalize"
          >your purchases
        </v-btn>
      </v-list-item>
      <v-list-item class="mt-5">
        <v-icon>mdi-exit-to-app</v-icon>
        <v-btn
          variant="text"
          class="mr-10"
          v-if="isloggedIn"
          @click="handleSignOut()"
          >LogOut
        </v-btn>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
import { mapMutations, mapState } from "vuex";

export default {
  name: "headerPage",
  data() {
    return {
      drawer: false,
      userName: localStorage.getItem("user-name"),
    };
  },
  mounted() {},
  computed: {
    ...mapState(["isloggedIn"]),
  },
  methods: {
    ...mapMutations(["handleSignOut", "logOut"]),
  },
};
</script>
