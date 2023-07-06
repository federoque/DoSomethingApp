export interface ApiRequest{
    accessibility: number
    activity: string
    key: string
    link: string
    participants: number
    price: number
    type: string
    email?: string
    error?: string
}

export interface Activity extends ApiRequest{
    image: string
}