import React, { useCallback, useRef } from 'react'
import { AnimatePresence, View } from 'moti'
import {
  PanGestureHandlerProps,
  ScrollView
} from 'react-native-gesture-handler'
import { makeStyledComponent } from '../utils/styled'
import {ToDoType} from "../types/todo";
import {AnimatedToDo} from "./ToDo";

const StyledScrollView = makeStyledComponent(ScrollView)

interface ToDoListProps {
  data: Array<ToDoType>
  editingItemId: string | null
  onToggleItem: (item: ToDoType) => void
  onChangeSubject: (item: ToDoType, newSubject: string) => void
  onFinishEditing: (item: ToDoType) => void
  onPressLabel: (item: ToDoType) => void
  onRemoveItem: (item: ToDoType) => void
}

export default function ToDoList(props: ToDoListProps) {
  const {
    data,
    editingItemId,
    onToggleItem,
    onChangeSubject,
    onFinishEditing,
    onPressLabel,
    onRemoveItem
  } = props

  return (
    <StyledScrollView w="full">
      <AnimatePresence>
        {data.map(item => (
          <AnimatedToDo
            key={item.id}
            data={item}
            isEditing={item.id === editingItemId}
            onToggleItem={onToggleItem}
            onChangeSubject={onChangeSubject}
            onFinishEditing={onFinishEditing}
            onPressLabel={onPressLabel}
            onRemove={onRemoveItem}
          />
        ))}
      </AnimatePresence>
    </StyledScrollView>
  )
}
