import _ from 'lodash';
import reGenerateCategoricalChart from '../../chart/generateCategoricalChart';

const generateCategoricalChart = _.extend({}, reGenerateCategoricalChart, { 
  /**
   * @extends
   * Get the information of mouse in chart, return null when the mouse is not in the chart
   * @param  {Object} event    The event object
   * @return {Object}          Mouse data
   */
  getMouseInfo(event) {
    console.log('adsadsadsad');
    this.prototype.getMouseInfo(event);
  }
});

export default generateCategoricalChart;