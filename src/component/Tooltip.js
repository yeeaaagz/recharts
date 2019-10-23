/**
 * @fileOverview Tooltip
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translateStyle } from 'react-smooth';
import _ from 'lodash';
import classNames from 'classnames';
import DefaultTooltipContent from './DefaultTooltipContent';
import { TOOLTIP_TYPES, isSsr } from '../util/ReactUtils';
import { isNumber } from '../util/DataUtils';
import pureRender from '../util/PureRender';

const CLS_PREFIX = 'recharts-tooltip-wrapper';

const EPS = 1;

const defaultUniqBy = entry => entry.dataKey;
const getUniqPaylod = (option, payload) => {
  if (option === true) {
    return _.uniqBy(payload, defaultUniqBy);
  }

  if (_.isFunction(option)) {
    return _.uniqBy(payload, option);
  }

  return payload;
};

@pureRender
class Tooltip extends Component {
  static displayName = 'Tooltip';

  static propTypes = {
    /**
     * If set a React element, the option is the custom react element of rendering tooltip. If set
     * a function, the function will be called to render tooltip content.
     */
    content: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    /**
     * The box of viewing area, which has the shape of {x: someVal, y: someVal, width: someVal,
     * height: someVal}, usually calculated internally.
     */
    viewBox: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
      width: PropTypes.number,
      height: PropTypes.number,
    }),
    /**
     * If set true, the tooltip is displayed. If set false, the tooltip is hidden, usually
     * calculated internally.
     */
    active: PropTypes.bool,
    /**
     * The separator between name and value.
     */
    separator: PropTypes.string,
    /**
     * The formatter function of value in tooltip. If you return an array, the first entry will be
     * the formatted "value", and the second entry will be the formatted "name".
     */
    formatter: PropTypes.func,
    /**
     * The offset size between the position of tooltip and the active position.
     */
    offset: PropTypes.number,
    /**
     * The style of default tooltip content item which is a li element
     */
    itemStyle: PropTypes.object,
    /**
     * The formatter function of label in tooltip.
     */
    labelFormatter: PropTypes.object,
    /**
     * The style of default tooltip label which is a p element.
     */
    labelStyle: PropTypes.object,
    /**
     * The style of tooltip wrapper which is a dom element.
     */
    wrapperStyle: PropTypes.object,
    /**
     * The style of tooltip content which is a dom element.
     */
    contentStyle: PropTypes.object,
    /**
     * If set false, no cursor will be drawn when tooltip is active. If set a object, the option is
     * the configuration of cursor. If set a React element, the option is the custom react element
     * of drawing cursor.
     */
    cursor: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.element,
      PropTypes.object
    ]),
    /**
     * The coordinate of tooltip position, usually calculated internally.
     */
    coordinate: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
      })
    ]),
    /**
     * Position.
     */
    position: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
    /**
     * The label value which is active now, usually calculated internally
     */
    label: PropTypes.any,
    /**
     * The source data of the content to be displayed in the tooltip, usually calculated internally.
     */
    payload: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.any,
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.array]),
      unit: PropTypes.any,
      type: PropTypes.oneOf(TOOLTIP_TYPES)
    })),
    /**
     * Placement of tooltip in regards to cell item.
     */
    placement: PropTypes.oneOf([
      'center',
      'top-left',
      'top-right'
      ]),
    /**
     * Placement of tooltip.
     */
    paylodUniqBy: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    /**
     * If set false, animation of tooltip will be disabled.
     */
    isAnimationActive: PropTypes.bool,
    /**
     * Specifies the duration of animation, the unit of this option is ms.
     */
    animationDuration: PropTypes.number,
    /**
     * The type of easing function.
     */
    animationEasing: PropTypes.oneOf([
      'ease',
      'ease-in',
      'ease-out',
      'ease-in-out',
      'linear',
    ]),
    /**
     * Sort function of payload.
     */
    itemSorter: PropTypes.func,
    /**
     * When an item of the payload has value null or undefined, this item won't be displayed.
     */
    filterNull: PropTypes.bool,
    /**
     * Use Translate 3D.
     */
    useTranslate3d: PropTypes.bool,
  };

  static defaultProps = {
    active: false,
    offset: 10,
    viewBox: { x1: 0, x2: 0, y1: 0, y2: 0 },
    coordinate: false,
    cursorStyle: {},
    separator: ' : ',
    wrapperStyle: {},
    contentStyle: {},
    itemStyle: {},
    labelStyle: {},
    cursor: true,
    isAnimationActive: !isSsr(),
    animationEasing: 'ease',
    animationDuration: 400,
    filterNull: true,
    placement: 'right',
    useTranslate3d: false,
  };

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

  updateBBox() {
    const { boxWidth, boxHeight } = this.state;

    if (this.wrapperNode && this.wrapperNode.getBoundingClientRect) {
      const box = this.wrapperNode.getBoundingClientRect();

      if (Math.abs(box.width - boxWidth) > EPS || Math.abs(box.height - boxHeight) > EPS) {
        this.setState({
          boxWidth: box.width,
          boxHeight: box.height,
        });
      }
    } else if (boxWidth !== -1 || boxHeight !== -1) {
      this.setState({
        boxWidth: -1,
        boxHeight: -1,
      });
    }
  }

  renderContent = (content, props) => {
    if (React.isValidElement(content)) {
      return React.cloneElement(content, props);
    } if (_.isFunction(content)) {
      return content(props);
    }

    return React.createElement(DefaultTooltipContent, props);
  };

  getHighestPoint(data) {
    console.log('getHighestPoint', data);
    const points = _.map(data, (item) => {
      return item && item.y || 0;
    }) || 0;

    // console.log('points', points, Math.min(...points));

    return Math.min(...points);
  }

  render() {
    const {
      payload,
      isAnimationActive,
      animationDuration,
      animationEasing,
      filterNull,
      paylodUniqBy,
      placement
    } = this.props;

    const finalPayload = getUniqPaylod(paylodUniqBy, filterNull && payload && payload.length ?
      payload.filter(entry => !_.isNil(entry.value)) : payload);
    const hasPayload = finalPayload && finalPayload.length;
    const {
      content,
      viewBox,
      coordinate,
      position,
      active,
      offset,
      wrapperStyle
    } = this.props;
    let outerStyle = {
      pointerEvents: 'none',
      visibility: active && hasPayload ? 'visible' : 'hidden',
      position: 'absolute',
      top: 0,
      ...wrapperStyle,
    };
    let translateX, translateY;



    // Info:
    // this.props.graphicalItemPayload.x = Left point of the bar
    // coordinate.x - The center point of the bar
    // this.props.graphicalItemPayload.width - width of bar
    // boxWidth - cursor box width

    if (position && isNumber(position.x) && isNumber(position.y)) {
      translateX = position.x;
      translateY = position.y;
    } else {
      const { boxWidth, boxHeight } = this.state;
      if (boxWidth > 0 && boxHeight > 0 && coordinate) {
        if (placement === 'top-left') {
           translateX = this.props.graphicalItemPayload.x;
           translateY = this.props.graphicalItemPayload.y;
        } else if (placement === 'top-right') {
           // translateX = coordinate.x + ( viewBox.left / 2 ) + 15;

           translateX = 0;
           if (this.props.graphicalItemPayload && this.props.graphicalItemPayload[0] && this.props.graphicalItemPayload[0].x) {
            translateX = this.props.graphicalItemPayload[0].x + this.props.graphicalItemPayload[0].width - boxWidth;
           }


           translateY = this.getHighestPoint(this.props.graphicalItemPayload);
            // translateY = 0;

            // this.getHighestPoint(this.props.graphicalItemPayload);
           console.log('Tooltip', this.props.graphicalItemPayload,  translateX, translateY);
        } else if (placement === 'center') {
          translateX = coordinate.x - (boxWidth / 2);
          translateY = position && isNumber(position.y) ? position.y : Math.max(
            coordinate.y + boxHeight + offset > (viewBox.y + viewBox.height) ?
              coordinate.y - boxHeight - offset :
              coordinate.y + offset, viewBox.y);
        } else {
          translateX = position && isNumber(position.x) ? position.x : Math.max(
            coordinate.x + boxWidth + offset > (viewBox.x + viewBox.width) ?
              coordinate.x - boxWidth - offset :
              coordinate.x + offset, viewBox.x);
          translateY = position && isNumber(position.y) ? position.y : Math.max(
            coordinate.y + boxHeight + offset > (viewBox.y + viewBox.height) ?
              coordinate.y - boxHeight - offset :
              coordinate.y + offset, viewBox.y);
        }
      } else {
        outerStyle.visibility = 'hidden';
      }
    }

    outerStyle = {
      ...translateStyle({
        transform: this.props.useTranslate3d ? `translate3d(${translateX}px, ${translateY}px, 0)` : `translate(${translateX}px, ${translateY}px)`,
      }),
      ...outerStyle,
    };

    if (isAnimationActive && active) {
      outerStyle = {
        ...translateStyle({
          transition: `transform ${animationDuration}ms ${animationEasing}`,
        }),
        ...outerStyle,
      };
    }

    const cls = classNames(CLS_PREFIX, {
      [`${CLS_PREFIX}-right`]: isNumber(translateX) && coordinate && isNumber(coordinate.x) && translateX >= coordinate.x,
      [`${CLS_PREFIX}-left`]: isNumber(translateX) && coordinate && isNumber(coordinate.x) && translateX < coordinate.x,
      [`${CLS_PREFIX}-bottom`]: isNumber(translateY) && coordinate && isNumber(coordinate.y) && translateY >= coordinate.y,
      [`${CLS_PREFIX}-top`]: isNumber(translateY) && coordinate && isNumber(coordinate.y) && translateY < coordinate.y,
    });

    return (
      <div
        className={cls}
        style={outerStyle}
        ref={(node) => { this.wrapperNode = node; }}
      >
        {this.renderContent(content, { ...this.props, payload: finalPayload })}
      </div>
    );
  }
}

export default Tooltip;
