<template>
  <div
    :style="{
      backgroundImage: `url(${require('@/assets/' + randomBackGround() + '')})`,
    }"
    class="sign-in text-center"
  >
    <v-container>
      <v-row justify="center mt-11">
        <div class="box register">
          <span class="border-line"></span>
          <v-form ref="form" class="pt-10 form">
            <v-btn
              color="#ccc"
              class="mb-5"
              variant="text text-h5 font-weight-black"
              >Register New User</v-btn
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

              <v-col cols="10">
                <v-select
                  ref="select"
                  :rules="personTypeValidate"
                  v-model="personType"
                  prepend-icon="mdi-select"
                  label="Select purpose"
                  color="#ccc"
                  class="text-white"
                  :items="['Seller', 'Customer']"
                ></v-select>
              </v-col>
            </v-row>

            <div class="text-center links">
              <v-btn
                variant="text"
                class="pb-5 text-h6 register"
                @click="register($refs)"
                >Register</v-btn
              >
              <v-spacer></v-spacer>
              <v-btn
                :to="{ name: 'signIn' }"
                variant="text"
                class="mb-2 text-h6 login"
              >
                Login page</v-btn
              >
              <v-spacer></v-spacer>
              <v-btn
                class="pb-5 text-h6 login-with-google"
                @click="registerWithGoogle($refs)"
                variant="text"
                >Register With Google</v-btn
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
  setup() {
    const loginAndRegisterForm = loginAndRegister();
    const randomBackgroundForm = randomBackground();

    return { ...loginAndRegisterForm, ...randomBackgroundForm };
  },
  name: "registerPage",
  methods: {
    purpose() {
      console.log(this.personType);
    },
  },
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
