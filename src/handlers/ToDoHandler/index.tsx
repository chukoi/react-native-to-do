import * as React from 'react'
import { useCallback, useMemo, useState } from 'react'
import shortid from 'shortid'
import { IToDoContextValue, ToDoContext } from './context'

const initialData = [
  {
    id: shortid.generate(),
    subject: 'Buy movie tickets for Friday',
    done: false
  },
  {
    id: shortid.generate(),
    subject: 'Make a React Native tutorial',
    done: false
  }
]

interface IToDoHandlerProps {
  children: any
}

export const ToDoHandler: React.FC<IToDoHandlerProps> = ({ children }) => {
  const [data, setData] = useState(initialData)
  const [editingItemId, setEditingItemId] = useState<string | null>(null)

  const handleToggleToDo = useCallback(item => {
    setData(prevData => {
      const newData = prevData.map(i => {
        if (item.id === i.id) i.done = !item.done
        return i
      })
      return newData
    })
  }, [])

  const handleChangeToDoSubject = useCallback((item, newSubject) => {
    setData(prevData => {
      const newData = prevData.map(i => {
        if (item.id === i.id) i.subject = newSubject
        return i
      })
      return newData
    })
  }, [])

  const handleFinishEditingToDo = useCallback(_item => {
    setEditingItemId(null)
  }, [])

  const handlePressToDoLabel = useCallback(item => {
    setEditingItemId(item.id)
  }, [])

  const handleRemoveItem = useCallback(item => {
    setData(prevData => {
      const newData = prevData.filter(i => i !== item)
      return newData
    })
  }, [])

  const newToDo = () => {
    const id = shortid.generate()
    setData([
      {
        id,
        subject: '',
        done: false
      },
      ...data
    ])
    setEditingItemId(id)
  }

  const provider: IToDoContextValue = useMemo(
    () => ({
      data,
      editingItemId,
      handleToggleToDo,
      handleChangeToDoSubject,
      handleFinishEditingToDo,
      handlePressToDoLabel,
      handleRemoveItem,
      newToDo
    }),
    [
      data,
      editingItemId,
      handleToggleToDo,
      handleChangeToDoSubject,
      handleFinishEditingToDo,
      handlePressToDoLabel,
      handleRemoveItem,
      newToDo
    ]
  )

  return (
    <ToDoContext.Provider value={provider}>{children}</ToDoContext.Provider>
  )
}
