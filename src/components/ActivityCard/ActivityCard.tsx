import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useActivity } from '../../context/hooks';
import { actions, Activity } from '../../context/interfaces';
import Swal from 'sweetalert2';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from './ActivityCard.module.css'

interface CardActivity  {
    accessibility: number
    activity: string
    id: string
    link: string
    participants: number
    price: number
    type: string
    image: string
    email: string
}

const ActivityCard = ({accessibility, activity, id, link, participants, price, type, image, email}: CardActivity) => {
    const { activityDispatch } = useActivity()
    const payloadActivity: Activity = {
        accessibility,
        activity,
        key:id,
        link,
        participants,
        price,
        type,
        image,
        email
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleDelete = (e:any) =>{
        e.preventDefault()
        Swal.fire({
            icon: "error",
            title: 'Would you like to remove this activity?',
            showCancelButton: true,
            confirmButtonText: 'Yes'
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          }).then((result: any) => {
            if (result.isConfirmed) {
                activityDispatch( {type:actions.DELETE_ACTIVITY, payload: payloadActivity} )
            }
          })

    }
  return (
    <Card className={styles.card}>
        <Button className= {styles.button} variant="danger" size="sm" onClick={handleDelete}>X</Button>
        <Card.Img style={window.visualViewport?.width as number < 700 ? {width:"15vw"} : {}} variant="top" src={image} />
        <Card.Body>
            <Card.Title>{activity}</Card.Title>
            <Card.Text>
            Number of participants: {participants} <br />
            Type: {type.charAt(0).toUpperCase() + type.slice(1)}
            </Card.Text>
        </Card.Body>
    </Card>
  );
}

export default ActivityCard;