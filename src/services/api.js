import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

export default {
    fetchMetricsGroupByDate: async (state = '') => {
        try {
            const uri = state && state !== 'All' ? `/epicurve-by-date?state=${state}` : `/epicurve-by-date`;
            const {result: {data: records}} = (await axios.get(uri)).data;
            const categories = records.map(record => record._id);
            const chartOneSeries = [
                {
                    name: 'Confirmed',
                    data: records.map(record => record.total_confirmed_cases ?? 0)
                },
                {
                    name: 'Active',
                    data: records.map(record => record.total_active_cases ?? 0)
                },
                {
                    name: 'Recovered',
                    data: records.map(record => record.total_discharged ?? 0)
                },
                {
                    name: 'Death',
                    data: records.map(record => record.total_deaths ?? 0)
                }
            ];

            // the first recorded case doesn't have value for new cases because it's the first one so we return the total recorded case
            const chartTwoSeries = [
                {
                    name: 'Confirmed',
                    data: records.map((record, index) => {
                        return (index !== (records.length - 1))
                            ? record.new_confirmed_cases
                            : record.total_confirmed_cases
                    })
                },
                {
                    name: 'Recovered',
                    data: records.map((record, index) => {
                        return (index !== (records.length - 1))
                            ? record.new_discharged
                            : record.total_discharged
                    })
                },
                {
                    name: 'Death',
                    data: records.map((record, index) => {
                        return (index !== (records.length - 1))
                            ? record.new_deaths
                            : record.total_deaths

                    })
                }
            ];
            return {
                chartOneSeries,
                categories,
                records,
                chartTwoSeries
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
