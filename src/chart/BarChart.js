/**
 * @fileOverview Bar Chart
 */
import PropTypes from 'prop-types';
import generateCategoricalChart from './generateCategoricalChart';
import Bar from '../cartesian/Bar';
import XAxis from '../cartesian/XAxis';
import YAxis from '../cartesian/YAxis';
import { formatAxisMap } from '../util/CartesianUtils';

/**
 * @component
 */
export default class BarChart extends generateCategoricalChart({
  chartName: 'BarChart',
  GraphicalChild: Bar,
  axisComponents: [
    { axisType: 'xAxis', AxisComp: XAxis },
    { axisType: 'yAxis', AxisComp: YAxis },
  ],
  formatAxisMap,
}) {

  static propTypes = {
    /**
     * If any two categorical charts(LineChart, AreaChart, BarChart, ComposedChart) have the same
     * syncId, these two charts can sync the position tooltip, and the startIndex, endIndex of Brush.
     */
    syncId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * Compact.
     */
    compact: PropTypes.bool,
    /**
     * The width of chart container.
     */
    width: PropTypes.number,
    /**
     * The height of chart container.
     */
    height: PropTypes.number,
    /**
     * The source data, in which each element is an object.
     */
    data: PropTypes.arrayOf(PropTypes.object),
    /**
     * The layout of bars in the chart.
     */
    layout: PropTypes.oneOf(['horizontal', 'vertical']),
    /**
     * The type of offset function used to generate the lower and upper values in the series array.
     * The four types are built-in offsets in d3-shape.
     */
    stackOffset: PropTypes.oneOf(['sign', 'expand', 'none', 'wiggle', 'silhouette']),
    /**
     * Throttle Delay.
     */
    throttleDelay: PropTypes.number,
    /**
     * The sizes of whitespace around the container.
     */
    margin: PropTypes.shape({
      top: PropTypes.number,
      right: PropTypes.number,
      bottom: PropTypes.number,
      left: PropTypes.number,
    }),
    /**
     * The gap between two bar categories, which can be a percent value or a fixed value.
     */
    barCategoryGap: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /**
     * The gap between two bars in the same category.
     */
    barGap: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /**
     * The width or height of each bar. If the barSize is not specified, the size of the bar will be
     * calculated by the barCategoryGap, barGap and the quantity of bar groups.
     */
    barSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /**
     * The maximum width of all the bars in a horizontal BarChart, or maximum height in a
     * vertical BarChart.
     */
    maxBarSize: PropTypes.number,
    /**
     * Style.
     */
    style: PropTypes.object,
    /**
     * Class Name.
     */
    className: PropTypes.string,
    /**
     * Children.
     */
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    /**
     * Default Show Tooltip.
     */
    defaultShowTooltip: PropTypes.bool,
    /**
     * The customized event handler of click in this chart.
     */
    onClick: PropTypes.func,
    /**
     * The customized event handler of mouseleave in this chart.
     */
    onMouseLeave: PropTypes.func,
    /**
     * The customized event handler of mouseenter in this chart.
     */
    onMouseEnter: PropTypes.func,
    /**
     * The customized event handler of mousemove in this chart.
     */
    onMouseMove: PropTypes.func,
    /**
     * The customized event handler of mousedown in this chart.
     */
    onMouseDown: PropTypes.func,
    /**
     * The customized event handler of mouseup in this chart.
     */
    onMouseUp: PropTypes.func,
    /**
     * If false set, stacked items will be rendered left to right. If true set, stacked items will
     * be rendered right to left. (Render direction affects SVG layering, not x position.)
     */
    reverseStackOrder: PropTypes.bool,
    /**
     * ID.
     */
    id: PropTypes.string
  };
}