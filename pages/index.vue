<template>
  <div class="index">
    <template v-for="weekDay in weekDays">
      <div :key="weekDay" class="index__daily-bell">
        <daily-bell :date="weekDay" />
      </div>
    </template>
  </div>
</template>

<script>
import DailyBell from '~/components/molecules/DailyBell.vue';
import { getWeekDays } from '~/domains/date/DateUtil';

export default {
  components: {
    DailyBell,
  },
  data() {
    return {
      baseDate: '',
      weekDays: [],
    };
  },
  created() {
    // const docRef = this.$firestore.collection('prices').doc('nUWb6VPU20z8k4ftTS6D');
    // const doc = await await docRef.get();
    // console.log(doc.data());
    const weekDays = getWeekDays();
    this.baseDate = weekDays[0];
    this.weekDays = weekDays.slice(1, 7);
  },
};
</script>

<style lang="scss" scoped>
.index {
  padding: 48px 6vw;
  margin: 0 auto;
  max-width: 536px;

  .daily-bell {
    margin-top: 16px;
  }
}
</style>
