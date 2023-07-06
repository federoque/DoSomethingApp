import { Container } from 'react-bootstrap'
import { User } from '../../context/interfaces'
import { useUser } from '../../context/hooks'
import { actions } from '../../context/interfaces'
import Swal from 'sweetalert2'
import { Dropdown } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from './Header.module.css'


const Header = () =>{
    const {user, userDispatch} = useUser()
    const navigate = useNavigate()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSignOut = (e:any) =>{
        e.preventDefault()
        const users = localStorage.getItem("users")
        if(users){
            Swal.fire({
                icon: "question",
                title: 'Do you want to Sign Out?',
                showCancelButton: true,
                confirmButtonText: 'Yes'
              }).then((result) => {
                if (result.isConfirmed) {
                    const usersArray: User[] = JSON.parse(localStorage.getItem("users") as string)
                    const logUserLocalStorage = usersArray.find((user:User)=> user.log == true)
                    const indexOfUser: number = usersArray.indexOf(logUserLocalStorage as User)
                    usersArray[indexOfUser].log = false
                    localStorage.setItem("users", JSON.stringify(usersArray))
                    userDispatch({type: actions.SIGN_OUT, payload: {...logUserLocalStorage, log: false} as User})
                }
              })
        }
    }
    
    const handleHome = (e:any) =>{
        e.preventDefault()
        navigate('/Home')
      }

    const handleActivitiesToDo = (e: any) =>{
        e.preventDefault()
        navigate('/ActivitiesToDo')
    }



    const age = String(Math.floor((new Date().getTime() - new Date(user.birthdate as string).getTime())/(31557600000)))

    return(
        <div>
            <div>
            <Container className={styles.header} style={{zIndex:10}}>
                <Dropdown >
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                        Menu
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{minWidth:"22vw"}}>
                        <p className={styles.user}>User: {user.name + " " + user.lastname}</p>
                        <p className={styles.user}>Email: {user.email}</p>
                        <p className={styles.user}>Age: {age}</p>
                        <Dropdown.Divider />
                        <Dropdown.Item as="button" onClick={handleHome}>Home</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={handleActivitiesToDo}>Activities to Do</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item as="button" onClick={handleSignOut}>Sign Out!</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                </Container>
            </div>
            <Container>
                <h1 className={styles.title}>DoSomething App</h1>
            </Container>
        </div>
    )
}

export default Header