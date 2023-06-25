<template>
  <HeaderVue />
  <div
    class="requests h-100"
    :style="{
      backgroundImage: `url(${require('@/assets/' + randomBackGround() + '')})`,
    }"
  >
    <div class="text-center header-name pt-5 pb-5 font-weight-bold">
      Customer Requests
      <v-spacer></v-spacer>
      <v-btn
        :to="{ name: 'seller' }"
        variant="text"
        class="mt-5 header-name-btn"
        >Back To Store</v-btn
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
          <tr v-for="request in listOfreaquests" :key="request.id">
            <td>{{ request.requestName }}</td>
            <td class="pt-5 pb-5">
              <img :src="request.requestImg" alt="" />
            </td>
            <td>{{ request.requestPrice }}</td>
            <td>{{ request.requestAmount }}</td>
            <td>{{ request.requestEmail }}</td>
            <td>
              <v-btn
                :loading="loading"
                @click="confirmRequest(request)"
                variant="flat"
                class="confirm"
                >{{ request.requestStatuse }}</v-btn
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
import HeaderVue from "@/components/Header.vue";
import { requests } from "@/components/controllers/requests/requests";
export default {
  name: "requestsPage",
  setup() {
    const requestsForm = requests();
    const randomBackgroundForm = randomBackground();
    return { ...requestsForm, ...randomBackgroundForm };
  },
  components: {
    HeaderVue,
  },
  mounted() {
    this.getRequests();

    setInterval(() => {
      this.randomBackGround();
    }, 5000);
  },
};
</script>
<style scoped lang="scss">
.requests {
  background-size: cover;
  transition: 1s;
  .header-name {
    color: orangered;
    text-shadow: 6px 4px 4px lime;
    font-size: 40px;
  }
  .header-name-btn {
    font-size: 25px;
    transition: 0.5s;
    &:hover {
      scale: 1.1;
    }
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
  @media (max-width: 1115px) {
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
  @media (max-width: 855px) {
    .table {
      th {
        font-size: 15px;
      }
      td {
        font-size: 15px;
      }
      td {
        .confirm {
          width: 100px;
          font-size: 10px;
        }
      }
    }
  }
  @media (max-width: 750px) {
    .table {
      max-width: 100%;
      th,
      td {
        font-size: 12px;
      }
    }
  }
  @media (max-width: 665px) {
    .table {
      th {
        &:nth-child(4) {
          padding: 0 10px 0 10px;
        }
      }
    }
  }

  @media (max-width: 500px) {
    .header-name {
      font-size: 30px;
    }
    .header-name-btn {
      font-size: 20px;
    }
  }
  @media (max-width: 450px) {
    .header-name {
      font-size: 30px;
    }
    .header-name-btn {
      font-size: 20px;
    }
  }
  @media (max-width: 350px) {
    .header-name {
      font-size: 25px;
    }
    .header-name-btn {
      font-size: 15px;
    }
  }
  @media (max-width: 300px) {
    .header-name {
      font-size: 20px;
    }
    .header-name-btn {
      font-size: 12px;
    }
  }
}
</style>
