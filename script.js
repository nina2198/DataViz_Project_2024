let chartData = [];

function readJsonData(url) {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data);
}

function getData() {
  const jsonUrl = "../data/converted_data.json";
  return readJsonData(jsonUrl)
    .then((dataArray) => {
      chartData = dataArray;
      drawChart(1,"Product 1");
      drawChart(2,"Product 2");
      return dataArray;
    })
    .catch((error) => {
      console.error("An error occurred :", error);
    });
}

function getDatasetByProduct(productKey) {
  if (chartData) {
    const firstProductData = chartData.filter(
      (p) => p.MaterialKey == productKey
    );
    const axesSales = [];
    const axesForecast = [];
    firstProductData.forEach((p) => {
      const axisSales = { axis: p.PlantKey, value: parseFloat(p.SalesValue) };
      axesSales.push(axisSales);
      const axisForecast = { axis: p.PlantKey, value: parseFloat(p.ForecastValue) };
      axesForecast.push(axisForecast);
    });
    return [
      {
        className: "sales",
        axes: axesSales,
      },
      {
        className: "forecast",
        axes: axesForecast,
      },
    ];
  }
  return [];
}

function drawChart(productKey, chartTitle) {
  var chart = RadarChart.chart();
  var cfg = chart.config(); // retrieve default config
  var titleText1 = chartTitle;
  var svg1 = d3
    .select("body")
    .append("svg")
    .attr("width", cfg.w + cfg.w + 50)
    .attr("height", cfg.h + cfg.h / 4);
  svg1
    .append("text")
    .attr("x", 50)
    .attr("y", 20)
    .style("text-anchor", "middle")
    .text(titleText1);
  svg1
    .append("g")
    .classed("single", 1)
    .datum(getDatasetByProduct(productKey))
    .call(chart);

}

getData();
