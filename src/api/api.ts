import axios, {AxiosResponse} from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': 'c70e6b83-08ab-41dc-971c-869230aaf2da'
    }
})

// api

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then((response) => {
                return response.data
            })
    },
    getProfile(userId: string) {
        return profileAPI.getProfile(userId)
    },

    deleteFollower(id: number) {
        return instance.delete(`follow/${id}`, {withCredentials: true})
    },
    addFollower(id: number) {
        return instance.post(`follow/${id}`)
    }
}

export const profileAPI = {
    getProfile(userId: string) {
        return instance.get<GetUsersResponseType>(`profile/${userId}`)
    },
    getStatus(userId: string) {
        return instance.get<any>(`profile/status/${userId}`)
    },
    updateStatus(status: string) {
        return instance.put<ResponseStatusType<{ data: string }>>('profile/status/', {status: status})
    }
}

export const authAPI = {
    login(params: LoginParamsType) {
        return instance.post<ResponseStatusType<{ userId: number }>>('auth/login', params)
    },
    logOut() {
        return instance.delete<ResponseStatusType<{ userId: number }>, AxiosResponse<ResponseStatusType<{
            userId: number
        }>>, any>('auth/login')
    },
    me() {
        return instance.get('auth/me')
    },
}

// types

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

export type ResponseStatusType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}