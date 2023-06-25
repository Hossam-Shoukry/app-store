<template>
  <customerHeader />
  <div
    :style="{
      backgroundImage: `url(${require('@/assets/' + randomBackGround() + '')})`,
    }"
    class="text-captalize text-center customerProducts h-100"
  >
    <v-col>
      <div class="text-center">
        <form action="">
          <div class="text-capitalize choose-product">
            choose product you want to buy
            <br />
            <button
              @click="$router.push({ name: 'customer' })"
              class="back-to-shops text-capitalize"
            >
              back to shops
            </button>
          </div>
          <select class="mt-3" v-model="category" @change="onChangeValue()">
            <option class="text-grey">mobiles</option>
            <option class="text-grey">furniture</option>
            <option class="text-grey">sport-equipes</option>
            <option class="text-grey">Laptops</option>
          </select>
        </form>
      </div>
    </v-col>

    <v-container>
      <v-row justify="center">
        <v-col
          lg="3"
          md="4"
          sm="6"
          cols="12"
          v-for="item in comingData"
          :key="item.id"
        >
          <v-card variant="elevated" class="pt-5 bg-black card">
            <v-avatar size="200">
              <v-img :src="item.productImg" class="w-75"></v-img>
            </v-avatar>
            <v-card-text>
              <span class="text-h5">{{ item.productName }}</span>
              <p>{{ item.productDescription }}</p>
              <span>{{ item.productPrice }}</span
              >&pound;
            </v-card-text>
            <v-card-actions>
              <v-btn color="red" class="buy" @click="buyOperation(item)"
                >Buy Now
              </v-btn>
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
import { customerProducts } from "@/components/controllers/customerProducts/customerProducts";
import router from "@/router";
export default {
  name: "customerProducts",
  setup() {
    const customerProductsForm = customerProducts();
    const randomBackGroundForm = randomBackground();
    return { ...customerProductsForm, ...randomBackGroundForm };
  },
  components: {
    customerHeader,
  },
  mounted() {
    if (localStorage.getItem("category")) {
      this.category = localStorage.getItem("category");
      this.getStorageData(this.category);
    } else {
      this.category = "mobiles";
      localStorage.setItem("category", this.category);
      this.getStorageData(this.category);
    }
    setInterval(() => {
      this.randomBackGround();
    }, 5000);
  },
};
</script>
<style lang="scss" scoped>
.customerProducts {
  background-size: cover;
  transition: 1s;
  .back-to-shops {
    text-shadow: 6px 4px 4px lime;
    transition: 1s;
    &:hover {
      scale: 1.1;
    }
  }
  .buy {
    border-radius: 10px;
    color: white;
    font-weight: bold;
    transition: 0.5s;
    &:hover {
      scale: 1.1;
    }
  }
  .card {
    border-radius: 0px;
  }
  .choose-product {
    color: orangered;
    text-shadow: 6px 4px 4px lime;
    font-size: 25px;
    font-weight: bold;
  }
  select {
    border: 1px solid orangered;
    width: 15%;
    font-weight: bold;
    border-radius: 10px;
    font-size: 18px;
    text-align: center;
    color: orangered;
    position: relative;
    text-shadow: 4px 4px 6px rgb(14, 223, 14);
    background-image: url("data:image/svg+xml;utf8,<svg fill='orangered' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
    background-position-x: 100%;

    &:hover {
      cursor: pointer;
    }
    &:focus {
      outline: 1px solid rgba(115, 255, 0, 0.651);
    }
  }
}
@media (max-width: 850px) {
  .customerProducts {
    select {
      width: 20%;
    }
  }
}

@media (max-width: 570px) {
  .customerProducts {
    select {
      width: 25%;
      font-size: 15px;
    }
  }
}
@media (max-width: 480px) {
  .customerProducts {
    select {
      width: 30%;
      font-size: 15px;
    }
  }
}
@media (max-width: 400px) {
  .customerProducts {
    .choose-product {
      font-size: 20px;
    }
    select {
      width: 40%;
      font-size: 15px;
    }
  }
}
@media (max-width: 322px) {
  .customerProducts {
    .choose-product {
      font-size: 17px;
    }
    select {
      width: 40%;
      font-size: 15px;
    }
  }
}
@media (max-width: 270px) {
  .customerProducts {
    select {
      width: 50%;
      font-size: 15px;
    }
  }
}
</style>
