export default {
  "chart": {
    "id": "chart",
    "zoom": {
      "type": "x",
      "enabled": true,
      "autoScaleYaxis": true
    },
    "toolbar": {
      "autoSelected": "zoom",
      "tools": {
        "download": false
      }
    },
    "stacked": false,
    "dropShadow": {
      "enabled": true,
      "color": "#000",
      "top": 6,
      "left": 6,
      "blur": 6,
      "opacity": 0.1
    },
  },
  "dataLabels": {
    "enabled": false
  },
  "colors": ["#f56565", "#ED8936", "#48bb78", "#4299e1"],
  "stroke": {
    "width": [3, 3, 3, 3],
    "curve": "smooth"
  },
  "plotOptions": {
    "bar": {
      "columnWidth": "20%"
    }
  },
  "xaxis": {
    "type": "datetime",
    "categories": []
  },
  "title": {
    "text": "COVID-19 Timeline in Nigeria",
    "align": "left"
  },
  "subtitle": {
    "text": "This chart shows how the cumulative figures have changed overtime since the first case was reported.\n Select a state from the left to filter by state"
  },
  "grid": {
    "borderColor": "#e7e7e7",
    "row": {
      "colors": ["#f3f3f3",
        "transparent"],
      "opacity": 0.2
    }
  },
  "legend": {
    "height": 40,
    "offsetY": 10
  },
  "tooltip": {},
  // "theme": {
  //   "mode": "dark"
  // },
}
