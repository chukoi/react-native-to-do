import React from 'react'
import { NativeBaseProvider } from 'native-base'
import theme from './src/theme'
import MainScreen from './src/screens/MainScreen'
import { ToDoHandler } from './src/handlers/ToDoHandler'

interface AppProps {
  children: React.ReactNode
}

const App: React.FC<AppProps> = ({ children }) => {
  return (
    <NativeBaseProvider theme={theme}>
      <ToDoHandler>
        <MainScreen />
      </ToDoHandler>
    </NativeBaseProvider>
  )
}

export default App
