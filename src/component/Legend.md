payload: format
```jsx static
[{ value: 'item name', type: 'line', id: 'ID01' }]
```

margin: format
```jsx static
{ top: 0, left: 0, right: 0, bottom: 0 }
```

content: format
```jsx static
<Legend content={<CustomizedLegend external={external} />} />

const renderLegend = (props) => {
  const { payload } = props;

  return (
    <ul>
      {
        payload.map((entry, index) => (
          <li key={`item-${index}`}>{entry.value}</li>
        ))
      }
    </ul>
  );
}
<Legend content={renderLegend} />
```

formatter: format
```jsx static
(value, entry, index) => ()
```

formatter: Render colorful legend texts
```js
const CartesianGrid = require('../cartesian/CartesianGrid').default;
const isNull = require('lodash').isNull;
const isEmpty = require('lodash').isEmpty;
const Bar = require('../cartesian/Bar').default;
const ResponsiveContainer = require('../component/ResponsiveContainer').default;
const XAxis = require('../cartesian/XAxis').default;
const YAxis = require('../cartesian/YAxis').default;
const Tooltip = require('../component/Tooltip').default;
const LineChart = require('../chart/LineChart').default;
const Line = require('../cartesian/Line').default;

const data = [
      {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
      {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
      {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
      {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
      {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
      {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
      {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];

class SimpleLineChart extends React.Component {
  renderColorfulLegendText(value, entry) {
    const { color } = entry;
    
    return <span style={{ color }}>{value}</span>;
  }
  
  render () {
    return (
      <div>
        <LineChart width={600} height={300} data={data}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}>
         <CartesianGrid strokeDasharray="3 3"/>
         <XAxis dataKey="name"/>
         <YAxis/>
         <Tooltip/>
         <Legend formatter={this.renderColorfulLegendText} />
         <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}}/>
         <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart> 
      </div>
    );
  }
}

<SimpleLineChart />
```

onMouseEnter: LegendEffectOpacity
```js
const CartesianGrid = require('../cartesian/CartesianGrid').default;
const isNull = require('lodash').isNull;
const isEmpty = require('lodash').isEmpty;
const Bar = require('../cartesian/Bar').default;
const ResponsiveContainer = require('../component/ResponsiveContainer').default;
const XAxis = require('../cartesian/XAxis').default;
const YAxis = require('../cartesian/YAxis').default;
const Tooltip = require('../component/Tooltip').default;
const LineChart = require('../chart/LineChart').default;
const Line = require('../cartesian/Line').default;

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
  constructor(props) {
    this.state = {
      opacity: {
        uv: 1,
        pv: 1,
      }
    };

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleMouseEnter(o) {
    const { dataKey } = o;
    const { opacity } = this.state;

    this.setState({
      opacity: { ...opacity, [dataKey]: 0.5 },
    });
  }

  handleMouseLeave(o) {
    const { dataKey } = o;
    const { opacity } = this.state;

    this.setState({
      opacity: { ...opacity, [dataKey]: 1 },
    });
  }

  render() {
    const { opacity } = this.state;

    return (
      <div>
        <LineChart
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
          <Legend onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} />
          <Line type="monotone" dataKey="pv" strokeOpacity={opacity.pv} stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="uv" strokeOpacity={opacity.uv} stroke="#82ca9d" />
        </LineChart>
        <p className="notes">Tips: Hover the legend !</p>
      </div>
    );
  }
}

<Example />
```