Centered with No Data and Missing Data Examples
```js
const Cell = require('../../component/Cell').default;
const Bar = require('../cartesian/Bar').default;
const Brush = require('../cartesian/Brush').default;
const XAxis = require('../../cartesian/XAxis').default;
const YAxis = require('../../cartesian/YAxis').default;
const Tooltip = require('../component/Tooltip').default;

import {
  Button,
  ContainerLayout,
  InputNumber,
  FlexLayout,
  RestartIcon,
  SuspendIcon,
  Slider,
  StackingLayout,
  TextLabel,
  Title,
  ThemeManager,
  Tooltip as RTooltip
} from 'prism-reactjs';

const data = [
  {
    "name": "Jan",
    "value": 45000
  },
  {
    "name": "Feb",
    "value": 90000
  },
  {
    "name": "Mar",
    "value": 0
  },
  {
    "name": "Apr",
    "value": 70000
  },
  {
    "name": "May",
    "value": 70000
  },
  {
    "name": "Jun",
    "value": 45000
  },
  {
    "name": "Jul",
    "value": 45000
  },
  {
    "name": "Aug",
    "value": 90000
  },
  {
    "name": "Sep",
    "value": 90000
  },
  {
    "name": "Oct"
  },
  {
    "name": "Nov",
    "value": 70000
  },
  {
    "name": "Dec",
    "value": 45000
  },
  {
    "name": "Jan",
    "value": 45000
  },
  {
    "name": "Feb",
    "value": 90000
  },
  {
    "name": "Mar",
    "value": 90000
  },
  {
    "name": "Apr",
    "value": 70000
  },
  {
    "name": "May",
    "value": 70000
  },
  {
    "name": "Jun",
    "value": 45000
  },
  {
    "name": "Jul",
    "value": 45000
  },
  {
    "name": "Aug",
    "value": 90000
  },
  {
    "name": "Sep",
    "value": 90000
  },
  {
    "name": "Oct",
    "value": 70000
  },
  {
    "name": "Nov",
    "value": 70000
  },
  {
    "name": "Dec",
    "value": 45000
  },
  {
    "name": "Jan",
    "value": 45000
  },
  {
    "name": "Feb",
    "value": 90000
  },
  {
    "name": "Mar",
    "value": 90000
  },
  {
    "name": "Apr",
    "value": 70000
  },
  {
    "name": "May",
    "value": 70000
  },
  {
    "name": "Jun",
    "value": 45000
  },
  {
    "name": "Jul",
    "value": 45000
  },
  {
    "name": "Aug",
    "value": 90000
  },
  {
    "name": "Sep",
    "value": 90000
  },
  {
    "name": "Oct",
    "value": 70000
  },
  {
    "name": "Nov",
    "value": 70000
  },
  {
    "name": "Dec",
    "value": 45000
  }
];

class Example extends React.Component {
  constructor(props) {
    // const startValue = 12;
    const startValue = 35;

    this.state = {
      autoPlay: false,
      autoPlayIntervalSpeed: 1000,
      data: data.slice(0, startValue),
      sliderVal: startValue
    };

    this.onChangeSlider = this.onChangeSlider.bind(this);
    this.onChangeAutoPlay = this.onChangeAutoPlay.bind(this);
    this.startTimeOut = this.startTimeOut.bind(this);
    this.handleOnInputNumberChange = this.handleOnInputNumberChange.bind(this);
  }

  startTimeOut() {
    setTimeout(() => {
      if (!this.state.autoPlay) {
        return;
      }
      this.setState((prevState) => {
        const newSlideVal = prevState.sliderVal >= data.length ? 1 : prevState.sliderVal + 1;

        return {
          data: data.slice(0, newSlideVal),
          sliderVal: newSlideVal
        };
      });
      this.startTimeOut();
    },
    this.state.autoPlayIntervalSpeed
    );
  }

  handleOnInputNumberChange(value) {
    this.setState({
      autoPlayIntervalSpeed: value
    });
  }

  onChangeSlider(value) {
    this.setState({
      data: data.slice(0, value),
      sliderVal: value
    });
  }

  onChangeAutoPlay(value) {
    this.setState((prevState) => {
      if (!prevState.autoPlay) {
        this.startTimeOut();
      }
      
      return {
        autoPlay: !prevState.autoPlay
      };
    });
  }

  renderAutoPlayBtn() {
    if (this.state.autoPlay) {
      return (
        <RTooltip content="Stop Auto Play Loop">
          <Button  onClick={ this.onChangeAutoPlay }type="destructive"><SuspendIcon /></Button>
        </RTooltip>
      );
    } 

    return (
      <RTooltip content="Auto Play Loop">
        <Button onClick={ this.onChangeAutoPlay }><RestartIcon /></Button>
      </RTooltip>
    );
  }

  renderNoData() {
    return (
      <ContainerLayout style={{width: '730px', height: '250px'}} backgroundColor="white" border={ true }>
        <FlexLayout style={{height: '100%'}} justifyContent="center" alignItems="center">
          <TextLabel style={{fontSize: '40px'}}>
            No Data
          </TextLabel>
        </FlexLayout>
      </ContainerLayout>
    );
  }

  renderBarChart() {
    const CandyBar = (props) => {
      const {     
        x: oX,
        y: oY,
        width: oWidth,
        height: oHeight,
        value,
        fill
      } = props;
      
      let x = oX;
      let y = oHeight < 0 ? oY + oHeight : oY;
      let width = oWidth;
      let height = Math.abs(oHeight);

      return (
        <rect 
          fill={ ThemeManager.getVar('light-gray-1') }
          mask='url(#mask-stripe)'
          x={x}
          y={ !value ? props.background.y : y}
          width={width}
          height={ !value ? props.background.height : height} />
        );
    };
       
    return (
      <BarChart
        alignment="center"
        width={730}
        height={250}
        data={ this.state.data}
      >
        <Tooltip content={ <div /> } />
        <pattern id="pattern-stripe" width="6" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
          <rect width="2" height="8" transform="translate(0,0)" fill="white" />
        </pattern>
        <mask id="mask-stripe">
          <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-stripe)" />
        </mask>
        <XAxis dataKey="name"  tickLine={false} minTickGap={ 2 } />
        <YAxis
          tickFormatter={(value) => {
            if (value === 0) {
              return value;
            }

            return `${value / 1000}k`;
          }}
          tickLine={false}
          axisLine={false} />
        <Bar errorShape={ CandyBar } dataKey="value">
          {
            data.map((entry, index) => { 
              return (
              <Cell key={`cell-${index}`} fill={ ThemeManager.getVar('blue-1') } />
            )})
          }
        </Bar>
        <Brush hideText={ true } dataKey="name" travellerWidth={ 0 } />
      </BarChart>
    );
  }

  render() {  
    const InputLabelSuffix = (
      <FlexLayout alignItems="center" itemSpacing="10px">
        <TextLabel style={ {
          borderLeft: '1px solid #b8bfca',
          padding: '5px 0px 5px 10px'
        } }>
          ms
        </TextLabel>
      </FlexLayout>
    );

    return (
      <StackingLayout>
        { this.state.sliderVal === 0 ? this.renderNoData() : this.renderBarChart() }
        <Title size="h3">Data points</Title>
        <Slider 
          min={ 0 } 
          max={ data.length } 
          value={ this.state.sliderVal }
          onChange={ this.onChangeSlider } 
          step={ 1 }
        />
        <StackingLayout itemSpacing="0px">
          <TextLabel size={ TextLabel.TEXT_LABEL_SIZE.SMALL } type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
          Autoplay and Interval Speed
          </TextLabel>
          <FlexLayout alignItems="center">
            { this.renderAutoPlayBtn() }
            <InputNumber
              style={ { width: 80 } }
              step={ 1 } 
              onValueChange={ this.handleOnInputNumberChange } 
              value={ this.state.autoPlayIntervalSpeed }
              suffix={ InputLabelSuffix }
          />
          </FlexLayout>
          </StackingLayout>
      </StackingLayout>
    );
  }
}

<Example />
```

