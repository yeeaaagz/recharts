import _ from 'lodash';
import { getTicksOfScale, parseScale, checkDomainOfScale, getBandSizeOfAxis } from './ChartUtils';
import { getChartArea } from '../ntnx/util/ChartUtils';

/**
 * Calculate the scale function, position, width, height of axes
 * @param  {Object} props     Latest props
 * @param  {Object} axisMap   The configuration of axes
 * @param  {Object} offset    The offset of main part in the svg element
 * @param  {String} axisType  The type of axes, x-axis or y-axis
 * @param  {String} chartName The name of chart
 * @return {Object} Configuration
 */
export const formatAxisMap = (props, axisMap, offset, axisType, chartName, getCenterOffset) => {
  const { alignment, data, width, height, layout } = props;
  const ids = Object.keys(axisMap);
  const steps = {
    left: offset.left,
    leftMirror: offset.left,
    right: width - offset.right,
    rightMirror: width - offset.right,
    top: offset.top,
    topMirror: offset.top,
    bottom: height - offset.bottom,
    bottomMirror: height - offset.bottom,
  };

    const barSizeList = [10, 15, 20, 25, 30];
    const barSize = 20;
    const barGap = 20;
    const toleranceRange = [10, 100];

    /**
     * Get center offset distance from start of x axis
     * @param  {number} diagramWidth - width of diagram
     * @param  {number} chartArea - width of chart area
     * @param  {number} barGap - gap space between bars
     * @param  {number} offset - offset distance from center of chart
     * @return {number} offset distance
     */
    const getCenterOffsetDistance = (diagramWidth, chartArea, barGap, offset) => {
      return getCenterOffset(diagramWidth - offset, (chartArea - barGap));
    };

    /**
     * Get bars drawing range
     * @param {object} props - props to define draw range
     * @return {array} Range of where to draw start and end coordinates for bars and size of bars.
     */
    const getBarDrawRange = (props) => {
      const { 
        initialBarSize, 
        barGap, 
        barSizeList, 
        diagramWidth,
        numBars, 
        offset, 
        toleranceRange 
      } = props;

      let centerRangeStart, centerRangeEnd, newBarSize;
      // Test the list of bar sizes to find which size fits the maximum bars available.
      _.each(barSizeList, (barSize, index) => {
        const chartArea = getChartArea(barSize, barGap, numBars) + barGap;
        const offsetDistance = getCenterOffsetDistance(diagramWidth + offset, chartArea, barGap, offset);

        // Offset distance is distance chart area starts from the beginning of x-axis. If offset 
        // distance is within the minimum tolerance range then the bar size test passes. 
        if (offsetDistance > toleranceRange[0]) {
          // Get the first center point where to draw the bars, then push it to the right based on 
          // the offset of the y-axis.
          centerRangeStart = getCenterOffset(diagramWidth, chartArea) + offset;
          // Take the starting point then width of the chart area to find the range end point.
          centerRangeEnd = centerRangeStart + chartArea;
          newBarSize = barSize;
        }
      });

      // Min threshold hit. Set the bar size to the minimum allowed.
      if (!newBarSize) {
        const chartArea = getChartArea(barSizeList[0], barGap, numBars) + barGap;
        centerRangeStart = getCenterOffset(diagramWidth, chartArea) + offset;
        centerRangeEnd = centerRangeStart + chartArea;
        newBarSize = barSizeList[0];
      }

      return [centerRangeStart, centerRangeEnd, newBarSize];
    };

  const barDrawRange = getBarDrawRange({
    initialBarSize: barSize, 
    barGap, 
    barSizeList,
    diagramWidth: width - offset.left,
    numBars: axisMap[0].domain.length || data.length,
    offset: offset.left,
    toleranceRange
  });

  return ids.reduce((result, id) => {
    const axis = axisMap[id];
    const { orientation, domain, padding = {}, mirror, reversed } = axis;
    const offsetKey = `${orientation}${mirror ? 'Mirror' : ''}`;
    let range, x, y, needSpace;

    if (axisType === 'xAxis') {
      range = [
        alignment === 'center' ? barDrawRange[0] : offset.left + (padding.left || 0),
        alignment === 'center' ? barDrawRange[1] : offset.left + offset.width - (padding.right || 0),
      ];
    } else if (axisType === 'yAxis') {
      range = layout === 'horizontal' ? [
        offset.top + offset.height - (padding.bottom || 0),
        offset.top + (padding.top || 0),
      ] : [
        offset.top + (padding.top || 0),
        offset.top + offset.height - (padding.bottom || 0),
      ];
    } else {
      ({ range } = axis);
    }

    if (reversed) {
      range = [range[1], range[0]];
    }

    const { scale, realScaleType } = parseScale(axis, chartName);
    scale.domain(domain).range(range);
    checkDomainOfScale(scale);
    const ticks = getTicksOfScale(scale, { ...axis, realScaleType });

    if (axisType === 'xAxis') {
      needSpace = (orientation === 'top' && !mirror) || (orientation === 'bottom' && mirror);
      x = alignment ==='center' ? offset.left : offset.left;
      y = steps[offsetKey] - needSpace * axis.height;
    } else if (axisType === 'yAxis') {
      needSpace = (orientation === 'left' && !mirror) || (orientation === 'right' && mirror);
      x = steps[offsetKey] - needSpace * axis.width;
      y = offset.top;
    }

    const axisWidth = alignment ==='center' ? width - offset.left : offset.width;

    const finalAxis = {
      ...axis,
      ...ticks,
      realScaleType, x, y, scale,
      width: axisType === 'xAxis' ? axisWidth : axis.width,
      height: axisType === 'yAxis' ? offset.height : axis.height,
    };

    finalAxis.bandSize = getBandSizeOfAxis(finalAxis, ticks);
    finalAxis.barSize = barDrawRange[2];

    if (!axis.hide && axisType === 'xAxis') {
      steps[offsetKey] += (needSpace ? -1 : 1) * finalAxis.height;
    } else if (!axis.hide) {
      steps[offsetKey] += (needSpace ? -1 : 1) * finalAxis.width;
    }

    return { ...result, [id]: finalAxis };
  }, {});
};

