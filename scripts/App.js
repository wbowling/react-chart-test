import React from 'react';
var DoughnutChart = require("react-chartjs").Doughnut;
var Chart = require("chart.js");
var Reflux = require('reflux');

// Creating an Action
var prodUpdate = Reflux.createAction();
var pqaUpdate = Reflux.createAction();
var devUpdate = Reflux.createAction();

// Creating a Data Store - Listening to textUpdate action
var textStore = Reflux.createStore({
    init: function() {
        this.listenTo(prodUpdate, this.output.bind(null, "prod"));
        this.listenTo(pqaUpdate, this.output.bind(null, "pqa"));
        this.listenTo(devUpdate, this.output.bind(null, "dev"));
    },
    output: function(name) {
        this.writeOut(name);
    },
    writeOut: function(name) {
        var chartData = [
          {
              value: Math.random()*1000,
              color:"#F7464A",
              highlight: "#FF5A5E",
              label: "5XXs"
          },
          {
              value: Math.random()*1000,
              color: "#46BFBD",
              highlight: "#5AD3D1",
              label: "2XXs"
          },
          {
              value: Math.random()*1000,
              color: "#FDB45C",
              highlight: "#FFC870",
              label: "4XXs"
          }
      ]
      this.trigger({"name": name, data: chartData});
    }
});



class Chart1 extends React.Component {
  render() {
    if (this.props.chartData.length) {
      return ( <DoughnutChart data={this.props.chartData} />);
    } else {
      return (<span />);
    }
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {"prod": [],"pqa":[],"dev":[]};
    textStore.listen((data) => {
        this.setState({[data.name]: data.data});
    });
    setInterval(prodUpdate, 2000);
    setInterval(devUpdate, 2400);
    setInterval(pqaUpdate, 2700);
  }

  render() {
  	
    return (
      <div>
      	<h1>Hello, world.</h1>
      	<Chart1 chartData={this.state.prod}/><Chart1 chartData={this.state.pqa}/><Chart1 chartData={this.state.dev}/>
      </div>
    );
  }
}