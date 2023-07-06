import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { useUser } from '../../context/hooks'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';
import { SignInForm, User } from './interfaces';
import Swal from 'sweetalert2';
import { actions } from '../../context/interfaces';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from './LandingPage.module.css'

export default function LandingPage() {
    const {user, userDispatch} = useUser()
    const logUser: boolean = user.log
    const navigate = useNavigate()

    const [formValues, setFormValues] = useState<SignInForm>({
      email:'',
      password:''
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSignUp = (e:any) =>{
      e.preventDefault()
      navigate('/SignUp')
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function handleFormChange(e: any){
      e.preventDefault()
      setFormValues((previous: SignInForm)=>{
          return{
              ...previous,
              [e.target.name]: e.target.value
          }
      })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (e:any) => {
    e.preventDefault()
    const users = localStorage.getItem("users")
    if(!users){
      return Swal.fire({
        icon: 'error',
        title: 'Oops... User does not exist!',
        text: 'Try with another',
      })
    } else{
      const usersArray: User[] = JSON.parse(localStorage.getItem("users") as string)
      if(!usersArray.find((user: User)=> user.email == formValues.email)){
        Swal.fire({
          icon: 'error',
          title: 'Oops... User does not exist!',
          text: 'Try with another',
        })
        setFormValues((previous: SignInForm)=>{
          return{
            ...previous,
            email: '',
            password: ''
          }
      })
      }
      if(usersArray.find((user: User)=> user.email == formValues.email && formValues.password != user.password)){
        Swal.fire({
          icon: 'error',
          title: 'Oops... Wrong password!',
          text: 'Try again',
        })
        setFormValues((previous: SignInForm)=>{
          return{
            ...previous,
            password: ''
          }
      })
      }
      if(usersArray.find((user: User)=> user.email == formValues.email && formValues.password == user.password)){
        const setUser : User = usersArray.find((user: User)=> user.email == formValues.email && formValues.password == user.password) as User
        const userIndex: number = usersArray.indexOf(setUser)
        usersArray[userIndex].log = true
        localStorage.setItem("users", JSON.stringify(usersArray)) 
        userDispatch({type: actions.SIGN_IN, payload: {...setUser, log: true}})
      }
    }
  } 

    useEffect(() => {
        const users = localStorage.getItem("users")
        if(users){
          const usersArray: User[] = JSON.parse(localStorage.getItem("users") as string)
          const logUserLocalStorage = usersArray.find((user:User)=> user.log == true)
          if(logUserLocalStorage){
            userDispatch({type: actions.SIGN_IN, payload: logUserLocalStorage})
          }
        }
        if (logUser) {
          navigate("/Home");
        }
      });

    return(
      <Container className={styles.container}>
        <h1 className={styles.title}>DoSomething App</h1>
        <Form className={`row g-1 ${styles.Form}`} >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control placeholder="Enter email" name="email" value={formValues.email} onChange={handleFormChange}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" name="password" value={formValues.password} onChange={handleFormChange}/>
          </Form.Group>
          <div className={styles.buttonGroup}>
            <Button className= {styles.button} variant="primary" type="submit" onClick={handleSubmit} disabled={!formValues.email && true}>
              Submit
            </Button>
            <Button className= {styles.button} variant="primary" type="submit" onClick={handleSignUp}>
              Sign Up!
            </Button>
            </div>
        </Form>
      </Container>
    )
}