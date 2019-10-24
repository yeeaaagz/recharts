Interactions: On Click for Popover.
```js
const CartesianGrid = require('../cartesian/CartesianGrid').default;
const isNull = require('lodash').isNull;
const Bar = require('../cartesian/Bar').default;
const XAxis = require('../cartesian/XAxis').default;
const YAxis = require('../cartesian/YAxis').default;
const Tooltip = require('../component/Tooltip').default;
const Legend = require('../component/Legend').default;
const Cell = require('../component/Cell').default;

import {
  BackIcon,
  Button,
  CloseIcon,
  Tooltip as RTooltip,
  ContainerLayout,
  FlexLayout,
  FlexItem,
  HeaderFooterLayout,
  Link,
  Paragraph,
  Popover,
  StackingLayout,
  ThemeManager,
  TextGroup,
  TextLabel,
  Title,
  VerticalSeparator
} from 'prism-reactjs';

const data = [
  {
    "name": "Mar",
    "value": 45000
  },
  {
    "name": "Apr",
    "value": 90000
  },
  {
    "name": "May",
    "value": 90000
  },
  {
    "name": "Jun",
    "value": 70000
  },
  {
    "name": "Jul",
    "value": 70000
  },
  {
    "name": "Aug",
    "value": 45000
  }
];

class Example extends React.Component {
  constructor(props) {
    this.state = {
      activePayload: null,
      pageView: null,
      popoverVisible: false,
      tooltipKeyCounter: 0,
      tooltipVisible: false,
      tooltipCoordinate: {x: 0, y: 0}
    };

    this.handleDetailsClick = this.handleDetailsClick.bind(this);
  }

  handleDetailsClick() {
    this.setState({
      pageView: null,
      popoverVisible: false,
      tooltipVisible: false
    });
  }

  renderTooltipContent() {
    let content = '';
    if (this.state.activePayload && this.state.activePayload[0] && this.state.activePayload[0].payload && this.state.activePayload[0].payload.value) {
      content = (
        <HeaderFooterLayout
          onClick={ (e) => { e.stopPropagation(); console.log('onClick - Popover') } }
          style={{width: '400px'}}
          itemSpacing="0px"
          header={
            <FlexLayout flexGrow="1" alignItems="center" justifyContent="space-between" padding="0px-20px">
              <FlexLayout itemSpacing="10px">
                <Title size="h3">{ this.state.activePayload[0].payload.name }</Title>
                <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
                  { this.state.activePayload[0].payload.value }
                </TextLabel>
              </FlexLayout>
                <CloseIcon onClick={ this.handleDetailsClick } color={ ThemeManager.getVar('gray-1')} />
            </FlexLayout>
          }
          footer={
            <FlexLayout flexGrow="1" justifyContent="flex-end" padding="0px-20px">
              <FlexItem>
                <Link onClick={ this.handleDetailsClick } type="forward">Show more</Link>
              </FlexItem>
            </FlexLayout>
          }
          bodyContent={
            <TextGroup>
              <Title size="h3">
                About the changes in { this.state.activePayload[0].payload.name }
              </Title>
              <Paragraph>
                There might be various factors contributing to this. This may not be a use case for simple bar charts. This ineteraction makes sense for stacked bar charts more.
              </Paragraph>
            </TextGroup>
          }
          bodyContentProps={ { padding: '20px' } }
          />
      );
    }

    return content;
  }

  render() {
    const cellWidth = this.state.cellWidth ? `${this.state.cellWidth}px` : '1px';

    return (
        <BarChart
          width={730}
          height={250}
          data={data}
          onClick={
            (e) => {
              this.setState((prevState) => {
                let payload = {
                  pageView: 'details',
                  popoverVisible: true,
                  tooltipVisible: true
                };

                if (e && !isNull(e.activeTooltipIndex)) {
                  payload.activeTooltipIndex = e.activeTooltipIndex;
                }

                // Cell width
                if (e && !isNull(e.activeCellData.width)) {
                  payload.cellWidth = e.activeCellData.width;
                }

                if (e && e.activePayload) {
                  payload.activePayload = e.activePayload;
                }

                let activeX = null;
                if (e && e.activeCoordinate && e.activeCoordinate.x) {
                  activeX = e.activeCoordinate.x;
                }

                let activeY = null;
                if (e && e.activeCoordinate && e.activeCoordinate.y) {
                  activeY = e.activeCoordinate.y;
                }

                if (!isNull(activeX) && !isNull(activeY)) {
                  payload.tooltipCoordinate = {
                    x: activeX,
                    y: 0
                  };
                }

                let prevX = null;
                if (prevState && prevState.tooltipCoordinate && prevState.tooltipCoordinate.x) {
                  prevX = prevState.tooltipCoordinate.x;
                }

                if (activeX && prevX && activeX !== prevX) {
                  payload.tooltipKeyCounter = prevState.tooltipKeyCounter + 1;
                  console.log('tooltipKeyCounter', activeX, payload.tooltipKeyCounter);
                }

                return payload;
              });
            }
          }
          onMouseMove={
            (e) => {
              if (!this.state.popoverVisible) {
                this.setState((prevState) => {
                  let payload = {};

                  if (e && !isNull(e.activeTooltipIndex)) {
                    payload.activeTooltipIndex = e.activeTooltipIndex;
                  }

                  if (e && e.activePayload) {
                    payload.activePayload = e.activePayload;
                  }

                  let activeX = null;
                  if (e && e.activeCoordinate && e.activeCoordinate.x) {
                    activeX = e.activeCoordinate.x;
                  }

                  let activeY = null;
                  if (e && e.activeCoordinate && e.activeCoordinate.y) {
                    activeY = e.activeCoordinate.y;
                  }

                  if (!isNull(activeX) && !isNull(activeY)) {
                    payload.tooltipCoordinate = {
                      x: activeX,
                      y: 0
                    };
                  }

                  let prevX = null;
                  if (prevState && prevState.tooltipCoordinate && prevState.tooltipCoordinate.x) {
                    prevX = prevState.tooltipCoordinate.x;
                  }

                  if (activeX && prevX && activeX !== prevX) {
                    payload.tooltipKeyCounter = prevState.tooltipKeyCounter + 1;
                    console.log('tooltipKeyCounter', activeX, payload.tooltipKeyCounter);
                  }

                  return payload;
                });
              }
            }
          }
        >
          <XAxis dataKey="name"  tickLine={false} />
          <YAxis
            tickFormatter={(value) => {
              if (value === 0) {
                return value;
              }
              return `${value / 1000}k`;
            }}
            tickLine={false}
            axisLine={false} />
            <Tooltip
              isAnimationActive={ false }
              coordinate={ this.state.tooltipCoordinate }
              placement="top-left"
              content={
                <div>
                  <Popover
                    key={ this.state.tooltipKeyCounter }
                    content={ this.renderTooltipContent() }
                    padding="0px"
                    popupPlacement="rightTop"
                    popupVisible={ this.state.popoverVisible }
                    theme="light"
                  >
                    <div style={{
                      width: cellWidth,
                      height: '1px'
                    }}/>
                  </Popover>
                </div>
              }
            />
          <Bar dataKey="value">
            {
              data.map((entry, index) => {
                return (
                  <Cell cursor="pointer" fill={ this.state.tooltipVisible && index !== this.state.activeTooltipIndex ? 'rgba(34, 165, 247, .5)' : ThemeManager.getVar('blue-1') } key={`cell-${index}`}/>
                );
              })
            }
          </Bar>
        </BarChart>
    );
  }
}

<Example />
```