Horizontal
```js
const CartesianGrid = require('../cartesian/CartesianGrid').default;
const isNull = require('lodash').isNull;
const Bar = require('../cartesian/Bar').default;
const XAxis = require('../../cartesian/XAxis').default;
const YAxis = require('../../cartesian/YAxis').default;
const Legend = require('../../component/Legend').default;
const ThemeManager = require('prism-reactjs').ThemeManager;

const data = [
  {
    "name": "March",
    "marValue": 45000
  },
  {
    "name": "April",
    "aprValue": 90000
  },
  {
    "name": "May",
    "mayValue": 90000
  },
  {
    "name": "June",
    "junValue": 70000
  },
  {
    "name": "July",
    "julValue": 70000
  },
  {
    "name": "August",
    "augValue": 45000
  }
];

class Example extends React.Component {

  getBarFillColor(bar) {
    switch(bar) {
      case 'marValue':
        return ThemeManager.getVar('linear-6-1-color');
      case 'aprValue':
        return ThemeManager.getVar('linear-6-2-color');
      case 'mayValue':
        return ThemeManager.getVar('linear-6-3-color');
      case 'junValue':
        return ThemeManager.getVar('linear-6-4-color');
      case 'julValue':
        return ThemeManager.getVar('linear-6-5-color');
      case 'augValue':
        return ThemeManager.getVar('linear-6-6-color');
    }
  }

  renderBars() {
    const bars = ['marValue', 'aprValue', 'mayValue', 'junValue', 'julValue', 'augValue'];

    return bars.map(bar => { 
      return (
        <Bar 
          stackId="a" 
          dataKey={ bar } 
          fill={ this.getBarFillColor(bar) }
        />
      );
    });
  }

  render() {
    return (
      <BarChart layout="vertical"
        width={730}
        height={250}
        data={data}
      >
          <XAxis 
            type="number"
            tickFormatter={(value) => {
              if (value === 0) {
                return value;
              }

              return `${value / 1000}k`;
            }}
            tickLine={false}
          />
          <YAxis 
            dataKey="name" 
            type="category"
            axisLine={ false } 
            tickLine={false} 
          />
        { this.renderBars() }
      </BarChart>
    );
  }
}

<Example />
```

Brushing
```js
const CartesianGrid = require('../cartesian/CartesianGrid').default;
const Brush = require('../cartesian/Brush').default;
const Cell = require('../../component/Cell').default;
const isNull = require('lodash').isNull;
const map = require('lodash').map;
const isEmpty = require('lodash').isEmpty;
const Bar = require('../cartesian/Bar').default;
const ResponsiveContainer = require('../../component/ResponsiveContainer').default;
const XAxis = require('../../cartesian/XAxis').default;
const YAxis = require('../../cartesian/YAxis').default;
const Tooltip = require('../component/Tooltip').default;
const Legend = require('../../component/Legend').default;

import {
  Badge,
  Checkbox,
  CloseIcon,
  ContainerLayout,
  DotIcon,
  FlexItem,
  FlexLayout,
  HeaderFooterLayout,
  Link,
  Paragraph,
  Popover,
  Separator,
  StackingLayout,
  SystemSelect,
  ThemeManager,
  TextGroup,
  TextLabel,
  Title,
  Tooltip as RTooltip
} from 'prism-reactjs';


function getItemName(count) {
  let month;
  let day;
  if (count < 32) {
    month = 'Jul';
    day = count;
  } else if (count < 64) {
    month = 'Aug';
    day = count - 31;
    } else if (count < 96) {
    month = 'Sep';
    day = count - 63;
  }

  return `${month}'${day}`;
}

function generateData() {
  let dataLength = 0;
  const count = 4;

  const data = [
    {
      name: "Jul'12",
      cat1: 50,
      cat2: 10,
      cat3: 0,
    },
    {
      name: "Jul'13",
      cat1: 30,
      cat2: 30,
      cat3: 0,
    },
    {
      name: "Jul'14",
      cat1: 18,
      cat2: 35,
      cat3: 45,
    },
    {
      name: "Jul'15",
      cat1: 0,
      cat2: 60,
      cat3: 0,
    },
    {
      name: "Jul'16",
      cat1: 30,
      cat2: 0,
      cat3: 0,
    },
    {
      name: "Jul'17",
      cat1: 30,
      cat2: 0,
      cat3: 30,
    },
    {
      name: "Jul'18",
      cat1: 25,
      cat2: 10,
      cat3: 40,
    },
    {
      name: "Jul'19",
      cat1: 0,
      cat2: 0,
      cat3: 60,
    },
    {
      name: "Jul'20",
      cat1: 0,
      cat2: 50,
      cat3: 0,
    },
    {
      name: "Jul'21",
      cat1: 10,
      cat2: 50,
      cat3: 0,
    },
    {
      name: "Jul'22",
      cat1: 10,
      cat2: 40,
      cat3: 20,
    },
    {
      name: "Jul'23",
      cat1: 0,
      cat2: 10,
      cat3: 40,
    },
    {
      name: "Jul'24",
      cat1: 10,
      cat2: 0,
      cat3: 0,
    },
    {
      name: "Jul'25",
      cat1: 30,
      cat2: 30,
      cat3: 0,
    },
    {
      name: "Jul'26",
      cat1: 18,
      cat2: 35,
      cat3: 45,
    },
    {
      name: "Jul'27",
      cat1: 0,
      cat2: 0,
      cat3: 60,
    },
    {
      name: "Jul'28",
      cat1: 10,
      cat2: 10,
      cat3: 10,
    },
    {
      name: "Jul'29",
      cat1: 5,
      cat2: 10,
      cat3: 30
    }
  ];

  let consolidatedData = [];
  for (var i = 0; i < count; i++) {
    mappedData = [];
    _.each(data, (item) => {
      dataLength++;
      mappedData.push({...item, name: getItemName(dataLength)});
    });
    consolidatedData = [...consolidatedData, ...mappedData];
  }

  return consolidatedData;
}

const menuItems =
[
  {
    label: 'None',
    value: 1
  },
  {
    label: 'Last 24 Hours',
    value: 2
  },
  {
    label: 'Last 48 Hours',
    value: 3
  }
];

const catColors = {
  category: {
    cat1: {
      default: ThemeManager.getVar('green-1'),
      hover: ThemeManager.getVar('dark-green-3'),
      pressed: ThemeManager.getVar('dark-green-2'),
      fade: 'rgba(54, 208, 104, .5)',
      badge: 'green'
    },
    cat2: {
      default: ThemeManager.getVar('yellow-1'),
      hover: ThemeManager.getVar('dark-yellow-3'),
      pressed: ThemeManager.getVar('dark-yellow-2'),
      fade: 'rgba(255, 188, 11, .5)',
      badge: 'yellow'
    },
    cat3: {
      default: ThemeManager.getVar('red-1'),
      hover: ThemeManager.getVar('dark-red-3'),
      pressed: ThemeManager.getVar('dark-red-2'),
      fade: 'rgba(245, 86, 86, .5)',
      badge: 'red'
    }
  },
  sequential: {
    cat1: {
      default: '#33d6cb',
      hover: '#2ec1b7',
      pressed: '#29aba2',
      fade: 'rgba(51, 214, 203, .5)',
      badge: 'diagram-aqua'
    },
    cat2: {
      default: '#22a5f7',
      hover: '#1f95de',
      pressed: '#1b84c6',
      fade: 'rgba(34, 165, 247, .5)',
      badge: 'blue'
    },
    cat3: {
      default: '#8a77ed',
      hover: '#7c6bd5',
      pressed: '#6e5fbe',
      fade: 'rgba(138, 119, 237, .5)',
      badge: 'diagram-purple'
    }
  }
};



class Example extends React.Component {
  constructor(props) {
    this.state = {
      activePayload: null,
      tipType: null,
      tooltipKeyCounter: 0,
      tooltipVisible: false,
      tooltipCoordinate: {x: 0, y: 0}
    };

    this.handleCheckboxToggle = this.handleCheckboxToggle.bind(this);
    this.handleDetailsClick = this.handleDetailsClick.bind(this);
    this.handleBarMouseDown = this.handleBarMouseDown.bind(this);
    this.handleBarMouseUp = this.handleBarMouseUp.bind(this);
  }

  handleBarMouseDown() {
    this.setState({
      barMouseDown: true
    });
  }

  handleBarMouseUp() {
    this.setState({
      barMouseDown: false
    });
  }

  handleDetailsClick() {
    this.setState({
      tipType: 'tooltip',
      popoverVisible: false,
      tooltipVisible: false
    });
  }

