<template>
  <div class="index-wrapper">
    <snackbar :is-shown="showSnackbar" :message="snackbarMessage" :level="snackbarLevel" />
    <div class="index">
      <template v-for="dailyPrice in dailyPrices">
        <div :key="dailyPrice.date" class="index__daily-bell">
          <daily-bell :date="dailyPrice.date" :price="dailyPrice.price" @onChange="onChange" />
        </div>
      </template>
      <div class="index__submit">
        <float-button @onClick="save" />
      </div>
    </div>
  </div>
</template>

<script>
import DailyBell from '~/components/molecules/DailyBell.vue';
import FloatButton from '~/components/atoms/FloatButton.vue';
import Snackbar from '~/components/atoms/Snackbar.vue';
import { getWeekDays } from '~/domains/date/DateUtil';

export default {
  components: {
    DailyBell,
    FloatButton,
    Snackbar,
  },
  data() {
    return {
      userName: '',
      baseDate: '',
      dailyPrices: [],
      // Snackbar
      showSnackbar: false,
      snackbarMessage: '',
      snackbarLevel: 'INFO',
    };
  },
  async created() {
    await this.load();
  },
  methods: {
    async load() {
      const docRef = this.$firestore.collection('prices').doc('nUWb6VPU20z8k4ftTS6D');
      const doc = await docRef.get();
      const prices = doc.data().prices;
      console.log(prices);
      this.userName = doc.data().userName;

      const weekDays = getWeekDays();
      this.baseDate = weekDays[0];
      this.weekDays = weekDays.slice(1, 7);

      for (let i = 0; i < this.weekDays.length; i++) {
        this.dailyPrices.push({
          date: this.weekDays[i],
          price: prices[i].price,
        });
      }
    },
    async save() {
      await this.$firestore.collection('prices').doc('nUWb6VPU20z8k4ftTS6D').set({
        prices: this.dailyPrices,
      }, { merge: true })
        .then(() => {
          this.snackbarMessage = '保存しただなも！';
          this.snackbarLevel = 'INFO';
          this.showSnackbar = true;
          setTimeout(() => {
            this.showSnackbar = false;
          }, 2000);
        })
        .catch((e) => {
          console.error(e);
          this.snackbarMessage = 'うまくいかなかっただなも…';
          this.snackbarLevel = 'ERROR';
          this.showSnackbar = true;
          setTimeout(() => {
            this.showSnackbar = false;
          }, 2000);
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
  },
};
</script>

<style lang="scss" scoped>
.index {
  padding: 48px 6vw;
  margin: 0 auto;
  max-width: 536px;

  &__daily-bell {
    margin-top: 16px;
  }

  &__submit {
    margin-top: 24px;
  }
}
</style>