Interactions: On Click. On click, change the context to show more details / meta data associated with the bar chart. The back link should take the user back to the bar chart. The interim state or clicked state should remove the hover background and reduce the opacity of the other bars to 20%.
```js
const CartesianGrid = require('../cartesian/CartesianGrid').default;
const isNull = require('lodash').isNull;
const Bar = require('../cartesian/Bar').default;
const XAxis = require('../cartesian/XAxis').default;
const YAxis = require('../cartesian/YAxis').default;
const Tooltip = require('../component/Tooltip').default;
const Legend = require('../component/Legend').default;
const Cell = require('../component/Cell').default;

import {
  BackIcon,
  Tooltip as RTooltip,
  ContainerLayout,
  FlexLayout,
  FlexItem,
  HeaderFooterLayout,
  Link,
  Paragraph,
  StackingLayout,
  ThemeManager,
  TextGroup,
  TextLabel,
  Title,
  VerticalSeparator
} from 'prism-reactjs';

const data = [
  {
    "name": "Mar",
    "value": 45000
  },
  {
    "name": "Apr",
    "value": 90000
  },
  {
    "name": "May",
    "value": 90000
  },
  {
    "name": "Jun",
    "value": 70000
  },
  {
    "name": "Jul",
    "value": 70000
  },
  {
    "name": "Aug",
    "value": 45000
  }
];

class Example extends React.Component {
  constructor(props) {
    this.state = {
      activePayload: null,
      pageView: null,
      tooltipKeyCounter: 0,
      tooltipVisible: false,
      tooltipCoordinate: {x: 0, y: 0}
    };

    this.handleDetailsClick = this.handleDetailsClick.bind(this);
  }

  handleDetailsClick() {
    this.setState({
      pageView: null,
      tooltipVisible: false
    });
  }

  renderFooter() {
    if (this.state.pageView === 'details') {
      return (
        <FlexLayout flexGrow="1" justifyContent="flex-end" padding="0px-20px">
          <FlexItem>
            <Link type="forward" onClick={ this.handleDetailsClick }>Show more</Link>
          </FlexItem>
        </FlexLayout>
      );
    }

    return <div />;
  }

  renderHeader() {
    if (this.state.pageView === 'details') {
      return (
        <FlexLayout alignItems="center" padding="0px-20px">
          <Link onClick={ this.handleDetailsClick }> <BackIcon /> </Link>
          <VerticalSeparator />
          <FlexLayout itemSpacing="10px">
            <Title size="h3">{ this.state.activePayload[0].payload.name }</Title>
            <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>{ this.state.activePayload[0].payload.value }</TextLabel>
          </FlexLayout>
        </FlexLayout>
      );
    }

    return <div />;
  }

  renderBody() {
    if (this.state.pageView === 'details') {
      return (
        <StackingLayout padding="20px">
          <TextGroup>
            <Title size="h3">About the cost in { this.state.activePayload[0].payload.name }</Title>
            <Paragraph>
              There might be various factors contributing to this. This may not be a use case for simple bar charts. This interaction makes sense for stack bar charts more.
            </Paragraph>
          </TextGroup>
        </StackingLayout>
      );
    }

    return this.renderChart();
  }

  renderChart() {
    return (
        <BarChart
          width={398}
          height={150}
          data={data}
          onClick={
            (e) => {
              this.setState({
                pageView: 'details',
                activePayload: e.activePayload
              });
            }
          }
          onMouseMove={
            (e) => {
              this.setState((prevState) => {
                let payload = {};

                if (e && !isNull(e.activeTooltipIndex)) {
                  payload.tooltipVisible = !isNull(e.activeTooltipIndex);
                }

                if (e && !isNull(e.activeTooltipIndex)) {
                  payload.activeTooltipIndex = e.activeTooltipIndex;
                }

                if (e && e.activePayload) {
                  payload.activePayload = e.activePayload;
                }

                let activeX = null;
                if (e && e.activeCoordinate && e.activeCoordinate.x) {
                  activeX = e.activeCoordinate.x;
                }

                let activeY = null;
                if (e && e.activeCoordinate && e.activeCoordinate.y) {
                  activeY = e.activeCoordinate.y;
                }

                if (!isNull(activeX) && !isNull(activeY)) {
                  payload.tooltipCoordinate = {
                    x: activeX,
                    y: 0
                  };
                }

                let prevX = null;
                if (prevState && prevState.tooltipCoordinate && prevState.tooltipCoordinate.x) {
                  prevX = prevState.tooltipCoordinate.x;
                }

                if (activeX && prevX && activeX !== prevX) {
                  payload.tooltipKeyCounter = prevState.tooltipKeyCounter + 1;
                }

                return payload;

              });
            }
          }
          onMouseLeave={
            (e) => {
              this.setState({
                tooltipVisible: false
              });
            }
          }
        >
          <XAxis dataKey="name" tickLine={false} />
          <YAxis
            tickFormatter={(value) => {
              if (value === 0) {
                return value;
              }

              return `${value / 1000}k`;
            }}
            tickLine={false}
            axisLine={false} />
          <Bar dataKey="value">
            {
              data.map((entry, index) => (
                <Cell cursor="pointer" fill={ this.state.tooltipVisible && index !== this.state.activeTooltipIndex ? 'rgba(34, 165, 247, .5)' : ThemeManager.getVar('blue-1') } key={`cell-${index}`}/>
              ))
            }
          </Bar>
        </BarChart>
    );
  }

  renderTooltipContent() {
    let content = '';
    if (this.state.activePayload && this.state.activePayload[0] && this.state.activePayload[0].payload && this.state.activePayload[0].payload.value) {
      content = this.state.activePayload[0].payload.value;
    }

    return content;
  }

  render() {
    return (
      <ContainerLayout style={{width: '400px', margin: '40px auto'}}backgroundColor="white" border={ true }>
        <HeaderFooterLayout
          itemSpacing="0px"
          header={ this.renderHeader() }
          footer={ this.renderFooter() }
          bodyContent={ this.renderBody() } />
      </ContainerLayout>
    );
  }
}

<Example />
```

