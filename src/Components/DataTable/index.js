import React, {useState, useMemo, useEffect, useContext} from "react";
import PropTypes from "prop-types";
import DTable from 'react-data-table-component';
import Spinner from "@chakra-ui/core/dist/Spinner";
import useToast from "@chakra-ui/core/dist/es/Toast";
import {Box} from "@chakra-ui/core";
import InputGroup from "@chakra-ui/core/dist/InputGroup";
import Input from "@chakra-ui/core/dist/Input";
import {InputRightElement} from "@chakra-ui/core/dist";
import IconButton from "@chakra-ui/core/dist/IconButton";
import {useColorMode} from "@chakra-ui/core/dist/ColorModeProvider";

import {columns, customStyles} from './config';

import StateContext from '../../context/StateContext'

import api from '../../services/api';

import './index.css'

const DataTable = ({onToggle}) => {
    const toast = useToast();
    const [isLoading, setLoading] = useState(true);
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

    const {1: setSelectedSate} = useContext(StateContext);
    const { colorMode } = useColorMode();


    const [records, setRecords] = useState([]);
    const filteredItems = records.filter(item => item.state && item.state.toLowerCase().includes(filterText.toLowerCase()));

    const subHeaderComponent = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };

        return (
            <Box w="100%" p={0}>
                <label htmlFor="search">Filter by state:</label><br/>
                <InputGroup w="100%" p={0}>
                    <Input id="search" type="text" placeholder="Filter By State" value={filterText} onChange={e => setFilterText(e.target.value)} />
                    <InputRightElement>
                        <IconButton icon="close" aria-label="Clear search" fontSize={14} type="button" onClick={handleClear} />
                    </InputRightElement>
                </InputGroup>
                {/*<Text fontSize={13}>Select a state to view timeline</Text>*/}
            </Box>
        );
    }, [filterText, resetPaginationToggle]);

    const fetchStateRecords = async () => {
        try {
            const records = await api.fetchSateMetrics();
            setRecords(records ?? []);
            setLoading(false);
        }catch (e) {
            toast({
                title: "Error",
                description: "An error occurred please refresh your page and try again. If error persist, kindly report.",
                status: "error",
                duration: 9000,
                isClosable: true,
            })
        }
    };

    useEffect(()=>{
        fetchStateRecords();
    },[]);

    return (
        <DTable
            columns={columns}
            data={filteredItems}
            keyField="_id"
            subHeaderComponent={subHeaderComponent}
            subHeader
            fixedHeader={filteredItems.length > 20}
            fixedHeaderScrollHeight="calc(100vh - 14rem)"
            striped={colorMode === 'light'}
            progressPending={isLoading}
            progressComponent={    <Spinner
                alingSelf="center"
                thickness="2px"
                speed="0.65s"
                emptyColor="gray.200"
                label="Fetching state metrics..."
                color="blue.500"
                size="xl"
            />}
            highlightOnHover={true}
            pointerOnHover={true}
            noHeader={true}
            onRowClicked={(args)=>{
                setSelectedSate(args.state);
                // close the side menu when a state is selected
                if (onToggle) onToggle();
            }}
            customStyles={customStyles}
            defaultSortField="total_confirmed_cases"
            defaultSortAsc={false}
            theme={colorMode !== 'light' ? 'solarized' : ''}
        />
    )
};

DataTable.propTypes = {
    onToggle: PropTypes.func,
};

export default DataTable;
