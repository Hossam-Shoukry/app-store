<template>
  <Header />
  <div
    :style="{
      backgroundImage: `url(${require('@/assets/' + randomBackGround() + '')})`,
    }"
    class="text-captalize text-center seller h-100"
  >
    <v-btn
      @click="addNewProduct"
      class="text-h5 font-weight-bold mb-2 mt-5 text-uppercase add-product"
      variant="text"
    >
      add new product
      <v-dialog
        style="background-color: black; opacity: 0.9"
        transition="dialog-top-transition"
        activator="parent"
        v-model="dialog"
      >
        <v-container>
          <v-form class="mt-15" ref="form">
            <v-text-field
              :rules="inputRules"
              clearable
              v-model="productName"
              type="text"
              class="text-white"
              color="#ccc"
              label="product-name"
            ></v-text-field>
            <v-text-field
              :rules="inputRules"
              clearable
              v-model="productPrice"
              type="number"
              class="text-white"
              color="#ccc"
              label="product-price"
            ></v-text-field>
            <v-text-field
              :rules="inputRules"
              clearable
              v-model="productDescription"
              type="text"
              class="text-white"
              color="#ccc"
              label="product-description"
            ></v-text-field>

            <v-select
              :rules="inputRules"
              v-model="productCategory"
              class="w-100 mt-5 text-white"
              transition="slide-x-transition"
              :items="['mobiles', 'furniture', 'sport-equipes', 'Laptops']"
              label="choose product category"
            ></v-select>
            <v-text-field
              :rules="inputRules"
              clearable
              ref="imgRef"
              type="file"
              class="text-orange"
              color="#ccc"
              label="product-image"
            ></v-text-field>
            <div class="text-center">
              <div class="text-center text-red" v-if="errMessage">
                {{ errMessage }}
              </div>
              <v-btn
                @click="sendData($refs)"
                :loading="loading"
                color="blue-grey-darken-3"
                >{{ send }}</v-btn
              >
              <v-spacer></v-spacer>
              <v-btn
                color="blue-grey-darken-3"
                class="mt-2"
                @click="dialog = !dialog"
                >Close Form</v-btn
              >
            </div>
          </v-form>
        </v-container>
      </v-dialog>
    </v-btn>
    <v-row justify="center">
      <v-col cols="4">
        <form action="">
          <select
            class="custom-select mt-2"
            v-model="category"
            @change="onChangeValue()"
          >
            <option class="text-grey">mobiles</option>
            <option class="text-grey">furniture</option>
            <option class="text-grey">sport-equipes</option>
            <option class="text-grey">Laptops</option>
          </select>
        </form>
      </v-col>
    </v-row>

    <v-container>
      <v-row justify="center">
        <v-col
          lg="4"
          md="4"
          sm="6"
          cols="12"
          v-for="(item, index) in comingData"
          :key="item.id"
        >
          <v-card variant="elevated" class="bg-black mt-3 pt-5">
            <v-avatar size="200" class="text-center">
              <v-img :src="item.productImg"></v-img>
            </v-avatar>

            <v-card-text>
              <span class="text-h5">{{ item.productName }}</span>
              <p>{{ item.productDescription }}</p>
              <span>{{ item.productPrice }}</span
              >&pound;
            </v-card-text>
            <v-card-actions>
              <v-btn class="del" color="red" @click="showDelData(item, index)"
                >Delete
                <v-dialog
                  transition="dialog-bottom-transition"
                  v-model="delDialog"
                  activator="parent"
                  absolute
                >
                  <v-row justify="center">
                    <v-col lg="4" md="6">
                      <v-card
                        class="text-center bg-grey-darken-4 pt-5"
                        style="border-radius: 0"
                      >
                        <div
                          class="text-error font-weight-black pb-5 text-capitalize"
                        >
                          are you sure you want to delete this product
                        </div>
                        <v-avatar size="200">
                          <v-img :src="delImg"></v-img>
                        </v-avatar>
                        <v-card-text>
                          <span class="text-h5">{{ delproductName }}</span>
                          <p>{{ delproductDescription }}</p>
                          <span>{{ delproductPrice }}</span
                          >&pound;
                        </v-card-text>
                        <v-card-actions class="text-center">
                          <v-btn color="red" @click="deletData()">Delete</v-btn>
                          <v-btn color="red" @click="delDialog = !delDialog"
                            >Cancel</v-btn
                          >
                        </v-card-actions>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-dialog>
              </v-btn>
              <v-btn class="update" @click="updateData(item)" color="red"
                >Update
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
import { seller } from "@/components/controllers/seller/seller";
import Header from "@/components/Header.vue";
export default {
  setup() {
    const sellerForm = seller();
    const randomBackGroundForm = randomBackground();
    return { ...sellerForm, ...randomBackGroundForm };
  },
  name: "sellerPage",
  components: {
    Header,
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
.seller {
  background-size: cover;
  transition: 1s;
  .del {
    transition: 0.5s;
    &:hover {
      scale: 1.1;
    }
  }
  .update {
    transition: 0.5s;
    &:hover {
      scale: 1.1;
    }
  }
  .card {
    border-radius: 0px;
  }
  select {
    border: 1px solid orangered;
    width: 40%;
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
  .add-product {
    color: orangered;
    text-shadow: 6px 4px 4px lime;
    transition: 0.5s;
    &:hover {
      scale: 1.1;
    }
  }
}

@media (max-width: 850px) {
  .seller {
    select {
      width: 50%;
    }
  }
}
@media (max-width: 730px) {
  .seller {
    select {
      width: 60%;
      font-size: 15px;
    }
  }
}
@media (max-width: 540px) {
  .seller {
    select {
      width: 70%;
      font-size: 15px;
    }
  }
}
@media (max-width: 480px) {
  .seller {
    select {
      width: 80%;
      font-size: 15px;
    }
  }
}
@media (max-width: 400px) {
  .seller {
    select {
      width: 120%;
      font-size: 15px;
    }
  }
}
@media (max-width: 300px) {
  .seller {
    select {
      width: 140%;
      font-size: 15px;
    }
  }
}
@media (max-width: 270px) {
  .seller {
    select {
      width: 160%;
      font-size: 15px;
    }
  }
}
</style>
