import PropTypes from 'prop-types';
import ReBar from '../../cartesian/Bar';
import { LEGEND_TYPES, TOOLTIP_TYPES, isSsr } from '../../util/ReactUtils';

class Bar extends ReBar {

  static propTypes = {
    /**
     * If false set, background of bars will not be drawn. If true set, background of bars will be drawn which have the props calculated internally. If object set, background of bars will be drawn which have the props mergered by the internal calculated props and the option. If ReactElement set, the option can be the custom background element. If set a function, the function will be called to render customized background.
     */
    background: PropTypes.oneOf([
      PropTypes.bool,
      PropTypes.object,
      PropTypes.element,
      PropTypes.func
    ]),
    /**
     * Class name.
     */
    className: PropTypes.string,
    /**
     * Background color of bar.
     */
    fill: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    /**
     * If false set, labels will not be drawn. If true set, labels will be drawn which have the props calculated internally. If object set, labels will be drawn which have the props mergered by the internal calculated props and the option. If ReactElement set, the option can be the custom label element. If set a function, the function will be called to render customized label.
     */
    label: PropTypes.oneOf([
      PropTypes.string,
      PropTypes.number,
      PropTypes.element,
      PropTypes.func
    ]),
    /**
     * The layout of bar in the chart, usually inherited from parent.
     */
    layout: PropTypes.oneOf(['vertical', 'horizontal']),
    /**
     * The customized event handler of click on the bars in this group.
     */
    onClick: PropTypes.func,
    /**
     *  The customized event handler of mousedown on the bars in this group.
     */
    onMouseDown: PropTypes.func,
    /**
     * The customized event handler of mouseup on the bars in this group.
     */
    onMouseUp: PropTypes.func,
    /**
     * The customized event handler of mousemove on the bars in this group.
     */
    onMouseMove: PropTypes.func,
    /**
     * The customized event handler of mouseover on the bars in this group.
     */
    onMouseOver: PropTypes.func,
    /**
     * The customized event handler of mouseout on the bars in this group.
     */
    onMouseOut: PropTypes.func,
    /**
     * The customized event handler of moustenter on the bars in this group.
     */
    onMouseEnter: PropTypes.func,
    /**
     * The customized event handler of mouseleave on the bars in this group.
     */
    onMouseLeave: PropTypes.func,
    /**
     * The id of x-axis which is corresponding to the data.
     */ 
    xAxisId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /**
     * The id of y-axis which is corresponding to the data.
     */
    yAxisId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /**
     * Y Axis.
     */
    yAxis: PropTypes.object,
    /**
     * X Axis.
     */
    xAxis: PropTypes.object,
    /**
     * The stack id of bar, when two bars have the same value axis and same stackId, then the two bars are stacked in order.
     */
    stackId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /**
     * The width or height of each bar. If the barSize is not specified, the size of bar will be caculated by the barCategoryGap, barGap and the quantity of bar groups.
     */
    barSize: PropTypes.number,
    /**
     * The unit of data. This option will be used in tooltip.
     */
    unit: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * The name of data. This option will be used in tooltip and legend to represent a bar. If no value was set to this option, the value of dataKey will be used alternatively.
     */
    name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * The key of a group of data which should be unique in an area chart.
     */
    dataKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.func]).isRequired,
    /**
     * The type of icon in legend. If set to 'none', no legend item will be rendered.
     */
    legendType: PropTypes.oneOf(LEGEND_TYPES),
    /**
     * Tooltip type.
     */
    tooltipType: PropTypes.oneOf(TOOLTIP_TYPES),
    /**
     * The minimal height of a bar in a horizontal BarChart, or the minimal width of a bar in a vertical BarChart. By default, 0 values are not shown. To visualize a 0 (or close to zero) point, set the minimal point size to a pixel value like 3. In stacked bar charts, minPointSize might not be respected for tightly packed values. So we strongly recommend not using this props in stacked BarChart.
     */
    minPointSize: PropTypes.number,
    /**
     * The maximum width of bar in a horizontal BarChart, or maximum height in a vertical BarChart.
     */
    maxBarSize: PropTypes.number,
    /**
     * Hide.
     */
    hide: PropTypes.bool,
    /**
     * If set a ReactElement, the shape of bar can be customized. If set a function, the function will be called to render customized shape.
     */
    shape: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
    /**
     * The position information of all the rectangles, usually calculated internally.
     */
    data: PropTypes.arrayOf(PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
      width: PropTypes.number,
      height: PropTypes.number,
      radius: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.array]),
    })),
    /**
     * The customized event handler of animtion start.
     */
    onAnimationStart: PropTypes.func,
    /**
     * The customized event handler of animtion end.
     */
    onAnimationEnd: PropTypes.func,
    /**
     * Animation ID.
     */
    animationId: PropTypes.number,
    /**
     * If set false, animation of bar will be disabled.
     */
    isAnimationActive: PropTypes.bool,
    /**
     * Specifies when the animation should begin, the unit of this option is ms.
     */
    animationBegin: PropTypes.number,
    /**
     * Specifies the duration of animation, the unit of this option is ms.
     */
    animationDuration: PropTypes.number,
    /**
     * The type of easing function.
     */
    animationEasing: PropTypes.oneOf(['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear']),
    /**
     * The unique id of this component, which will be used to generate unique clip path id internally. This props is suggested to be set in SSR.
     */
    id: PropTypes.string,
  };

  static defaultProps = {
    xAxisId: 0,
    yAxisId: 0,
    legendType: 'rect',
    minPointSize: 0,
    hide: false,
    // data of bar
    data: [],
    layout: 'vertical',
    isAnimationActive: !isSsr(),
    animationBegin: 0,
    animationDuration: 400,
    animationEasing: 'ease',

    onAnimationStart: () => {},
    onAnimationEnd: () => {},
  };
}

export default Bar;
