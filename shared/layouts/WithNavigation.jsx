import { ChevronDownIcon, ChevronRightIcon, CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import NextLink from 'next/link'

import {
  Box,
  Button,
  Collapse,
  Container,
  Flex,
  Icon,
  IconButton,
  Link,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { useAuth } from '../contexts/Auth'

export default function WithNavigation({ children }) {
  const { isOpen, onToggle } = useDisclosure()
  const { data, isSigned } = useAuth()

  return (
    <>
      <Flex justifyContent="center">
        <Container maxW="container.lg">
          <Box>
            <Flex
              bg={useColorModeValue('white', 'gray.800')}
              color={useColorModeValue('gray.600', 'white')}
              minH={'60px'}
              py={{ base: 2 }}
              px={{ base: 4 }}
              borderBottom={1}
              borderStyle={'solid'}
              borderColor={useColorModeValue('gray.200', 'gray.900')}
              align={'center'}>
              <Flex
                flex={{ base: 1, md: 'auto' }}
                ml={{ base: -2 }}
                display={{ base: 'flex', md: 'none' }}>
                <IconButton
                  onClick={onToggle}
                  icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
                  variant={'ghost'}
                  aria-label={'Toggle Navigation'}
                />
              </Flex>
              <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
                <Text
                  textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
                  fontFamily={'heading'}
                  color={useColorModeValue('gray.800', 'white')}>
                  Next-Pocket
                </Text>

                <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
                  <DesktopNav />
                </Flex>
              </Flex>

              <Stack flex={{ base: 1, md: 0 }} justify={'flex-end'} direction={'row'} spacing={6}>
                {isSigned ? (
                  <Flex>
                    <Text fontSize="lg" pr="4">
                      {data.username}
                    </Text>
                    <Button
                      display={{ base: 'none', md: 'inline-flex' }}
                      fontSize={'sm'}
                      fontWeight={600}
                      variant={'link'}
                      bg={'pink.400'}
                      color={'white'}
                      p="2"
                      _hover={{
                        bg: 'pink.300',
                      }}
                      href={'/api/auth/logout'}>
                      Sign Out
                    </Button>
                  </Flex>
                ) : (
                  <Button
                    display={{ base: 'none', md: 'inline-flex' }}
                    fontSize={'sm'}
                    fontWeight={600}
                    variant={'link'}
                    bg={'pink.400'}
                    color={'white'}
                    p="2"
                    _hover={{
                      bg: 'pink.300',
                    }}
                    href={'/api/auth/login'}>
                    Sign In
                  </Button>
                )}
              </Stack>
            </Flex>
            <Collapse in={isOpen} animateOpacity>
              <MobileNav />
            </Collapse>
          </Box>
        </Container>
      </Flex>
      <Flex justifyContent="center">
        <Container pt="8" pb="8" maxW="container.lg">
          <Flex py={{ base: 2 }} px={{ base: 4 }}>
            <Box w="100%">{children}</Box>
          </Flex>
        </Container>
      </Flex>
    </>
  )
}

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200')
  const linkHoverColor = useColorModeValue('gray.800', 'white')
  const popoverContentBgColor = useColorModeValue('white', 'gray.800')

  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map(navItem => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? '#'}
                fontSize={'sm'}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}>
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                rounded={'xl'}
                minW={'sm'}>
                <Stack>
                  {navItem.children.map(child => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  )
}

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <NextLink href={href} as={href}>
      <Link
        role={'group'}
        display={'block'}
        p={2}
        rounded={'md'}
        _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
        <Stack direction={'row'} align={'center'}>
          <Box>
            <Text transition={'all .3s ease'} _groupHover={{ color: 'pink.400' }} fontWeight={500}>
              {label}
            </Text>
            <Text fontSize={'sm'}>{subLabel}</Text>
          </Box>
          <Flex
            transition={'all .3s ease'}
            transform={'translateX(-10px)'}
            opacity={0}
            _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
            justify={'flex-end'}
            align={'center'}
            flex={1}>
            <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
          </Flex>
        </Stack>
      </Link>
    </NextLink>
  )
}

const MobileNav = () => {
  return (
    <Stack bg={useColorModeValue('white', 'gray.800')} p={4} display={{ md: 'none' }}>
      {NAV_ITEMS.map(navItem => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  )
}

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? '#'}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}>
        <Text fontWeight={600} color={useColorModeValue('gray.600', 'gray.200')}>
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}>
          {children &&
            children.map(child => (
              <NextLink href={child.href} as={child.href}>
                <Link key={child.label} py={2}>
                  {child.label}
                </Link>
              </NextLink>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  )
}

const NAV_ITEMS = [
  {
    label: 'Home',
    href: '/',
    children: [
      {
        label: 'Home Page',
        subLabel: 'Pellentesque eget lectus tristique neque efficitur mattis ut a ligula',
        href: '/',
      },
    ],
  },
  {
    label: 'My Articles',
    href: '/my-list',
    children: [
      {
        label: 'Pocket Articles List',
        subLabel: 'Morbi cursus a sapien eu tempus.',
        href: '/my-list',
      },
      {
        label: 'Pocket Articles List (with Redux)',
        subLabel: 'An exclusive list for contract work',
        href: '/articles-redux',
      },
    ],
  },
  {
    label: 'Tags',
    href: '#',
  },
  {
    label: 'Counter',
    href: '/counter',
  },
]
