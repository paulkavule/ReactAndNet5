import { createContext, useContext } from "react";
import ActivityStore from "./ActivityStore";
import CommonStore from "./CommonStore";
import ModalStore from "./ModalStore";
import UserStore from "./userStore";

interface Store{
    activityStore :ActivityStore;
    commonStore: CommonStore;
    userStore: UserStore,
    modalStore: ModalStore
}

// initialize the store
export const store : Store = {
    activityStore : new ActivityStore(),
    commonStore: new CommonStore(),
    userStore : new UserStore(),
    modalStore: new ModalStore()
}

// attach the store to the context
export const StoreContext = createContext(store);

export function useStore(){
    // return the created store
    return useContext(StoreContext)
}