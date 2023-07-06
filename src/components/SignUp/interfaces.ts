export interface SignUpForm {
    email?: string
    name?: string
    lastname?: string
    birthdate?: string
    password?: string
    repeatPassword?: string
}

export interface User {
    email: string
    password: string,
    birthdate?: string
    name?: string
    lastname?: string
    log: boolean
}