<template>
  <div class="person-bell-wrapper">
    <div class="person-bell">
      <div class="person-bell__user-name">
        <span>{{ userName }}</span>
      </div>
      <div class="person-bell__prices">
        <mini-bell v-for="(price, index) in firstPrices" :key="price" :price="price" :index="index" :current-index="currentIndex" />
      </div>
      <div class="person-bell__prices">
        <mini-bell v-for="(price, index) in secondPrices" :key="price" :price="price" :index="index + 6" :current-index="currentIndex" />
      </div>
    </div>
  </div>
</template>

<script>
import MiniBell from '~/components/atoms/MiniBell.vue';
import { getCurrentTimeIndex } from '~/domains/date/DateUtil';

export default {
  components: {
    MiniBell,
  },
  props: {
    userName: {
      type: String,
      required: true,
      default: '',
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
      background-color: #f58442;
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

    &__prices {
      align-items: center;
      display: flex;
      justify-content: space-evenly;
      padding: 20px 0 8px;
    }
  }
}
</style>
