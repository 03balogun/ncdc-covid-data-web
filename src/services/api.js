import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

export default {
    fetchMetricsGroupByDate: async (state = '') => {
        try {
            const uri = state && state !== 'All' ? `/epicurve-by-date?state=${state}` : `/epicurve-by-date`;
            const {result: {data: records}} = (await axios.get(uri)).data;
            const categories = records.map(record => record._id);
            const series = [
                {
                    name: 'Total Confirmed',
                    data: records.map(record => record.total_confirmed_cases)
                },
                {
                    name: 'Total Active',
                    data: records.map(record => record.total_active_cases)
                },
                {
                    name: 'Total Recovered',
                    data: records.map(record => record.total_discharged)
                },
                {
                    name: 'Total Deaths',
                    data: records.map(record => record.total_deaths)
                }
            ];

            const barChartSeries = [
                {
                    name: 'Confirmed',
                    data: records.map(record => record.new_confirmed_cases)
                },
                {
                    name: 'Recovered',
                    data: records.map(record => record.new_discharged)
                },
                {
                    name: 'Deaths',
                    data: records.map(record => record.new_deaths)
                }
            ];
            return {
                series,
                categories,
                records,
                barChartSeries
            }
        }catch (e) {
            //
        }
    },
    fetchSateMetrics: async () => {
        try {
            const {result: {data: records}} = (await axios.get(`/epicurve-by-state`)).data;
            return records;
        }catch (e) {
            //
        }
    },
}
