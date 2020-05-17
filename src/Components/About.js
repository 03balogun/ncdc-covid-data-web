import React from "react";
import PropTypes from "prop-types";
import Button from "@chakra-ui/core/dist/Button";
import {Modal, ModalCloseButton} from "@chakra-ui/core/dist/Modal";
import {
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
} from "@chakra-ui/core";

import Text from "@chakra-ui/core/dist/Text";
import Link from "@chakra-ui/core/dist/Link";

const About = ({ isOpen, onClose }) => {
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>About</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <Text mb={4} fontSize={14} lineHeight="1.8rem">
                            Almost as soon as the COVID-19 pandemic began in Nigeria. There have been a couple of graphs and visualizations outlining the rise of the virus. Most of these charts show the cumulative number of deaths, recovered persons, and active cases related to the virus. These figures will always arise as cumulative total never falls but can at some point level.
                        </Text>

                        <Text mb={4} fontSize={14} lineHeight="1.8rem">
                            This app is a data visualization tool that shows the number of confirmed, active, recovered, and death cases reported for each day and the cumulative figures overtime.
                        </Text>

                        <Text mb={4} fontSize={14} lineHeight="1.8rem">
                            The data can be filtered for each state in Nigeria, helping users understand the extent to which the numbers change from day to day, also showing the percentage difference from the previous day.
                        </Text>
                        <Text as="p" color="grey.300" mb={2} fontSize={12}>Data source: <Link textDecoration="underline" isExternal
                                                                                              href="https://ncdc.gov.ng/diseases/sitreps/?cat=14&name=An%20update%20of%20COVID-19%20outbreak%20in%20Nigeria">
                            Nigeria Centre for Disease Control (NCDC)</Link>
                        </Text>
                        <Text fontSize={12}>
                            Made with <span role="img" aria-label="Love">❤</span>️ by <Link textDecoration="underline" isExternal href="https://twitter.com/03balogun">Balogun
                            Wahab</Link> &copy; 2020
                            - <Link textDecoration="underline" isExternal href="https://github.com/03balogun/ncdc-covid-data-web">View source on github</Link>
                        </Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant="ghost" onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

About.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default About;
