<template>
  <div class="pattern-label-wrapper">
    <div class="pattern-label">
      <template v-for="type in types">
        <span :key="type.char" :class="matched(type.type)">{{ type.char }}</span>
      </template>
    </div>
  </div>
</template>

<script>
import PatternType from '~/types/PatternType';

export default {
  props: {
    pattern: {
      type: Object,
      required: true,
      default: undefined,
    },
  },
  data() {
    return {
      types: [
        {
          type: PatternType.RANDOM,
          char: '波',
        },
        {
          type: PatternType.DECREASING,
          char: '減',
        },
        {
          type: PatternType.SMALL_SPIKE,
          char: '小',
        },
        {
          type: PatternType.LARGE_SPIKE,
          char: '大',
        },
      ],
    };
  },
  methods: {
    matched(type) {
      return this.pattern[type] ? 'matched' : '';
    },
  },
};
</script>

<style lang="scss" scoped>
.pattern-label-wrapper {
  background-color: $blue;
  border-radius: 8px;
  height: 24px;
  padding: 0 8px;
  width: 96px;
}

.pattern-label {
  align-items: center;
  color: darken($color: $blue, $amount: 12%);
  display: flex;
  font-size: 14px;
  height: inherit;
  justify-content: space-between;

  .matched {
    color: white;
  }
}
</style>
