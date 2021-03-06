<template>
  <div class="weekly-bells-wrapper">
    <simple-loading v-if="loading" />
    <template v-if="!loading">
      <snackbar :is-shown="showSnackbar" :message="snackbarMessage" :level="snackbarLevel" />
      <div class="weekly-bells">
        <div class="user">
          <div class="user__label">
            <span>なまえ</span>
          </div>
          <input v-model="userName" class="user__name">
        </div>
        <div class="bought-price">
          <bought-price :price="boughtPrice" @onChangeBoughtPrice="onChangeBoughtPrice" />
        </div>
        <div class="dailys">
          <template v-for="dailyPrice in dailyPrices">
            <div :key="dailyPrice.date" class="dailys__daily-bell">
              <daily-bell :date="dailyPrice.date" :price="dailyPrice.price" @onChange="onChange" />
            </div>
          </template>
        </div>
        <div class="weekly-bells__submit">
          <float-button @onClick="save" />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import FloatButton from '~/components/atoms/FloatButton.vue';
import Snackbar from '~/components/atoms/Snackbar.vue';
import DailyBell from '~/components/molecules/DailyBell.vue';
import BoughtPrice from '~/components/molecules/BoughtPrice.vue';
import SimpleLoading from '~/components/organisms/SimpleLoading.vue';
import { getWeekDays, getBaseSunday, getYYYYMMDD } from '~/domains/date/DateUtil';

const emptyPrices = () => {
  return [1, 2, 3, 4, 5, 6].map(() => {
    return {
      price: {
        am: 0,
        pm: 0,
      },
    };
  });
};

export default {
  components: {
    FloatButton,
    Snackbar,
    DailyBell,
    BoughtPrice,
    SimpleLoading,
  },
  props: {
    uid: {
      type: String,
      required: true,
      default: '',
    },
  },
  data() {
    return {
      userName: '',
      baseDate: '',
      boughtPrice: 0,
      dailyPrices: [],
      // Snackbar
      showSnackbar: false,
      snackbarMessage: '',
      snackbarLevel: 'INFO',
      loading: true,
    };
  },
  computed: {
    collectionName() {
      const YYYYMMDD = getYYYYMMDD(getBaseSunday());
      return `prices${YYYYMMDD}`;
    },
  },
  async created() {
    await this.load();
  },
  methods: {
    async load() {
      const docRef = this.$firestore.collection(this.collectionName).doc(this.uid);
      const doc = await docRef.get();
      const prices = doc.data() ? doc.data().prices : emptyPrices();
      this.userName = doc.data() ? doc.data().userName : '';
      this.boughtPrice = doc.data() ? doc.data().boughtPrice : 0;

      const weekDays = getWeekDays();
      this.baseDate = weekDays[0];
      this.weekDays = weekDays.slice(1, 7);

      for (let i = 0; i < this.weekDays.length; i++) {
        this.dailyPrices.push({
          date: this.weekDays[i],
          price: prices[i].price,
        });
      }
      this.finishLoading();
    },
    finishLoading() {
      this.loading = false;
      this.$emit('finish');
    },
    validate() {
      const existsNotNumber = this.dailyPrices.some((daily) => {
        return isNaN(Number(daily.price.am)) || isNaN(Number(daily.price.pm));
      });
      return !existsNotNumber;
    },
    async save() {
      if (!this.validate()) {
        this.snackbarMessage = '数字以外いれるなだなも！！';
        this.snackbarLevel = 'ERROR';
        this.showSnackbar = true;
        setTimeout(() => {
          this.showSnackbar = false;
        }, 3000);
        return;
      }
      await this.$firestore.collection(this.collectionName).doc(this.uid).set({
        userName: this.userName,
        boughtPrice: this.boughtPrice,
        prices: this.dailyPrices,
      }, { merge: true })
        .then(() => {
          this.snackbarMessage = '保存しただなも！';
          this.snackbarLevel = 'INFO';
          this.showSnackbar = true;
          setTimeout(() => {
            this.showSnackbar = false;
          }, 3000);
        })
        .catch((e) => {
          console.error(e);
          this.snackbarMessage = 'うまくいかなかっただなも…';
          this.snackbarLevel = 'ERROR';
          this.showSnackbar = true;
          setTimeout(() => {
            this.showSnackbar = false;
          }, 3000);
        });
    },
    onChange(value, isAm, date) {
      this.setPrice(value, isAm, date);
    },
    setPrice(value, isAm, date) {
      const price = Number(value);
      const updatedIndex = this.dailyPrices.findIndex(price => price.date === date);
      if (isAm) {
        this.dailyPrices[updatedIndex].price.am = price;
      } else {
        this.dailyPrices[updatedIndex].price.pm = price;
      }
    },
    onChangeBoughtPrice(value) {
      this.boughtPrice = Number(value);
    },
  },
};
</script>

<style lang="scss" scoped>
.weekly-bells-wrapper {
  .weekly-bells {
    padding: 0 6vw;
    margin: 0 auto;
    max-width: $max-width;

    .user {
      align-items: center;
      background-color: #e5f4fa;
      border: solid 2px $blue;
      border-radius: 20px;
      display: flex;
      height: 40px;
      justify-content: center;
      position: relative;
      text-align: center;

      &__label {
        align-items: center;
        background-color: $blue;
        border-radius: 16px;
        display: flex;
        height: 32px;
        left: 2px;
        position: absolute;
        text-align: center;
        top: 2px;
        justify-content: center;
        width: 120px;

        span {
          color: white;
          width: 100%;
        }
      }

      &__name {
        background: none;
        border: none;
        font-family: 'M PLUS Rounded 1c';
        font-size: 16px;
        outline: none;
        margin-left: 112px;
        text-align: center;
        width: 100%;
      }
    }

    .bought-price {
      margin-top: 32px;
    }

    .dailys {
      margin-top: 32px;

      &__daily-bell {
        margin-top: 16px;
      }
    }

    &__submit {
      margin-top: 24px;
    }

    .loading-wrapper {
      &__image {
        width: 60vw;
      }
    }
  }
}
</style>
