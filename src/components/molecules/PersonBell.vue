<template>
  <div class="person-bell-wrapper">
    <div class="person-bell">
      <div class="person-bell__user-name">
        <span>{{ userName }}</span>
      </div>
      <div class="person-bell__bought-price">
        <mini-bought-bell :bought-price="boughtPrice" />
      </div>
      <div class="person-bell__pattern">
        <pattern-label :pattern="pattern" class="person-bell__pettern" />
      </div>
      <div class="person-bell__prices">
        <mini-bell v-for="(price, index) in firstPrices" :key="price + index" :price="price" :index="index" :current-index="currentIndex" />
      </div>
      <div class="person-bell__prices">
        <mini-bell v-for="(price, index) in secondPrices" :key="price + index" :price="price" :index="index + 6" :current-index="currentIndex" />
      </div>
    </div>
  </div>
</template>

<script>
import MiniBell from '~/components/atoms/MiniBell.vue';
import MiniBoughtBell from '~/components/atoms/MiniBoughtBell.vue';
import PatternLabel from '~/components/atoms/PatternLabel.vue';
import { getCurrentTimeIndex } from '~/domains/date/DateUtil';
import { doAnalyze } from '~/domains/price/PatternAnalyzer';

export default {
  components: {
    MiniBell,
    MiniBoughtBell,
    PatternLabel,
  },
  props: {
    userName: {
      type: String,
      required: true,
      default: '',
    },
    boughtPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    prices: {
      type: Array,
      required: true,
      default: undefined,
    },
    thisWeek: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  computed: {
    firstPrices() {
      return this.prices.slice(0, 6);
    },
    secondPrices() {
      return this.prices.slice(6, 12);
    },
    currentIndex() {
      if (!this.thisWeek) return -1;
      return getCurrentTimeIndex();
    },
    pattern() {
      return doAnalyze(this.boughtPrice, this.prices);
    },
  },
};
</script>

<style lang="scss" scoped>
.person-bell-wrapper {
  .person-bell {
    background-color: #f8f0df;
    border-radius: 8px;
    height: 92px;
    margin-top: 24px;
    position: relative;
    width: 100%;

    &__user-name {
      align-items: center;
      color: white;
      background-color: $orange;
      border-radius: 10px;
      display: flex;
      height: 20px;
      justify-content: center;
      left: -8px;
      position: absolute;
      top: -12px;
      transform: rotate(-4deg);
      width: 96px;
    }

    &__bought-price {
      position: absolute;
      right: 108px;
      top: -14px;
    }

    &__pattern {
      position: absolute;
      right: 8px;
      top: -14px;
    }

    &__prices {
      align-items: center;
      display: flex;
      justify-content: space-evenly;
      padding: 20px 0 8px;
    }
  }
}
</style>
