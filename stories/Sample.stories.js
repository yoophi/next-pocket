import React from 'react'

import { Box, Flex } from '@chakra-ui/react'

export const Sample = () => {
  return (
    <Flex>
      <Box p="4" bg="orange.100">
        Hello, world
      </Box>
      <Box p="4" bg="orange.200">
        Hello, world
      </Box>
      <Box p="4" bg="orange.300">
        Hello, world
      </Box>
      <Box p="4" bg="orange.400">
        Hello, world
      </Box>
    </Flex>
  )
}

export default {
  title: 'ChakraUI/Sample',
  component: Sample,
}

const Template = args => <Sample {...args} />