export const rectWithPoints = ({ x: x1, y: y1 }, { x: x2, y: y2 }) => ({
  x: Math.min(x1, x2),
  y: Math.min(y1, y2),
  width: Math.abs(x2 - x1),
  height: Math.abs(y2 - y1),
});

/**
 * Compute the x, y, width, and height of a box from two reference points.
 * @param  {Object} coords     x1, x2, y1, and y2
 * @return {Object} object
 */
export const rectWithCoords = ({ x1, y1, x2, y2 }) => rectWithPoints({ x: x1, y: y1 }, { x: x2, y: y2 });

export class ScaleHelper {
  static EPS = 1e-4;

  static create(obj) {
    return new ScaleHelper(obj);
  }

  constructor(scale) {
    this.scale = scale;
  }

  get domain() {
    return this.scale.domain;
  }

  get range() {
    return this.scale.range;
  }

  get rangeMin() {
    return this.range()[0];
  }

  get rangeMax() {
    return this.range()[1];
  }

  get bandwidth() {
    return this.scale.bandwidth;
  }

  apply(value, { bandAware, position } = {}) {
    if (value === undefined) {
      return undefined;
    } if (position) {
      switch (position) {
        case 'start': {
          return this.scale(value);
        }
        case 'middle': {
          const offset = this.bandwidth ? this.bandwidth() / 2 : 0;
          return this.scale(value) + offset;
        }
        case 'end': {
          const offset = this.bandwidth ? this.bandwidth() : 0;
          return this.scale(value) + offset;
        }
        default: {
          return this.scale(value);
        }
      }
    } if (bandAware) {
      const offset = this.bandwidth ? this.bandwidth() / 2 : 0;
      return this.scale(value) + offset;
    }
    return this.scale(value);
  }

  isInRange(value) {
    const range = this.range();

    const first = range[0];
    const last = range[range.length - 1];

    return first <= last ?
      (value >= first && value <= last) :
      (value >= last && value <= first);
  }
}

export class LabeledScaleHelper {
  static create(obj) {
    return new this(obj);
  }

  constructor(scales) {
    this.scales = _.mapValues(scales, ScaleHelper.create);
    Object.assign(this, this.scales);
  }

  apply(coords, { bandAware } = {}) {
    const { scales } = this;
    return _.mapValues(
      coords,
      (value, label) => scales[label].apply(value, { bandAware }));
  }

  isInRange(coords) {
    const { scales } = this;
    return _.every(coords, (value, label) => scales[label].isInRange(value));
  }
}
