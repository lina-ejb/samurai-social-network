import {addPostAC, newTextAC, ProfilePageType} from "../../../redux/profile-reducer";
import {MyPosts} from "./MyPosts";
import {connect} from "react-redux";
import {AppRootStateType} from "../../../redux/store";
import {Dispatch} from "redux";

type MapStatePropsType = {
    postsState: ProfilePageType
}
const mapStateToProps = (state: AppRootStateType): MapStatePropsType => {
    return {
        postsState: state.profile,
    }
}
type MapDispatchPropsType = {
    updateNewPostText: (text: string) => void
    addPost: () => void
}
export type PostsPropsType = MapDispatchPropsType & MapStatePropsType
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        updateNewPostText: (text: string) => {
            dispatch(newTextAC(text))
        },
        addPost: () => {
            dispatch(addPostAC())
        }
    }
}

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

