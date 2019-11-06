import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classNames from 'classnames';
import { ThemeManager } from 'prism-reactjs';
import ReCartesianAxis from '../../cartesian/CartesianAxis';
import { shallowEqual } from '../../util/PureRender';
import { getStringSize } from '../../util/DOMUtils';
import Layer from '../../container/Layer';
import Text from '../component/Text';
import Label from '../../component/Label';
import { isSsr, PRESENTATION_ATTRIBUTES, EVENT_ATTRIBUTES, getPresentationAttributes,
  filterEventsOfChild } from '../../util/ReactUtils';
import { isNumber, mathSign } from '../../util/DataUtils';
import './CartesianAxis.less';

/**
 * @component
 */
export default class CartesianAxis extends ReCartesianAxis {
  static propTypes = {
    /**
     * Class name.
     */
    className: PropTypes.string,
    /**
     * If set a string or a number, default label will be drawn, and the option is content. If set a 
     React element, the option is the custom react element of drawing label. If set a function, the 
     function will be called to render customized label.
     */
    label: PropTypes.oneOf([
      PropTypes.string,
      PropTypes.number,
      PropTypes.element,
      PropTypes.func
    ]),
    /**
     * The x-coordinate of axis.
     */
    x: PropTypes.number,
    /**
     * The y-coordinate of axis.
     */
    y: PropTypes.number,
    /**
     * The width of axis.
     */
    width: PropTypes.number,
    /**
     * The height of axis.
     */
    height: PropTypes.number,
    /**
     * The orientation of axis.
     */
    orientation: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
    /**
     * The box of viewing area.
     */
    viewBox: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
      width: PropTypes.number,
      height: PropTypes.number,
    }),
    /**
     * If set false, no ticks will be drawn. If set a object, the option is the configuration of 
     * ticks. If set a React element, the option is the custom react element of drawing ticks. If 
     * set a function, the function will be called to render customized tick.
     */
    tick: PropTypes.oneOfType([
      PropTypes.bool, PropTypes.func, PropTypes.object, PropTypes.element,
    ]),
    /**
     * If set false, no axis line will be drawn. If set a object, the option is the configuration 
     * of axis line.
     */
    axisLine: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    /**
     * If set false, no axis tick lines will be drawn. If set a object, the option is the 
     * configuration of tick lines.
     */
    tickLine: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    /**
     * If set true, flips ticks around the axis line, displaying the labels inside the chart 
     * instead of outside.
     */
    mirror: PropTypes.bool,
    /**
     * The margin between tick line and tick.
     */
    tickMargin: PropTypes.number.isRequired,
    /**
     * The minimum gap between two adjacent labels.
     */
    minTickGap: PropTypes.number,
    /**
     * Ticks.
     */
    ticks: PropTypes.array,
    /**
     * The length of tick line.
     */
    tickSize: PropTypes.number,
    /**
     * Stroke.
     */
    stroke: PropTypes.string,
    /**
     * Tick Formatter.
     */
    tickFormatter: PropTypes.func,
    /**
     * Ticks Generator.
     */
    ticksGenerator: PropTypes.func,
    /**
     * If set 0, all the ticks will be shown. If set preserveStart", "preserveEnd" 
     * or "preserveStartEnd", the ticks which is to be shown or hidden will be calculated 
     * automatically.
     */
    interval: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([
      'preserveStart', 'preserveEnd', 'preserveStartEnd',
    ])]),
  };

  static defaultProps = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    viewBox: { x: 0, y: 0, width: 0, height: 0 },
    // The orientation of axis
    orientation: 'bottom',
    // The ticks
    ticks: [],

    stroke: ThemeManager.getVar('light-gray-2'),
    tickLine: true,
    axisLine: true,
    tick: true,
    mirror: false,

    minTickGap: 5,
    // The width or height of tick
    tickSize: 6,
    tickMargin: 2,
    interval: 'preserveEnd',
  };

  /**
   * @param {object} tickLabel - value of label
   * @returns {boolean} true when tick is active
   */
  isTickActive(tickLabel) {
    const { activeLabel } = this.props;

    return tickLabel === activeLabel;
  }

  /**
   * Render Tick item
   * @param {object} option - option for element
   * @param {object} props - props for element
   * @param {string} value - value for element
   * @returns {ReactElement} 
   */
  static renderTickItem(option, props, value) {
    let tickItem;

    if (React.isValidElement(option)) {
      tickItem = React.cloneElement(option, props);
    } else if (_.isFunction(option)) {
      tickItem = option(props);
    } else {
      tickItem = (
        <Text
          {...props}
          className="recharts-cartesian-axis-tick-value"
        >
          {value}
        </Text>
      );
    }

    return tickItem;
  }
  /**
   * render the ticks
   * @param {Array} ticks The ticks to actually render (overrides what was passed in props)
   * @return {ReactComponent} renderedTicks
   */
  renderTicks(ticks) {
    const { tickLine, stroke, tick, tickFormatter, unit } = this.props;
    const finalTicks = CartesianAxis.getTicks({ ...this.props, ticks });
    const textAnchor = this.getTickTextAnchor();
    const verticalAnchor = this.getTickVerticalAnchor();
    const axisProps = getPresentationAttributes(this.props);
    const customTickProps = getPresentationAttributes(tick);
    const tickLineProps = {
      ...axisProps, fill: 'none', ...getPresentationAttributes(tickLine),
    };
    const items = finalTicks.map((entry, i) => {
      const { line: lineCoord, tick: tickCoord } = this.getTickLineCoord(entry);
      const tickProps = {
        active: this.isTickActive(entry.value),
        textAnchor,
        verticalAnchor,
        ...axisProps,
        stroke: 'none', fill: stroke,
        ...customTickProps,
        ...tickCoord,
        index: i, payload: entry,
        visibleTicksCount: finalTicks.length,
      };

      return (
        <Layer
          className="recharts-cartesian-axis-tick"
          key={`tick-${i}`}
          {...filterEventsOfChild(this.props, entry, i)}
        >
          {tickLine && (
            <line
              className="recharts-cartesian-axis-tick-line"
              {...tickLineProps}
              {...lineCoord}
            />
          )}
          {tick && this.constructor.renderTickItem(
            tick,
            tickProps,
            `${_.isFunction(tickFormatter) ? tickFormatter(entry.value) : entry.value}${unit || ''}`
          )}
        </Layer>
      );
    });

    return (
      <g className="recharts-cartesian-axis-ticks">
        {items}
      </g>
    );
  }
}
