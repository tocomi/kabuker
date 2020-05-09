import { doAnalyze } from '~/src/domains/price/PatternAnalyzer';
import PatternType from '~/src/types/PatternType';

describe('買値のベルがある', () => {
  const boughtPrice = 97;
  it('月曜AMが90-140%の場合は波型か跳ね小型', () => {
    const prices = [88, 0, 0, 0];
    const result = doAnalyze(boughtPrice, prices);
    const expected = makeExpectedResult(true, false, true, false);
    expect(result).toStrictEqual(expected);
  });

  it('月曜AMが85-90%の場合は波型ではない', () => {
    const expected = makeExpectedResult(false, true, true, true);
    const prices = [87, 0, 0, 0];
    const result = doAnalyze(boughtPrice, prices);
    expect(result).toStrictEqual(expected);
    const prices2 = [83, 0, 0, 0];
    const result2 = doAnalyze(boughtPrice, prices2);
    expect(result2).toStrictEqual(expected);
  });

  it('月曜AMが80-85%の場合は跳ね小型', () => {
    const expected = makeExpectedResult(false, false, true, false);
    const prices = [82, 0, 0, 0];
    const result = doAnalyze(boughtPrice, prices);
    expect(result).toStrictEqual(expected);
    const prices2 = [78, 0, 0, 0];
    const result2 = doAnalyze(boughtPrice, prices2);
    expect(result2).toStrictEqual(expected);
  });

  it('月曜AMが60-80%の場合は波型か跳ね小型', () => {
    const expected = makeExpectedResult(true, false, true, false);
    const prices = [77, 0, 0, 0];
    const result = doAnalyze(boughtPrice, prices);
    expect(result).toStrictEqual(expected);
    const prices2 = [59, 0, 0, 0];
    const result2 = doAnalyze(boughtPrice, prices2);
    expect(result2).toStrictEqual(expected);
  });

  it('月曜AMが40-60%の場合は跳ね小型', () => {
    const prices = [58, 0, 0, 0];
    const result = doAnalyze(boughtPrice, prices);
    const expected = makeExpectedResult(false, false, true, false);
    expect(result).toStrictEqual(expected);
  });

  it('90-140%1回の後に80%を下回ったら波型', () => {
    const prices = [59, 53, 45, 124, 70, 61];
    const result = doAnalyze(boughtPrice, prices);
    const expected = makeExpectedResult(true, false, false, false);
    expect(result).toStrictEqual(expected);
  });

  it('90-140%1回の後に140%を超えたら跳ね大型', () => {
    const prices = [87, 83, 79, 124, 136];
    const result = doAnalyze(boughtPrice, prices);
    const expected = makeExpectedResult(false, false, false, true);
    expect(result).toStrictEqual(expected);
  });

  it('90-140%が2回続いたら波型か跳ね小型', () => {
    const prices = [77, 73, 69, 124, 135];
    const result = doAnalyze(boughtPrice, prices);
    const expected = makeExpectedResult(true, false, true, false);
    expect(result).toStrictEqual(expected);
  });

  it('90-140%2回の後に140%を超えたら跳ね小型', () => {
    const prices = [94, 110, 136, 157, 141];
    const result = doAnalyze(boughtPrice, prices);
    const expected = makeExpectedResult(false, false, true, false);
    expect(result).toStrictEqual(expected);
  });

  it('90-140%が3回続いたら波型', () => {
    const prices = [77, 73, 69, 124, 127, 130];
    const result = doAnalyze(boughtPrice, prices);
    const expected = makeExpectedResult(true, false, false, false);
    expect(result).toStrictEqual(expected);
  });

  // it('140-200%が2回続いたら跳ね小型', () => {
  //   const prices = [0, 0, 0, 136, 194, 0];
  //   const result = doAnalyze(boughtPrice, prices);
  //   const expected = makeExpectedResult(false, false, true, false);
  //   expect(result).toStrictEqual(expected);
  // });

  it('最大値が200%を超えたら跳ね大型', () => {
    const prices = [0, 0, 0, 0, 195, 0];
    const result = doAnalyze(boughtPrice, prices);
    const expected = makeExpectedResult(false, false, false, true);
    expect(result).toStrictEqual(expected);
  });
});