Interactions: On Hover. On hover show tool tip at top of the (hover) bar that is highlighted.
```js
const CartesianGrid = require('../cartesian/CartesianGrid').default;
const isNull = require('lodash').isNull;
const Bar = require('../cartesian/Bar').default;
const XAxis = require('../cartesian/XAxis').default;
const YAxis = require('../cartesian/YAxis').default;
const Tooltip = require('../component/Tooltip').default;
const Legend = require('../component/Legend').default;
const ThemeManager = require('prism-reactjs').ThemeManager;

import { Tooltip as RTooltip } from 'prism-reactjs';

const data = [
  {
    "name": "Mar",
    "value": 45000
  },
  {
    "name": "Apr",
    "value": 90000
  },
  {
    "name": "May",
    "value": 90000
  },
  {
    "name": "Jun",
    "value": 70000
  },
  {
    "name": "Jul",
    "value": 70000
  },
  {
    "name": "Aug",
    "value": 45000
  }
];

class Example extends React.Component {
  constructor(props) {
    this.state = {
      activePayload: null,
      tooltipKeyCounter: 0,
      tooltipVisible: false,
      tooltipCoordinate: {x: 0, y: 0}
    };
  }

  renderTooltipContent() {
    let content = '';
    if (this.state.activePayload && this.state.activePayload[0] && this.state.activePayload[0].payload && this.state.activePayload[0].payload.value) {
      content = this.state.activePayload[0].payload.value;
    }

    return content;
  }

  render() {
    return (
        <BarChart
          width={730}
          height={250}
          data={data}
          onMouseMove={
            (e) => {
              this.setState((prevState) => {
                let payload = {
                  tooltipVisible: e.isTooltipActive
                }

                if (e && e.activePayload) {
                  payload.activePayload = e.activePayload;
                }

                let activeX = null;
                if (e && e.activeCoordinate && e.activeCoordinate.x) {
                  activeX = e.activeCoordinate.x;
                }

                let activeY = null;
                if (e && e.activeCoordinate && e.activeCoordinate.y) {
                  activeY = e.activeCoordinate.y;
                }

                if (!isNull(activeX) && !isNull(activeY)) {
                  payload.tooltipCoordinate = {
                    x: activeX,
                    y: 0
                  };
                }

                let prevX = null;
                if (prevState && prevState.tooltipCoordinate && prevState.tooltipCoordinate.x) {
                  prevX = prevState.tooltipCoordinate.x;
                }

                if (activeX && prevX && activeX !== prevX) {
                  payload.tooltipKeyCounter = prevState.tooltipKeyCounter + 1;
                  console.log('tooltipKeyCounter', activeX, payload.tooltipKeyCounter);
                }

                console.log('onMouseMove', payload, e);
                return payload;

              });
            }
          }
          onMouseLeave={
            (e) => {
              this.setState({
                tooltipVisible: false
              });
            }
          }
        >
          <XAxis dataKey="name"  tickLine={false} />
          <YAxis
            tickFormatter={(value) => {
              if (value === 0) {
                return value;
              }

              return `${value / 1000}k`;
            }}
            tickLine={false}
            axisLine={false} />
            <Tooltip
              isAnimationActive={ false }
              coordinate={ this.state.tooltipCoordinate }
              placement="center"
              content={
                <div>
                  <RTooltip
                    key={ this.state.tooltipKeyCounter }
                    content={ this.renderTooltipContent() }
                    popupVisible={ this.state.tooltipVisible }
                    theme="light"
                  >
                    <div style={{width: '1px', height: '1px'}}/>
                  </RTooltip>
                </div>
              }
            />
          <Bar dataKey="value" fill={ ThemeManager.getVar('blue-1') } />
        </BarChart>
    );
  }
}

<Example />
```

