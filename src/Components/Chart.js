import React from "react";
import PropTypes from 'prop-types';
import ApexChart from 'react-apexcharts'


const Chart = ({type, options, series, width, height}) => {
    // AChart.zoomX(new Date('2020-03-01').getTime(), new Date('2020-04-10').getTime());
    return (
        <ApexChart
            options={options}
            series={series}
            type={type}
            width={width ?? 350}
            height={height ?? 350}
        />
    );
};


Chart.propTypes = {
    type: PropTypes.string.isRequired,
    options: PropTypes.object.isRequired,
    series: PropTypes.array.isRequired,
    width: PropTypes.string,
    height: PropTypes.number,
};

export default Chart
