import _ from 'lodash';
import { getTicksOfScale, parseScale, checkDomainOfScale, getBandSizeOfAxis } from './ChartUtils';

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
  // const { height, layout } = props;
  // const width = 300;
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


    // includes extra white space
    const getChartArea = (barSize, barGap, numBars) => {
      return ((barSize + barGap) * numBars);
    };    

    const getCenterOffsetDistance = (diagramWidth, chartArea, barGap, offset) => {
      return getCenterOffset(diagramWidth - offset, (chartArea - barGap));
    };

    const maxBarForDiagram = (diagramWidth, barSize, barSizeList, barGap, totalBars) => {
      console.log('maxBarForDiagram', diagramWidth, barSize, barSizeList, barGap, totalBars);

      let fittableBars = 0;
      for (let barCount = 0; barCount < totalBars; barCount++) {
        const chartArea = getChartArea(barSizeList[0], barGap, barCount);
        

        if (chartArea <= diagramWidth) {
          fittableBars++;
          // console.log('Walking east one barCount', fittableBars, barCount, chartArea, diagramWidth);
        } else {
          break;
        }
      }

      // console.log('barCount bars that fit', fittableBars);


      return fittableBars;
    };


    const isScrollbarNeeded = (fittableBars, totalBars) => {
      return fittableBars < totalBars;
    };

    // const getNewBarSize = (props) => {
    //   console.log('----------------------------');
    //   console.log('getNewBarSize', props);
    //   const { 
    //     initialBarSize, 
    //     barGap, 
    //     barSizeList, 
    //     diagramWidth,
    //     numBars, 
    //     offset, 
    //     toleranceRange 
    //   } = props;


    //   const currentIndex = _.findIndex(barSizeList, (barSize) => { 
    //     return barSize === initialBarSize; 
    //   });
    //   const chartArea = getChartArea(barSize, barGap, numBars);
    //   const offsetDistance = getCenterOffsetDistance(diagramWidth, chartArea, barGap, offset);

    //   console.log('currentIndex', currentIndex);
    //   console.log('chartArea', chartArea);
    //   console.log('offsetDistance', offsetDistance);


      
    //   if (offsetDistance > toleranceRange[1]) {
    //     // try bigger size
    //     console.log('get bigger');
    //     if (barSizeList.length < currentIndex + 1) {
    //       console.log('cannot go bigger', currentIndex);
    //     }  else {
    //       // return getNewBarSize({...props, initialBarSize: barSizeList[currentIndex + 1]});
    //     }
    //   } else if (offsetDistance < toleranceRange[0]) {
    //     // try smaller size
    //     console.log('get smaller');
    //     // return getNewBarSize({...props, initialBarSize: barSizeList[currentIndex + -1]});
    //   } else {
    //     // this is good
    //     console.log('this is good');
    //     // return barSizeList[currentIndex];
    //   }
    //   console.log('----------------------------');
    // };


    // const newBarSize = getNewBarSize({
    //   initialBarSize: barSize, 
    //   barGap, 
    //   barSizeList,
    //   diagramWidth: width,
    //   numBars: data.length,
    //   offset: offset.left,
    //   toleranceRange
    // });


    const getNewBarSize = (props) => {
      // console.log('----------------------------');
      // console.log('getNewBarSize', props);
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
      _.each(barSizeList, (barSize, index) => {
        const chartArea = getChartArea(barSize, barGap, numBars);
        const offsetDistance = getCenterOffsetDistance(diagramWidth + offset, chartArea, barGap, offset);



        // offset distance is distance chart area starts from the beginning of x axis
        if (offsetDistance > toleranceRange[0]) {

          // find the middle bid where the barWindow fits within the bargraph, then push it to the right based on the offset of the y axis
          centerRangeStart = getCenterOffset(diagramWidth, chartArea) + offset;
          // take the starting point - then add barwindow length
          centerRangeEnd = centerRangeStart + chartArea;
          newBarSize = barSize;




          // console.log('offsetDistance', offsetDistance);
          // console.log('get bigger', barSize, index, offsetDistance, toleranceRange[1]);
          // console.log('centerDrawRange', centerRangeStart, centerRangeEnd, barSize);
          // console.log('sizes', diagramWidth ,chartArea, barSize);
        }
      });

      // min threshold hit
      if (!newBarSize) {
          console.log('min size hit');
          // then we find numb of bars that fit within the threshold
          const chartArea = getChartArea(barSizeList[0], barGap, numBars);
          const offsetDistance = getCenterOffsetDistance(diagramWidth + offset, chartArea, barGap, offset);
          // find the middle bid where the barWindow fits within the bargraph, then push it to the right based on the offset of the y axis
          centerRangeStart = getCenterOffset(diagramWidth, chartArea) + offset;
          // take the starting point - then add barwindow length
          centerRangeEnd = centerRangeStart + chartArea;
          newBarSize = barSizeList[0];
      }

      return [centerRangeStart, centerRangeEnd, newBarSize];




      // const currentIndex = _.findIndex(barSizeList, (barSize) => { 
      //   return barSize === initialBarSize; 
      // });
      // const chartArea = getChartArea(barSize, barGap, numBars);
      // const offsetDistance = getCenterOffsetDistance(diagramWidth, chartArea, barGap, offset);

      // console.log('currentIndex', currentIndex);
      // console.log('chartArea', chartArea);
      // console.log('offsetDistance', offsetDistance);


      
      // if (offsetDistance > toleranceRange[1]) {
      //   // try bigger size
      //   console.log('get bigger');
      //   if (barSizeList.length < currentIndex + 1) {
      //     console.log('cannot go bigger', currentIndex);
      //   }  else {
      //     // return getNewBarSize({...props, initialBarSize: barSizeList[currentIndex + 1]});
      //   }
      // } else if (offsetDistance < toleranceRange[0]) {
      //   // try smaller size
      //   console.log('get smaller');
      //   // return getNewBarSize({...props, initialBarSize: barSizeList[currentIndex + -1]});
      // } else {
      //   // this is good
      //   console.log('this is good');
      //   // return barSizeList[currentIndex];
      // }
      // console.log('----------------------------');
    };


    const newBarSize = getNewBarSize({
      initialBarSize: barSize, 
      barGap, 
      barSizeList,
      diagramWidth: width - offset.left,
      numBars: axisMap[0].domain.length || data.length, // use axisMap[0].domain.length when there are brush circumstances
      offset: offset.left,
      toleranceRange
    });

    console.log('newBarSize - dimensions', newBarSize);
    const maxBar = maxBarForDiagram(width - offset.left, barSize, barSizeList, barGap, data.length);
    const scrollNeeded = isScrollbarNeeded(maxBar, data.length);
    // console.log('barCount - isScrollbarNeeded', scrollNeeded);


    // const barWindow = ((20 + barGap) * data.length) - barGap;

    // Must incldue the extra padding at the end to propery calculate bandSize. actual measurement is done from barWindow - 20px
    // const barWindow = ((barSize + barGap) * data.length);
    const barWindow = getChartArea(barSize, barGap, data.length);


  return ids.reduce((result, id) => {
    const axis = axisMap[id];
    const { orientation, domain, padding = {}, mirror, reversed } = axis;
    const offsetKey = `${orientation}${mirror ? 'Mirror' : ''}`;

    // find the middle bid where the barWindow fits within the bargraph, then push it to the right based on the offset of the y axis
    const centerRangeStart = getCenterOffset(width - offset.left, barWindow) + (padding.left || 0) + offset.left;
    // take the starting point - then add barwindow length
    const centerRangeEnd = centerRangeStart + barWindow;



    // console.log('centerDrawRange', centerRangeStart, centerRangeEnd);
    // console.log('formatAxisMap', barWindow, centerRangeStart, centerRangeEnd, (centerRangeEnd - centerRangeStart), ((centerRangeEnd - centerRangeStart) / 4 / 2));


    // ( (730 - 60) - (160 - 20)) / 2 -- actual distance from x axis boundary
    // console.log('centerDistanceFromXEdge', getCenterOffset(width - offset.left, (barWindow - barGap)));
    // console.log('centerDistanceFromXEdge', getCenterOffsetDistance(width, barWindow, barGap, offset.left));

    let range, x, y, needSpace;

    if (axisType === 'xAxis') {
      range = [
        // alignment === 'center' ? centerRangeStart : offset.left + (padding.left || 0),
        // alignment === 'center' ? centerRangeEnd : offset.left + offset.width - (padding.right || 0),
        alignment === 'center' ? newBarSize[0] : offset.left + (padding.left || 0),
        alignment === 'center' ? newBarSize[1] : offset.left + offset.width - (padding.right || 0),


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
    finalAxis.barSize = newBarSize[2];
    finalAxis.isScrollbarNeeded = scrollNeeded;
    finalAxis.scrollableRange = maxBar;

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
