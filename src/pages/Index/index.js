import React, {useEffect, useState, useContext} from 'react';
import useToast from "@chakra-ui/core/dist/es/Toast";
import Flex from "@chakra-ui/core/dist/Flex";
import Box from "@chakra-ui/core/dist/Box";
import Text from "@chakra-ui/core/dist/Text";
import Spinner from "@chakra-ui/core/dist/Spinner";
import Skeleton from "@chakra-ui/core/dist/Skeleton";
import Tabs, { TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/core/dist/Tabs";

import DateRangePicker from "../../Components/DateRangePicker";
import Stats from "../../Components/Stats";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import Chart from "../../Components/Chart";
import DataTable from "../../Components/DataTable";

import chartConfig from '../../config/charts';

import api from '../../services/api';
import {formatDate} from '../../utils/helper';

import StateContext from '../../context/StateContext'

const barChartConfig = {
    ...chartConfig,
    chart: {
        ...chartConfig.chart,
        id: 'chart2',
        "toolbar": {
            "autoSelected": "zoom",
            "tools": {
                "download": false
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
    "title": {
        "text": "COVID-19 Timeline in Nigeria",
        "align": "left"
    },
    "subtitle": {
        "text": "Recorded cases each day since the first case was reported.\n Select a state from the left to filter by state"
    },
    colors: ["#f56565", "#48bb78", "#4299e1"],
};

console.log(barChartConfig);

function Index() {
    const toast = useToast();

    const [isFetchingSeries, setIsFetchingSeries] = useState(true);
    const [series, setSeries] = useState([]);
    const [barChartSeries, setBarChartSeries] = useState([]);
    const [reportDate, setReportDate] = useState('--');
    const [latestReport, setLatestReport] = useState({});
    const [previousDayReport, setPreviousDayReport] = useState({});

    const [selectedState] = useContext(StateContext);

    const fetchChartSeries = (state = '') => {
        setIsFetchingSeries(true);
        api.fetchMetricsGroupByDate(state).then(({series, categories, records, barChartSeries}) => {
            chartConfig.xaxis.categories = categories;
            barChartConfig.xaxis.categories = categories;
            setSeries(series);
            setBarChartSeries(barChartSeries);

            const latestReport = records[0] ?? {};
            // Get previous day report
            const previousDayReport = records[1] ?? {};

            setReportDate(latestReport._id);
            setLatestReport(latestReport);
            setPreviousDayReport(previousDayReport);
        }).catch(() => {
            toast({
                title: "Error",
                description: "An error occurred please refresh your page and try again. If error persist, kindly report.",
                status: "error",
                duration: 9000,
                isClosable: true,
            })
        }).finally(() => {
            setIsFetchingSeries(false);
        });

    };

    useEffect(() =>{
        fetchChartSeries(selectedState);
    }, [selectedState]);

    return (
        <Box wrap="wrap">
            <Header />
            <Box display={['block', 'flex']}
                 as="main"
                 wrap="wrap"
                 flex="100%"
                 justifyContent="space-between"
                 mt="4rem"
                 mb={['4rem', 0]}
                 p={4}>
                <Flex direction="column" justifyContent="space-between" flex={['100%', '0 0 80%', '0 0 70%']}>
                    <Flex direction="column" w="100%">
                        <Flex justifyContent="space-between" wrap="wrap" alignItems="flex-end" mb={4}>
                            <Skeleton isLoaded={!isFetchingSeries}>
                                <Text fontSize={12}>
                                    Currently showing for
                                    <Text as="strong" textTransform="uppercase">
                                        &nbsp;{selectedState || 'All'}
                                    </Text>
                                    &nbsp;Date <strong>{formatDate(reportDate)}</strong>
                                </Text>
                            </Skeleton>
                            <DateRangePicker/>
                        </Flex>
                        <Stats
                            isFetchingSeries={isFetchingSeries}
                            latestReport={latestReport}
                            previousDayReport={previousDayReport}
                        />
                        {isFetchingSeries ? (
                            <Flex
                                borderWidth={1}
                                justifyContent="center"
                                alignItems="center"
                                minH={400}
                                w="100%"
                                p={4}
                                mt={4}>
                                <Spinner
                                    alingSelf="center"
                                    thickness="2px"
                                    speed="0.65s"
                                    emptyColor="gray.200"
                                    color="blue.500"
                                    size="xl"
                                />
                            </Flex>
                        ) : (
                            <Box mt={6}>
                                <Tabs>
                                    <TabList>
                                        <Tab>Per day</Tab>
                                        <Tab>Cumulative</Tab>
                                    </TabList>
                                    <TabPanels>
                                        <TabPanel>
                                            <Box borderWidth={1} w="100%" p={4}>
                                                <Chart type="line" width="100%" height={500}
                                                       series={barChartSeries}
                                                       options={barChartConfig}/>
                                            </Box>
                                        </TabPanel>
                                        <TabPanel>
                                            <Box borderWidth={1} w="100%" p={4}>
                                                <Chart type="line" width="100%" height={500} series={series} options={chartConfig}/>
                                            </Box>
                                        </TabPanel>
                                    </TabPanels>
                                </Tabs>
                            </Box>
                        )}
                    </Flex>
                    <Box display={['none', 'block']}>
                        <Footer />
                    </Box>
                </Flex>
                <Flex flex={['100%', '0 0 20%', '0 0 25%']} mt={[8, 0]}>
                    <DataTable/>
                </Flex>
            </Box>
            <Box display={['block', 'none']}>
                <Footer />
            </Box>
        </Box>
    );
}

export default Index;
