import React, { useCallback } from 'react'
import { PanGestureHandlerProps } from 'react-native-gesture-handler'
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native'
import { Box, Checkbox, HStack, Icon, Input, Text } from 'native-base'
import SwipeLeftView from './SwipeLeftView'
import { Feather } from '@expo/vector-icons'
import { ToDoType } from '../types/todo'
import { makeStyledComponent } from '../utils/styled'
import { View } from 'moti'

const StyledView = makeStyledComponent(View)

interface AnimatedToDoProps
  extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
  data: ToDoType
  isEditing: boolean
  onToggleItem: (item: ToDoType) => void
  onChangeSubject: (item: ToDoType, newSubject: string) => void
  onFinishEditing: (item: ToDoType) => void
  onPressLabel: (item: ToDoType) => void
  onRemove: (item: ToDoType) => void
}

export const AnimatedToDo = (props: AnimatedToDoProps) => {
  const {
    simultaneousHandlers,
    data,
    isEditing,
    onToggleItem,
    onChangeSubject,
    onFinishEditing,
    onPressLabel,
    onRemove
  } = props
  const handleToggleCheckbox = useCallback(() => {
    onToggleItem(data)
  }, [data, onToggleItem])
  const handleChangeSubject = useCallback(
    subject => {
      onChangeSubject(data, subject)
    },
    [data, onChangeSubject]
  )
  const handleFinishEditing = useCallback(() => {
    onFinishEditing(data)
  }, [data, onFinishEditing])
  const handlePressLabel = useCallback(() => {
    onPressLabel(data)
  }, [data, onPressLabel])
  const handleRemove = useCallback(() => {
    onRemove(data)
  }, [data, onRemove])
  return (
    <StyledView
      w="full"
      from={{
        opacity: 0,
        scale: 0.5,
        marginBottom: -46
      }}
      animate={{
        opacity: 1,
        scale: 1,
        marginBottom: 0
      }}
      exit={{
        opacity: 0,
        scale: 0.5,
        marginBottom: -46
      }}
    >
      <ToDo
        simultaneousHandlers={simultaneousHandlers}
        subject={data.subject}
        isDone={data.done}
        isEditing={isEditing}
        onToggleCheckbox={handleToggleCheckbox}
        onChangeSubject={handleChangeSubject}
        onFinishEditing={handleFinishEditing}
        onPressLabel={handlePressLabel}
        onRemove={handleRemove}
      />
    </StyledView>
  )
}

interface ToDoProps extends PanGestureHandlerProps {
  isEditing: boolean
  isDone: boolean
  onToggleCheckbox?: () => void
  onPressLabel?: () => void
  onRemove?: () => void
  onChangeSubject?: (subject: string) => void
  onFinishEditing?: () => void
  subject: string
}

const ToDo = (props: ToDoProps) => {
  const {
    isEditing,
    isDone,
    onToggleCheckbox,
    subject,
    onPressLabel,
    onRemove,
    onChangeSubject,
    onFinishEditing
  } = props

  const handleChangeSubject = useCallback(
    (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
      onChangeSubject && onChangeSubject(e.nativeEvent.text)
    },
    [onChangeSubject]
  )

  return (
    <SwipeLeftView
      onSwipeLeft={onRemove}
      backView={
        <Box
          w="full"
          h="full"
          bg="red.500"
          alignItems="flex-end"
          justifyContent="center"
          pr={4}
        >
          <Icon color="white" as={<Feather name="trash-2" />} size="sm" />
        </Box>
      }
    >
      <HStack alignItems="center" w="full" px={4} py={2} bg="white">
        <Box
          width={30}
          height={30}
          mr={2}
          alignItems="center"
          justifyContent="center"
        >
          <Checkbox
            value=""
            isChecked={isDone}
            size="md"
            onChange={() => onToggleCheckbox && onToggleCheckbox()}
            aria-label="Done"
          />
        </Box>
        {isEditing ? (
          <Input
            placeholder="What do you want to do?"
            value={subject}
            variant="unstyled"
            fontSize={14}
            px={1}
            py={0}
            autoFocus
            blurOnSubmit
            onChange={handleChangeSubject}
            onBlur={onFinishEditing}
          />
        ) : (
          <Text
            color={isDone ? 'muted.400' : 'darkText'}
            strikeThrough={isDone}
            onPress={onPressLabel}
            px={1}
            py={0}
          >
            {subject}
          </Text>
        )}
      </HStack>
    </SwipeLeftView>
  )
}

export default ToDo
