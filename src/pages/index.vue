<template>
  <div class="list-wrapper">
    <div class="list">
      <div class="header">
        <span>(ここにロゴを置くだなも)</span>
      </div>
      <simple-loading v-if="loading" />
      <div v-if="!loading" class="main">
        <div class="date">
          <button @click="previous" v-show="showPrevious" class="date__previous">
            ←
          </button>
          <div class="term">
            <span class="term__text">{{ displayTerm }}</span>
          </div>
          <button @click="next" v-show="showNext" class="date__next">
            →
          </button>
        </div>
        <div class="person-price">
          <div v-for="personPrice in priceList" :key="personPrice.userName">
            <person-bell
              :user-name="personPrice.userName"
              :bought-price="personPrice.boughtPrice"
              :prices="personPrice.prices"
              :this-week="thisWeek"
            />
          </div>
        </div>
      </div>
    </div>
    <bottom-navigation />
  </div>
</template>

<script>
import PersonBell from '~/components/molecules/PersonBell.vue';
import SimpleLoading from '~/components/organisms/SimpleLoading.vue';
import BottomNavigation from '~/components/organisms/BottomNavigation.vue';
import { getBaseSundays, getYYYYMMDD, getTerm } from '~/domains/date/DateUtil';

export default {
  components: {
    PersonBell,
    SimpleLoading,
    BottomNavigation,
  },
  data() {
    return {
      displayDateList: [],
      dateIndex: 0,
      priceList: [],
      loading: true,
    };
  },
  computed: {
    baseDate() {
      return this.displayDateList[this.dateIndex];
    },
    collectionName() {
      const YYYYMMDD = getYYYYMMDD(this.baseDate);
      return `prices${YYYYMMDD}`;
    },
    displayTerm() {
      return getTerm(this.baseDate);
    },
    showPrevious() {
      return this.dateIndex < 1;
    },
    showNext() {
      return this.dateIndex > 0;
    },
    thisWeek() {
      return this.dateIndex === 0;
    },
  },
  async created() {
    this.displayDateList = getBaseSundays();
    await this.load();
  },
  methods: {
    async load() {
      this.loading = true;
      this.priceList.length = 0;
      const snapshot = await this.$firestore.collection(this.collectionName).get();
      snapshot.forEach((doc) => {
        const userName = doc.data().userName;
        const boughtPrice = doc.data().boughtPrice;
        const prices = [];
        doc.data().prices.forEach((daily) => {
          prices.push(daily.price.am);
          prices.push(daily.price.pm);
        });
        this.priceList.push({
          userName,
          boughtPrice,
          prices,
        });
      });
      this.loading = false;
    },
    async previous() {
      this.dateIndex++;
      await this.load();
    },
    async next() {
      this.dateIndex--;
      await this.load();
    },
  },
};
</script>

<style lang="scss" scoped>
.list-wrapper {
  width: 100vw;
}

.list {
  margin: 0 auto;
  max-width: $max-width;
  padding: 16px 6vw calc(48px + #{$bottom-nav-height});

  .header {
    align-items: center;
    display: flex;
    height: 160px;
    justify-content: center;
  }

  .main {
    margin-top: 16px;

    .date {
      margin-top: 16px;
      position: relative;
      text-align: center;
      width: 100%;

      .term {
        &__text {
          background-color: $blue;
          border-radius: 8px;
          color: white;
          font-weight: bold;
          padding: 4px 16px;
        }
      }

      &__previous {
        left: 32px;
        position: absolute;
        top: 2px;
      }

      &__next {
        right: 32px;
        position: absolute;
        top: 2px;
      }
    }

    .person-price {
      margin-top: 40px;
    }

    &__link {
      margin-top: 16px;
    }
  }
}
</style>
