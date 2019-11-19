import React from 'react';
import {
  FlexLayout, 
  StackingLayout, 
  SystemSelect, 
  TextLabel, 
  Title,
  ThemeManager
} from 'prism-reactjs';
import Color from './Color';
import Shade from './Shade';

/**
 * ColorPalette is for use in styleguide to show all the colors supported
 * in Design 2.0
 */
export default class ColorPalette extends React.Component {

  static Color = Color;
  static Shade = Shade;

  render() {
    return (
      <StackingLayout className="styleguide-color-palette"
        itemSpacing="40px">
        <FlexLayout
          alignItems="center"
          justifyContent="center"
          itemSpacing="80px"
        >
          <StackingLayout>
            <Title size="h2">Categorial Colors</Title>
            <Shade>
              <Color color="#22a5f7" />
              <Color color="#8a77ed" />
              <Color color="#36d068" />
              <Color color="#ffbc0b" />
              <Color color="#f25c61" />
              <Color color="#33d6cb" />
              <Color color="#ed5fb4" />
              <Color color="#ff8e3d" />
            </Shade>
          </StackingLayout>
          <StackingLayout>
            <Title size="h2">Linear Colors</Title>
            <Shade>
              <Color color="#673bd6" />
              <Color color="#535ae0" />
              <Color color="#3f77e9" />
              <Color color="#2c96f2" />
              <Color color="#34adf0" />
              <Color color="#56bce1" />
              <Color color="#7accd4" />
              <Color color="#9ddbc6" />
            </Shade>
          </StackingLayout>
        </FlexLayout>
        <StackingLayout>
          <Title size="h2">Linear Colors Ranges</Title>
          <FlexLayout
            itemSpacing="20px">
            <Shade>
              <Color color="#22a5f7" />
            </Shade>
            <Shade>
              <Color color="#4078e9" />
              <Color color="#56bce2" />
            </Shade>
            <Shade>
              <Color color="#456ee6" />
              <Color color="#22a4f7" />
              <Color color="#61c1dd" />
            </Shade>
            <Shade>
              <Color color="#5753dd" />
              <Color color="#348aef" />
              <Color color="#41b3ea" />
              <Color color="#81cfd1" />
            </Shade>
            <Shade>
              <Color color="#5d4bdb" />
              <Color color="#4078e9" />
              <Color color="#23a5f7" />
              <Color color="#56bce1" />
              <Color color="#8bd3cc" />
            </Shade>
            <Shade>
              <Color color="#6143d8" />
              <Color color="#486ae4" />
              <Color color="#2f91f1" />
              <Color color="#39afee" />
              <Color color="#65c2db" />
              <Color color="#92d7c9" />
            </Shade>
            <Shade>
              <Color color="#643fd7" />
              <Color color="#4e61e2" />
              <Color color="#3883ec" />
              <Color color="#23a5f7" />
              <Color color="#4ab7e7" />
              <Color color="#71c8d7" />
              <Color color="#98d9c7" />
            </Shade>
            <Shade>
              <Color color="#673bd6" />
              <Color color="#535ae0" />
              <Color color="#3f77e9" />
              <Color color="#2c96f2" />
              <Color color="#34adf0" />
              <Color color="#56bce1" />
              <Color color="#7accd4" />
              <Color color="#9ddbc6" />
            </Shade>
          </FlexLayout>
        </StackingLayout>
      </StackingLayout>
    );
  }

}
