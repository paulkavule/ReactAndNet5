import { createContext, useContext } from "react";
import ActivityStore from "./ActivityStore";
import CommonStore from "./CommonStore";

interface Store{
    activityStore :ActivityStore;
    commonStore: CommonStore;
}

// initialize the store
export const store : Store = {
    activityStore : new ActivityStore(),
    commonStore: new CommonStore()
}

// attach the store to the context
export const StoreContext = createContext(store);

export function useStore(){
    // return the created store
    return useContext(StoreContext)
}