<template>
  <div class="daily-bell">
    <div class="daily-bell__date">
      <span>{{ date }}</span>
    </div>
    <bell-input :is-am="true" :price="amPrice" @onChange="onChange" />
    <bell-input :is-am="false" :price="pmPrice" @onChange="onChange" />
  </div>
</template>

<script>
import BellInput from '~/components/atoms/BellInput.vue';

export default {
  components: {
    BellInput,
  },
  props: {
    date: {
      type: String,
      required: true,
      default: '???',
    },
    price: {
      type: undefined,
      required: true,
      default: {},
    },
  },
  computed: {
    amPrice() {
      return this.price.am ? String(this.price.am) : '';
    },
    pmPrice() {
      return this.price.pm ? String(this.price.pm) : '';
    },
  },
  methods: {
    onChange(value, isAm) {
      this.$emit('onChange', value, isAm, this.date);
    },
  },
};
</script>

<style lang="scss" scoped>
.daily-bell {
  align-items: center;
  background-color: #f1e6d5;
  border-radius: 8px;
  display: flex;
  height: 88px;
  justify-content: space-around;
  margin: 0 auto;
  position: relative;

  &__date {
    align-items: center;
    background-color: #f09d05;
    border-radius: 8px;
    color: white;
    display: flex;
    font-size: 14px;
    height: 24px;
    justify-content: center;
    left: -8px;
    position: absolute;
    text-align: center;
    transform: rotate(-4deg);
    top: -8px;
    width: 100px;
  }
}
</style>
