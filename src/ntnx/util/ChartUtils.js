/**
 * Calculate size of bar chart area
 * @param {number} barSize - size of bars
 * @param {number} barGap - gap distance between bars
 * @param {number} numBars - number of bars in the chart area
 * @return {number} chart area
 */
export const getBarChartArea = (barSize, barGap, numBars) => {
  // Take bar size and bar gap and multiple by num of bars. Then remove the extra padding 
  // (white space) that is not needed.
  return ((barSize + barGap) * numBars) - barGap;
};
