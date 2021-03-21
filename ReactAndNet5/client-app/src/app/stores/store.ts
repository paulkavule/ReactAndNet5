import { createContext, useContext } from "react";
import ActivityStore from "./ActivityStore";

interface Store{
    activityStore :ActivityStore
}

// initialize the store
export const store : Store = {
    activityStore : new ActivityStore()
}

// attach the store to the context
export const StoreContext = createContext(store);

export function useStore(){
    // return the created store
    return useContext(StoreContext)
}