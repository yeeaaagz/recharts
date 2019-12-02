import React from 'react';
import { StackingLayout } from 'prism-reactjs';
import './Shade.less';

/**
 * Shade is used to grouping of Color components
 */
export default class Shade extends React.Component {

  render() {
    return (
      <StackingLayout { ...this.props }
        className="styleguide-shades"
        itemSpacing="0px"
      />
    );
  }

}
