/* eslint-disable @typescript-eslint/ban-ts-comment */

import {useEffect} from 'react'
import { useActivity, useUser } from "../../context/hooks"
import ActivityCard from "../ActivityCard/ActivityCard"
import { Activity } from "../../context/interfaces"
import Header from "../Header/Header"
import { useNavigate } from "react-router-dom";
import { actions, User } from "../../context/interfaces";
import { Container } from 'react-bootstrap'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from './ActivitiesToDo.module.css'
// @ts-ignore
import noActivities from '../../images/noActivities.svg'


const ActivitiesToDo = () =>{
    const { user, userDispatch } = useUser()
    const { activities } = useActivity()
    const logUser: boolean = user.log
    const navigate = useNavigate()

    useEffect(() => {
        const users = localStorage.getItem("users")
        if(users){
          const usersArray: User[] = JSON.parse(localStorage.getItem("users") as string)
          const logUserLocalStorage = usersArray.find((user:User)=> user.log == true)
          if(logUserLocalStorage){
            userDispatch({type: actions.SIGN_IN, payload: logUserLocalStorage})
          }else{
            navigate("/")
          }
        }
      }, [navigate, logUser, userDispatch]);


    if(!logUser) return

    return(
        <Container>
          <Header />
          <h2 className={styles.title}>Activities to Do!</h2>
          <div className={styles.cards}>
          {activities.filter((activity:Activity)=> activity.email == user.email).length == 0
          ?
          <div className={styles.noActivities}>
          <h4 >There are no saved activities to show<br />List one from home!</h4>
          <img  className={styles.noActivitiesImage} src={noActivities} alt="No Activities saved" />
          </div>
          :
          activities.filter((activity:Activity)=> activity.email == user.email).map((activity:Activity)=> {
              return(
                  <ActivityCard key={activity.key} accessibility={activity.accessibility} id={activity.key} activity={activity.activity}  link={activity.link} participants={activity.participants} price={activity.price} type={activity.type} image={activity.image} email={activity.email} />
              )
          })}
          </div>
        </Container>
    )
}

export default ActivitiesToDo