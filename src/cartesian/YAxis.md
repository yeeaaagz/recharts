Domain: Format
```jsx static
<YAxis type="number" domain={['dataMin', 'dataMax']} />
<YAxis type="number" domain={[0, 'dataMax']} />
<YAxis type="number" domain={['auto', 'auto']} />
<YAxis type="number" domain={[0, 'dataMax + 1000']} />
<YAxis type="number" domain={['dataMin - 100', 'dataMax + 100']} />
<YAxis type="number" domain={[dataMin => (0 - Math.abs(dataMin)), dataMax => (dataMax * 2)]} />
```

Domain: VerticalLineChartWithSpecifiedDomain
```js
const LineChart = require('../chart/LineChart').default;
const Line = require('.//Line').default;
const CartesianGrid = require('../cartesian/CartesianGrid').default;
const Legend = require('../component/Legend').default;
const Bar = require('../cartesian/Bar').default;
const XAxis = require('../cartesian/XAxis').default;
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
const XAxis = require('../cartesian/XAxis').default;

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
<YAxis padding={{ top: 10 }} />
<YAxis padding={{ bottom: 20 }} />
<YAxis padding={{ top: 20, bottom: 20 }} />
```

Padding: LineChartWithXAxisPading
```js
const CartesianGrid = require('../cartesian/CartesianGrid').default;
const Legend = require('../component/Legend').default;
const LineChart = require('../chart/LineChart').default;
const Line = require('.//Line').default;
const Tooltip = require('../component/Tooltip').default;
const XAxis = require('../cartesian/XAxis').default;

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
<YAxis tick={false} />
<YAxis tick={{stroke: 'red', strokeWidth: 2}} />
<YAxis tick={<CustomizedTick />} />
```

tickFormatter
```js
const CartesianGrid = require('../cartesian/CartesianGrid').default;
const Bar = require('../cartesian/Bar').default;
const BarChart = require('../chart/BarChart').default;
const XAxis = require('../cartesian/XAxis').default;
const Tooltip = require('../component/Tooltip').default;
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

<BarChart width={730} height={250} data={data}>
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
  <Tooltip />
  <Bar dataKey="value" fill={ ThemeManager.getVar('blue-1') } />
</BarChart>
```

Label: Format
```jsx static
<YAxis label="Height" />
<YAxis label={<CustomizedLabel />} />
<YAxis label={{ value: "YAxis Label" }} />
```

Label: ComposedChartWithAxisLabels
```js
const Area = require('./Area').default;
const Line = require('.//Line').default;
const CartesianGrid = require('../cartesian/CartesianGrid').default;
const ComposedChart = require('../chart/ComposedChart').default;
const Legend = require('../component/Legend').default;
const Bar = require('../cartesian/Bar').default;
const XAxis = require('../cartesian/XAxis').default;
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
<YAxis scale="log" />

import { scaleLog } from 'd3-scale';
const scale = scaleLog().base(Math.E);

...
  <YAxis scale={scale} />
...
```