Basic
```js
const CartesianGrid = require('../cartesian/CartesianGrid').default;
const isNull = require('lodash').isNull;
const Bar = require('../cartesian/Bar').default;
const XAxis = require('../cartesian/XAxis').default;
const YAxis = require('../cartesian/YAxis').default;
const Legend = require('../component/Legend').default;
const ThemeManager = require('prism-reactjs').ThemeManager;

const data = [
  {
    "name": "Mar",
    "value": 45000
  },
  {
    "name": "Apr",
    "value": 90000
  },
  {
    "name": "May",
    "value": 90000
  },
  {
    "name": "Jun",
    "value": 70000
  },
  {
    "name": "Jul",
    "value": 70000
  },
  {
    "name": "Aug",
    "value": 45000
  }
];

class Example extends React.Component {
  render() {
    return (
      <BarChart
        width={730}
        height={250}
        data={data}
      >
        <XAxis dataKey="name"  tickLine={false} />
        <YAxis
          tickFormatter={(value) => {
            if (value === 0) {
              return value;
            }

            return `${value / 1000}k`;
          }}
          tickLine={false}
          axisLine={false} />
        <Bar dataKey="value" fill={ ThemeManager.getVar('blue-1') } />
      </BarChart>
    );
  }
}

<Example />
```

