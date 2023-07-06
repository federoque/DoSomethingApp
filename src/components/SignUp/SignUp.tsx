import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { useUser } from '../../context/hooks'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';
import { SignUpForm } from './interfaces';
import { User } from './interfaces';
import Swal from 'sweetalert2';
import { actions } from '../../context/interfaces';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from './SignUp.module.css'

export default function SignUp() {
    const {user, userDispatch} = useUser()
    const logUser: boolean = user.log
    const navigate = useNavigate()

    const [formValues, setFormValues] = useState<SignUpForm>({
        email: '',
        name: '',
        lastname: '',
        birthdate: '',
        password: '',
        repeatPassword: ''
    })

    // Habilita o desabilita el Boton submit
    const validateSubmit: boolean = (!/^^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(formValues.email as string) || formValues.name == '' || formValues.lastname == '' || formValues.birthdate == '' || !/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(formValues.password as string) || formValues.password != formValues.repeatPassword) && true

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSignUp = (e: any) =>{
        e.preventDefault()
        const user: User = {
            email: formValues.email as string,
            name: formValues.name,
            lastname: formValues.lastname,
            birthdate: formValues.birthdate,
            password: formValues.password as string,
            log: false
        }
        const savedUsers = localStorage.getItem("users")
        if(!savedUsers){
        localStorage.setItem("users", JSON.stringify([user]))
        Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'User created',
          })
        return setTimeout(()=> navigate('/'), 1500)
    } else{
        const savedUsersArray: User[] = JSON.parse(savedUsers)
        if(savedUsersArray.find((user:User)=> user.email == formValues.email)){
            setFormValues(prev=>{
                return{
                    ...prev,
                    email: ''
                }
            })
            return Swal.fire({
                icon: 'error',
                title: 'Oops... Email already exist!',
                text: 'Try with another',
              })
        }
        localStorage.setItem("users", JSON.stringify([...savedUsersArray, user]))
        Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'User created',
          })
        return setTimeout(()=> navigate('/'), 1500)
    }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function handleFormChange(e: any){
        e.preventDefault()
        setFormValues((previous: SignUpForm)=>{
            return{
                ...previous,
                [e.target.name]: e.target.value
            }
        })
    }
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSignIn = (e:any) =>{
        e.preventDefault()
        navigate('/')
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
        <Form className={`row g-1 ${styles.Form}`} >
        <h2 className={styles.title}>Sign Up!</h2>
          <Form.Group className="xs-1" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control placeholder="Enter email" name='email' value={formValues.email} onChange={handleFormChange} isInvalid={formValues.email == '' ? false : !/^^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(formValues.email as string) && true} />
            <div className="invalid-feedback">
                Should be an email
            </div>   
          </Form.Group>

          <Form.Group className="xs-1">
            <Form.Label>Name</Form.Label>
            <Form.Control placeholder="Enter your name" name='name' value={formValues.name} onChange={handleFormChange}/>
          </Form.Group>

          <Form.Group className="xs-1">
            <Form.Label>Lastname</Form.Label>
            <Form.Control placeholder="Enter your lastname" name='lastname' value={formValues.lastname} onChange={handleFormChange}/>
          </Form.Group>

          <Form.Group className="xs-1">
            <Form.Label>Birthdate</Form.Label>
            <Form.Control type="date" placeholder="Enter your birthdate" name='birthdate' value={formValues.birthdate} onChange={handleFormChange}/>
          </Form.Group>

          <Form.Group className="xs-1" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" name='password' value={formValues.password} onChange={handleFormChange} isInvalid={formValues.password == '' ? false : !/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(formValues.password as string) && true}/>
            <div className="invalid-feedback">
             Password must have between 8 and 16 characters, at least one digit, at least one lower case and at least one upper case. 
            </div>
          </Form.Group>

          <Form.Group className="xs-1" controlId="formBasicPassword">
            <Form.Label>Repeat Password</Form.Label>
            <Form.Control type="password" placeholder="Repeat Password" name='repeatPassword' value={formValues.repeatPassword} onChange={handleFormChange} isInvalid={formValues.password == formValues.repeatPassword || formValues.repeatPassword == '' ? false : true}/>
            <div className="invalid-feedback">
            Wrong repeated Password!
            </div>
          </Form.Group>
            <div style={{display:"flex", flexDirection:"column"}} className={styles.buttonGroup}>
            <Button className= {styles.button} variant="primary" type="submit" disabled= {validateSubmit} onClick={handleSignUp}>
              Submit
            </Button>
            <Button className= {styles.button} variant="primary" type="submit" onClick={handleSignIn}>
              Sign In!
            </Button>
            </div>
        </Form>
      </Container>
    )
}