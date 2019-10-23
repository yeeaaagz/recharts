/**
 * @fileOverview Render a group of bar
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Animate from 'react-smooth';
import _ from 'lodash';
import Rectangle from '../shape/Rectangle';
import Layer from '../container/Layer';
import ErrorBar from './ErrorBar';
import Cell from '../component/Cell';
import LabelList from '../component/LabelList';
import pureRender from '../util/PureRender';
import { uniqueId, mathSign, interpolateNumber } from '../util/DataUtils';
import { PRESENTATION_ATTRIBUTES, EVENT_ATTRIBUTES, LEGEND_TYPES, TOOLTIP_TYPES,
  findAllByType, getPresentationAttributes, filterEventsOfChild, isSsr } from '../util/ReactUtils';
import { getCateCoordinateOfBar, getValueByDataKey, truncateByDomain, getBaseValueOfBar,
  findPositionOfBar } from '../util/ChartUtils';

@pureRender
class Bar extends Component {

  static displayName = 'Bar';

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
    fill: PropTypes.oneOf([
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

  /**
   * Compose the data of each group
   * @param {Object} props Props for the component
   * @param {Object} item        An instance of Bar
   * @param {Array} barPosition  The offset and size of each bar
   * @param {Object} xAxis       The configuration of x-axis
   * @param {Object} yAxis       The configuration of y-axis
   * @param {Array} stackedData  The stacked data of a bar item
   * @return{Array} Composed data
   */
  static getComposedData = ({ props, item, barPosition, bandSize, xAxis, yAxis,
    xAxisTicks, yAxisTicks, stackedData, dataStartIndex, displayedData, offset }) => {
    const pos = findPositionOfBar(barPosition, item);
    if (!pos) { return []; }

    console.log('bar - getComposedData', props);

    const { layout } = props;
    const { dataKey, children, minPointSize } = item.props;
    const numericAxis = layout === 'horizontal' ? yAxis : xAxis;
    const stackedDomain = stackedData ? numericAxis.scale.domain() : null;
    const baseValue = getBaseValueOfBar({ props, numericAxis });
    const cells = findAllByType(children, Cell);

    const rects = displayedData.map((entry, index) => {
      let value, x, y, width, height, background;

      if (stackedData) {
        value = truncateByDomain(stackedData[dataStartIndex + index], stackedDomain);
      } else {
        value = getValueByDataKey(entry, dataKey);

        if (!_.isArray(value)) {
          value = [baseValue, value];
        }
      }

      if (layout === 'horizontal') {
        x = getCateCoordinateOfBar({
          axis: xAxis,
          ticks: xAxisTicks,
          bandSize,
          offset: pos.offset,
          entry,
          index,
        });
        y = yAxis.scale(value[1]);
        width = pos.size;
        height = yAxis.scale(value[0]) - yAxis.scale(value[1]);
        background = { x, y: yAxis.y, width, height: yAxis.height };

        if (Math.abs(minPointSize) > 0 && Math.abs(height) < Math.abs(minPointSize)) {
          const delta = mathSign(height || minPointSize) *
            (Math.abs(minPointSize) - Math.abs(height));

          y -= delta;
          height += delta;
        }
      } else {
        x = xAxis.scale(value[0]);
        y = getCateCoordinateOfBar({
          axis: yAxis,
          ticks: yAxisTicks,
          bandSize,
          offset: pos.offset,
          entry,
          index,
        });
        width = xAxis.scale(value[1]) - xAxis.scale(value[0]);
        console.log('width', xAxis.scale(value[1]), xAxis.scale(value[0]));
        height = pos.size;
        background = { x: xAxis.x, y, width: xAxis.width, height };

        if (Math.abs(minPointSize) > 0 && Math.abs(width) < Math.abs(minPointSize)) {
          const delta = mathSign(width || minPointSize) *
            (Math.abs(minPointSize) - Math.abs(width));
          width += delta;
        }
      }



      return {
        ...entry,
        x, y, width, height, value: stackedData ? value : value[1],
        payload: entry,
        background,
        ...(cells && cells[index] && cells[index].props),
      };
    });

    return { data: rects, layout, ...offset };
  };

  state = { isAnimationFinished: false };

  componentWillReceiveProps(nextProps) {
    const { animationId, data } = this.props;

    if (nextProps.animationId !== animationId) {
      this.cachePrevData(data);
    }
  }

  id = uniqueId('recharts-bar-');

  cachePrevData = (data) => {
    this.setState({ prevData: data });
  };

  handleAnimationEnd = () => {
    this.setState({ isAnimationFinished: true });
    this.props.onAnimationEnd();
  };

  handleAnimationStart = () => {
    this.setState({ isAnimationFinished: false });
    this.props.onAnimationStart();
  };

  static renderRectangle(option, props) {
    let rectangle;

    if (React.isValidElement(option)) {
      rectangle = React.cloneElement(option, props);
    } else if (_.isFunction(option)) {
      rectangle = option(props);
    } else {
      rectangle = <Rectangle {...props} />;
    }

    return rectangle;
  }

  renderRectanglesStatically(data) {
    const { shape } = this.props;
    const baseProps = getPresentationAttributes(this.props);

    return data && data.map((entry, i) => {
      const props = { ...baseProps, ...entry, index: i };

      return (
        <Layer
          className="recharts-bar-rectangle"
          {...filterEventsOfChild(this.props, entry, i)}
          key={`rectangle-${i}`}
        >
          {this.constructor.renderRectangle(shape, props)}
        </Layer>
      );
    });
  }

  renderRectanglesWithAnimation() {
    const { data, layout, isAnimationActive, animationBegin,
      animationDuration, animationEasing, animationId,
    } = this.props;
    const { prevData } = this.state;

    return (
      <Animate
        begin={animationBegin}
        duration={animationDuration}
        isActive={isAnimationActive}
        easing={animationEasing}
        from={{ t: 0 }}
        to={{ t: 1 }}
        key={`bar-${animationId}`}
        onAnimationEnd={this.handleAnimationEnd}
        onAnimationStart={this.handleAnimationStart}
      >
        {
          ({ t }) => {
            const stepData = data.map((entry, index) => {
              const prev = prevData && prevData[index];

              if (prev) {
                const interpolatorX = interpolateNumber(prev.x, entry.x);
                const interpolatorY = interpolateNumber(prev.y, entry.y);
                const interpolatorWidth = interpolateNumber(prev.width, entry.width);
                const interpolatorHeight = interpolateNumber(prev.height, entry.height);

                return {
                  ...entry,
                  x: interpolatorX(t),
                  y: interpolatorY(t),
                  width: interpolatorWidth(t),
                  height: interpolatorHeight(t),
                };
              }

              if (layout === 'horizontal') {
                const interpolatorHeight = interpolateNumber(0, entry.height);
                const h = interpolatorHeight(t);

                return {
                  ...entry,
                  y: entry.y + entry.height - h,
                  height: h,
                };
              }

              const interpolator = interpolateNumber(0, entry.width);
              const w = interpolator(t);

              return { ...entry, width: w };
            });

            return (
              <Layer>
                {this.renderRectanglesStatically(stepData)}
              </Layer>
            );
          }
        }
      </Animate>
    );
  }

  renderRectangles() {
    const { data, isAnimationActive } = this.props;
    const { prevData } = this.state;

    if (isAnimationActive && data && data.length &&
      (!prevData || !_.isEqual(prevData, data))) {
      return this.renderRectanglesWithAnimation();
    }

    return this.renderRectanglesStatically(data);
  }

  renderBackground() {
    const { data } = this.props;
    const backgroundProps = getPresentationAttributes(this.props.background);

    return data.map((entry, i) => {
      // eslint-disable-next-line no-unused-vars
      const { value, background, ...rest } = entry;

      if (!background) { return null; }

      const props = {
        ...rest,
        fill: '#eee',
        ...background,
        ...backgroundProps,
        ...filterEventsOfChild(this.props, entry, i),
        index: i,
        key: `background-bar-${i}`,
        className: 'recharts-bar-background-rectangle',
      };

      return this.constructor.renderRectangle(this.props.background, props);
    });
  }

  renderErrorBar() {
    if (this.props.isAnimationActive && !this.state.isAnimationFinished) { return null; }

    const { data, xAxis, yAxis, layout, children } = this.props;
    const errorBarItems = findAllByType(children, ErrorBar);

    if (!errorBarItems) { return null; }

    const offset = (layout === 'vertical') ? data[0].height / 2 : data[0].width / 2;

    function dataPointFormatter(dataPoint, dataKey) {
      return {
        x: dataPoint.x,
        y: dataPoint.y,
        value: dataPoint.value,
        errorVal: getValueByDataKey(dataPoint, dataKey),
      };
    }

    return errorBarItems.map((item, i) => React.cloneElement(item, {
      key: `error-bar-${i}`,
      data,
      xAxis,
      yAxis,
      layout,
      offset,
      dataPointFormatter,
    }));
  }

  render() {
    const { hide, data, className, xAxis, yAxis, left, top,
      width, height, isAnimationActive, background, id } = this.props;
    if (hide || !data || !data.length) { return null; }

    const { isAnimationFinished } = this.state;
    const layerClass = classNames('recharts-bar', className);
    const needClip = (xAxis && xAxis.allowDataOverflow) || (yAxis && yAxis.allowDataOverflow);
    const clipPathId = _.isNil(id) ? this.id : id;
    console.log('Bar - render', data);
    return (
      <Layer className={layerClass}>
        {needClip ? (
          <defs>
            <clipPath id={`clipPath-${clipPathId}`}>
              <rect x={left} y={top} width={width} height={height} />
            </clipPath>
          </defs>
        ) : null}
        <Layer
          className="recharts-bar-rectangles"
          clipPath={needClip ? `url(#clipPath-${clipPathId})` : null}
        >
          {background ? this.renderBackground() : null}
          {this.renderRectangles()}
        </Layer>
        {this.renderErrorBar()}
        {(!isAnimationActive || isAnimationFinished) &&
          LabelList.renderCallByParent(this.props, data)}
      </Layer>
    );
  }
}

export default Bar;
