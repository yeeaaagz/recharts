A container component to make charts adapt to the size of parent container. One of the props width and height should be a percentage string.
```js
const Area = require('../cartesian/Area').default;
const AreaChart = require('../chart/AreaChart').default;
const XAxis = require('../cartesian/XAxis').default;
const YAxis = require('../cartesian/YAxis').default;
const CartesianGrid = require('../cartesian/CartesianGrid').default;
const Tooltip = require('../component/Tooltip').default;
const ReferenceLine = require('../cartesian/ReferenceLine').default;

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

<ResponsiveContainer width="100%" height={200}>
  <AreaChart data={data}
    margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
    <XAxis dataKey="name" />
    <YAxis />
    <CartesianGrid strokeDasharray="3 3" />
    <Tooltip />
    <ReferenceLine x="Page C" stroke="green" label="Min PAGE" />
    <ReferenceLine y={4000} label="Max" stroke="red" strokeDasharray="3 3" />
    <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
  </AreaChart>
</ResponsiveContainer>
```