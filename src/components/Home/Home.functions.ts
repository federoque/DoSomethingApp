/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Activity, ApiRequest } from './Home.interfaces'
// @ts-ignore
import busywork from '../../images/busywork.svg'
// @ts-ignore
import charity from '../../images/charity.svg'
// @ts-ignore
import cooking from '../../images/cooking.svg'
// @ts-ignore
import diy from '../../images/diy.svg'
// @ts-ignore
import education from '../../images/education.svg'
// @ts-ignore
import music from '../../images/music.svg'
// @ts-ignore
import recreational from '../../images/recreational.svg'
// @ts-ignore
import social from '../../images/social.svg'
// @ts-ignore
import relaxation from '../../images/relaxation.svg'


const getTypeImage = (type:string) =>{
    switch(type){
        case 'busywork': return busywork
        break
        case 'charity': return charity
        break
        case 'cooking': return cooking
        break
        case 'diy': return diy
        break
        case 'education': return education
        break
        case 'music': return music
        break
        case 'recreational': return recreational
        break
        case 'social': return social
        break
        case 'relaxation': return relaxation
        break
        default: return null
    }
}
export default {
    async getActivity(type: string, participants: string): Promise<Activity | null>{
        if(!type && !participants){
            const request = await fetch('http://www.boredapi.com/api/activity')
            const requestJSON: ApiRequest = await request.json() as unknown as ApiRequest
            const activity: Activity = {
                ...requestJSON,
                image: getTypeImage(requestJSON.type)
            }
        return activity
        }
        if(type && participants) {
            const request = await fetch(`http://www.boredapi.com/api/activity?participants=${participants}&type=${type}`)
            const requestJSON: ApiRequest = await request.json() as unknown as ApiRequest
            if(requestJSON.error) return null
            const activity: Activity = {
                ...requestJSON,
                image: getTypeImage(requestJSON.type)
            }
        return activity
        }
        if(type) {
            const request = await fetch(`http://www.boredapi.com/api/activity?type=${type}`)
            const requestJSON: ApiRequest = await request.json() as unknown as ApiRequest
            if(requestJSON.error) return null
            const activity: Activity = {
                ...requestJSON,
                image: getTypeImage(requestJSON.type)
            }
        return activity
        }
        if(participants) {
            const request = await fetch(`http://www.boredapi.com/api/activity?participants=${participants}`)
            const requestJSON: ApiRequest = await request.json() as unknown as ApiRequest
            if(requestJSON.error) return null
            const activity: Activity = {
                ...requestJSON,
                image: getTypeImage(requestJSON.type)
            }
        return activity 
        }
        return null
    }
}