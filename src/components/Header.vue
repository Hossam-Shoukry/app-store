<template>
  <v-app-bar flat color="black">
    <v-app-bar-nav-icon
      class="hidden-lg-and-up"
      @click="drawer = !drawer"
    ></v-app-bar-nav-icon>
    <v-toolbar-title class="ml-10"> {{ userName }}&nbsp;Store </v-toolbar-title>
    <div>
      <v-btn class="hidden-md-and-down" :to="{ name: 'requests' }"
        >Requests &nbsp;
        <v-icon>mdi-email</v-icon>
      </v-btn>

      <v-btn
        class="mr-10 hidden-md-and-down"
        v-if="isloggedIn"
        @click="handleSignOut()"
        >LogOut
        <v-icon>mdi-exit-to-app</v-icon>
      </v-btn>
    </div>
  </v-app-bar>
  <v-navigation-drawer class="hidden-lg-and-up" color="black" v-model="drawer">
    <v-list>
      <v-list-item>
        <v-icon>mdi-view-dashboard</v-icon>
        <v-btn variant="plain" class="text-white" style="font-size: 17px"
          >Navigation List
        </v-btn>
      </v-list-item>
      <v-list-item>
        <v-icon>mdi-email</v-icon>
        <v-btn
          style="font-size: 17px"
          variant="plain"
          class="text-white"
          :to="{ name: 'requests' }"
          >Requests &nbsp;
        </v-btn>
      </v-list-item>

      <v-list-item>
        <v-icon>mdi-exit-to-app</v-icon>
        <v-btn
          style="font-size: 17px"
          variant="plain"
          class="text-white"
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
      userName: localStorage.getItem("user-name"),
      drawer: false,
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
