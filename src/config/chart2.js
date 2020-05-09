import chartConfig from "./chart1";

export default {
  ...chartConfig,
  chart: {
    ...chartConfig.chart,
    id: "chart2",
    toolbar: {
      autoSelected: "zoom",
      tools: {
        download: false
      }
    },
    dropShadow: {
      enabled: false,
    },
    // selection: {
    //     xaxis: {
    //         min: new Date('26 Apr 2020').getTime(),
    //         max: new Date('1 May 2020').getTime()
    //     }
    // },
  },
  title: {
    text: "COVID-19 Timeline in Nigeria",
    align: "left"
  },
  subtitle: {
    text: "Recorded cases each day since the first case was reported.\n Select a state from the right to filter by state"
  },
  colors: ["#f56565", "#48bb78", "#4299e1"],
}
