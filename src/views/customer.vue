<template>
  <customerHeader />
  <div
    :style="{
      backgroundImage: `url(${require('@/assets/' + randomBackGround() + '')})`,
    }"
    class="customer-page h-100"
  >
    <div class="text-center">
      <span class="d-inline-block mt-5 mb-5 text-capitalize choose-seller"
        >choose seller you want to buy from</span
      >
    </div>
    <v-container>
      <v-row>
        <v-col v-for="seller in displaySellerName" :key="seller.id">
          <v-card class="card pt-16 pb-16 bg-black" variant="elevated">
            <span
              class="d-block text-center font-weight-bold mt-n10 text-capitalize"
              >{{ seller.sellerName }} Store
            </span>
            <div style="transition: 0.5s" class="text-center mt-5">
              <v-container>
                <v-img
                  class="img"
                  :src="require(`@/assets/${randomBackGround()}`)"
                  alt=""
                />
              </v-container>
            </div>

            <v-card-actions>
              <v-row class="mt-5" justify="center">
                <v-col cols="6 pl-5">
                  <v-btn
                    @click="redirect(seller)"
                    color="red"
                    class="shopping-now"
                    >Shopping Now
                    <v-icon class="ml-2">mdi-shopping</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import customerHeader from "@/components/customerHeader.vue";
import { cutomer } from "@/components/controllers/customers/customers";
import { randomBackground } from "@/components/controllers/randomBackGround/randombackground";
export default {
  name: "customerPage",
  setup() {
    const sellersForm = cutomer();
    const randomBackGroundForm = randomBackground();
    return { ...sellersForm, ...randomBackGroundForm };
  },
  components: {
    customerHeader,
  },
  mounted() {
    this.getSellers();
    setInterval(() => {
      this.randomBackGround();
    }, 2000);
  },
  methods: {},
};
</script>
<style scoped lang="scss">
.customer-page {
  transition: 1s;
  background-size: cover;
  .choose-seller {
    color: orangered;
    text-shadow: 6px 4px 4px lime;
    font-size: 25px;
    font-weight: bolder;
  }
  .shopping-now {
    transition: 1s;
    &:hover {
      scale: 1.1;
    }
  }
}
</style>
