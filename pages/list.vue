<template>
  <div class="list-wrapper">
    <div class="header">
      <span>(ここにロゴを置くだなも)</span>
    </div>
    <simple-loading v-if="loading" />
    <div v-if="!loading" class="main">
      <div class="date">
        <button @click="previous" v-show="showPrevious" class="date__previous">
          ←
        </button>
        <div class="date__term">
          <span>{{ displayTerm }}</span>
        </div>
        <button @click="next" v-show="showNext" class="date__next">
          →
        </button>
      </div>
      <div class="person-price">
        <div v-for="personPrice in priceList" :key="personPrice.userName">
          <person-bell :user-name="personPrice.userName" :prices="personPrice.prices" :this-week="thisWeek" />
        </div>
      </div>
      <link-button class="main__link">
        カブ価を記録する！
      </link-button>
    </div>
  </div>
</template>

<script>
import LinkButton from '~/components/atoms/LinkButton.vue';
import PersonBell from '~/components/molecules/PersonBell.vue';
import SimpleLoading from '~/components/organisms/SimpleLoading.vue';
import { getBaseSundays, getYYYYMMDD, getMMDDDay } from '~/domains/date/DateUtil';

export default {
  components: {
    LinkButton,
    PersonBell,
    SimpleLoading,
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
      return getMMDDDay(this.baseDate);
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
        const prices = [];
        doc.data().prices.forEach((daily) => {
          prices.push(daily.price.am);
          prices.push(daily.price.pm);
        });
        this.priceList.push({
          userName,
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
  margin: 0 auto;
  max-width: 536px;
  padding: 16px 6vw 64px;

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
      width: 280px;

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
