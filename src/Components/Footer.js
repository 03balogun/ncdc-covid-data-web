import Flex from "@chakra-ui/core/dist/Flex";
import Text from "@chakra-ui/core/dist/Text";
import Link from "@chakra-ui/core/dist/Link";
import Box from "@chakra-ui/core/dist/Box";
import React from "react";

export default () => (
    <Box as="footer"
         p={4}
         justifyContent="flex-end"
         h="4rem"
    >
        <Flex justifyContent="space-between" alignItems="center" h="100%" pr={4} pl={4}>
            <Flex direction="column">
                <Text as="p" mb={2} fontSize={12}>Data source: <Link isExternal
                                                                     href="https://ncdc.gov.ng/diseases/sitreps/?cat=14&name=An%20update%20of%20COVID-19%20outbreak%20in%20Nigeria">
                    Nigeria Centre for Disease Control (NCDC)</Link>
                </Text>
                <Text fontSize={12}>
                    Made with <span role="img" aria-label="Love">❤</span>️ by <Link isExternal href="https://twitter.com/03balogun">Balogun
                    Wahab</Link> &copy; 2020
                    - <Link href="#">View source on github</Link>
                </Text>
            </Flex>
        </Flex>
    </Box>)
