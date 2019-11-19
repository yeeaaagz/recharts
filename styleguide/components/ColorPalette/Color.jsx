import React from 'react';
import PropTypes from 'prop-types';
import { FlexLayout, StackingLayout, FlexItem,
  TextLabel, ThemeManager } from 'prism-reactjs';
import './Color.less';

/**
 * Color is for use in the styleguide to show color bar along with
 * color variable name and hash
 */
export default class Color extends React.Component {

  static propTypes = {
    /**
     * This is the variable color name from lib/styles/v2/Colors.less
     * without the leading @
     */
    color: PropTypes.string.isRequired
  };

  render() {
    const { color } = this.props;
    const backgroundColor = ThemeManager.getVar(color);

    return (
      <FlexLayout alignItems="center" className="styleguide-color" itemSpacing="10px">
        <div className="color-bar" style={ { backgroundColor: color } } />
        <StackingLayout itemSpacing="5px">
          <FlexItem>
            <TextLabel>{color}</TextLabel>
          </FlexItem>
        </StackingLayout>
      </FlexLayout>
    );
  }

}
