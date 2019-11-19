import PropTypes from 'prop-types';
import ReResponsiveContainer from '../../component/ResponsiveContainer';

/**
 * @component
 */
export default class ResponsiveContainer extends ReResponsiveContainer {
  static displayName = 'ResponsiveContainer';

  static propTypes = {
    /**
     * width / height. If specified, the height will be calculated by width / aspect.
     */
    aspect: PropTypes.number,
    /**
     * The percentage value of the chart's width or a fixed width.
     */
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * The percentage value of the chart's width or a fixed height.
     */
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * The minimum height of the container.
     */
    minHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * The minimum width of the container.
     */
    minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     *
     */
    maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * Children.
     */
    children: PropTypes.node.isRequired,
    /**
     * If specified a positive number, debounced function will be used to handle the resize event.
     */
    debounce: PropTypes.number,
    /**
     * ID.
     */
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * Classname.
     */
    className: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  static defaultProps = {
    width: '100%',
    height: '100%',
    debounce: 0,
  };
}
