import React from 'react';
import PropTypes from 'prop-types';
import {DrawerOverlay, Drawer, DrawerContent, DrawerHeader, DrawerCloseButton, DrawerBody} from "@chakra-ui/core/dist/Drawer";
import DataTable from "../DataTable";


const SideDrawer = ({onToggle, isOpen}) => {
    return (
        <Drawer placement="left" size="full" isFullHeight={true} onClose={onToggle} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerHeader borderBottomWidth="1px">
                    State Figures <DrawerCloseButton />
                </DrawerHeader>
                <DrawerBody p={0}>
                    <DataTable onToggle={onToggle} />
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
};

SideDrawer.propTypes = {
    onToggle: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
};

export default SideDrawer;
