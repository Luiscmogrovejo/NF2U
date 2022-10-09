import {
    Box,
    Container,
    Link,
    SimpleGrid,
    Stack,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';

const Logo = (props) => {
    return (
        <img
            src={"/image/logo_nf2u.png"}
            alt="nf2u"
            width={200}
            height={75}
        />
    );
};

const ListHeader = ({ children }) => {
    return (
        <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
            {children}
        </Text>
    );
};

export default function LargeWithLogoLeft() {
    return (
        <Box
            bg={useColorModeValue('gray.50', 'gray.900')}
            color={useColorModeValue('gray.700', 'gray.200')}>
            <Container as={Stack} maxW={'6xl'} py={10}>
                <SimpleGrid
                    templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 1fr 1fr' }}
                    spacing={8}>
                    <Stack spacing={6}>
                        <Box>
                            <Logo color={useColorModeValue('gray.700', 'white')} />
                        </Box>
                        <Text fontSize={'sm'}>
                            © Powered by XMTP on messaging experience
                        </Text>
                        <Text fontSize={'sm'}>
                            We are using chackra-ui for the frontend
                        </Text>
                    </Stack>
                    <Stack align={'flex-start'}>
                        <ListHeader><Text as='b'>Chain Sponsors</Text></ListHeader>
                        <Link href={'https://www.optimism.io/'}>Optimism</Link>
                        <Link href={'https://scroll.io/'}>Scroll</Link>
                        <Link href={'https://polygon.technology/'}>Polygon</Link>
                        <Link href={'https://goerli.net/'}>Goüerli</Link>
                    </Stack>
                    <Stack align={'flex-start'}>
                        <ListHeader><Text as='b'>Sponsor Tools</Text></ListHeader>
                        <Link href={'https://www.quicknode.com/'}>Quicknode</Link>
                        <Link href={'https://xmtp.com/'}>XMTP</Link>
                        <Link href={'https://chain.link/'}>Chainlink</Link>
                        <Link href={'https://www.superfluid.finance/'}>Superfluid</Link>
                    </Stack>
                </SimpleGrid>
            </Container>
        </Box>
    );
}
