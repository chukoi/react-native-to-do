import React from 'react'
import { Dimensions } from 'react-native'
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PanGestureHandlerProps
} from 'react-native-gesture-handler'
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS
} from 'react-native-reanimated'
import { Box } from 'native-base'
import { makeStyledComponent } from '../utils/styled'

const StyledView = makeStyledComponent(Animated.View)

interface Props extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
  children: React.ReactNode
  backView?: React.ReactNode
  onSwipeLeft?: () => void
}

const {width: WIDTH } = Dimensions.get('window')
const THRESHOLD = -WIDTH * 0.2

const SwipeLeftView = (props: Props) => {
  const { children, backView, onSwipeLeft } = props
  const x = useSharedValue(0)

  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: event => {
      x.value = Math.max(-128, Math.min(0, event.translationX))
    },
    onEnd: () => {
      const dismissed = x.value < THRESHOLD
      if (dismissed) {
        x.value = withTiming(-WIDTH / 2)
        onSwipeLeft && runOnJS(onSwipeLeft)()
      } else {
        x.value = withTiming(0)
      }
    }
  })

  const style = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: x.value
      }
    ]
  }))

  return (
    <StyledView w="full">
      {backView && (
        <Box position="absolute" left={0} right={0} top={0} bottom={0}>
          {backView}
        </Box>
      )}
      <PanGestureHandler
        onGestureEvent={panGesture}
      >
        <StyledView style={style}>{children}</StyledView>
      </PanGestureHandler>
    </StyledView>
  )
}

export default SwipeLeftView
