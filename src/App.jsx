import { useState } from 'react'
import {QueryClientProvider, QueryClient} from 'react-query'
import { Authen } from './auth/Authen'


const queryClient=new QueryClient()

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <QueryClientProvider client={queryClient}>
      <Authen/>
    </QueryClientProvider>
    </>
  )
}

export default App
