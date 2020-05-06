import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import Box from "@chakra-ui/core/dist/Box";
import Flex from "@chakra-ui/core/dist/Flex";
import CustomInput from './CustomInput';

import "react-datepicker/dist/react-datepicker.css";
import "./index.css"

export default () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    return (
        <Flex>
            <Box mr={4}>
                <label htmlFor="From">Filter by date:</label><br/>
                <DatePicker
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    customInput={<CustomInput id="from" label="From" />}
                />
            </Box>
            <Box>
                <br/>
                <DatePicker
                    selected={endDate}
                    onChange={date => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    customInput={<CustomInput id="to" label="To" />}
                />
            </Box>
        </Flex>
    )
}
