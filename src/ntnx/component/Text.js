import React, { Component } from 'react';
import PropTypes from 'prop-types';
import reduceCSSCalc from 'reduce-css-calc';
import classNames from 'classnames';
import _ from 'lodash';
import { isNumber, isNumOrStr } from '../../util/DataUtils';
import { PRESENTATION_ATTRIBUTES, getPresentationAttributes, isSsr, filterEventAttributes } from '../../util/ReactUtils';
import { getStringSize } from '../../util/DOMUtils';
import ReText from '../../component/Text';
import './Text.less';

/**
 * @component
 */
export default class Text extends ReText {
  static propTypes = {
    scaleToFit: PropTypes.bool,
    angle: PropTypes.number,
    textAnchor: PropTypes.oneOf(['start', 'middle', 'end', 'inherit']),
    verticalAnchor: PropTypes.oneOf(['start', 'middle', 'end']),
    style: PropTypes.object,
  };

  static defaultProps = {
    x: 0,
    y: 0,
    lineHeight: '1em',
    capHeight: '0.71em', // Magic number from d3
    scaleToFit: false,
    textAnchor: 'start',
    verticalAnchor: 'end', // Maintain compat with existing charts / default SVG behavior
  };

  render() {
    const {
      active,
      dx,
      dy,
      textAnchor,
      verticalAnchor,
      scaleToFit,
      angle,
      lineHeight,
      capHeight,
      className,
      ...textProps
    } = this.props;
    const { wordsByLines } = this.state;

    if (!isNumOrStr(textProps.x) || !isNumOrStr(textProps.y)) { return null; }
    const x = textProps.x + (isNumber(dx) ? dx : 0);
    const y = textProps.y + (isNumber(dy) ? dy : 0);

    let startDy;
    switch (verticalAnchor) {
      case 'start':
        startDy = reduceCSSCalc(`calc(${capHeight})`);
        break;
      case 'middle':
        startDy = reduceCSSCalc(
          `calc(${(wordsByLines.length - 1) / 2} * -${lineHeight} + (${capHeight} / 2))`
        );
        break;
      default:
        startDy = reduceCSSCalc(`calc(${wordsByLines.length - 1} * -${lineHeight})`);
        break;
    }

    const transforms = [];
    if (scaleToFit) {
      const lineWidth = wordsByLines[0].width;
      transforms.push(`scale(${this.props.width / lineWidth})`);
    }
    if (angle) {
      transforms.push(`rotate(${angle}, ${x}, ${y})`);
    }
    if (transforms.length) {
      textProps.transform = transforms.join(' ');
    }

    return (
      <text
        {...getPresentationAttributes(textProps)}
        {...filterEventAttributes(textProps)}
        x={x}
        y={y}
        className={classNames(className, 'recharts-text ntnx')}
        data-active={ active }
        textAnchor={textAnchor}
      >
        {
        wordsByLines.map((line, index) => (
          <tspan x={x} dy={index === 0 ? startDy : lineHeight} key={index}>
            {line.words.join(' ')}
          </tspan>
        ))
      }
      </text>
    );
  }
}
