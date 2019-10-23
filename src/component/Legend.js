/**
 * @fileOverview Legend
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import pureRender from '../util/PureRender';
import DefaultLegendContent from './DefaultLegendContent';
import { isNumber } from '../util/DataUtils';
import { LEGEND_TYPES } from '../util/ReactUtils';

const EPS = 1;
const ICON_TYPES = LEGEND_TYPES.filter(type => type !== 'none');

@pureRender
class Legend extends Component {
  static displayName = 'Legend';

  static propTypes = {
    /**
     * If set to a React element, the option will be used to render the legend. If set to a function, the function will be called to render the legend's content.
     */
    content: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    /**
     * The style of legend container which is a "position: absolute;" div element. Because the position of legend is quite flexible, so you can change the position by the value of top, left, right, bottom in this option. And the format of wrapperStyle is the same as React inline style.
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
     * The alignment of legend items in 'horizontal' direction, which cen be 'left', 'center', 'right'.
     */
    align: PropTypes.oneOf(['center', 'left', 'right']),
    /**
     * The alignment of legend items in 'vertical' direction, which can be 'top', 'middle', 'bottom'.
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
     *
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

  defaultUniqBy = entry => entry.value;
  getUniqPaylod = (option, payload) => {
    if (option === true) {
      return _.uniqBy(payload, this.defaultUniqBy);
    }

    if (_.isFunction(option)) {
      return _.uniqBy(payload, option);
    }

    return payload;
  };

  renderContent = (content, props) => {
    if (React.isValidElement(content)) {
      return React.cloneElement(content, props);
    } if (_.isFunction(content)) {
      return content(props);
    }

    return React.createElement(DefaultLegendContent, props);
  };

  static getWithHeight(item, chartWidth) {
    const { layout } = item.props;

    if (layout === 'vertical' && isNumber(item.props.height)) {
      return {
        height: item.props.height,
      };
    } if (layout === 'horizontal') {
      return {
        width: item.props.width || chartWidth,
      };
    }

    return null;
  }

  state = {
    boxWidth: -1,
    boxHeight: -1,
  };

  componentDidMount() {
    this.updateBBox();
  }

  componentDidUpdate() {
    this.updateBBox();
  }

  getBBox() {
    const { boxWidth, boxHeight } = this.state;

    if (boxWidth >= 0 && boxHeight >= 0) {
      return { width: boxWidth, height: boxHeight };
    }

    return null;
  }

  getDefaultPosition(style) {
    const { layout, align, verticalAlign, margin, chartWidth, chartHeight } = this.props;
    let hPos, vPos;

    if (!style || ((style.left === undefined || style.left === null) && (
      style.right === undefined || style.right === null))) {
      if (align === 'center' && layout === 'vertical') {
        const box = this.getBBox() || { width: 0 };
        hPos = { left: ((chartWidth || 0) - box.width) / 2 };
      } else {
        hPos = align === 'right' ?
          { right: (margin && margin.right) || 0 } :
          { left: (margin && margin.left) || 0 };
      }
    }

    if (!style || ((style.top === undefined || style.top === null) && (
      style.bottom === undefined || style.bottom === null))) {
      if (verticalAlign === 'middle') {
        const box = this.getBBox() || { height: 0 };
        vPos = { top: ((chartHeight || 0) - box.height) / 2 };
      } else {
        vPos = verticalAlign === 'bottom' ?
          { bottom: (margin && margin.bottom) || 0 } :
          { top: (margin && margin.top) || 0 };
      }
    }

    return { ...hPos, ...vPos };
  }

  updateBBox() {
    const { boxWidth, boxHeight } = this.state;
    const { onBBoxUpdate } = this.props;

    if (this.wrapperNode && this.wrapperNode.getBoundingClientRect) {
      const box = this.wrapperNode.getBoundingClientRect();

      if (Math.abs(box.width - boxWidth) > EPS || Math.abs(box.height - boxHeight) > EPS) {
        this.setState({
          boxWidth: box.width,
          boxHeight: box.height,
        }, () => {
          if (onBBoxUpdate) {
            onBBoxUpdate(box);
          }
        });
      }
    } else if (boxWidth !== -1 || boxHeight !== -1) {
      this.setState({
        boxWidth: -1,
        boxHeight: -1,
      }, () => {
        if (onBBoxUpdate) {
          onBBoxUpdate(null);
        }
      });
    }
  }

  render() {
    const { content, width, height, wrapperStyle, paylodUniqBy, payload } = this.props;
    const outerStyle = {
      position: 'absolute',
      width: width || 'auto',
      height: height || 'auto',
      ...this.getDefaultPosition(wrapperStyle),
      ...wrapperStyle,
    };

    return (
      <div
        className="recharts-legend-wrapper"
        style={outerStyle}
        ref={(node) => { this.wrapperNode = node; }}
      >
        { this.renderContent(content, { ...this.props, payload: this.getUniqPaylod(paylodUniqBy, payload) })}
      </div>
    );
  }
}

export default Legend;
