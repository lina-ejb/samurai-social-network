const ADD_TASK = 'ADD-TASK'
const CHANGE_TEXT = 'CHANGE-TEXT'

export type PostType = {
    _id: number
    message: string
    likeCounter: number
}
export type ProfilePageType = {
    posts: Array<PostType>
    newPostMessage: string

}
const initialState: ProfilePageType = {
    newPostMessage: '',
    posts: [
        {_id: 1, message: 'What\'s on your mind?', likeCounter: 25},
        {_id: 2, message: "Hey mate! How are things going?", likeCounter: 5},
    ],
}
type ActionType = AddPostTypeAC | ChangeTextTypeAC
export const profileReducer = (state: ProfilePageType = initialState, action: ActionType): ProfilePageType => {
    switch (action.type) {

        case ADD_TASK:
            let postMessage = state.newPostMessage
            return {
                ...state,
                newPostMessage: '',
                posts: [{_id: new Date().getTime(), message: postMessage, likeCounter: 3}, ...state.posts]
            }

        case  CHANGE_TEXT:
            return {
                ...state,
                newPostMessage: action.text
            }

        default:
            return state

    }
}

export type AddPostTypeAC = ReturnType<typeof addPostAC>
export const addPostAC = () => {

    return {
        type: ADD_TASK,
    } as const
}
export type ChangeTextTypeAC = ReturnType<typeof newTextAC>
export const newTextAC = (text: string) => {
    return {
        type: CHANGE_TEXT,
        text
    } as const
}