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

const BOUNDARY_RATE_200 = 2.00;
const BOUNDARY_RATE_140 = 1.40;
const BOUNDARY_RATE_090 = 0.90;
const BOUNDARY_RATE_085 = 0.85;
const BOUNDARY_RATE_080 = 0.80;
const BOUNDARY_RATE_060 = 0.60;

const withBoughtPrice = (boughtPrice, prices, result) => {
  const result01 = judgeFirstPrice(boughtPrice, prices[0], result);
  const result02 = judgeMiddleRangeRate(boughtPrice, prices, result01);
  const result03 = judgeMaxPrice(boughtPrice, prices, result02);
  return result03;
};

const judgeFirstPrice = (boughtPrice, firstPrice, result) => {
  if (firstPrice === 0) return result;

  if (firstPrice > (boughtPrice * BOUNDARY_RATE_090)) {
    result[PatternType.DECREASING] = false;
    result[PatternType.LARGE_SPIKE] = false;
    return result;
  }

  if (firstPrice > (boughtPrice * BOUNDARY_RATE_085)) {
    result[PatternType.RANDOM] = false;
    return result;
  }

  if (firstPrice > (boughtPrice * BOUNDARY_RATE_080)) {
    result[PatternType.RANDOM] = false;
    result[PatternType.DECREASING] = false;
    result[PatternType.LARGE_SPIKE] = false;
    return result;
  }

  if (firstPrice > (boughtPrice * BOUNDARY_RATE_060)) {
    result[PatternType.DECREASING] = false;
    result[PatternType.LARGE_SPIKE] = false;
    return result;
  }

  result[PatternType.RANDOM] = false;
  result[PatternType.DECREASING] = false;
  result[PatternType.LARGE_SPIKE] = false;
  return result;
};

const judgeMiddleRangeRate = (boughtPrice, prices, result) => {
  let serialCount = 0;
  for (const index in prices) {
    const price = prices[index];

    if (price === 0) {
      serialCount = 0;
      continue;
    }

    if (serialCount === 1) {
      // 1回のあと80%を下回ったら波型
      if (price <= (boughtPrice * BOUNDARY_RATE_080)) {
        result[PatternType.DECREASING] = false;
        result[PatternType.SMALL_SPIKE] = false;
        result[PatternType.LARGE_SPIKE] = false;
        break;
      }

      // 1回のあと140%を上回ったら跳ね大型
      if (price > (boughtPrice * BOUNDARY_RATE_140)) {
        result[PatternType.RANDOM] = false;
        result[PatternType.DECREASING] = false;
        result[PatternType.SMALL_SPIKE] = false;
        break;
      }
    }

    if (serialCount === 2) {
      // 2回のあと140%を上回ったら跳ね小型
      if (price > (boughtPrice * BOUNDARY_RATE_140)) {
        result[PatternType.RANDOM] = false;
        result[PatternType.DECREASING] = false;
        result[PatternType.LARGE_SPIKE] = false;
        break;
      }
    }

    if (price > (boughtPrice * BOUNDARY_RATE_090) && price <= (boughtPrice * BOUNDARY_RATE_140)) {
      serialCount++;
    } else {
      serialCount = 0;
      continue;
    }

    // 2回続いたら波型か跳ね小型
    if (serialCount === 2) {
      result[PatternType.DECREASING] = false;
      result[PatternType.LARGE_SPIKE] = false;
      continue;
    }

    // 3回以上続いたら波型
    if (serialCount >= 3) {
      result[PatternType.DECREASING] = false;
      result[PatternType.SMALL_SPIKE] = false;
      result[PatternType.LARGE_SPIKE] = false;
      break;
    }
  }
  return result;
};

const judgeMaxPrice = (boughtPrice, prices, result) => {
  const maxPrice = Math.max(...prices);
  // 最大値が200%を超える場合は跳ね大型確定
  if (maxPrice > boughtPrice * BOUNDARY_RATE_200) {
    result[PatternType.RANDOM] = false;
    result[PatternType.DECREASING] = false;
    result[PatternType.SMALL_SPIKE] = false;
    return result;
  }

  // 最大値が140%を超える場合は跳ね型確定
  if (maxPrice > boughtPrice * BOUNDARY_RATE_140) {
    result[PatternType.RANDOM] = false;
    result[PatternType.DECREASING] = false;
    return result;
  }

  return result;
};

const SPIKE_BOUNDARY_PRICE = 154; // 110 * 1.4
const SMALL_SPIKE_BOUNDARY_MAX_PRICE = 180; // 90 * 2.0
const LARGE_SPIKE_BOUNDARY_PRICE = 220; // 110 * 2.0

const SMALL_SPIKE_BOUNDARY_FIRST_PRICE = 54; // 90 * 0.6
const LARGE_SPIKE_LOW_BOUNDARY_FIRST_PRICE = 76; // 90 * 0.85
const LARGE_SPIKE_HIGH_BOUNDARY_FIRST_PRICE = 99; // 110 * 0.9

const MIDDLE_RANGE_LOW_BOUNDARY_PRICE = 99; // 110 * 0.9
const MIDDLE_RANGE_HIGH_BOUNDARY_PRICE = 126; // 90 * 1.4

const RANDOM_DECREASING_HIGH_BOUNDARY_PRICE = 81; // 90 * 0.9

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

  // 倍率0.9-1.4の連続回数による判定
  const innerResult = judgeMiddleRangePrice(prices, result);

  return innerResult;
};

const judgeMiddleRangePrice = (prices, result) => {
  let serialCount = 0;
  for (const index in prices) {
    const price = prices[index];

    if (price === 0) {
      serialCount = 0;
      continue;
    }

    if (serialCount === 1) {
      // 1回のあと一定の値を下回ったら波型
      if (price < RANDOM_DECREASING_HIGH_BOUNDARY_PRICE) {
        result[PatternType.DECREASING] = false;
        result[PatternType.SMALL_SPIKE] = false;
        result[PatternType.LARGE_SPIKE] = false;
        break;
      }

      // 1回のあと一定の値を上回ったら跳ね大型
      if (price > SPIKE_BOUNDARY_PRICE) {
        result[PatternType.RANDOM] = false;
        result[PatternType.DECREASING] = false;
        result[PatternType.SMALL_SPIKE] = false;
        break;
      }
    }

    if (price >= MIDDLE_RANGE_LOW_BOUNDARY_PRICE && price <= MIDDLE_RANGE_HIGH_BOUNDARY_PRICE) {
      serialCount++;
    } else {
      serialCount = 0;
      continue;
    }

    // 2回続いたら波型か跳ね小型
    if (serialCount === 2) {
      result[PatternType.DECREASING] = false;
      result[PatternType.LARGE_SPIKE] = false;
      continue;
    }

    // 3回以上続いたら波型
    if (serialCount >= 3) {
      result[PatternType.DECREASING] = false;
      result[PatternType.SMALL_SPIKE] = false;
      result[PatternType.LARGE_SPIKE] = false;
      break;
    }
  }
  return result;
};

export { doAnalyze };
