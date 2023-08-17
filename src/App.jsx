import { Suspense, useState } from 'react'
import './App.scss'
import { HeroContainer } from './containers'

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <HeroContainer />
            </Suspense>
        </>
    )
}

export default App
