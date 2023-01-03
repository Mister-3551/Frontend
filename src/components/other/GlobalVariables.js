import { createContext, useContext, useState } from 'react';

const updateContext = createContext({
    update: null,
    setUpdate: () => {},
});

export const useUpdate = () => useContext(updateContext);

export default function GlobalVariables({children}) {

    const [update, setUpdate] = useState(false);

    return (
        <updateContext.Provider value={{ update, setUpdate}}>
            {children}
        </updateContext.Provider>
    );
};