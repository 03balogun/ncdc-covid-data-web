import React from "react";
import Flex from "@chakra-ui/core/dist/Flex";
import Heading from "@chakra-ui/core/dist/Heading";
import Tooltip from "@chakra-ui/core/dist/Tooltip";
import Button from "@chakra-ui/core/dist/Button";
import IconButton from "@chakra-ui/core/dist/IconButton";
import {useColorMode} from "@chakra-ui/core/dist/ColorModeProvider";
import Box from "@chakra-ui/core/dist/Box";

const Header = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    const isNight = colorMode === 'light';

    return (<Box as="header"
                 pos="fixed"
                 top={0}
                 left={0}
                 right={0}
                 zIndex={999}
                 bg={isNight? 'white' : ''}
                 p={4}
                 justifyContent="flex-end"
                 h="4rem"
                 width="100%"
                 borderBottomWidth={1}>
        <Flex justifyContent="space-between" alignItems="center" h="100%" pr={4} pl={4}>
            <Heading as="h1" size={['sm', 'md']}>COVID-19 Epicurve in Nigeria</Heading>
            <Flex>
                <Tooltip aria-label="Repository" placement="bottom" label="Repository">
                    <Button variant="ghost" mr={4}>Github</Button>
                </Tooltip>
                <Tooltip aria-label={`Switch to ${isNight ? 'dark' : 'day' } mode`} placement="bottom" label="Switch to night mode">
                    <IconButton onClick={toggleColorMode} variant="ghost"
                                color="gray.500"
                                aria-label="Switch to night mood"
                                icon={colorMode === 'light' ? 'moon' : 'sun'}/>
                </Tooltip>
            </Flex>
        </Flex>
    </Box>)
};

export default Header;
