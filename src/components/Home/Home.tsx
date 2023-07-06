import { useState, useEffect } from 'react'
import { Activity } from './Home.interfaces'
import HomeFunctions from './Home.functions'
import Loader from '../Loader/Loader'
import { useActivity, useUser } from '../../context/hooks'
import { actions }  from '../../context/interfaces'
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import { Container, Button } from 'react-bootstrap'
import Header from '../Header/Header'
import Filters from '../Filters/Filters'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from './Home.module.css'

const Home = () => {
    const {activities, activityDispatch} = useActivity()
    const { user } = useUser()
    const logUser: boolean = user.log

    const [ activity, setActivity ] = useState <Activity | null> (null)
    const [type, setType] = useState<string>("")
    const [participants, setParticipants] = useState<string>("")

    const navigate = useNavigate()

    const handleRefresh = async () =>{
        setActivity(null)
        const newActivity = await HomeFunctions.getActivity(type, participants)
        if (!newActivity) return setActivity({
            accessibility: 0,
            activity: '',
            key: '',
            link: '',
            participants: 0,
            price: 0,
            type: '',
            email: '',
            error: "error",
            image: ''
        })
        setParticipants("")
        return setActivity(newActivity)
    }
    useEffect(() => {
        if (!logUser) {
          navigate("/");
        }
      });

    useEffect(() => {
        const request = async()=>{
            const newActivity = await HomeFunctions.getActivity(type, participants)
            setActivity(newActivity)
        }
        request()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ navigate ])
    
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleAddActivity = (e:any) =>{
        e.preventDefault()
        if(activities.find((act:Activity)=> act.key == (activity as Activity).key && act.email == user.email)){
            return Swal.fire("Ooops!",'Activity already exist in "Activities to do" List. Try with another', "error" )
        }
        activityDispatch( { type:actions.ADD_ACTIVITY, payload: {...activity as Activity, email: user.email as string}} )
        return Swal.fire("Success!",'Activity saved on your "Activities to Do!" List', "success" )
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleType = (e:any) =>{
        e.preventDefault()
        setType(e.target.value)
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleParticipants = (e:any) =>{
        e.preventDefault()
        if(Number(e.target.value)<1) return setParticipants("1")
        setParticipants(e.target.value)
    }

    if(!logUser) return

    if(activity?.error){
        return (
            <Container>
            <Header />
            <Filters type={type} participants={participants} handleType={handleType} handleParticipants={handleParticipants} handleRefresh={handleRefresh}/>
            <div className={styles.main}>
                <div className={ styles.activity }>
                    <h4>Can not find any activity</h4>
                    <h5>Try with antoher Type or number of participants</h5>
                </div>
                <div className={styles.button}>
                    <Button onClick={handleAddActivity} disabled={true} size='lg'>Add Activity</Button>
                </div>
            </div>
        </Container>
        )
    }
    return (
        !activity ? 
        <Container>
            <Header />
            <Filters type={type} participants={participants} handleType={handleType} handleParticipants={handleParticipants} handleRefresh={handleRefresh}/>
            <div className={styles.main}>
                <div className={ styles.activity }>
                    <Loader />
                </div>
                <div className={styles.button}>
                    <Button onClick={handleAddActivity} size='lg'>Add Activity</Button>
                </div>
            </div>
        </Container>
         :
        <Container>
            <Header />
            <Filters type={type} participants={participants} handleType={handleType} handleParticipants={handleParticipants} handleRefresh={handleRefresh}/>
            <div className={styles.main}>
                <div className={ styles.activity }>
                    <h4>Activity: {activity?.activity}</h4>
                    <h5>Type: {activity?.type.charAt(0).toLocaleUpperCase() + activity?.type.slice(1)}</h5>
                    <p className={styles.participants}>Participants: {activity?.participants}</p>
                    <img className={styles.image} src={activity?.image} alt="Activity image" />
                </div>
                <div className={styles.button}>
                    <Button onClick={handleAddActivity} size='lg'>Add Activity</Button>
                </div>
            </div>
        </Container>
    )
}

export default Home