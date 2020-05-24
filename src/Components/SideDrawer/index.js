import React from 'react';
import PropTypes from 'prop-types';
import {DrawerOverlay, Drawer, DrawerContent, DrawerHeader, DrawerCloseButton, DrawerBody} from "@chakra-ui/core/dist/Drawer";
import DataTable from "../DataTable";
import Text from "@chakra-ui/core/dist/Text";


const SideDrawer = ({toggleSideMenu, isOpen}) => {
    return (
        <Drawer placement="left" size="full" isFullHeight={true} onClose={toggleSideMenu} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerHeader borderBottomWidth="1px">
                    State Figures <DrawerCloseButton />
                    <Text fontSize={12}>Click any sate to view epi-curve</Text>
                </DrawerHeader>
                <DrawerBody p={0}>
                    <DataTable toggleSideMenu={toggleSideMenu} />
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
};

SideDrawer.propTypes = {
    toggleSideMenu: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
};

export default SideDrawer;
