/* eslint-disable @typescript-eslint/no-explicit-any */
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from './Filter.module.css'

interface filterProps{
    type:string
    participants:string
    handleType: (e: any) => void
    handleParticipants: (e: any) => void
    handleRefresh: (e:any) => void
}
const Filters = ({type, participants , handleType, handleParticipants, handleRefresh}: filterProps) =>{
    return(
        <Container className={styles.container}>
            <strong>Next Activity</strong>
            <div className={styles.forms}>
            <Form.Group className="mb-1">
                <Form.Select value={type} onChange={handleType}>
                    <option value="">Select Type</option>
                    <option value="busywork">Busywork</option>
                    <option value="charity">Charity</option>
                    <option value="cooking">Cooking</option>
                    <option value="diy">Diy</option>
                    <option value="education">Education</option>
                    <option value="music">Music</option>
                    <option value="recreational">Recreational</option>
                    <option value="social">Social</option>
                    <option value="relaxation">Relaxation</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-1">
                <Form.Control placeholder='Participants' type="number" value={participants} onChange={handleParticipants} className={styles.participants}/>
            </Form.Group>
            </div>
            <Button onClick={handleRefresh} >Search</Button>
        </Container>
    )
}

export default Filters