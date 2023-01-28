import * as React from "react"
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  Grid,
  theme,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Stack,
  StackDivider,
  Input,
  InputGroup,
  InputRightAddon,
  Button,
  Fade,
  createLocalStorageManager,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { useEffect } from "react"
import { useDisclosure } from "@chakra-ui/react-use-disclosure"

const manager = createLocalStorageManager('dutchpay-jwlee')

export const App = () => {
  const [지불자, 지불자변경] = React.useState(0)
  const [총지불금액, 총지불금액변경] = React.useState(0)
  const [인원수, 인원수변경] = React.useState(0)
  const [결과, 결과변경] = React.useState(0)
  const { isOpen, onToggle } = useDisclosure()

  useEffect(() => {
    결과변경(Math.ceil(총지불금액 / 인원수))
  }, [총지불금액, 인원수])

  const 결과임 = () => {
    if (결과 - 지불자 > 0) {
      return <>
        <Text as="b">{결과 - 지불자}원</Text>만 주면 됩니다.
      </>
    } else if (결과 - 지불자 < 0) {
      return <>
        <Text as="b">{지불자 - 결과}원</Text>을 더 받아야 합니다.
      </>
    } else {
      return <>
        <Text as="b">내거나 받아야 할 금액이 없습니다.</Text>
      </>
    }
  }


  return (
    <ChakraProvider theme={theme} colorModeManager={manager}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <Card>
              <CardHeader>
                <Heading size='md'>더치페이 계산기</Heading>
                <Text pt='2' fontSize='sm'>웹 더치페이 (각자내기, N빵) 계산기입니다. 한 명만 결제했을 때뿐만 아니라, 다수가 한 번에 결제했을 경우에도 계산할 수 있습니다.</Text>
                <Text fontSize='sm' pt='2' as='i'>아이폰/안드로이드에서 '홈 화면에 추가' 혹은 '현재 페이지 추가' 버튼을 누르면 휴대폰에 더치페이 계산기 앱을 설치할 수 있습니다.</Text>
              </CardHeader>
              <CardBody>
                <Stack divider={<StackDivider />} spacing='4'>
                  <Box>
                    <Text pt='2' fontSize='sm'>
                      총 지불 금액은&nbsp;
                      <InputGroup size='xs' w="40%" display="inline-flex">
                        <Input placeholder='총 지불 금액' onChange={(e) => { 총지불금액변경(Number(e.target.value)) }} />
                        <InputRightAddon children="원" />
                      </InputGroup>&nbsp;이고,<br/>
                      총 인원 수가&nbsp;
                      <InputGroup size='xs' w="40%" display="inline-flex">
                        <Input placeholder='총 인원 수' onChange={(e) => { 인원수변경(Number(e.target.value)) }} />
                        <InputRightAddon children="명" />
                      </InputGroup>&nbsp;일 때
                    </Text>
                  </Box>
                  <Box>
                    <Heading size='xs' textTransform='uppercase'>
                      결과
                    </Heading>
                    <Text pt='2' fontSize='sm'>
                      한 명이 지불해야 하는 금액은 <Text as="b">{결과}원</Text> 입니다.¹
                    </Text>
                  </Box>
                  <Box>
                    <Heading size='xs' textTransform='uppercase'>
                      만약 돈을 지불한 사람이 여러 명인가요?²
                    </Heading>
                    <Text pt='2' fontSize='sm' display="inline-block">
                      나는 <InputGroup size='xs' w="40%" display="inline-flex"><Input placeholder='지불한 금액' onChange={(e) => { 지불자변경(Number(e.target.value)) }} /><InputRightAddon children='원'/></InputGroup>
                      &nbsp;을 지불했습니다. <br/>
                      그래서 난 {결과임()}
                    </Text>
                  </Box>
                </Stack>
              </CardBody>
            </Card>
            <Text pt='4' fontSize="sm" color={"GrayText"}>
            ⁰ 어떻게 이런 값이 나온거죠? <Button size='xs' onClick={onToggle}>설명 보기</Button><br/>
                      <Fade in={isOpen}>
                        <Box
                          p='20px'
                          mt='4'
                          rounded='md'
                          shadow='md'
                        >
                          <Text fontSize='sm'>(총 지불 금액) ÷ (총 인원 수) = 원래 내야하는 금액¹ 이라고 하면,<br/>
                            (원래 내야하는 금액) - (어떤 사람이 돈을 지불한 액수)²가 양수이면 원래 내야하는 금액보다 덜 낸 것이기 때문에 돈을 뱉어내면 됩니다.<br/>
                            만약 음수라면 원래 내야하는 금액보다 더 금액을 지불한 것이므로, 그 차액을 받아야 합니다.
                        </Text>
                        </Box>
                      </Fade>
                    </Text>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  )  
}

