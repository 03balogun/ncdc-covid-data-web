import React, {useState, useMemo, useEffect} from "react";
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
import { useHistory, useParams } from "react-router-dom";

import {columns, customStyles} from './config';

import api from '../../services/api';

import './index.css'

const DataTable = ({toggleSideMenu}) => {
    const toast = useToast();


    const history = useHistory();
    const { state } = useParams();

    // add selected row color based on the selected state
    const selectedState = state ?? 'all';
    const conditionalRowStyles = [
            {
                when: row => row.state.toLowerCase() === selectedState,
                style: {
                    backgroundColor: '#e3f2fd',
                    color: 'rgba(0,0,0,0.87)',
                    borderBottomColor: '#1a212c',
                    '&:hover': {
                        cursor: 'pointer'
                    },
                },
            }
        ];



    const [isLoading, setLoading] = useState(true);
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

    const { colorMode } = useColorMode();


    const [records, setRecords] = useState([]);
    const filteredItems = records.filter(item => {
        return item.state && item.state.toLowerCase().includes(filterText.toLowerCase())
    });

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
                // close the side menu when a state is selected
                if (toggleSideMenu) toggleSideMenu();
                const state = args.state.toLowerCase();
                history.push(state);
            }}
            customStyles={customStyles}
            defaultSortField="total_confirmed_cases"
            defaultSortAsc={false}
            theme={colorMode !== 'light' ? 'solarized' : ''}
            conditionalRowStyles={conditionalRowStyles}
        />
    )
};

DataTable.propTypes = {
    toggleSideMenu: PropTypes.func,
};

export default DataTable;
