import React, {useMemo} from "react";
import PropTypes from 'prop-types';
import Skeleton from "@chakra-ui/core/dist/Skeleton";
import Flex from "@chakra-ui/core/dist/Flex";
import {Box} from "@chakra-ui/core";
import {Text} from "@chakra-ui/core/dist";
import {
    Stat,
    StatLabel,
    StatNumber,
    StatArrow,
    StatGroup,
} from "@chakra-ui/core/dist/Stat";
import {formatDate} from '../../utils/helper';

import './index.css';

const percentageDifference = (newFigure, oldFigure) => {
    if (!oldFigure) return 100;
    return (((newFigure - oldFigure) / oldFigure) * 100).toFixed(1);
};

const Index = ({isFetchingSeries, latestReport, previousDayReport}) => {

    const METRICS = useMemo(() => {
        // Calculate the differences between the latest and previous day report
        const {
            total_confirmed_cases,
            total_active_cases,
            total_discharged,
            total_deaths,
            new_confirmed_cases,
            new_deaths,
            new_discharged
        } = latestReport;

        const previousNewConfirmedCases = previousDayReport.new_confirmed_cases || 0;
        const previousTotalActive = previousDayReport.total_active_cases || 0;
        const previousNewDischarged = previousDayReport.new_discharged || 0;
        const previousNewDeath = previousDayReport.new_deaths || 0;

        return [
            {
                title: 'CONFIRMED CASES',
                color: 'red.400',
                figure: parseInt(total_confirmed_cases).toLocaleString(),
                currentFigure: parseInt(new_confirmed_cases)?.toLocaleString() ?? 0,
                previousFigure: previousNewConfirmedCases,
                isIncrease: new_confirmed_cases > previousNewConfirmedCases,
                percentage: percentageDifference(new_confirmed_cases, previousNewConfirmedCases)
            },
            {
                title: 'ACTIVE CASES',
                color: 'orange.400',
                figure: parseInt(total_active_cases).toLocaleString(),
                currentFigure: parseInt(total_active_cases)?.toLocaleString() ?? 0,
                previousFigure: previousTotalActive.toLocaleString(),
                isIncrease: total_active_cases > previousTotalActive,
                percentage: percentageDifference(total_active_cases, previousTotalActive)
            },
            {
                title: 'RECOVERED CASES',
                color: 'green.400',
                figure: parseInt(total_discharged).toLocaleString(),
                currentFigure: parseInt(new_discharged)?.toLocaleString() ?? 0,
                previousFigure: previousNewDischarged.toLocaleString(),
                isIncrease: new_discharged > previousNewDischarged,
                percentage: percentageDifference(new_discharged, previousNewDischarged)
            },
            {
                title: 'DEATH CASES',
                color: 'blue.400',
                figure: parseInt(total_deaths).toLocaleString(),
                currentFigure: parseInt(new_deaths)?.toLocaleString() ?? 0,
                previousFigure: previousNewDeath.toLocaleString(),
                isIncrease: new_deaths > previousNewDeath,
                percentage: percentageDifference(new_deaths, previousNewDeath)
            }
        ]
    }, [latestReport, previousDayReport]);

    return (
        <StatGroup w="100%" wrap="wrap" justifyContent="space-between">
            {
                METRICS.map((metric, index) => (
                    <Stat className="stat-container" key={index} mb={['10px', '0']} rounded="md" borderWidth="1px" p={4}>
                        <StatLabel color={metric.color}>{metric.title}</StatLabel>
                        <Skeleton isLoaded={!isFetchingSeries}>
                            <Flex justifyContent="space-between" mt={2} width="100%">
                                <Box>
                                    <Text fontSize="xs">Cumulative</Text>
                                    <StatNumber>{metric.figure}</StatNumber>
                                </Box>
                                <Flex justifyContent="center" direction="column">
                                    <Text fontSize="xs">
                                        {formatDate(latestReport._id)}
                                    </Text>
                                    <Flex justifyContent="center" mb={0} alignItems="center">
                                        <StatNumber fontSize="1.1rem">{metric.currentFigure}</StatNumber>
                                        <Text fontSize="0.7rem" ml={1}>
                                            <StatArrow size="0.5rem"
                                                       type={metric.isIncrease ? 'increase' : 'decrease'}/>
                                            <span>{metric.percentage ?? 0}%</span>
                                        </Text>
                                    </Flex>
                                </Flex>
                                <Flex justifyContent="center" direction="column">
                                    <Text fontSize="xs">
                                        {formatDate(previousDayReport._id)}
                                    </Text>
                                    <Flex justifyContent="center" mb={0} alignItems="center">
                                        <StatNumber fontSize="1.1rem">{metric.previousFigure}</StatNumber>
                                    </Flex>
                                </Flex>
                            </Flex>
                        </Skeleton>
                    </Stat>
                ))
            }
        </StatGroup>
    )
};

Index.propTypes = {
    isFetchingSeries: PropTypes.bool.isRequired,
    latestReport: PropTypes.object.isRequired,
    previousDayReport: PropTypes.object.isRequired,
};

export default Index
