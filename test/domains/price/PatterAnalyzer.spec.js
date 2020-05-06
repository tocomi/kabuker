import { doAnalyze } from '~/src/domains/price/PatternAnalyzer';
import PatternType from '~/src/types/PatternType';

describe('買値のベルがある', () => {
  it('test', () => {
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
