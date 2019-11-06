import PropTypes from 'prop-types';
import ReLegend from '../../component/Legend';
import { LEGEND_TYPES } from '../../util/ReactUtils';

const ICON_TYPES = LEGEND_TYPES.filter(type => type !== 'none');

/**
 * @component
 */
export default class Legend extends ReLegend {
  static propTypes = {
    /**
     * If set to a React element, the option will be used to render the legend. If set to a 
     * function, the function will be called to render the legend's content.
     */
    content: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    /**
     * The style of legend container which is a "position: absolute;" div element. Because the 
     * position of legend is quite flexible, so you can change the position by the value of top, 
     * left, right, bottom in this option. And the format of wrapperStyle is the same as React 
     * inline style.
     */
    wrapperStyle: PropTypes.object,
    /**
     * The width of chart container, usually calculated internally.
     */
    chartWidth: PropTypes.number,
    /**
     * The height of chart container, usually calculated internally.
     */
    chartHeight: PropTypes.number,
    /**
     * The width of legend.
     */
    width: PropTypes.number,
    /**
     * The height of legend.
     */
    height: PropTypes.number,
    /**
     * The size of icon in each legend item.
     */
    iconSize: PropTypes.number,
    /**
     * The type of icon in each legend item.
     */
    iconType: PropTypes.oneOf(ICON_TYPES),
    /**
     * The layout of legend items.
     */
    layout: PropTypes.oneOf(['horizontal', 'vertical']),
    /**
     * The alignment of legend items in 'horizontal' direction, which cen be 'left', 'center', 
     * 'right'.
     */
    align: PropTypes.oneOf(['center', 'left', 'right']),
    /**
     * The alignment of legend items in 'vertical' direction, which can be 'top', 'middle', 
     * 'bottom'.
     */
    verticalAlign: PropTypes.oneOf(['top', 'bottom', 'middle']),
    /**
     * The margin of chart container, usually calculated internally.
     */
    margin: PropTypes.shape({
      top: PropTypes.number,
      left: PropTypes.number,
      bottom: PropTypes.number,
      right: PropTypes.number,
    }),
    /**
     * The source data of the content to be displayed in the legend, usually calculated internally.
     */
    payload: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.any,
      id: PropTypes.any,
      type: PropTypes.oneOf(LEGEND_TYPES),
    })),
    /**
     * paylodUniqBy
     */
    paylodUniqBy: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    /**
     * The formatter function of each text in legend.
     */
    formatter: PropTypes.func,
    /**
     * The customized event handler of click on the items in this group.
     */
    onClick: PropTypes.func,
    /**
     * The customized event handler of mousedown on the items in this group.
     */
    onMouseDown: PropTypes.func,
    /**
     * The customized event handler of mouseup on the items in this group.
     */
    onMouseUp: PropTypes.func,
    /**
     * The customized event handler of mousemove on the items in this group.
     */
    onMouseMove: PropTypes.func,
    /**
     * The customized event handler of mouseover on the items in this group.
     */
    onMouseOver: PropTypes.func,
    /**
     * The customized event handler of mouseout on the items in this group.
     */
    onMouseOut: PropTypes.func,
    /**
     * The customized event handler of moustenter on the items in this group.
     */
    onMouseEnter: PropTypes.func,
    /**
     * The customized event handler of mouseleave on the items in this group.
     */
    onMouseLeave: PropTypes.func,
  };

  static defaultProps = {
    iconSize: 14,
    layout: 'horizontal',
    align: 'center',
    verticalAlign: 'bottom',
  };
}