Vanilla BarChart
```js
const CartesianGrid = require('../cartesian/CartesianGrid').default;
const Bar = require('../cartesian/Bar').default;
const XAxis = require('../cartesian/XAxis').default;
const YAxis = require('../cartesian/YAxis').default;
const Tooltip = require('../component/Tooltip').default;
const Legend = require('../component/Legend').default;
const data = [
  {
    "name": "Page A",
    "uv": 4000,
    "pv": 2400,
    "amt": 2400
  },
  {
    "name": "Page B",
    "uv": 3000,
    "pv": 1398,
    "amt": 2210
  },
  {
    "name": "Page C",
    "uv": 2000,
    "pv": 9800,
    "amt": 2290
  },
  {
    "name": "Page D",
    "uv": 2780,
    "pv": 3908,
    "amt": 2000
  },
  {
    "name": "Page E",
    "uv": 1890,
    "pv": 4800,
    "amt": 2181
  },
  {
    "name": "Page F",
    "uv": 2390,
    "pv": 3800,
    "amt": 2500
  },
  {
    "name": "Page G",
    "uv": 3490,
    "pv": 4300,
    "amt": 2100
  }
];

<BarChart width={730} height={250} data={data}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <Legend />
  <Bar dataKey="pv" fill="#8884d8" />
  <Bar dataKey="uv" fill="#82ca9d" />
</BarChart>
```

syncId: SynchronizedAreaChart
```js
const Area = require('../cartesian/Area').default;
const AreaChart = require('./AreaChart').default;
const CartesianGrid = require('../cartesian/CartesianGrid').default;
const XAxis = require('../cartesian/XAxis').default;
const YAxis = require('../cartesian/YAxis').default;
const Tooltip = require('../component/Tooltip').default;
const data = [
  {
    name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
  },
  {
    name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
  },
  {
    name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
  },
  {
    name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
  },
  {
    name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
];


<div>
  <h4>A demo of synchronized AreaCharts</h4>
  <AreaChart
    width={500}
    height={200}
    data={data}
    syncId="anyId"
    margin={{
      top: 10, right: 30, left: 0, bottom: 0,
    }}
  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
  </AreaChart>
  <p>Maybe some other content</p>
  <AreaChart
    width={500}
    height={200}
    data={data}
    syncId="anyId"
    margin={{
      top: 10, right: 30, left: 0, bottom: 0,
    }}
  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Area type="monotone" dataKey="pv" stroke="#82ca9d" fill="#82ca9d" />
  </AreaChart>
</div>
```

data prop Format:
```jsx static
[{ name: 'a', value: 12 }]
[{ name: 'a', value: [5, 12] }]
```

margin prop Format:
```jsx static
{ top: 5, right: 5, bottom: 5, left: 5 }
```

barSize: TinyBarChart
```js
const Bar = require('../cartesian/Bar').default;
const data = [
  {
    name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
  },
  {
    name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
  },
  {
    name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
  },
  {
    name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
  },
  {
    name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
];

<BarChart width={150} height={40} data={data}>
  <Bar dataKey="uv" fill="#8884d8" />
</BarChart>
```

barSize: MixBarChart
```js
const CartesianGrid = require('../cartesian/CartesianGrid').default;
const XAxis = require('../cartesian/XAxis').default;
const YAxis = require('../cartesian/YAxis').default;
const Tooltip = require('../component/Tooltip').default;
const Legend = require('../component/Legend').default;
const Bar = require('../cartesian/Bar').default;
const data = [
  {
    name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
  },
  {
    name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
  },
  {
    name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
  },
  {
    name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
  },
  {
    name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
];

<BarChart
  width={500}
  height={300}
  data={data}
  margin={{
    top: 20, right: 30, left: 20, bottom: 5,
  }}
>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <Legend />
  <Bar dataKey="pv" stackId="a" fill="#8884d8" />
  <Bar dataKey="amt" stackId="a" fill="#82ca9d" />
  <Bar dataKey="uv" fill="#ffc658" />
</BarChart>
```