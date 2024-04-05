import React, { useContext } from 'react'
import { Fab, Icon, VStack } from 'native-base'
import { AntDesign } from '@expo/vector-icons'
import { SafeAreaView } from 'moti'
import { ToDoContext } from '../handlers/ToDoHandler/context'
import ToDoList from "../components/ToDoList";

export default function MainScreen() {
  const {
    data,
    editingItemId,
    handleToggleToDo,
    handleChangeToDoSubject,
    handleFinishEditingToDo,
    handlePressToDoLabel,
    handleRemoveItem,
    newToDo
  } = useContext(ToDoContext);

  return (
    <VStack flex={1}>
      <SafeAreaView />
      <ToDoList
        data={data}
        onToggleItem={handleToggleToDo}
        onChangeSubject={handleChangeToDoSubject}
        onFinishEditing={handleFinishEditingToDo}
        onPressLabel={handlePressToDoLabel}
        onRemoveItem={handleRemoveItem}
        editingItemId={editingItemId}
      />
      <Fab
        position="absolute"
        renderInPortal={false}
        size="sm"
        icon={<Icon color="white" as={<AntDesign name="plus" />} size="sm" />}
        bg={'blue.500'}
        onPress={newToDo}
      />
    </VStack>
  )
}
