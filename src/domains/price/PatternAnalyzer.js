import PatternType from '../../types/PatternType';

const initialResult = () => {
  const result = {};
  result[PatternType.RANDOM] = true;
  result[PatternType.DECREASING] = true;
  result[PatternType.SMALL_SPIKE] = true;
  result[PatternType.LARGE_SPIKE] = true;
  return result;
};

/**
 * in: boughtPrice: number, prices: number[]
 * out: { a: boolean, b: boolean, c: boolean, d: boolean }
 */
const doAnalyze = (boughtPrice, prices) => {
  const result = boughtPrice === 0
    ? withoutBoughtPrice(prices, initialResult())
    : withBoughtPrice(boughtPrice, prices, initialResult());
  return result;
};

const withBoughtPrice = (boughtPrice, prices, result) => {
  return result;
};

const SPIKE_BOUNDARY_PRICE = 154; // 110 * 1.4
const SMALL_SPIKE_BOUNDARY_MAX_PRICE = 180; // 90 * 2.0
const LARGE_SPIKE_BOUNDARY_PRICE = 220; // 110 * 2.0

const SMALL_SPIKE_BOUNDARY_FIRST_PRICE = 54; // 90 * 0.6
const LARGE_SPIKE_LOW_BOUNDARY_FIRST_PRICE = 76; // 90 * 0.85
const LARGE_SPIKE_HIGH_BOUNDARY_FIRST_PRICE = 99; // 110 * 0.9

const withoutBoughtPrice = (prices, result) => {
  // 最大値が閾値を超える場合は跳ね型確定
  if (Math.max(...prices) > SPIKE_BOUNDARY_PRICE) {
    result[PatternType.RANDOM] = false;
    result[PatternType.DECREASING] = false;
  }

  // 最大値が閾値を超える場合は跳ね大型確定
  if (Math.max(...prices) > LARGE_SPIKE_BOUNDARY_PRICE) {
    result[PatternType.RANDOM] = false;
    result[PatternType.DECREASING] = false;
    result[PatternType.SMALL_SPIKE] = false;
  }

  const firstPrice = prices[0];
  if (firstPrice === 0) return result;

  // 月曜AMが一定範囲外の場合は波型か跳ね小型
  if (firstPrice < LARGE_SPIKE_LOW_BOUNDARY_FIRST_PRICE || firstPrice > LARGE_SPIKE_HIGH_BOUNDARY_FIRST_PRICE) {
    result[PatternType.DECREASING] = false;
    result[PatternType.LARGE_SPIKE] = false;
  }

  // 月曜AMが閾値を下回る場合は跳ね小型確定
  if (firstPrice < SMALL_SPIKE_BOUNDARY_FIRST_PRICE) {
    result[PatternType.RANDOM] = false;
    result[PatternType.DECREASING] = false;
    result[PatternType.LARGE_SPIKE] = false;
  }

  // 倍率1.4-2.0が2回以上続いた場合は跳ね小型確定
  const smallSpikePrices = prices.filter((price) => {
    return price >= SPIKE_BOUNDARY_PRICE && price <= SMALL_SPIKE_BOUNDARY_MAX_PRICE;
  });
  if (smallSpikePrices.length >= 2) {
    result[PatternType.RANDOM] = false;
    result[PatternType.DECREASING] = false;
    result[PatternType.LARGE_SPIKE] = false;
  }

  return result;
};

export { doAnalyze };
