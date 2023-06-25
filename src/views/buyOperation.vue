<template>
  <customerHeader />
  <div
    class="buyOperation h-100"
    :style="{
      backgroundImage: `url(${require('@/assets/' + randomBackGround() + '')})`,
    }"
  >
    <v-container>
      <v-row justify="center">
        <v-col xl="4" md="4" sm="6" lg="4">
          <v-card
            variant="elevated"
            class="bg-black mt-1 pt-5 pb-5 text-center"
          >
            <img
              class="w-50 mt-5"
              :src="productObj.img"
              alt=""
              style="border-radius: 10px"
            />

            <v-card-text>
              <span class="text-h6">{{ productObj.productName }}</span>
              <v-spacer></v-spacer>
              <span class="mt-2 text-h5">{{
                productObj.productDescription
              }}</span>
              <v-spacer></v-spacer>
              <span class="mt-2 text-h6">{{ productPrice }}</span>
              <v-select
                class="mt-3"
                transition="slide-x-transition"
                @update:menu="productPrice = productObj.productPrice * price"
                v-model="price"
                label="amount"
                :items="amount"
              ></v-select>
              <span class="text-red text-h6">Customer Email :</span>&nbsp;
              <span class="text-h6 text-capitalize"> {{ customerName }}</span>
              <div v-if="successMsg">{{ successMsg }}</div>
            </v-card-text>
            <v-card-actions>
              <v-btn class="buy-now d-block" @click="sendRequest()" color="red"
                >Buy Now</v-btn
              >
              <v-spacer></v-spacer>

              <v-btn
                class="back-to-store"
                @click="$router.push({ name: 'customerProducts' })"
                color="red"
              >
                Back To Store</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { randomBackground } from "@/components/controllers/randomBackGround/randombackground";
import customerHeader from "@/components/customerHeader.vue";
import { buyOperation } from "@/components/controllers/buyOperation/buyOperation";
export default {
  name: "buyPage",
  setup() {
    const buyOperationForm = buyOperation();
    const randomBackgroundForm = randomBackground();

    return { ...buyOperationForm, ...randomBackgroundForm };
  },
  components: {
    customerHeader,
  },
  mounted() {
    this.getProduct();
    this.getCustomer();
    setInterval(() => {
      this.randomBackGround();
    }, 5000);
  },
};
</script>
<style lang="scss" scoped>
.buyOperation {
  background-size: cover;
  transition: 1s;
  .back-to-store,
  .buy-now {
    transition: 1s;
    &:hover {
      scale: 1.1;
    }
  }
}
@media (max-width: 270px) {
  .buyOperation {
    .back-to-store {
      display: block;
    }
  }
}
</style>