  handleCheckboxToggle() {
    this.setState((prevState) => {
      return {
        sequentialColors: !prevState.sequentialColors
      };
    });
  }

  isPopoverActive() {
    return this.state.tipType === 'popover';
  }

  getCatColor(id, type) {
    cat = this.state.sequentialColors ? 'sequential' : 'category';   
    return catColors[cat][id][type];
  }

  getCellWidth(data) {
    let width = null;
    _.each(data, (cell) => {
      if (cell.width) {
        width = cell.width;
      }
    });

    return width;
  }

  getTooltipPayload(e, prevState) {
    let payload = {
      tooltipVisible: e && e.isTooltipActive || e && !!(e.activeTooltipIndex > -1)
    }

    if (e && !isNull(e.activeTooltipIndex)) {
      payload.activeTooltipIndex = e.activeTooltipIndex;
    }

    if (e && e.activeLabel) {
      payload.activeLabel = e.activeLabel;
    }

    if (e && e.activePayload) {
      payload.activePayload = e.activePayload;
    }

    // Cell width
    if (e && e.activeCellData && !isNull(this.getCellWidth(e.activeCellData))) {
      payload.cellWidth = this.getCellWidth(e.activeCellData);
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
  }

  renderTooltipCats(payloads) {
    return payloads.map(payload => { 
      return (
        <FlexLayout justifyContent="space-between">
          <Badge
            color={ this.getCatColor(payload.dataKey, 'badge') }
            text={ payload.name }
            textType="secondary" />
          <TextLabel
            type={ TextLabel.TEXT_LABEL_TYPE.PRIMARY }
            size={TextLabel.TEXT_LABEL_SIZE.SMALL}
          >
            { `${payload.value}%` }
          </TextLabel>
        </FlexLayout>
      );
    });
  }

  renderTooltipContent() {
    let content = '';
    if (this.state.activePayload && this.state.activePayload[0] && this.state.activePayload[0].payload && !isEmpty(this.state.activePayload[0].payload)) {
      const totalVal = this.state.activePayload[0].payload.cat1 + this.state.activePayload[0].payload.cat2 + this.state.activePayload[0].payload.cat3;
      content = (
        <StackingLayout itemSpacing="15px" style={{width: '100px'}}>
        <FlexLayout justifyContent="space-between">
        <TextLabel
          type={ TextLabel.TEXT_LABEL_TYPE.PRIMARY }
          size={TextLabel.TEXT_LABEL_SIZE.SMALL}
        >
          Total
        </TextLabel>
        <TextLabel
          type={ TextLabel.TEXT_LABEL_TYPE.PRIMARY }
          size={TextLabel.TEXT_LABEL_SIZE.SMALL}
        >
          { `${ totalVal }%` }
          </TextLabel>
        </FlexLayout>
        { this.renderTooltipCats(this.state.activePayload) }
        </StackingLayout>
      );
    }

    return content;
  }

  renderPopoverContent() {
    let content = '';
    if (this.state.activePayload && this.state.activePayload[0] && this.state.activePayload) {
      const payload = this.state.activePayload;
      const payloadName = payload[0].payload.name;
      const payloadTotal = `${payload[0].payload.cat1 + payload[0].payload.cat2 + payload[0].payload.cat3}%`;
      content = (
        <HeaderFooterLayout
          onClick={ (e) => { e.stopPropagation(); } }
          style={{width: '400px'}}
          itemSpacing="0px"
          header={
            <FlexLayout flexGrow="1" alignItems="center" justifyContent="space-between" padding="0px-20px">
              <FlexLayout itemSpacing="10px">
                <Title size="h3">{ payloadName }</Title>
                <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
                  { payloadTotal }
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
                About the changes in { payloadName }
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

  renderTooltipCursor() {
    const { cellWidth } = this.state;
    const width = cellWidth ? `${cellWidth}px` : '1px';

    return (
      <div style={{width: width, height: '1px'}}/>
    );
  }

  renderPopover() {
    return (
      <Popover
        key={ this.state.tooltipKeyCounter }
        content={ this.renderPopoverContent() }
        padding="0px"
        popupPlacement="rightTop"
        popupVisible={ this.state.tooltipVisible }
        theme="light"
      >
        { this.renderTooltipCursor() }
      </Popover>
    );
  }

  renderTooltip() {
    return (
      <RTooltip
        key={ this.state.tooltipKeyCounter }
        content={ this.renderTooltipContent() }
        popupVisible={ this.state.tooltipVisible }
        theme="light"
      >
        { this.renderTooltipCursor() }
      </RTooltip>
    );
  }

  renderTip() {
    const { tipType } = this.state;

    return (
      <Tooltip
        isAnimationActive={ false }
        coordinate={ this.state.tooltipCoordinate }
        cursor={ tipType !== 'popover' }
        placement={ tipType === 'popover' ? 'top-right' : 'center' }
        content={
          <div>
            { tipType === 'popover' ? this.renderPopover() : this.renderTooltip() }
          </div>
        }
      />
    );
  }

  getBarTransitionState(bar, index) {
    const { barMouseDown, popoverVisible, activeTooltipIndex, tooltipVisible, tooltipAnimation } = this.state;
    const transition = {
      transition: 'all 0.3s ease'
    };

    // Popover mode active
    if (popoverVisible) {
      // Inactive
      if (index !== activeTooltipIndex) {
        return transition;
      // Active
      } else {
        return transition;
      }
    // Default mode
    } else {
      // Down
      if (barMouseDown && index === activeTooltipIndex) {
        return {};
      // Hover
      } else if (index === activeTooltipIndex || (tooltipVisible && !tooltipAnimation)) {
        return {};
      // Default
      } else {
        return transition;
      }
    }
  }

  getBarFillColor(bar, index) {
    const { barMouseDown, popoverVisible, activeTooltipIndex } = this.state;
    // Popover mode active
    if (popoverVisible) {
      // Inactive
      if (index !== activeTooltipIndex) {
        return this.getCatColor(bar, 'fade');
      // Active
      } else {
        return this.getCatColor(bar, 'default');
      }
    // Default mode
    } else {
      // Down
      if (barMouseDown && index === activeTooltipIndex) {
        return this.getCatColor(bar, 'pressed');
      // Hover
      } else if (index === activeTooltipIndex) {
        return this.getCatColor(bar, 'hover');
      // Default
      } else {
        return this.getCatColor(bar, 'default');
      }
    }
  }

  renderBars() {
    const cursor = this.state.tipType === 'popover' ? 'default' : 'pointer';
    const bars = ['cat1', 'cat2', 'cat3'];

    return bars.map(bar => { 
      return (
        <Bar 
          stackId="a" 
          dataKey={ bar } 
          onMouseDown={ this.handleBarMouseDown }
          onMouseUp={ this.handleBarMouseUp }
          isAnimationActive={ false }
        >
          {
            this.props.data.map((entry, index) => {
              // Each bar contains a cell per data point
              return (
                <Cell
                  style={ this.getBarTransitionState(bar, index) }
                  cursor={ cursor }
                  fill={ this.getBarFillColor(bar, index) }
                  key={`cell-${index}`} />
              );
            })
          }
        </Bar>
      );
    });
  }

  renderBarChart() {
    return (
      <StackingLayout style={{width: '100%'}}>
        <FlexLayout alignItems="center" justifyContent="space-between">
          <TextLabel type={ TextLabel.TEXT_LABEL_TYPE.SECONDARY }>Year: 2019</TextLabel>
          <Separator separator={ <DotIcon /> } spacing="spacing-10px">
            <TextLabel type={ TextLabel.TEXT_LABEL_TYPE.SECONDARY }>High: 98%</TextLabel>
            <TextLabel type={ TextLabel.TEXT_LABEL_TYPE.SECONDARY }>Avg: 45%</TextLabel>
            <TextLabel type={ TextLabel.TEXT_LABEL_TYPE.SECONDARY }>Low: 10%</TextLabel>
          </Separator>
        </FlexLayout>
        <StackingLayout>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart
              data={ this.props.data }
              onClick={
                (e) => {
                  if (e) {
                     this.setState((prevState) => {
                      let payload = this.getTooltipPayload(e, prevState);
                      // If popover is active, then dismiss
                      if (prevState.tipType === 'popover') {
                        payload.tipType = 'tooltip';
                        payload.pageView = null;
                        payload.popoverVisible = false;
                        payload.tooltipAnimation = true;
                      } else {
                        payload.tipType = 'popover';
                        payload.popoverVisible = true;
                      }

                      setTimeout(() => {
                        this.setState({
                          tooltipAnimation: false
                        });
                      }, 300);
                      return payload;
                    });
                  }
                }
              }
              onMouseMove={
                (e) => {
                    if (!this.isPopoverActive()) {
                    this.setState((prevState) => {
                      return this.getTooltipPayload(e, prevState);
                    });
                  }
                }
              }
              onMouseLeave={
                (e) => {
                  if (!this.isPopoverActive()) {
                    this.setState((prevState) => {
                      return {
                        tooltipVisible: false
                      };
                    });
                  }
                }
              }
            >
              <CartesianGrid vertical={false} />
              <XAxis
                activeLabel={ this.state.activeLabel }
                dataKey="name"
                interval={0}
                tickLine={false} />
              <YAxis
                width={40}
                tickCount={11}
                tickFormatter={(value) => {
                  return `${value}%`;
                }}
                tickLine={false}
                axisLine={false} />
              { this.renderTip() }
              { this.renderBars() }
              <Brush hideText={ true } dataKey="name" endIndex={ 20 } travellerWidth={ 0 } />
            </BarChart>
          </ResponsiveContainer>
        </StackingLayout>
      </StackingLayout>
    );
  }

  render() {
    return (
      <StackingLayout>
        <ContainerLayout backgroundColor="white" border={ true }>
          <HeaderFooterLayout

            header={
              <FlexLayout justifyContent="space-between" alignItems="center" flexGrow="1" padding="0px-20px">
                <Title size="h3">Metric Name</Title>
                <SystemSelect selectedValue={ 2 } selectOptions={ menuItems }
                  placeholder="Select category..." type="mini"
                />
              </FlexLayout>
            }
            footer={ <div /> }
            bodyContentProps={ {
              padding: '20px'
            } }
            bodyContent={ this.renderBarChart() }
          />
        </ContainerLayout>
        <Checkbox 
          id="toggle_checked" 
          type="toggle" 
          label="Toggle Sequential Colors"
          checked={ this.state.sequentialColors }
          onChange={ this.handleCheckboxToggle }
        />
      </StackingLayout>
    );
  }
}

<Example data={ generateData() } />
```

Dashboard Presentation
```js
const CartesianGrid = require('../cartesian/CartesianGrid').default;
const isNull = require('lodash').isNull;
const Bar = require('../cartesian/Bar').default;
const XAxis = require('../../cartesian/XAxis').default;
const YAxis = require('../../cartesian/YAxis').default;
const Tooltip = require('../component/Tooltip').default;
const Legend = require('../../component/Legend').default;
const Cell = require('../../component/Cell').default;
const ResponsiveContainer = require('../../component/ResponsiveContainer').default;

import {
  Badge,
  Checkbox,
  CloseIcon,
  ContainerLayout,
  Dashboard,
  DashboardWidgetHeader,
  DashboardWidgetLayout,
  DotIcon,
  FlexItem,
  FlexLayout,
  HeaderFooterLayout,
  Link,
  Paragraph,
  PlusIcon,
  Popover,
  Separator,
  StackingLayout,
  SystemSelect,
  ThemeManager,
  TextGroup,
  TextLabel,
  Title,
  Tooltip as RTooltip
} from 'prism-reactjs';

const pros = {
  layouts: {
    sm: [
      {
        i: 'box1'
      },
      {
        i: 'box2'
      },
      {
        i: 'box3'
      },
      {
        i: 'box4'
      }
    ]
  }
};

const defaultSelectProps = {
  selectOptions: [
    {
      label: 'This Week',
      value: '0'
    },
    {
      label: 'This Month',
      value: '1'
    }
  ],
  type: 'mini',
  selectedValue: '0'
};

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

const paginationProps = {
  total: 50,
  currentPage: 1,
  pageSize: 10,
  showOnlyPage: true
};

const linkProps = {
  type: 'with-icon',
  icon: <PlusIcon size="small" />,
  children: 'Create'
};

const alertCount = (
  <FlexLayout>
    <Badge color="red" text="20" />
    <Badge color="yellow" text="5" />
    <Badge color="gray" text="0" />
  </FlexLayout>
);

class DashboardChart extends React.Component {
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
    const { color, fadeColor } = this.props;
    return (
       <ResponsiveContainer width="100%" height={200}>
          <BarChart
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
              width={40}
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
                  <Cell cursor="pointer" fill={ this.state.tooltipVisible && index !== this.state.activeTooltipIndex ? fadeColor : color } key={`cell-${index}`}/>
                ))
              }
            </Bar>
          </BarChart>
        </ResponsiveContainer>
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
    return this.renderChart();
  }
}

class Example extends React.Component {
  constructor(props) {
    this.state = {
      activePayload: null,
      pageView: null,
      tooltipKeyCounter: 0,
      tooltipVisible: false,
      tooltipCoordinate: {x: 0, y: 0}
    };
  }

  renderChart() {
    return (
      <FlexLayout flexGrow="1" alignItems="center" and justifyContent="center" style={{ margin: '20px 20px 0 20px'}}>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart
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
              width={40}
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
        </ResponsiveContainer>
      </FlexLayout>
    );
  }

  render() {
    return (
      <Dashboard { ...pros }>
        <div key="box1">
          <DashboardWidgetLayout
            header={
              <DashboardWidgetHeader
                title="Extra info example"
                showCloseIcon={ false }
                supplementaryInfo="Supplementary info"
              />
            }
            bodyContent={ 
              <FlexLayout flexGrow="1" alignItems="center" and justifyContent="center" style={{ margin: '20px 20px 0 20px'}}>
                <DashboardChart color={ ThemeManager.getVar('blue-1') } fadeColor='rgba(34, 165, 247, .5)' />
              </FlexLayout>
            }
          />
        </div>
        <div key="box2">
          <DashboardWidgetLayout
            header={
              <DashboardWidgetHeader
                title="SystemSelect example"
                showCloseIcon={ false }
                defaultSelectProps={ defaultSelectProps }
              />
            }
            bodyContent={ 
              <FlexLayout flexGrow="1" alignItems="center" and justifyContent="center" style={{ margin: '20px 20px 0 20px'}}>
                <DashboardChart color='#8a77ed' fadeColor='rgba(138, 119, 237, .6)' />
              </FlexLayout>
            }
          />
        </div>
        <div key="box3">
          <DashboardWidgetLayout
            header={
              <DashboardWidgetHeader
                title="Pagination example"
                showCloseIcon={ false }
                paginationProps={ paginationProps }
              />
            }
            bodyContent={ 
              <FlexLayout flexGrow="1" alignItems="center" and justifyContent="center" style={{ margin: '20px 20px 0 20px'}}>
                <DashboardChart color='#36d068' fadeColor='rgba(54, 208, 104, .5)' />
              </FlexLayout>
            }
          />
        </div>
        <div key="box4">
          <DashboardWidgetLayout
            header={
              <DashboardWidgetHeader
                title="Action example"
                linkProps={ linkProps }
                showCloseIcon={ false }
              />
            }
            bodyContent={ 
              <FlexLayout flexGrow="1" alignItems="center" and justifyContent="center" style={{ margin: '20px 20px 0 20px'}}>
                <DashboardChart color='#ffbc0b' fadeColor='rgba(255, 188, 11, .5)' />
              </FlexLayout>
            }
          />
        </div>
      </Dashboard>
    );
  }
}

<Example />
```

Grouped Bar Chart
```js
const CartesianGrid = require('../cartesian/CartesianGrid').default;
const isNull = require('lodash').isNull;
const isEmpty = require('lodash').isEmpty;
const Bar = require('../cartesian/Bar').default;
const ResponsiveContainer = require('../../component/ResponsiveContainer').default;
const XAxis = require('../../cartesian/XAxis').default;
const YAxis = require('../../cartesian/YAxis').default;
const Tooltip = require('../component/Tooltip').default;
const Legend = require('../../component/Legend').default;

import {
  Badge,
  Checkbox,
  CloseIcon,
  ContainerLayout,
  DotIcon,
  FlexItem,
  FlexLayout,
  HeaderFooterLayout,
  Link,
  Paragraph,
  Popover,
  Separator,
  StackingLayout,
  SystemSelect,
  ThemeManager,
  TextGroup,
  TextLabel,
  Title,
  Tooltip as RTooltip
} from 'prism-reactjs';

const data = [
  {
    name: "Q1",
    cat1: 30000,
    cat2: 60000,
    cat3: 0,
  },
  {
    name: "Q2",
    cat1: 25000,
    cat2: 60000,
    cat3: 90000,
  },
  {
    name: "Q3",
    cat1: 20000,
    cat2: 60000,
    cat3: 30000,
  },
  {
    name: "Q4",
    cat1: 30000,
    cat2: 10000,
    cat3: 20000,
  }
];

const menuItems =
[
  {
    label: 'None',
    value: 1
  },
  {
    label: 'Last 24 Hours',
    value: 2
  },
  {
    label: 'Last 48 Hours',
    value: 3
  }
];

class Example extends React.Component {
  constructor(props) {
    this.state = {
      activePayload: null,
      showCat1: true,
      showCat2: true,
      showCat3: true,
      tooltipKeyCounter: 0,
      tooltipVisible: false,
      tooltipCoordinate: {x: 0, y: 0}
    };

    this.handleCheckboxOnChange = this.handleCheckboxOnChange.bind(this);

  }

  handleCheckboxOnChange(e, id) {
    this.setState((prevState) => {
        const payload = {};

        switch(id) {
          case 'cat1':
          payload.showCat1 = !prevState.showCat1;
            break;
          case 'cat2':
            payload.showCat2 = !prevState.showCat2;
            break;
          case 'cat3':
            payload.showCat3 = !prevState.showCat3;
            break;
        }

        return payload;
      });
  }

  getTooltipPayload(e, prevState) {
    let payload = {
      tooltipVisible: e.isTooltipActive || !!(e.activeTooltipIndex > -1)
    }

    if (e && !isNull(e.activeTooltipIndex)) {
      payload.activeTooltipIndex = e.activeTooltipIndex;
    }

    if (e && e.activePayload) {
      payload.activePayload = e.activePayload;
    }

    // Cell width
    if (e && e.activeCellData && !isNull(e.activeCellData.width)) {
      payload.cellWidth = e.activeCellData.width;
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
  }

  renderLegend() {
    return (
      <FlexLayout justifyContent="center" flexGrow="1">
        <Checkbox 
          checked={ this.state.showCat1 }
          color={ ThemeManager.getVar('green-1') }
          id="cat1"
          label="cat1"
          onChange={ (e) => { this.handleCheckboxOnChange(e, 'cat1') } }
        />
        <Checkbox 
          checked={ this.state.showCat2 }
          color={ ThemeManager.getVar('yellow-1') }
          id="cat2"
          label="cat2"
          onChange={ (e) => { this.handleCheckboxOnChange(e, 'cat2') } }
        />
        <Checkbox 
          checked={ this.state.showCat3 }
          color={ ThemeManager.getVar('red-1') }
          id="cat3"
          label="cat3"
          onChange={ (e) => { this.handleCheckboxOnChange(e, 'cat3') } }
        />
      </FlexLayout>
    );
  }

  renderTooltipCats(payloads) {
    return payloads.map(payload => { 

      let color;
      switch(payload.fill) {
        case '#36d068':
          color = 'green';
          break;
        case '#ffbc0b':
          color = 'yellow';
          break;
        case '#f55656':
          color = 'red';
          break;
      }

      return (
        <FlexLayout justifyContent="space-between">
          <Badge
            color={ color }
            text={ payload.name }
            textType="secondary" />
          <TextLabel
            type={ TextLabel.TEXT_LABEL_TYPE.PRIMARY }
            size={TextLabel.TEXT_LABEL_SIZE.SMALL}
          >
            { payload.value }
          </TextLabel>
        </FlexLayout>
      );
    });
  }

  renderTooltipContent() {
    let content = '';
    if (this.state.activePayload && this.state.activePayload[0] && this.state.activePayload[0].payload && !isEmpty(this.state.activePayload[0].payload)) {
      const totalVal = this.state.activePayload[0].payload.cat1 + this.state.activePayload[0].payload.cat2 + this.state.activePayload[0].payload.cat3;
      content = (
        <StackingLayout itemSpacing="15px" style={{width: '100px'}}>
        <FlexLayout justifyContent="space-between">
        <TextLabel
          type={ TextLabel.TEXT_LABEL_TYPE.PRIMARY }
          size={TextLabel.TEXT_LABEL_SIZE.SMALL}
        >
          Total
        </TextLabel>
        <TextLabel
          type={ TextLabel.TEXT_LABEL_TYPE.PRIMARY }
          size={TextLabel.TEXT_LABEL_SIZE.SMALL}
        >
          { totalVal }
          </TextLabel>
        </FlexLayout>
        { this.renderTooltipCats(this.state.activePayload) }
        </StackingLayout>
      );
    }

    return content;
  }

  renderTooltipCursor() {
    const cellWidth = this.state.cellWidth ? `${this.state.cellWidth}px` : '1px';

    return (
      <div style={{width: cellWidth, height: '1px'}}/>
    );
  }

  renderTooltip() {
    return (
      <RTooltip
        key={ this.state.tooltipKeyCounter }
        content={ this.renderTooltipContent() }
        popupVisible={ this.state.tooltipVisible }
        theme="light"
      >
        { this.renderTooltipCursor() }
      </RTooltip>
    );
  }

  renderTip() {
    const { tipType } = this.state;

    return (
      <Tooltip
        isAnimationActive={ false }
        coordinate={ this.state.tooltipCoordinate }
        placement="center"
        content={
          <div>
            {  this.renderTooltip() }
          </div>
        }
      />
    );
  }


  renderBarChart() {
    return (
      <StackingLayout style={{width: '100%', padding: '20px 20px 0 20px'}}>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart 
            data={data} 
              onMouseMove={
                (e) => {
                  this.setState((prevState) => {
                    return this.getTooltipPayload(e, prevState);
                  });
                }
              }
              onMouseLeave={
                (e) => {
                  this.setState((prevState) => {
                    return {
                      tooltipVisible: false
                    };
                  });
                }
              }
            >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              interval={0}
              tickLine={false} />
            <YAxis
              domain={[0, 100000]}
              width={40}
              tickCount={3}
              tickFormatter={(value) => {
                if (value === 0) {
                  return value;
                }

                return `${value / 1000}k`;
              }}
              tickLine={false}
              axisLine={false} />
            { this.renderTip() }
            <Bar hide={ !this.state.showCat1 } dataKey="cat1" fill={ ThemeManager.getVar('green-1') } />
            <Bar hide={ !this.state.showCat2 } dataKey="cat2" fill={ ThemeManager.getVar('yellow-1') } />
            <Bar hide={ !this.state.showCat3 } dataKey="cat3" fill={ ThemeManager.getVar('red-1') } />
          </BarChart>
        </ResponsiveContainer>
      </StackingLayout>
    );
  }

  render() {
    return (
      <ContainerLayout backgroundColor="white" border={ true }>
        <HeaderFooterLayout
          header={ <div /> }
          footer={ this.renderLegend() }
          bodyContent={ this.renderBarChart() }
        />
      </ContainerLayout>
    );
  }
}

<Example />
```

Stacked Bar Chart
```js
const CartesianGrid = require('../cartesian/CartesianGrid').default;
const isNull = require('lodash').isNull;
const isEmpty = require('lodash').isEmpty;
const Bar = require('../cartesian/Bar').default;
const ResponsiveContainer = require('../../component/ResponsiveContainer').default;
const XAxis = require('../../cartesian/XAxis').default;
const YAxis = require('../../cartesian/YAxis').default;
const Tooltip = require('../component/Tooltip').default;
const Legend = require('../../component/Legend').default;

import {
  Badge,
  Checkbox,
  CloseIcon,
  ContainerLayout,
  DotIcon,
  FlexItem,
  FlexLayout,
  HeaderFooterLayout,
  Link,
  Paragraph,
  Popover,
  Separator,
  StackingLayout,
  SystemSelect,
  ThemeManager,
  TextGroup,
  TextLabel,
  Title,
  Tooltip as RTooltip
} from 'prism-reactjs';

const data = [
  {
    name: "Q1",
    cat1: 30000,
    cat2: 60000,
    cat3: 0,
  },
  {
    name: "Q2",
    cat1: 25000,
    cat2: 60000,
    cat3: 90000,
  },
  {
    name: "Q3",
    cat1: 20000,
    cat2: 60000,
    cat3: 30000,
  },
  {
    name: "Q4",
    cat1: 30000,
    cat2: 10000,
    cat3: 20000,
  }
];

const menuItems =
[
  {
    label: 'None',
    value: 1
  },
  {
    label: 'Last 24 Hours',
    value: 2
  },
  {
    label: 'Last 48 Hours',
    value: 3
  }
];

class Example extends React.Component {
  constructor(props) {
    this.state = {
      activePayload: null,
      showCat1: true,
      showCat2: true,
      showCat3: true,
      tooltipKeyCounter: 0,
      tooltipVisible: false,
      tooltipCoordinate: {x: 0, y: 0}
    };

    this.handleCheckboxOnChange = this.handleCheckboxOnChange.bind(this);

  }

  handleCheckboxOnChange(e, id) {
    this.setState((prevState) => {
        const payload = {};

        switch(id) {
          case 'cat1':
          payload.showCat1 = !prevState.showCat1;
            break;
          case 'cat2':
            payload.showCat2 = !prevState.showCat2;
            break;
          case 'cat3':
            payload.showCat3 = !prevState.showCat3;
            break;
        }


        return payload;
      });
  }

  getTooltipPayload(e, prevState) {
    let payload = {
      tooltipVisible: e.isTooltipActive || !!(e.activeTooltipIndex > -1)
    }

    if (e && !isNull(e.activeTooltipIndex)) {
      payload.activeTooltipIndex = e.activeTooltipIndex;
    }

    if (e && e.activePayload) {
      payload.activePayload = e.activePayload;
    }

    // Cell width
    if (e && e.activeCellData && !isNull(e.activeCellData.width)) {
      payload.cellWidth = e.activeCellData.width;
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
  }

  renderLegend() {
    return (
      <FlexLayout justifyContent="center" flexGrow="1">
        <Checkbox 
          checked={ this.state.showCat1 }
          color={ ThemeManager.getVar('green-1') }
          id="cat11"
          label="cat1"
          onChange={ (e) => { this.handleCheckboxOnChange(e, 'cat1') } }
        />
        <Checkbox 
          checked={ this.state.showCat2 }
          color={ ThemeManager.getVar('yellow-1') }
          id="cat22"
          label="cat2"
          onChange={ (e) => { this.handleCheckboxOnChange(e, 'cat2') } }
        />
        <Checkbox 
          checked={ this.state.showCat3 }
          color={ ThemeManager.getVar('red-1') }
          id="cat33"
          label="cat3"
          onChange={ (e) => { this.handleCheckboxOnChange(e, 'cat3') } }
        />
      </FlexLayout>
    );
  }

  renderTooltipCats(payloads) {
    return payloads.map(payload => { 
      let color;
      switch(payload.fill) {
        case '#36d068':
          color = 'green';
          break;
        case '#ffbc0b':
          color = 'yellow';
          break;
        case '#f55656':
          color = 'red';
          break;
      }

      return (
        <FlexLayout justifyContent="space-between">
          <Badge
            color={ color }
            text={ payload.name }
            textType="secondary" />
          <TextLabel
            type={ TextLabel.TEXT_LABEL_TYPE.PRIMARY }
            size={TextLabel.TEXT_LABEL_SIZE.SMALL}
          >
            { payload.value }
          </TextLabel>
        </FlexLayout>
      );
    });
  }

  renderTooltipContent() {
    let content = '';
    if (this.state.activePayload && this.state.activePayload[0] && this.state.activePayload[0].payload && !isEmpty(this.state.activePayload[0].payload)) {
      const totalVal = this.state.activePayload[0].payload.cat1 + this.state.activePayload[0].payload.cat2 + this.state.activePayload[0].payload.cat3;
      content = (
        <StackingLayout itemSpacing="15px" style={{width: '100px'}}>
        <FlexLayout justifyContent="space-between">
        <TextLabel
          type={ TextLabel.TEXT_LABEL_TYPE.PRIMARY }
          size={TextLabel.TEXT_LABEL_SIZE.SMALL}
        >
          Total
        </TextLabel>
        <TextLabel
          type={ TextLabel.TEXT_LABEL_TYPE.PRIMARY }
          size={TextLabel.TEXT_LABEL_SIZE.SMALL}
        >
          { totalVal }
          </TextLabel>
        </FlexLayout>
        { this.renderTooltipCats(this.state.activePayload) }
        </StackingLayout>
      );
    }

    return content;
  }

  renderTooltipCursor() {
    const cellWidth = this.state.cellWidth ? `${this.state.cellWidth}px` : '1px';

    return (
      <div style={{width: cellWidth, height: '1px'}}/>
    );
  }

  renderTooltip() {
    return (
      <RTooltip
        key={ this.state.tooltipKeyCounter }
        content={ this.renderTooltipContent() }
        popupVisible={ this.state.tooltipVisible }
        theme="light"
      >
        { this.renderTooltipCursor() }
      </RTooltip>
    );
  }

  renderTip() {
    const { tipType } = this.state;

    return (
      <Tooltip
        isAnimationActive={ false }
        coordinate={ this.state.tooltipCoordinate }
        placement="center"
        content={
          <div>
            {  this.renderTooltip() }
          </div>
        }
      />
    );
  }


  renderBarChart() {
    return (
      <StackingLayout style={{width: '100%', padding: '20px 20px 0 20px'}}>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart 
            data={data} 
              onMouseMove={
                (e) => {
                  this.setState((prevState) => {
                    return this.getTooltipPayload(e, prevState);
                  });
                }
              }
              onMouseLeave={
                (e) => {
                  this.setState((prevState) => {
                    return {
                      tooltipVisible: false
                    };
                  });
                }
              }
            >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              interval={0}
              tickLine={false} />
            <YAxis
              domain={[0, 200000]}
              width={40}
              tickCount={3}
              tickFormatter={(value) => {
                if (value === 0) {
                  return value;
                }

                return `${value / 1000}k`;
              }}
              tickLine={false}
              axisLine={false} />
            { this.renderTip() }
            <Bar stackId="a" hide={ !this.state.showCat1 } dataKey="cat1" fill={ ThemeManager.getVar('green-1') } />
            <Bar stackId="a" hide={ !this.state.showCat2 } dataKey="cat2" fill={ ThemeManager.getVar('yellow-1') } />
            <Bar stackId="a" hide={ !this.state.showCat3 } dataKey="cat3" fill={ ThemeManager.getVar('red-1') } />
          </BarChart>
        </ResponsiveContainer>
      </StackingLayout>
    );
  }

  render() {
    return (
      <ContainerLayout backgroundColor="white" border={ true }>
        <HeaderFooterLayout
          header={ <div /> }
          footer={ this.renderLegend() }
          bodyContent={ this.renderBarChart() }
        />
      </ContainerLayout>
    );
  }
}

<Example />
```

Stacked Bar Chart with Hover and Click Interaction
```js
const CartesianGrid = require('../cartesian/CartesianGrid').default;
const Cell = require('../../component/Cell').default;
const isNull = require('lodash').isNull;
const isEmpty = require('lodash').isEmpty;
const Bar = require('../cartesian/Bar').default;
const ResponsiveContainer = require('../../component/ResponsiveContainer').default;
const XAxis = require('../../cartesian/XAxis').default;
const YAxis = require('../../cartesian/YAxis').default;
const Tooltip = require('../component/Tooltip').default;
const Legend = require('../../component/Legend').default;

import {
  Badge,
  Checkbox,
  CloseIcon,
  ContainerLayout,
  DotIcon,
  FlexItem,
  FlexLayout,
  HeaderFooterLayout,
  Link,
  Paragraph,
  Popover,
  Separator,
  StackingLayout,
  SystemSelect,
  ThemeManager,
  TextGroup,
  TextLabel,
  Title,
  Tooltip as RTooltip
} from 'prism-reactjs';

const data = [
  {
    name: "Jul'12",
    cat1: 50,
    cat2: 10,
    cat3: 0,
  },
  {
    name: "Jul'13",
    cat1: 30,
    cat2: 30,
    cat3: 0,
  },
  {
    name: "Jul'14",
    cat1: 18,
    cat2: 35,
    cat3: 45,
  },
  {
    name: "Jul'15",
    cat1: 0,
    cat2: 60,
    cat3: 0,
  },
  {
    name: "Jul'16",
    cat1: 30,
    cat2: 0,
    cat3: 0,
  },
  {
    name: "Jul'17",
    cat1: 30,
    cat2: 0,
    cat3: 30,
  },
  {
    name: "Jul'18",
    cat1: 25,
    cat2: 10,
    cat3: 40,
  },
  {
    name: "Jul'19",
    cat1: 0,
    cat2: 0,
    cat3: 60,
  },
  {
    name: "Jul'20",
    cat1: 0,
    cat2: 50,
    cat3: 0,
  },
  {
    name: "Jul'21",
    cat1: 10,
    cat2: 50,
    cat3: 0,
  },
  {
    name: "Jul'22",
    cat1: 10,
    cat2: 40,
    cat3: 20,
  },
  {
    name: "Jul'23",
    cat1: 0,
    cat2: 10,
    cat3: 40,
  },
  {
    name: "Jul'24",
    cat1: 10,
    cat2: 0,
    cat3: 0,
  },
  {
    name: "Jul'25",
    cat1: 30,
    cat2: 30,
    cat3: 0,
  },
  {
    name: "Jul'26",
    cat1: 18,
    cat2: 35,
    cat3: 45,
  },
  {
    name: "Jul'27",
    cat1: 0,
    cat2: 0,
    cat3: 60,
  },
  {
    name: "Jul'28",
    cat1: 10,
    cat2: 10,
    cat3: 10,
  },
  {
    name: "Jul'29",
    cat1: 5,
    cat2: 10,
    cat3: 30
  }
];

const menuItems =
[
  {
    label: 'None',
    value: 1
  },
  {
    label: 'Last 24 Hours',
    value: 2
  },
  {
    label: 'Last 48 Hours',
    value: 3
  }
];

const catColors = {
  category: {
    cat1: {
      default: ThemeManager.getVar('green-1'),
      hover: ThemeManager.getVar('dark-green-3'),
      pressed: ThemeManager.getVar('dark-green-2'),
      fade: 'rgba(54, 208, 104, .5)',
      badge: 'green'
    },
    cat2: {
      default: ThemeManager.getVar('yellow-1'),
      hover: ThemeManager.getVar('dark-yellow-3'),
      pressed: ThemeManager.getVar('dark-yellow-2'),
      fade: 'rgba(255, 188, 11, .5)',
      badge: 'yellow'
    },
    cat3: {
      default: ThemeManager.getVar('red-1'),
      hover: ThemeManager.getVar('dark-red-3'),
      pressed: ThemeManager.getVar('dark-red-2'),
      fade: 'rgba(245, 86, 86, .5)',
      badge: 'red'
    }
  },
  sequential: {
    cat1: {
      default: '#33d6cb',
      hover: '#2ec1b7',
      pressed: '#29aba2',
      fade: 'rgba(51, 214, 203, .5)',
      badge: 'diagram-aqua'
    },
    cat2: {
      default: '#22a5f7',
      hover: '#1f95de',
      pressed: '#1b84c6',
      fade: 'rgba(34, 165, 247, .5)',
      badge: 'blue'
    },
    cat3: {
      default: '#8a77ed',
      hover: '#7c6bd5',
      pressed: '#6e5fbe',
      fade: 'rgba(138, 119, 237, .5)',
      badge: 'diagram-purple'
    }
  }
};

class Example extends React.Component {
  constructor(props) {
    this.state = {
      activePayload: null,
      tipType: null,
      tooltipKeyCounter: 0,
      tooltipVisible: false,
      tooltipCoordinate: {x: 0, y: 0}
    };

    this.handleCheckboxToggle = this.handleCheckboxToggle.bind(this);
    this.handleDetailsClick = this.handleDetailsClick.bind(this);
    this.handleBarMouseDown = this.handleBarMouseDown.bind(this);
    this.handleBarMouseUp = this.handleBarMouseUp.bind(this);
  }

  handleBarMouseDown() {
    this.setState({
      barMouseDown: true
    });
  }

  handleBarMouseUp() {
    this.setState({
      barMouseDown: false
    });
  }

  handleDetailsClick() {
    this.setState({
      tipType: 'tooltip',
      popoverVisible: false,
      tooltipVisible: false
    });
  }

  handleCheckboxToggle() {
    this.setState((prevState) => {
      return {
        sequentialColors: !prevState.sequentialColors
      };
    });
  }

  isPopoverActive() {
    return this.state.tipType === 'popover';
  }

  getCatColor(id, type) {
    cat = this.state.sequentialColors ? 'sequential' : 'category';   
    return catColors[cat][id][type];
  }

  getCellWidth(data) {
    let width = null;
    _.each(data, (cell) => {
      if (cell.width) {
        width = cell.width;
      }
    });

    return width;
  }

  getTooltipPayload(e, prevState) {
    let payload = {
      tooltipVisible: e.isTooltipActive || !!(e.activeTooltipIndex > -1)
    }

    if (e && !isNull(e.activeTooltipIndex)) {
      payload.activeTooltipIndex = e.activeTooltipIndex;
    }

    if (e && e.activeLabel) {
      payload.activeLabel = e.activeLabel;
    }

    if (e && e.activePayload) {
      payload.activePayload = e.activePayload;
    }

    // Cell width
    if (e && e.activeCellData && !isNull(this.getCellWidth(e.activeCellData))) {
      payload.cellWidth = this.getCellWidth(e.activeCellData);
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
  }

  renderTooltipCats(payloads) {
    return payloads.map(payload => { 
      return (
        <FlexLayout justifyContent="space-between">
          <Badge
            color={ this.getCatColor(payload.dataKey, 'badge') }
            text={ payload.name }
            textType="secondary" />
          <TextLabel
            type={ TextLabel.TEXT_LABEL_TYPE.PRIMARY }
            size={TextLabel.TEXT_LABEL_SIZE.SMALL}
          >
            { `${payload.value}%` }
          </TextLabel>
        </FlexLayout>
      );
    });
  }

  renderTooltipContent() {
    let content = '';
    if (this.state.activePayload && this.state.activePayload[0] && this.state.activePayload[0].payload && !isEmpty(this.state.activePayload[0].payload)) {
      const totalVal = this.state.activePayload[0].payload.cat1 + this.state.activePayload[0].payload.cat2 + this.state.activePayload[0].payload.cat3;
      content = (
        <StackingLayout itemSpacing="15px" style={{width: '100px'}}>
        <FlexLayout justifyContent="space-between">
        <TextLabel
          type={ TextLabel.TEXT_LABEL_TYPE.PRIMARY }
          size={TextLabel.TEXT_LABEL_SIZE.SMALL}
        >
          Total
        </TextLabel>
        <TextLabel
          type={ TextLabel.TEXT_LABEL_TYPE.PRIMARY }
          size={TextLabel.TEXT_LABEL_SIZE.SMALL}
        >
          { `${ totalVal }%` }
          </TextLabel>
        </FlexLayout>
        { this.renderTooltipCats(this.state.activePayload) }
        </StackingLayout>
      );
    }

    return content;
  }

  renderPopoverContent() {
    let content = '';
    if (this.state.activePayload && this.state.activePayload[0] && this.state.activePayload) {
      const payload = this.state.activePayload;
      const payloadName = payload[0].payload.name;
      const payloadTotal = `${payload[0].payload.cat1 + payload[0].payload.cat2 + payload[0].payload.cat3}%`;
      content = (
        <HeaderFooterLayout
          onClick={ (e) => { e.stopPropagation(); } }
          style={{width: '400px'}}
          itemSpacing="0px"
          header={
            <FlexLayout flexGrow="1" alignItems="center" justifyContent="space-between" padding="0px-20px">
              <FlexLayout itemSpacing="10px">
                <Title size="h3">{ payloadName }</Title>
                <TextLabel type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}>
                  { payloadTotal }
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
                About the changes in { payloadName }
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

  renderTooltipCursor() {
    const { cellWidth } = this.state;
    const width = cellWidth ? `${cellWidth}px` : '1px';

    return (
      <div style={{width: width, height: '1px'}}/>
    );
  }

  renderPopover() {
    return (
      <Popover
        key={ this.state.tooltipKeyCounter }
        content={ this.renderPopoverContent() }
        padding="0px"
        popupPlacement="rightTop"
        popupVisible={ this.state.tooltipVisible }
        theme="light"
      >
        { this.renderTooltipCursor() }
      </Popover>
    );
  }

  renderTooltip() {
    return (
      <RTooltip
        key={ this.state.tooltipKeyCounter }
        content={ this.renderTooltipContent() }
        popupVisible={ this.state.tooltipVisible }
        theme="light"
      >
        { this.renderTooltipCursor() }
      </RTooltip>
    );
  }

  renderTip() {
    const { tipType } = this.state;

    return (
      <Tooltip
        isAnimationActive={ false }
        coordinate={ this.state.tooltipCoordinate }
        cursor={ tipType !== 'popover' }
        placement={ tipType === 'popover' ? 'top-right' : 'center' }
        content={
          <div>
            { tipType === 'popover' ? this.renderPopover() : this.renderTooltip() }
          </div>
        }
      />
    );
  }

  getBarTransitionState(bar, index) {
    const { barMouseDown, popoverVisible, activeTooltipIndex, tooltipVisible, tooltipAnimation } = this.state;
    const transition = {
      transition: 'all 0.3s ease'
    };

    // Popover mode active
    if (popoverVisible) {
      // Inactive
      if (index !== activeTooltipIndex) {
        return transition;
      // Active
      } else {
        return transition;
      }
    // Default mode
    } else {
      // Down
      if (barMouseDown && index === activeTooltipIndex) {
        return {};
      // Hover
      } else if (index === activeTooltipIndex || (tooltipVisible && !tooltipAnimation)) {
        return {};
      // Default
      } else {
        return transition;
      }
    }
  }

  getBarFillColor(bar, index) {
    const { barMouseDown, popoverVisible, activeTooltipIndex } = this.state;
    // Popover mode active
    if (popoverVisible) {
      // Inactive
      if (index !== activeTooltipIndex) {
        return this.getCatColor(bar, 'fade');
      // Active
      } else {
        return this.getCatColor(bar, 'default');
      }
    // Default mode
    } else {
      // Down
      if (barMouseDown && index === activeTooltipIndex) {
        return this.getCatColor(bar, 'pressed');
      // Hover
      } else if (index === activeTooltipIndex) {
        return this.getCatColor(bar, 'hover');
      // Default
      } else {
        return this.getCatColor(bar, 'default');
      }
    }
  }

  renderBars() {
    const cursor = this.state.tipType === 'popover' ? 'default' : 'pointer';
    const bars = ['cat1', 'cat2', 'cat3'];

    return bars.map(bar => { 
      return (
        <Bar 
          stackId="a" 
          dataKey={ bar } 
          onMouseDown={ this.handleBarMouseDown }
          onMouseUp={ this.handleBarMouseUp }
        >
          {
            data.map((entry, index) => {
              // Each bar contains a cell per data point
              return (
                <Cell
                  style={ this.getBarTransitionState(bar, index) }
                  cursor={ cursor }
                  fill={ this.getBarFillColor(bar, index) }
                  key={`cell-${index}`} />
              );
            })
          }
        </Bar>
      );
    });
  }

  renderBarChart() {
    return (
      <StackingLayout style={{width: '100%'}} itemSpacing="0px">
        <FlexLayout alignItems="center" justifyContent="space-between" padding="20px">
          <TextLabel type={ TextLabel.TEXT_LABEL_TYPE.SECONDARY }>Year: 2019</TextLabel>
          <Separator separator={ <DotIcon /> } spacing="spacing-10px">
            <TextLabel type={ TextLabel.TEXT_LABEL_TYPE.SECONDARY }>High: 98%</TextLabel>
            <TextLabel type={ TextLabel.TEXT_LABEL_TYPE.SECONDARY }>Avg: 45%</TextLabel>
            <TextLabel type={ TextLabel.TEXT_LABEL_TYPE.SECONDARY }>Low: 10%</TextLabel>
          </Separator>
        </FlexLayout>
        <StackingLayout padding="0px-20px">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart
              data={data}
              onClick={
                (e) => {
                  this.setState((prevState) => {
                    let payload = this.getTooltipPayload(e, prevState);
                    // If popover is active, then dismiss
                    if (prevState.tipType === 'popover') {
                      payload.tipType = 'tooltip';
                      payload.pageView = null;
                      payload.popoverVisible = false;
                      payload.tooltipAnimation = true;
                    } else {
                      payload.tipType = 'popover';
                      payload.popoverVisible = true;
                    }

                    setTimeout(() => {
                      this.setState({
                        tooltipAnimation: false
                      });
                    }, 300);
                    return payload;
                  });
                }
              }
              onMouseMove={
                (e) => {
                    if (!this.isPopoverActive()) {
                    this.setState((prevState) => {
                      return this.getTooltipPayload(e, prevState);
                    });
                  }
                }
              }
              onMouseLeave={
                (e) => {
                  if (!this.isPopoverActive()) {
                    this.setState((prevState) => {
                      return {
                        tooltipVisible: false
                      };
                    });
                  }
                }
              }
            >
              <CartesianGrid vertical={false} />
              <XAxis
                activeLabel={ this.state.activeLabel }
                dataKey="name"
                interval={0}
                tickLine={false} />
              <YAxis
                width={40}
                tickCount={11}
                tickFormatter={(value) => {
                  return `${value}%`;
                }}
                tickLine={false}
                axisLine={false} />
              { this.renderTip() }
              { this.renderBars() }
            </BarChart>
          </ResponsiveContainer>
        </StackingLayout>
      </StackingLayout>
    );
  }

  render() {
    return (
      <StackingLayout>
        <ContainerLayout backgroundColor="white" border={ true }>
          <HeaderFooterLayout
            header={
              <FlexLayout justifyContent="space-between" alignItems="center" flexGrow="1" padding="0px-20px">
                <Title size="h3">Metric Name</Title>
                <SystemSelect selectedValue={ 2 } selectOptions={ menuItems }
                  placeholder="Select category..." type="mini"
                />
              </FlexLayout>
            }
            footer={ <div /> }
            bodyContent={ this.renderBarChart() }
          />
        </ContainerLayout>
        <Checkbox 
          id="toggle_checked" 
          type="toggle" 
          label="Toggle Sequential Colors"
          checked={ this.state.sequentialColors }
          onChange={ this.handleCheckboxToggle }
        />
      </StackingLayout>
    );
  }
}

<Example />
```

Interactions: On Click for Popover.
```js
const CartesianGrid = require('../cartesian/CartesianGrid').default;
const isNull = require('lodash').isNull;
const Bar = require('../cartesian/Bar').default;
const XAxis = require('../../cartesian/XAxis').default;
const YAxis = require('../../cartesian/YAxis').default;
const Tooltip = require('../component/Tooltip').default;
const Legend = require('../../component/Legend').default;
const Cell = require('../../component/Cell').default;

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
          onClick={ (e) => { e.stopPropagation(); } }
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
              placement="top-right"
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
const XAxis = require('../../cartesian/XAxis').default;
const YAxis = require('../../cartesian/YAxis').default;
const Tooltip = require('../component/Tooltip').default;
const Legend = require('../../component/Legend').default;
const Cell = require('../../component/Cell').default;

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
      <div style={{ padding: '20px 20px 0 20px' }}>
        <BarChart
          width={358}
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
            width={40}
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
      </div>
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
const XAxis = require('../../cartesian/XAxis').default;
const YAxis = require('../../cartesian/YAxis').default;
const Tooltip = require('../component/Tooltip').default;
const Legend = require('../../component/Legend').default;
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
const XAxis = require('../../cartesian/XAxis').default;
const YAxis = require('../../cartesian/YAxis').default;
const Legend = require('../../component/Legend').default;
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
const XAxis = require('../../cartesian/XAxis').default;
const YAxis = require('../../cartesian/YAxis').default;
const Tooltip = require('../component/Tooltip').default;
const Legend = require('../../component/Legend').default;
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
const Area = require('../../cartesian/Area').default;
const AreaChart = require('../../chart/AreaChart').default;
const CartesianGrid = require('../cartesian/CartesianGrid').default;
const XAxis = require('../../cartesian/XAxis').default;
const YAxis = require('../../cartesian/YAxis').default;
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
const XAxis = require('../../cartesian/XAxis').default;
const YAxis = require('../../cartesian/YAxis').default;
const Tooltip = require('../component/Tooltip').default;
const Legend = require('../../component/Legend').default;
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