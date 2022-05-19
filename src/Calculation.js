import React, { createContext, useState } from 'react';
import Display from './Display';
import Buttons from './Buttons';

export const textC = createContext()
export const setTextC = createContext()

function Calculation() {
    const [text, setText] = useState([""])

    return (
        <div>
            <textC.Provider value={text}>
                <setTextC.Provider value={setText}>
                    <Display />
                    <Buttons />
                </setTextC.Provider>
            </textC.Provider>
        </div>
    )
}

export default Calculation