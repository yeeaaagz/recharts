import PropTypes from 'prop-types';
import { ThemeManager } from 'prism-reactjs';
import ReCartesianGrid from '../../cartesian/CartesianGrid';

/**
 * @component
 */
export default class CartesianGrid extends ReCartesianGrid {

  static propTypes = {
    /**
     * The x-coordinate of grid.
     */
    x: PropTypes.number,
    /**
     * The y-coordinate of grid.
     */
    y: PropTypes.number,
    /**
     * The width of grid.
     */
    width: PropTypes.number,
    /**
     * The height of grid.
     */
    height: PropTypes.number,
    /**
     * If set false, no horizontal grid lines will be drawn.
     */
    horizontal: PropTypes.oneOfType([
      PropTypes.object, PropTypes.element, PropTypes.func, PropTypes.bool,
    ]),
    /**
     * If set false, no vertical grid lines will be drawn.
     */
    vertical: PropTypes.oneOfType([
      PropTypes.object, PropTypes.element, PropTypes.func, PropTypes.bool,
    ]),
    /**
     * The y-coordinates of all horizontal lines.
     */
    horizontalPoints: PropTypes.arrayOf(PropTypes.number),
    /**
     * The x-coordinates of all vertical lines.
     */
    verticalPoints: PropTypes.arrayOf(PropTypes.number),
    /**
     * horizontalCoordinatesGenerator
     */
    horizontalCoordinatesGenerator: PropTypes.func,
    /**
     * verticalCoordinatesGenerator
     */
    verticalCoordinatesGenerator: PropTypes.func,
    /**
     * xAxis
     */
    xAxis: PropTypes.object,
    /**
     * yAxis
     */
    yAxis: PropTypes.object,
    /**
     * offset
     */
    offset: PropTypes.object,
    /**
     * chartWidth
     */
    chartWidth: PropTypes.number,
    /**
     * chartHeight
     */
    chartHeight: PropTypes.number,
    /**
     * verticalFill
     */
    verticalFill: PropTypes.arrayOf(PropTypes.string),
    /**
     * horizontalFill
     */
    horizontalFill: PropTypes.arrayOf(PropTypes.string)
  };

  static defaultProps = {
    horizontal: true,
    vertical: true,
    // The ordinates of horizontal grid lines
    horizontalPoints: [],
    // The abscissas of vertical grid lines
    verticalPoints: [],
    stroke: ThemeManager.getVar('light-gray-3'),
    fill: 'none',
    // The fill of colors of grid lines
    verticalFill: [],
    horizontalFill: [],
  };
}
