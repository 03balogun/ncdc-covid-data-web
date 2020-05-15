import React from "react";
import Flex from "@chakra-ui/core/dist/Flex";
import Heading from "@chakra-ui/core/dist/Heading";
import Tooltip from "@chakra-ui/core/dist/Tooltip";
import IconButton from "@chakra-ui/core/dist/IconButton";
import {useColorMode} from "@chakra-ui/core/dist/ColorModeProvider";
import Box from "@chakra-ui/core/dist/Box";
import { FaGithub, FaBars, FaQuestionCircle } from "react-icons/fa";
import PropTypes from "prop-types";
import useDisclosure from "@chakra-ui/core/dist/useDisclosure";
import About from "./About";


const Header = ({onToggle}) => {
    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const isNight = colorMode === 'light';

    return (
        <>
            <Box as="header"
                 pos="fixed"
                 top={0}
                 left={0}
                 right={0}
                 zIndex={999}
                 bg={isNight ? 'white' : 'rgb(26, 32, 44);'}
                 p={4}
                 justifyContent="flex-end"
                 h="4rem"
                 width="100%"
                 borderBottomWidth={1}>
                <Flex justifyContent="space-between" alignItems="center" h="100%" pr={4} pl={4}>
                    <Heading as="h1" size={['sm', 'md']}>COVID-19 Epicurve in Nigeria</Heading>
                    <Flex>
                        <Tooltip aria-label="About this project" placement="bottom"
                                 label="About this project">
                            <IconButton onClick={onOpen} variant="ghost"
                                        color="gray.500"
                                        aria-label="About this project"
                                        icon={FaQuestionCircle}/>
                        </Tooltip>
                        <Tooltip aria-label="Goto project github Repository" placement="bottom"
                                 label="Goto project github Repository">
                            <IconButton as="a" href="#" variant="ghost"
                                        color="gray.500"
                                        aria-label="Switch to night mood"
                                        icon={FaGithub}/>
                        </Tooltip>
                        <Tooltip aria-label={`Switch to ${isNight ? 'dark' : 'day'} mode`} placement="bottom"
                                 label="Switch to night mode">
                            <IconButton onClick={toggleColorMode} variant="ghost"
                                        color="gray.500"
                                        aria-label="Switch to night mood"
                                        icon={colorMode === 'light' ? 'moon' : 'sun'}/>
                        </Tooltip>
                        <Tooltip aria-label="Open side menu to filter by state" placement="bottom"
                                 label="Toggle Side menu">
                            <IconButton display={['flex', 'none']} onClick={onToggle} variant="ghost"
                                        color="gray.500"
                                        aria-label="Open side menu to filter by state"
                                        icon={FaBars}/>
                        </Tooltip>
                    </Flex>
                </Flex>
            </Box>
            <About isOpen={isOpen} onClose={onClose}/>
        </>
    )
};

Header.propTypes = {
    onToggle: PropTypes.func.isRequired
};

export default Header;
