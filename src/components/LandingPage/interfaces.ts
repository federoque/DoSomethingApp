export interface SignInForm {
    email?: string
    password?: string
}

export interface User {
    email: string
    password: string,
    birthdate?: string
    name?: string
    lastname?: string
    log: boolean
}