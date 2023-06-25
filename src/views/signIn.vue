<template>
  <div
    class="sign-in text-center"
    :style="{
      backgroundImage: `url(${require('@/assets/' + randomBackGround() + '')})`,
    }"
  >
    <v-container>
      <v-row justify="center mt-16">
        <div class="box">
          <span class="border-line"></span>
          <v-form ref="form" class="pt-10 form">
            <v-btn
              color="#ccc"
              class="mb-5"
              variant="text text-h4 font-weight-black"
              >SignIn</v-btn
            >
            <v-row justify="center">
              <v-col cols="10">
                <div class="inputBox">
                  <v-text-field
                    clearable
                    :rules="emailValidate"
                    type="text"
                    label="Email"
                    class="text-white"
                    v-model.lazy.trim="email"
                    prepend-icon="mdi-email"
                  ></v-text-field>
                  <div class="text-center text-red" v-if="emailErrMsg">
                    {{ emailErrMsg }}
                  </div>
                  <div class="text-center text-red" v-if="errMsg">
                    {{ errMsg }}
                  </div>
                </div>
              </v-col>
              <v-col cols="10">
                <div class="inputBox">
                  <v-text-field
                    clearable
                    :rules="passwordValidate"
                    class="text-white"
                    type="password"
                    label="Password"
                    v-model.lazy.trim="password"
                    prepend-icon="mdi-lock"
                  ></v-text-field>
                  <div class="text-center text-red" v-if="passwordErrMsg">
                    {{ passwordErrMsg }}
                  </div>
                  <div class="text-center text-red" v-if="errMsg">
                    {{ errMsg }}
                  </div>
                </div>
              </v-col>
            </v-row>

            <div class="text-center links">
              <v-btn
                @click="signIn($refs)"
                variant="text"
                class="mb-2 text-h6 login"
                >Login</v-btn
              >
              <v-spacer></v-spacer>
              <v-btn
                class="pb-5 text-h6 register"
                variant="text"
                :to="{ name: 'register' }"
                >Register Page</v-btn
              >
              <v-spacer></v-spacer>
              <v-btn
                class="pb-5 text-h6 login-with-google"
                @click="signInWithGoogle"
                variant="text"
                >SignIn With Google</v-btn
              >
            </div>
          </v-form>
        </div>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { randomBackground } from "@/components/controllers/randomBackGround/randombackground";
import { loginAndRegister } from "@/components/controllers/login-register/login-register";
export default {
  name: "signIn",
  setup() {
    const loginAndRegisterform = loginAndRegister();
    const randomBackgroundForm = randomBackground();

    return { ...loginAndRegisterform, ...randomBackgroundForm };
  },
  components: {},
  methods: {},
  mounted() {
    setInterval(() => {
      this.randomBackGround();
    }, 5000);
  },
};
</script>
<style lang="css" scoped>
@import url(@/components/css/login-register.css);
</style>