describe('買値のベルがない', () => {
  const boughtPrice = 0;

  it('月曜AMがなくて最大値が154ベルを超えない場合は判定不可', () => {
    const prices = [0, 96, 122, 118];
    const result = doAnalyze(boughtPrice, prices);
    const expected = makeExpectedResult(true, true, true, true);
    expect(result).toStrictEqual(expected);
  });

  it('最大値が154ベルを超える場合は跳ね型', () => {
    const prices = [92, 155, 192, 188];
    const result = doAnalyze(boughtPrice, prices);
    const expected = makeExpectedResult(false, false, true, true);
    expect(result).toStrictEqual(expected);
  });

  it('月曜AMが76ベル未満の場合は波型か跳ね小型', () => {
    const prices = [75, 58, 54, 121];
    const result = doAnalyze(boughtPrice, prices);
    const expected = makeExpectedResult(true, false, true, false);
    expect(result).toStrictEqual(expected);
  });

  it('月曜AMが99ベルを超える場合は波型か跳ね小型', () => {
    const prices = [100, 122, 132, 84];
    const result = doAnalyze(boughtPrice, prices);
    const expected = makeExpectedResult(true, false, true, false);
    expect(result).toStrictEqual(expected);
  });

  it('月曜AMが76-99ベルの場合は判定不可', () => {
    const prices = [76, 72, 67, 112];
    const result = doAnalyze(boughtPrice, prices);
    const expected = makeExpectedResult(true, true, true, true);
    expect(result).toStrictEqual(expected);
  });

  it('月曜AMが54ベル未満の場合は跳ね小型', () => {
    const prices = [53, 49, 121, 144];
    const result = doAnalyze(boughtPrice, prices);
    const expected = makeExpectedResult(false, false, true, false);
    expect(result).toStrictEqual(expected);
  });

  it('154-180ベルが2回以上続いた場合は跳ね小型', () => {
    const prices = [82, 110, 154, 157];
    const result = doAnalyze(boughtPrice, prices);
    const expected = makeExpectedResult(false, false, true, false);
    expect(result).toStrictEqual(expected);
  });

  it('220ベルを超えた場合は跳ね大型', () => {
    const prices = [84, 102, 154, 221];
    const result = doAnalyze(boughtPrice, prices);
    const expected = makeExpectedResult(false, false, false, true);
    expect(result).toStrictEqual(expected);
  });

  it('99-126ベルが2回続いたら波型か跳ね小型', () => {
    const prices = [78, 73, 102, 111];
    const result = doAnalyze(boughtPrice, prices);
    const expected = makeExpectedResult(true, false, true, false);
    expect(result).toStrictEqual(expected);
  });

  it('99-126ベル1回のあとに154ベルを超えたら跳ね大型', () => {
    const prices = [88, 84, 102, 168];
    const result = doAnalyze(boughtPrice, prices);
    const expected = makeExpectedResult(false, false, false, true);
    expect(result).toStrictEqual(expected);
  });

  it('99-126ベル1回のあとに81ベルを下回ったら波型', () => {
    const prices = [59, 53, 45, 124, 70];
    const result = doAnalyze(boughtPrice, prices);
    const expected = makeExpectedResult(true, false, false, false);
    expect(result).toStrictEqual(expected);
  });

  it('99-126ベルが3回以上続いたら波型', () => {
    const prices = [59, 53, 102, 111, 118, 68, 62];
    const result = doAnalyze(boughtPrice, prices);
    const expected = makeExpectedResult(true, false, false, false);
    expect(result).toStrictEqual(expected);
  });
});

const makeExpectedResult = (a, b, c, d) => {
  const expected = {};
  expected[PatternType.RANDOM] = a;
  expected[PatternType.DECREASING] = b;
  expected[PatternType.SMALL_SPIKE] = c;
  expected[PatternType.LARGE_SPIKE] = d;
  return expected;
};
