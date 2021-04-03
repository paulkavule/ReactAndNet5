import { createContext, useContext } from "react";
import ActivityStore from "./ActivityStore";
import CommentStore from "./commentStore";
import CommonStore from "./CommonStore";
import ModalStore from "./ModalStore";
import ProfileStore from "./ProfileStore";
import UserStore from "./userStore";

interface Store{
    activityStore :ActivityStore;
    commonStore: CommonStore;
    userStore: UserStore,
    modalStore: ModalStore,
    profileStore: ProfileStore,
    commentStore : CommentStore
}

// initialize the store
export const store : Store = {
    activityStore : new ActivityStore(),
    commonStore: new CommonStore(),
    userStore : new UserStore(),
    modalStore: new ModalStore(),
    profileStore: new ProfileStore(),
    commentStore : new CommentStore()
}

// attach the store to the context
export const StoreContext = createContext(store);

export function useStore(){
    // return the created store
    return useContext(StoreContext)
}