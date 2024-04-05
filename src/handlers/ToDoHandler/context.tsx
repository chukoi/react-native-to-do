import * as React from 'react'
import { Dispatch, SetStateAction } from 'react'
import { Todo } from '../../types/todo'

export interface IToDoContextValue {
  data: Array<Todo>
  editingItemId: string | null
  handleToggleToDo: (item: Todo) => void
  handleChangeToDoSubject: (item: Todo, subject: string) => void
  handleFinishEditingToDo: (item: Todo) => void
  handlePressToDoLabel: (item: Todo) => void
  handleRemoveItem: (item: Todo) => void
  newToDo: () => void
}

/**
 * Provides the customer's payment method
 */
export const ToDoContext = React.createContext<IToDoContextValue>({
  data: undefined,
  editingItemId: undefined,
  handleToggleToDo: undefined,
  handleChangeToDoSubject: undefined,
  handleFinishEditingToDo: undefined,
  handlePressToDoLabel: undefined,
  handleRemoveItem: undefined,
  newToDo: undefined
})
