import React from 'react';
import PropTypes from 'prop-types';
import { ThemeManager } from 'prism-reactjs';
import ReBrush from '../../cartesian/Brush';
import Layer from '../../container/Layer';
import './Brush.less';

/**
 * @component
 */
export default class Brush extends ReBrush {
  static propTypes = {
    /**
     * Extra class name.
     */
    className: PropTypes.string,
    /**
     * Fill color.
     */
    fill: PropTypes.string,
    /**
     * Stroke color.
     */
    stroke: PropTypes.string,
    /**
     * The x-coordinate of brush.
     */
    x: PropTypes.number,
    /**
     * The y-coordinate of brush.
     */
    y: PropTypes.number,
    /**
     * The width of brush.
     */
    width: PropTypes.number,
    /**
     * The height of brush.
     */
    height: PropTypes.number.isRequired,
    /**
     * The width of each traveller.
     */
    travellerWidth: PropTypes.number,
    /**
     * The data with gap of refreshing chart. If the option is not set, the chart will be refreshed every time.
     */
    gap: PropTypes.number,
    /**
     * Padding.
     */
    padding: PropTypes.shape({
      top: PropTypes.number,
      right: PropTypes.number,
      bottom: PropTypes.number,
      left: PropTypes.number,
    }),
    /**
     * The key of data displayed in Brush.
     */
    dataKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.func]),
    /**
     * The original data of a LineChart, a BarChart or an AreaChart.
     */
    data: PropTypes.array,
    /**
     * The default start index of brush. If the option is not set, the start index will be 0.
     */
    startIndex: PropTypes.number,
    /**
     * The default end index of brush. If the option is not set, the end index will be calculated by the length of data.
     */
    endIndex: PropTypes.number,
    /**
     * The formatter function of ticks.
     */
    tickFormatter: PropTypes.func,
    /**
     * Children.
     */
    children: PropTypes.node,
    /**
     * The handler of changing the active scope of brush.
     */
    onChange: PropTypes.func,
    /**
     * 
     */
    updateId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * Leave time out.
     */
    leaveTimeOut: PropTypes.number,
  };

  static defaultProps = {
    height: 15,
    travellerWidth: 5,
    gap: 1,
    fill: '#fff',
    stroke: 'none',
    padding: { top: 1, right: 1, bottom: 1, left: 1 },
    leaveTimeOut: 1000,
  };

  /**
   * Render Slider Bar
   * @param {number} startX - x coordinate to start render slider
   * @param {number} endX - x coordinate to end render slider
   * @returns {element}
   */
  renderSlide(startX, endX) {
    const { y, height, stroke } = this.props;
    const sliderHeight = 4;
    const sliderPos = y + Math.ceil(height / 2) -  Math.ceil(sliderHeight / 2);
    return (
      <Layer className="brush-slider-group">
        <rect
          className="recharts-brush-slide ntnx"
          fill={ ThemeManager.getVar('light-gray-3') }
          x={Math.min(startX, endX)}
          y={ sliderPos }
          rx={ 4 }
          ry={ 4 }
          width={Math.abs(endX - startX)}
          height={ sliderHeight }
        />
        <rect
          className="recharts-brush-slide-grabber ntnx"
          onMouseEnter={this.handleEnterSlideOrTraveller}
          onMouseLeave={this.handleLeaveSlideOrTraveller}
          onMouseDown={this.handleSlideDragStart}
          onTouchStart={this.handleSlideDragStart}
          style={{ cursor: 'move' }}
          fill='rgba(255, 255, 255, 0)'
          x={Math.min(startX, endX)}
          y={y}
          rx={ 4 }
          ry={ 4 }
          width={Math.abs(endX - startX)}
          height={height}
        />
      </Layer>
    );
  }

  /**
   * Render Text for the brush slider
   * @returns {element}
   */
  renderText() {
    const { hideText, startIndex, endIndex, y, height, travellerWidth,
      stroke } = this.props;
    const { startX, endX } = this.state;
    const offset = 5;
    const attrs = {
      pointerEvents: 'none',
      fill: stroke,
    };

    if (!hideText) {
      return (
        <Layer className="recharts-brush-texts">
          <Text
            textAnchor="end"
            verticalAnchor="middle"
            x={Math.min(startX, endX) - offset}
            y={y + height / 2}
            {...attrs}
          >
            {this.getTextOfTick(startIndex)}
          </Text>
          <Text
            textAnchor="start"
            verticalAnchor="middle"
            x={Math.max(startX, endX) + travellerWidth + offset}
            y={y + height / 2}
            {...attrs}
          >
            {this.getTextOfTick(endIndex)}
          </Text>
        </Layer>
      );
    }

    return null;
  }
}
