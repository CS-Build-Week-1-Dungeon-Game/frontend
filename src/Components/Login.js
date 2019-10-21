import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom'


const Container = styled.div`

`

const Header = styled.div`

`

const Title = styled.h1`

`

const LoginPrompt = styled.span`

`

const Form = styled.form`

`

const Username = styled.input`

`

const Password = styled.input`

`

const Button = styled.button`

`

const SignUp = styled.div`

`



export default function Login(props) {
    const [user, setUser] = useState({ username: "", password: "" })

    function inputHandler(event) {
        const updatedUser = { ...user, [event.target.name]: event.target.value };
        setUser(updatedUser);
      }
      
    function submitHandler(event) {
        event.preventDefault();
        axios.post(`https://lambda-mud-test.herokuapp.com/api/login/`, user)
          .then(res => {
            if (res.status === 200 && res.data) {
              const token = res.data.key
              localStorage.setItem('token', `Token ${token}`)
              props.history.push('/world')
            }
          })
          .catch(err => {
            if (err) console.log(err)
          })
        }  

        return (
              <Container>

                    <Header>
                      <Title>Build Team 27</Title>
                        <LoginPrompt>Please Login</LoginPrompt>
                    </Header>

                    <Form onSubmit={submitHandler}>

                      <Username 
                          type="text"
                          id="username" 
                          name="username" required
                          placeholder="username"
                          value={user.username}
                          onChange={inputHandler}
                          />
                      
                      <Password 
                          type="password"
                          id="password" 
                          name="password" required 
                          placeholder="password"
                          value={user.password}
                          onChange={inputHandler}
                          />

                      <Button type="submit">Submit</Button>

                    </Form>

                      <SignUp> or Sign up <Link to = '/register'> Here </Link></SignUp>
                
              </Container>
            );
          }