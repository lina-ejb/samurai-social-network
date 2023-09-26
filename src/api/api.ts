import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': 'c70e6b83-08ab-41dc-971c-869230aaf2da'
    }
})

export type GetUsersResponseType = {
    aboutMe: string,
    userId: number,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string
    contacts: {
        github: string
        vk: string,
        facebook: string,
        instagram: string,
        twitter: string,
        website: null
        youtube: null,
        mainLink: null,
    }
    photos: {
        small: string
        large: string
    }
}

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then((response) => {
                return response.data
            })
    },
    getProfile(userId: string) {
        return instance.get<GetUsersResponseType>(`profile/${userId}`)

    },
    getLogUserIn() {
        return instance.get('auth/me')
    },
    deleteFollower(id: number) {
        return instance.delete(`follow/${id}`, {withCredentials: true})
    },
    addFollower(id: number) {
        return instance.post(`follow/${id}`)
    }
}

