<template>
  <customerHeaderVue />
  <div
    class="purchases h-100"
    :style="{
      backgroundImage: `url(${require('@/assets/' + randomBackGround() + '')})`,
    }"
  >
    <div
      class="header-name purchases-text pt-5 pb-5 font-weight-bold text-center"
    >
      purchases

      <v-spacer></v-spacer>
      <v-btn
        :to="{ name: 'customerProducts' }"
        variant="text"
        class="mt-5 font-weight-bold header-name-btn"
        >Back To Shop Store</v-btn
      >
    </div>

    <v-container>
      <v-table class="table">
        <thead>
          <th><span>request name</span></th>
          <th><span>request image</span></th>
          <th><span>request price</span></th>
          <th><span>request Amount</span></th>
          <th><span>Cutomer Email</span></th>
          <th><span>Action</span></th>
        </thead>
        <tbody>
          <tr v-for="request in listOfPurchases" :key="request.id">
            <td>{{ request.requestName }}</td>
            <td class="pt-5 pb-5">
              <img :src="request.requestImg" alt="" />
            </td>
            <td>{{ request.requestPrice }}</td>
            <td>{{ request.requestAmount }}</td>
            <td>{{ request.requestEmail }}</td>
            <td>
              <v-btn variant="flat" class="confirm">
                {{ request.requestStatuse }}</v-btn
              >
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-container>
  </div>
</template>
<script>
import { randomBackground } from "@/components/controllers/randomBackGround/randombackground";
import customerHeaderVue from "@/components/customerHeader.vue";
import { yourPurchases } from "@/components/controllers/yourPurchases/yourPurchases";
export default {
  name: "purchasesPage",
  setup() {
    const yourPurchasesForm = yourPurchases();
    const randomBackgroundForm = randomBackground();
    return { ...yourPurchasesForm, ...randomBackgroundForm };
  },
  components: {
    customerHeaderVue,
  },
  mounted() {
    this.getPurchases();
    setInterval(() => {
      this.randomBackGround();
    }, 5000);
  },
};
</script>
<style lang="scss" scoped>
.purchases {
  background-size: cover;
  transition: 1s;
  .header-name-btn {
    font-size: 25px;
    transition: 0.5s;
    &:hover {
      scale: 1.1;
    }
  }
  .purchases-text {
    color: orangered;
    text-shadow: 6px 4px 4px lime;
    transition: 0.5s;
    font-size: 30px;
    font-weight: bold;
    padding: 5px 0 5px 0;
  }
  .table {
    background-color: black;
    table-layout: fixed;
    width: 100%;
    text-align: center;

    th {
      color: white;
      border: 0.3px solid #ccc;
      border-spacing: 0px;
      height: 50px;
    }
    td {
      border-spacing: 0px;
      border: 0.3px solid #ccc;
      color: white;
      font-weight: bold;
      .confirm {
        color: white;
        border-radius: 20px;
        background-color: blue;
        transition: 0.5s;
        font-weight: bold;
        text-shadow: 4px 4px 6px lime;
        &:hover {
          scale: 1.1;
        }
      }
      &:nth-child(3) {
        width: 120px;
      }
      &:nth-child(4) {
        width: 130px;
      }
      img {
        width: 20%;
      }
    }
  }
}

@media (max-width: 1115px) {
  .purchases {
    .table {
      td {
        img {
          width: 200%;
        }
      }
      td,
      th {
        &:nth-child(2) {
          padding-right: 50px;
        }
      }
      th {
        &:nth-child(2) {
          span {
            position: relative;
            left: 20px;
          }
        }
      }
      th {
        &:nth-child(1) {
          width: 200px;
        }
      }
    }
  }
}

@media (max-width: 855px) {
  .purchases {
    .table {
      th {
        font-size: 15px;
      }
      td {
        font-size: 15px;
      }
      td {
        .confirm {
          width: 120px;
          font-size: 10px;
        }
      }
    }
  }
}

@media (max-width: 750px) {
  .purchases {
    .table {
      max-width: 100%;
      th,
      td {
        font-size: 12px;
      }
    }
  }
}

@media (max-width: 665px) {
  .purchases {
    .table {
      th {
        &:nth-child(4) {
          padding: 0 10px 0 10px;
        }
      }
    }
  }
}

@media (max-width: 500px) {
  .purchases {
    .header-name {
      font-size: 30px;
    }
    .header-name-btn {
      font-size: 20px;
    }
  }
}

@media (max-width: 450px) {
  .purchases {
    .header-name {
      font-size: 30px;
    }
    .header-name-btn {
      font-size: 20px;
    }
  }
}

@media (max-width: 350px) {
  .purchases {
    .header-name {
      font-size: 25px;
    }
    .header-name-btn {
      font-size: 15px;
    }
  }
}

@media (max-width: 300px) {
  .purchases {
    .header-name {
      font-size: 20px;
    }
    .header-name-btn {
      font-size: 12px;
    }
  }
}
</style>
