label: Format
```jsx static
<Bar dataKey="value" label />
<Bar dataKey="value" label={{ fill: 'red', fontSize: 20 }} />
<Bar dataKey="value" label={<CustomizedLabel />} />
```

minPointSize: BarChartWithMinHeight
```js
const BarChart = require('../chart/BarChart').default;
const CartesianGrid = require('../../cartesian/CartesianGrid').default;
const XAxis = require('../../cartesian/XAxis').default;
const YAxis = require('../../cartesian/YAxis').default;
const Tooltip = require('../../component/Tooltip').default;
const Legend = require('../../component/Legend').default;
const LabelList = require('../../component/LabelList').default;

const data = [
  {
    name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
  },
  {
    name: 'Page C', uv: 2000, pv: 8, amt: 2290,
  },
  {
    name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
  },
  {
    name: 'Page E', uv: 18, pv: 4800, amt: 2181,
  },
  {
    name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
];

const renderCustomizedLabel = (props) => {
  const {
    x, y, width, height, value,
  } = props;
  const radius = 10;

  return (
    <g>
      <circle cx={x + width / 2} cy={y - radius} r={radius} fill="#8884d8" />
      <text x={x + width / 2} y={y - radius} fill="#fff" textAnchor="middle" dominantBaseline="middle">
        {value.split(' ')[1]}
      </text>
    </g>
  );
};

class Example extends React.Component {
  render() {
    return (
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" fill="#8884d8" minPointSize={5}>
          <LabelList dataKey="name" content={renderCustomizedLabel} />
        </Bar>
        <Bar dataKey="uv" fill="#82ca9d" minPointSize={10} />
      </BarChart>
    );
  }
}

<Example />
```

background: BarChartHasBackground
```js
const BarChart = require('../chart/BarChart').default;
const CartesianGrid = require('../../cartesian/CartesianGrid').default;
const XAxis = require('../../cartesian/XAxis').default;
const YAxis = require('../../cartesian/YAxis').default;
const Tooltip = require('../../component/Tooltip').default;
const Legend = require('../../component/Legend').default;
const LabelList = require('../../component/LabelList').default;

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
  }
];

class Example extends React.Component {
  render() {
    return (
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" fill="#8884d8" background={{ fill: '#eee' }} />
        <Bar dataKey="uv" fill="#82ca9d" />
      </BarChart>
    );
  }
}

<Example />
```

shape: Format
```jsx static
<Bar dataKey="value" shape={<CustomizedShape/>}/>
<Bar dataKey="value" shape={renderShape}/>
```

shape: CustomShapeBarChart
```js
const BarChart = require('../chart/BarChart').default;
const CartesianGrid = require('../../cartesian/CartesianGrid').default;
const XAxis = require('../../cartesian/XAxis').default;
const YAxis = require('../../cartesian/YAxis').default;
const Tooltip = require('../../component/Tooltip').default;
const Legend = require('../../component/Legend').default;
const Cell = require('../../component/Cell').default;
const LabelList = require('../../component/LabelList').default;

import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';

const colors = scaleOrdinal(schemeCategory10).range();

const data = [
  {
    name: 'Page A', uv: 4000, female: 2400, male: 2400,
  },
  {
    name: 'Page B', uv: 3000, female: 1398, male: 2210,
  },
  {
    name: 'Page C', uv: 2000, female: 9800, male: 2290,
  },
  {
    name: 'Page D', uv: 2780, female: 3908, male: 2000,
  },
  {
    name: 'Page E', uv: 1890, female: 4800, male: 2181,
  },
  {
    name: 'Page F', uv: 2390, female: 3800, male: 2500,
  },
  {
    name: 'Page G', uv: 3490, female: 4300, male: 2100,
  },
];

const getPath = (x, y, width, height) => `M${x},${y + height}
          C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2}, ${y}
          C${x + width / 2},${y + height / 3} ${x + 2 * width / 3},${y + height} ${x + width}, ${y + height}
          Z`;

const TriangleBar = (props) => {
  const {
    fill, x, y, width, height,
  } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

class Example extends React.Component {
  render() {
    return (
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
        <Bar dataKey="female" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
          {
            data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % 20]} />
            ))
          }
        </Bar>
      </BarChart>
    );
  }
}

<Example />
```

stackId: Format
```jsx static
<BarChart data={data} width={400} height={300}>
  <Bar stackId="pv" dataKey="pv01" />
  <Bar stackId="pv" dataKey="pv02" />
  <Bar stackId="uv" dataKey="uv01" />
  <Bar stackId="uv" dataKey="uv02" />
</BarChart>
```

stackId: StackedBarChart
```js
const BarChart = require('../chart/BarChart').default;
const CartesianGrid = require('../../cartesian/CartesianGrid').default;
const XAxis = require('../../cartesian/XAxis').default;
const YAxis = require('../../cartesian/YAxis').default;
const Tooltip = require('../../component/Tooltip').default;
const Legend = require('../../component/Legend').default;
const Cell = require('../../component/Cell').default;
const LabelList = require('../../component/LabelList').default;

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

class Example extends React.Component {
  render() {
    return (
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
        <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
      </BarChart>
    );
  }
}

<Example />
```

stackId: MixBarChart
```js
const BarChart = require('../chart/BarChart').default;
const CartesianGrid = require('../../cartesian/CartesianGrid').default;
const XAxis = require('../../cartesian/XAxis').default;
const YAxis = require('../../cartesian/YAxis').default;
const Tooltip = require('../../component/Tooltip').default;
const Legend = require('../../component/Legend').default;
const Cell = require('../../component/Cell').default;
const LabelList = require('../../component/LabelList').default;

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

class Example extends React.Component {
  render() {
    return (
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
    );
  }
}

<Example />
```

onClick: BarChartWithCustomizedEvent
```js
const BarChart = require('../chart/BarChart').default;
const CartesianGrid = require('../../cartesian/CartesianGrid').default;
const XAxis = require('../../cartesian/XAxis').default;
const YAxis = require('../../cartesian/YAxis').default;
const Tooltip = require('../../component/Tooltip').default;
const Legend = require('../../component/Legend').default;
const Cell = require('../../component/Cell').default;
const LabelList = require('../../component/LabelList').default;

const data = [
  {
    name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: 'Page B', uv: -3000, pv: 1398, amt: 2210,
  },
  {
    name: 'Page C', uv: -2000, pv: -9800, amt: 2290,
  },
  {
    name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
  },
  {
    name: 'Page E', uv: -1890, pv: 4800, amt: 2181,
  },
  {
    name: 'Page F', uv: 2390, pv: -3800, amt: 2500,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
];

class Example extends React.Component {
  constructor(props) {
    this.state = {
      data: [
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
      ],
      activeIndex: 0,
    };

     this.handleClick = this.handleClick.bind(this);
  }

  handleClick(data, index) {
    this.setState({
      activeIndex: index,
    });
  }

  render() {
    const { activeIndex, data } = this.state;
    const activeItem = data[activeIndex];

    return (
      <div>
        <p>Click each rectangle </p>
        <BarChart width={150} height={40} data={data}>
          <Bar dataKey="uv" onClick={this.handleClick}>
            {
                data.map((entry, index) => (
                  <Cell cursor="pointer" fill={index === activeIndex ? '#82ca9d' : '#8884d8'} key={`cell-${index}`} />
                ))
              }
          </Bar>
        </BarChart>
        <p className="content">{`Uv of "${activeItem.name}": ${activeItem.uv}`}</p>
      </div>
    );
  }
}

<Example />
```