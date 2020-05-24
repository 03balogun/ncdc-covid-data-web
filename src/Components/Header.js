import React from "react";
import Flex from "@chakra-ui/core/dist/Flex";
import Heading from "@chakra-ui/core/dist/Heading";
import Tooltip from "@chakra-ui/core/dist/Tooltip";
import IconButton from "@chakra-ui/core/dist/IconButton";
import {useColorMode} from "@chakra-ui/core/dist/ColorModeProvider";
import Box from "@chakra-ui/core/dist/Box";
import { FaGithub, FaBars, FaQuestionCircle, FaBus } from "react-icons/fa";
import PropTypes from "prop-types";
import useDisclosure from "@chakra-ui/core/dist/useDisclosure";
import About from "./About";


const Header = ({toggleSideMenu, closeTour}) => {
    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const isNight = colorMode === 'dark';

    return (
        <>
            <Box as="header"
                 pos="fixed"
                 top={0}
                 left={0}
                 right={0}
                 zIndex={999}
                 bg={isNight ? 'rgb(26, 32, 44)' : 'white'}
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
                            <IconButton as="a" isExternal href="https://github.com/03balogun/ncdc-covid-data-web" variant="ghost"
                                        color="gray.500"
                                        aria-label="Switch to night mood"
                                        icon={FaGithub}/>
                        </Tooltip>
                        <Tooltip aria-label={`Switch to ${isNight ? 'day' : 'dark'} mode`} placement="bottom"
                                 label="Switch to night mode">
                            <IconButton className="night-mode-toggle" onClick={toggleColorMode} variant="ghost"
                                        color="gray.500"
                                        aria-label="Switch to night mode"
                                        icon={colorMode === 'light' ? 'moon' : 'sun'}/>
                        </Tooltip>

                        <Tooltip aria-label="Start tour" placement="bottom"
                                 label="Start tour">
                            <IconButton className="night-mode-toggle" onClick={()=>closeTour(true)} variant="ghost"
                                        color="gray.500"
                                        aria-label="Start tour"
                                        icon={FaBus}/>
                        </Tooltip>
                        <Tooltip aria-label="Open side menu to filter by state" placement="bottom"
                                 label="Toggle Side menu">
                            <IconButton className="mobile-menu" onClick={toggleSideMenu} variant="ghost"
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
    toggleSideMenu: PropTypes.func.isRequired,
    closeTour: PropTypes.func.isRequired,
};

export default Header;
