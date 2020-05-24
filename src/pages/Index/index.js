import React, {useEffect, useState} from 'react';
import useToast from "@chakra-ui/core/dist/es/Toast";
import Flex from "@chakra-ui/core/dist/Flex";
import Box from "@chakra-ui/core/dist/Box";
import Text from "@chakra-ui/core/dist/Text";
import Spinner from "@chakra-ui/core/dist/Spinner";
import Skeleton from "@chakra-ui/core/dist/Skeleton";
import ReactGA from "react-ga";
import useDisclosure from "@chakra-ui/core/dist/useDisclosure";
import {useColorMode} from "@chakra-ui/core/dist/ColorModeProvider";
import { useParams } from "react-router-dom";

import Tabs, { TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/core/dist/Tabs";

import DateRangePicker from "../../Components/DateRangePicker";
import Stats from "../../Components/Stats";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import Chart from "../../Components/Chart";
import DataTable from "../../Components/DataTable";

import chart1 from '../../config/chart1';
import chart2 from "../../config/chart2";
import tourSteps from "../../config/tourSteps";

import api from '../../services/api';
import {formatDate} from '../../utils/helper';

import './index.css';
import SideDrawer from "../../Components/SideDrawer";
import Tour from "reactour";
import Button from "@chakra-ui/core/dist/Button";

function Index() {
    const toast = useToast();
    const { colorMode } = useColorMode();

    chart1.theme.mode = colorMode;
    chart2.theme.mode = colorMode;

    const [isTourOpen, setIsTourOpen] = useState(() => {
        const hasToured = localStorage.getItem('hasToured');

        return !!!hasToured;
    });

    const [isFetchingSeries, setIsFetchingSeries] = useState(true);
    const [chartOneSeries, setChartOneSeries] = useState([]);
    const [chartTwoSeries, setChartTwoSeries] = useState([]);
    const [reportDate, setReportDate] = useState('--');
    const [firstReportDate, setFirstReportDate] = useState('--');
    const [latestReport, setLatestReport] = useState({});
    const [previousDayReport, setPreviousDayReport] = useState({});

    const {state} = useParams();

    if (state) ReactGA.pageview(window.location.pathname);

    const {isOpen, onToggle} = useDisclosure();

    const closeTour = (status) => {
        localStorage.setItem('hasToured', 'true');
        setIsTourOpen(status);
    };

    const fetchChartSeries = async (state = '') => {
        setIsFetchingSeries(true);
        try {
            const {chartOneSeries, categories, records, chartTwoSeries} = await api.fetchMetricsGroupByDate(state);

            chart1.xaxis.categories = categories;
            chart2.xaxis.categories = categories;
            setChartOneSeries(chartOneSeries);
            setChartTwoSeries(chartTwoSeries);

            const latestReport = records[0] ?? {};
            // Get previous day report
            const previousDayReport = records[1] ?? {};

            setReportDate(latestReport._id);
            setFirstReportDate(records[records.length - 1]._id);
            setLatestReport(latestReport);
            setPreviousDayReport(previousDayReport);

        } catch (e) {
            toast({
                title: "Error",
                description: "An error occurred please refresh your page and try again. If error persist, kindly report.",
                status: "error",
                duration: 9000,
                isClosable: true,
            })
        }
        setIsFetchingSeries(false);
    };

    useEffect(() => {
        fetchChartSeries(state);
    }, [state]);

    return (
        <>
            <Box wrap="wrap">
                <Header toggleSideMenu={onToggle} closeTour={closeTour}/>
                <Box
                    as="main"
                    mt="4rem"
                    width="100%"
                    p={4}>
                    <Box
                        position="fixed"
                        width="100%"
                        height="100%"
                        top="1rem"
                        left="0"
                        right="0"
                        className="rightSection"
                    >
                        <Box
                            top="4rem"
                            position="relative"
                            overflow-y="auto"
                            border-right-width="1px">
                            <DataTable/>
                        </Box>
                    </Box>
                    <Box paddingTop="2rem" className="leftSection">
                        <Flex direction="column" w="100%">
                            <Flex justifyContent="space-between" wrap="wrap" alignItems="flex-end" mb={4}>
                                <Skeleton isLoaded={!isFetchingSeries}>
                                    <Text fontSize={12}>
                                        Currently showing for
                                        <Text as="strong" textTransform="uppercase">
                                            &nbsp;{state || 'All'}
                                        </Text>
                                        &nbsp;from <strong>{formatDate(firstReportDate)}</strong> to <strong>{formatDate(reportDate)}</strong>
                                    </Text>
                                </Skeleton>
                                <DateRangePicker/>
                            </Flex>
                            <Box className={"stats"}>
                                <Stats
                                    isFetchingSeries={isFetchingSeries}
                                    latestReport={latestReport}
                                    previousDayReport={previousDayReport}
                                />
                            </Box>
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
                                            <Tab className={"perday"}>Per day</Tab>
                                            <Tab className={"cumulative"}>Cumulative</Tab>
                                        </TabList>
                                        <TabPanels>
                                            <TabPanel>
                                                <Box borderWidth={1} w="100%" p={4}>
                                                    <Chart type="line" width="100%" height={500}
                                                           series={chartTwoSeries}
                                                           options={chart2}/>
                                                </Box>
                                            </TabPanel>
                                            <TabPanel>
                                                <Box borderWidth={1} w="100%" p={4}>
                                                    <Chart type="line" width="100%" height={500} series={chartOneSeries}
                                                           options={chart1}/>
                                                </Box>
                                            </TabPanel>
                                        </TabPanels>
                                    </Tabs>
                                </Box>
                            )}
                        </Flex>
                        <Flex display={['none', 'flex']} w="100%" justifySelf="flex-end">
                            <Footer/>
                        </Flex>
                    </Box>
                </Box>
                <Box display={['block', 'none']}>
                    <Footer/>
                </Box>
                <SideDrawer isOpen={isOpen} toggleSideMenu={onToggle}/>
            </Box>
            <Tour
                steps={tourSteps}
                isOpen={isTourOpen}
                badgeContent={(curr, tot) => `${curr} of ${tot}`}
                onRequestClose={()=>closeTour(false)}
                lastStepNextButton={<Text>Done!</Text>}
            />
        </>
    );
}

export default Index;
