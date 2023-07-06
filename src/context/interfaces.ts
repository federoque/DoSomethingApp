export interface Activity {
    accessibility: number
    activity: string
    key: string
    link: string
    participants: number
    price: number
    type: string
    image: string
    email: string
}

export interface User {
    email: string
    password: string,
    birthdate?: string
    name?: string
    lastname?: string
    log: boolean
}

export interface State {
    activities: Activity[]
    user: User 
}

export enum actions {
    ADD_ACTIVITY = 'ADD_ACTIVITY',
    DELETE_ACTIVITY = 'DELETE_ACTIVITY',
    SIGN_IN = 'SIGN_IN',
    SIGN_OUT = 'SIGN_OUT'
}

export interface Actions {
    type: actions,
    payload: Activity | User 
}