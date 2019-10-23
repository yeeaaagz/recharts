/**
 * @fileOverview Wrapper component to make charts adapt to the size of parent * DOM
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactResizeDetector from 'react-resize-detector';
import _ from 'lodash';
import { isPercent } from '../util/DataUtils';
import { warn } from '../util/LogUtils';

class ResponsiveContainer extends Component {
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

  constructor(props) {
    super(props);

    this.state = {
      containerWidth: -1,
      containerHeight: -1,
    };

    this.handleResize = props.debounce > 0 ?
      _.debounce(this.updateDimensionsImmediate, props.debounce) :
      this.updateDimensionsImmediate;
  }

  /* eslint-disable  react/no-did-mount-set-state */
  componentDidMount() {
    this.mounted = true;

    const size = this.getContainerSize();

    if (size) {
      this.setState(size);
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  getContainerSize() {
    if (!this.container) { return null; }

    return {
      containerWidth: this.container.clientWidth,
      containerHeight: this.container.clientHeight,
    };
  }

  updateDimensionsImmediate = () => {
    if (!this.mounted) { return; }

    const newSize = this.getContainerSize();

    if (newSize) {
      const { containerWidth: oldWidth, containerHeight: oldHeight } = this.state;
      const { containerWidth, containerHeight } = newSize;

      if (containerWidth !== oldWidth || containerHeight !== oldHeight) {
        this.setState({ containerWidth, containerHeight });
      }
    }
  };

  renderChart() {
    const { containerWidth, containerHeight } = this.state;

    if (containerWidth < 0 || containerHeight < 0) { return null; }

    const { aspect, width, height, minWidth, minHeight, maxHeight, children } = this.props;

    warn(isPercent(width) || isPercent(height),
      `The width(%s) and height(%s) are both fixed numbers,
       maybe you don't need to use a ResponsiveContainer.`,
      width, height
    );

    warn(!aspect || aspect > 0,
      'The aspect(%s) must be greater than zero.',
      aspect);

    let calculatedWidth = isPercent(width) ? containerWidth : width;
    let calculatedHeight = isPercent(height) ? containerHeight : height;

    if (aspect && aspect > 0) {
      // Preserve the desired aspect ratio
      if (calculatedWidth) {
        // Will default to using width for aspect ratio
        calculatedHeight = calculatedWidth / aspect;
      } else if (calculatedHeight) {
        // But we should also take height into consideration
        calculatedWidth = calculatedHeight * aspect;
      }

      // if maxHeight is set, overwrite if calculatedHeight is greater than maxHeight
      if (maxHeight && (calculatedHeight > maxHeight)) {
        calculatedHeight = maxHeight;
      }
    }

    warn(calculatedWidth > 0 || calculatedHeight > 0,
      `The width(%s) and height(%s) of chart should be greater than 0,
       please check the style of container, or the props width(%s) and height(%s),
       or add a minWidth(%s) or minHeight(%s) or use aspect(%s) to control the
       height and width.`,
      calculatedWidth, calculatedHeight, width, height, minWidth, minHeight, aspect
    );

    return React.cloneElement(children, {
      width: calculatedWidth,
      height: calculatedHeight,
    });

  }

  render() {
    const { minWidth, minHeight, width, height, maxHeight, id, className } = this.props;
    const style = { width, height, minWidth, minHeight, maxHeight };

    return (
      <div
        id={id}
        className={classNames('recharts-responsive-container', className)}
        style={style}
        ref={(node) => { this.container = node; }}
      >
        {this.renderChart()}
        <ReactResizeDetector handleWidth handleHeight onResize={this.handleResize} />
      </div>
    );
  }
}

export default ResponsiveContainer;
