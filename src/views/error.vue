<template>
  <div class="h-100 bg-black pb-5 error-page">
    <v-container>
      <div class="mt-16 text-black">d</div>
      <v-spacer></v-spacer>
      <div class="error text-center mt-16 text-capitalize font-weight-bold">
        error page
      </div>
      <v-spacer></v-spacer>

      <div
        @click="$router.push({ name: 'signIn' })"
        variant="text"
        class="sign-up text-center mt-16 text-capitalize font-weight-bold"
      >
        back to signup page
      </div>
    </v-container>
  </div>
</template>
<script>
export default {
  name: "errorPage",
};
</script>
<style lang="scss" scoped>
.error-page {
  .error {
    color: rgb(248, 121, 74);
    text-shadow: 4px 4px 4px lime;
    font-size: 5vw;
  }
  .sign-up {
    cursor: pointer;
    transition: 0.5s;
    color: rgb(248, 121, 74);
    text-shadow: 4px 4px 4px lime;
    font-size: 4.2vw;
    &:hover {
      scale: 1.1;
    }
  }
}
@media (max-width: 767px) {
  .error-page {
    .error,
    .sign-up {
      font-size: 9vw;
    }
  }
}
</style>
