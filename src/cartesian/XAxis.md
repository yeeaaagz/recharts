Domain: Format
```jsx static
<XAxis type="number" domain={['dataMin', 'dataMax']} />
<XAxis type="number" domain={[0, 'dataMax']} />
<XAxis type="number" domain={['auto', 'auto']} />
<XAxis type="number" domain={[0, 'dataMax + 1000']} />
<XAxis type="number" domain={['dataMin - 100', 'dataMax + 100']} />
<XAxis type="number" domain={[dataMin => (0 - Math.abs(dataMin)), dataMax => (dataMax * 2)]} />
```

Domain: VerticalLineChartWithSpecifiedDomain
```js
const LineChart = require('../chart/LineChart').default;
const Line = require('.//Line').default;
const CartesianGrid = require('../cartesian/CartesianGrid').default;
const Legend = require('../component/Legend').default;
const Bar = require('../cartesian/Bar').default;
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

<LineChart
  layout="vertical"
  width={500}
  height={300}
  data={data}
  margin={{
    top: 20, right: 30, left: 20, bottom: 5,
  }}
>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis type="number" domain={[0, 'dataMax + 1000']} />
  <YAxis dataKey="name" type="category" />
  <Tooltip />
  <Legend />
  <Line dataKey="pv" stroke="#8884d8" />
  <Line dataKey="uv" stroke="#82ca9d" />
</LineChart>
```

Interval: LineChartAxisInterval
```js
const CartesianGrid = require('../cartesian/CartesianGrid').default;
const Legend = require('../component/Legend').default;
const LineChart = require('../chart/LineChart').default;
const Line = require('.//Line').default;
const YAxis = require('../cartesian/YAxis').default;

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
  <LineChart
    width={200}
    height={100}
    data={data}
  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" interval="preserveEnd" />
    <YAxis interval="preserveEnd" />
    <Legend />
    <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
  </LineChart>

  <LineChart
    width={200}
    height={100}
    data={data}
  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" interval="preserveStart" />
    <YAxis interval="preserveStart" />
    <Legend />
    <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
  </LineChart>

  <LineChart
    width={200}
    height={100}
    data={data}
  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" interval="preserveStartEnd" />
    <YAxis interval="preserveStartEnd" />
    <Legend />
    <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
  </LineChart>

  <LineChart
    width={200}
    height={100}
    data={data}
  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" interval={0} angle={30} dx={20} />
    <YAxis />
    <Legend />
    <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
  </LineChart>
</div>
```

Padding: Format
```jsx static
<XAxis padding={{ left: 10 }} />
<XAxis padding={{ right: 20 }} />
<XAxis padding={{ left: 20, right: 20 }} />
```

Padding: LineChartWithXAxisPading
```js
const CartesianGrid = require('../cartesian/CartesianGrid').default;
const Legend = require('../component/Legend').default;
const LineChart = require('../chart/LineChart').default;
const Line = require('.//Line').default;
const Tooltip = require('../component/Tooltip').default;
const YAxis = require('../cartesian/YAxis').default;

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


<LineChart width={500} height={300} data={data}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
  <YAxis />
  <Tooltip />
  <Legend />
  <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
  <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
</LineChart>
```

Tick: Format
```jsx static
<XAxis tick={false} />
<XAxis tick={{stroke: 'red', strokeWidth: 2}} />
<XAxis tick={<CustomizedTick />} />
```

Tick: CustomizedLabelLineChart
```js
const LineChart = require('../chart/LineChart').default;
const Line = require('./Line').default;
const CartesianGrid = require('./CartesianGrid').default;
const YAxis = require('./YAxis').default;
const Tooltip = require('../component/Tooltip').default;
const Legend = require('../component/Legend').default;

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

class CustomizedLabel extends React.PureComponent {
  render() {
    const {
      x, y, stroke, value,
    } = this.props;

    return <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">{value}</text>;
  }
}

class CustomizedAxisTick extends React.PureComponent {
  render() {
    const {
      x, y, stroke, payload,
    } = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">{payload.value}</text>
      </g>
    );
  }
}

class Example extends React.PureComponent {
  render() {
    return (
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 20, right: 30, left: 20, bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" height={60} tick={<CustomizedAxisTick />} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="pv" stroke="#8884d8" label={<CustomizedLabel />} />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>
    );
  }
}

<Example />
```

Label: Format
```jsx static
<XAxis label="Height" />
<XAxis label={<CustomizedLabel />} />
<XAxis label={{ value: "XAxis Label" }} />
```

Label: ComposedChartWithAxisLabels
```js
const Area = require('./Area').default;
const Line = require('.//Line').default;
const CartesianGrid = require('../cartesian/CartesianGrid').default;
const ComposedChart = require('../chart/ComposedChart').default;
const Legend = require('../component/Legend').default;
const Bar = require('../cartesian/Bar').default;
const YAxis = require('../cartesian/YAxis').default;
const Tooltip = require('../component/Tooltip').default;

const data = [
  {
    name: 'Page A', uv: 590, pv: 800, amt: 1400,
  },
  {
    name: 'Page B', uv: 868, pv: 967, amt: 1506,
  },
  {
    name: 'Page C', uv: 1397, pv: 1098, amt: 989,
  },
  {
    name: 'Page D', uv: 1480, pv: 1200, amt: 1228,
  },
  {
    name: 'Page E', uv: 1520, pv: 1108, amt: 1100,
  },
  {
    name: 'Page F', uv: 1400, pv: 680, amt: 1700,
  },
];

<ComposedChart
  width={500}
  height={400}
  data={data}
  margin={{
    top: 20, right: 80, bottom: 20, left: 20,
  }}
>
  <CartesianGrid stroke="#f5f5f5" />
  <XAxis dataKey="name" label={{ value: 'Pages', position: 'insideBottomRight', offset: 0 }} />
  <YAxis label={{ value: 'Index', angle: -90, position: 'insideLeft' }} />
  <Tooltip />
  <Legend />
  <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
  <Bar dataKey="pv" barSize={20} fill="#413ea0" />
  <Line type="monotone" dataKey="uv" stroke="#ff7300" />
</ComposedChart>
```

Scale: Format
```jsx static
<XAxis scale="log" />

import { scaleLog } from 'd3-scale';
const scale = scaleLog().base(Math.E);

...
  <XAxis scale={scale} />
...
```