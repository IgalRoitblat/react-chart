import React, { Component } from "react";
import "./App.scss";
import ChartContainer from "./components/ChartContainer/ChartContainer";
import DropdownsContainer from "./components/DropdownsContainer/DropdownsContainer";
import LoadTimeContainer from "./components/LoadTimeContainer/LoadTimeContainer";
import PerformanceBar from "./components/PerformanceBar/PerformanceBar";

const data = require("./data.json");

class App extends Component {
    constructor(props) {
        super(props);
        this.onSegmentSelect = this.onSegmentSelect.bind(this);
        this.onDataPointsSelect = this.onDataPointsSelect.bind(this);
        this.state = {
            chartOptions: {
                animationEnabled: true,
                axisY: {
                    title: "Data per segment",
                },
                toolTip: {
                    shared: true,
                },
                data: [],
            },
            startupDataPointsLimit: 100,
            fullChartData: [],
            filteredSegmentName: "",
            filteredDataPointName: "",
            dropdowns: {
                segments: [],
                dataPoints: [],
            },
            clickedItem: {},
        };
    }

    sortDataByDate(data) {
        return data.sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
        });
    }

    populateSegmentDropdown(data) {
        const dropDownData = [];
        dropDownData.push({
            id: "reset",
            title: "All Segments",
            selected: false,
            key: "segments",
            initialLoadTime: null,
            lastLoadTime: null,
        });
        data.forEach((item, index) => {
            dropDownData.push({
                id: index,
                title: item,
                selected: false,
                key: "segments",
                initialLoadTime: null,
                lastLoadTime: null,
            });
        });
        this.setState({
            dropdowns: {
                segments: dropDownData,
                dataPoints: [
                    {
                        id: 0,
                        title: "All Data Points",
                        selected: false,
                        key: "dataPoints",
                        initialLoadTime: null,
                        lastLoadTime: null,
                    },
                    {
                        id: 1,
                        title: "10",
                        selected: false,
                        key: "dataPoints",
                        initialLoadTime: null,
                        lastLoadTime: null,
                    },
                    {
                        id: 2,
                        title: "20",
                        selected: false,
                        key: "dataPoints",
                        initialLoadTime: null,
                        lastLoadTime: null,
                    },
                    {
                        id: 3,
                        title: "30",
                        selected: false,
                        key: "dataPoints",
                        initialLoadTime: null,
                        lastLoadTime: null,
                    },
                    {
                        id: 4,
                        title: "50",
                        selected: false,
                        key: "dataPoints",
                        initialLoadTime: null,
                        lastLoadTime: null,
                    },
                    {
                        id: 5,
                        title: "100",
                        selected: false,
                        key: "dataPoints",
                        initialLoadTime: null,
                        lastLoadTime: null,
                    },
                    {
                        id: 6,
                        title: "150",
                        selected: false,
                        key: "dataPoints",
                        initialLoadTime: null,
                        lastLoadTime: null,
                    },
                ],
            },
        });
    }

    onSegmentSelect(e) {
        console.log(this.state.filteredDataPointName);
        const filterStartTimestamp = performance.now();
        const filteredData = this.state.fullChartData.filter(
            (segment) => segment.name === e.target.id
        );
        const clickedItem = this.state.dropdowns.segments.find(
            (item) => item.title === e.target.id
        );
        if (filteredData.length === 0) {
            this.setState({
                chartOptions: {
                    data: this.state.fullChartData,
                },
                filteredSegmentName: "",
            });
        } else {
            if (this.state.filteredDataPointName !== "") {
                const filteredDataCopy = [];
                filteredData.forEach((segment) => {
                    filteredDataCopy.push({ ...segment });
                });
                const selectedDataPoints = [];
                filteredDataCopy[0].dataPoints.forEach((dataPoint) => {
                    selectedDataPoints.push({ ...dataPoint });
                });
                const filteredDataPoints = selectedDataPoints.splice(
                    0,
                    Number(this.state.filteredDataPointName)
                );
                filteredDataCopy[0].dataPoints = filteredDataPoints;
                this.setState({
                    chartOptions: {
                        data: filteredDataCopy,
                    },
                    filteredSegmentName: e.target.id,
                });
            } else {
                this.setState({
                    chartOptions: {
                        data: filteredData,
                    },
                    filteredSegmentName: e.target.id,
                });
            }
        }
        const filterEndTimestamp = performance.now();
        const filterLoadTime = this.calcLoadTime(
            filterStartTimestamp,
            filterEndTimestamp
        );
        this.setState({
            clickedItem: this.assignClickedItemLoadTime(
                filterLoadTime,
                clickedItem
            ),
        });
    }

    onDataPointsSelect(e) {
        const filterStartTimestamp = performance.now();
        const clickedItem = this.state.dropdowns.dataPoints.find(
            (item) => item.title === e.target.id
        );
        if (isNaN(e.target.id)) {
            this.setState({
                chartOptions: {
                    data: this.state.fullChartData,
                },
            });
        } else {
            let dataPoints = [];
            if (this.state.filteredSegmentName !== "") {
                dataPoints = [...this.state.fullChartData].filter(
                    (segment) => segment.name === this.state.filteredSegmentName
                );
            } else {
                dataPoints = [...this.state.fullChartData];
            }
            let filtered = [];
            filtered = dataPoints.map((segment) => {
                const newDataPoints = [...segment.dataPoints];
                return {
                    type: "spline",
                    name: segment.name,
                    showInLegend: true,
                    dataPoints: newDataPoints.splice(0, Number(e.target.id)),
                };
            });
            this.setState({
                chartOptions: {
                    data: filtered,
                },
                filteredDataPointName: e.target.id,
            });
            const filterEndTimestamp = performance.now();
            const filterLoadTime = this.calcLoadTime(
                filterStartTimestamp,
                filterEndTimestamp
            );
            this.setState({
                clickedItem: this.assignClickedItemLoadTime(
                    filterLoadTime,
                    clickedItem
                ),
            });
        }
    }
    assignClickedItemLoadTime(filterLoadTime, clickedItem) {
        if (clickedItem.initialLoadTime) {
            clickedItem.lastLoadTime = filterLoadTime;
        } else {
            clickedItem.lastLoadTime = filterLoadTime;
            clickedItem.initialLoadTime = filterLoadTime;
        }
        return clickedItem;
    }
    setDataToGraph(data) {
        const dataPoints = [];
        const fullChart = [];
        Object.keys(data).forEach((segment) => {
            fullChart.push({
                type: "spline",
                name: segment,
                showInLegend: true,
                dataPoints: data[segment],
            });
            const splicedDataPoints = [...data[segment]].splice(
                0,
                this.state.startupDataPointsLimit
            );
            dataPoints.push({
                type: "spline",
                name: segment,
                showInLegend: true,
                dataPoints: splicedDataPoints,
            });
        });
        this.populateSegmentDropdown(Object.keys(data));
        this.setState({
            chartOptions: {
                data: dataPoints,
            },
            fullChartData: fullChart,
        });
    }
    calcLoadTime(startTime, endTime) {
        return endTime - startTime;
    }
    componentDidMount() {
        const sortedData = this.sortDataByDate(data);
        const dataBySegment = {};
        Object.keys(sortedData[0])
            .filter((key) => key.includes("segment"))
            .forEach((segment) => {
                dataBySegment[segment] = [];
            });
        sortedData.forEach((entry) => {
            let keys = Object.keys(entry).filter((key) =>
                key.includes("segment")
            );
            keys.forEach((key) => {
                dataBySegment[key].push({ y: entry[key], label: entry[key] });
            });
        });
        this.setDataToGraph(dataBySegment);
    }

    render() {
        const dropdowns = [
            {
                title: "Select Segment",
                list: this.state.dropdowns.segments,
                dropDownItemClicked: this.onSegmentSelect,
            },
            {
                title: "Select Data Points",
                list: this.state.dropdowns.dataPoints,
                dropDownItemClicked: this.onDataPointsSelect,
            },
        ];
        return (
            <div className="App">
                <h1>My Dashboard</h1>
                <DropdownsContainer dropdowns={dropdowns} />
                <LoadTimeContainer clickedItem={this.state.clickedItem} />
                <PerformanceBar clickedItem={this.state.clickedItem} />
                <ChartContainer
                    chartOptions={this.state.chartOptions}
                    dropdowns={this.state.dropdowns}
                />
            </div>
        );
    }
}
export default App;
