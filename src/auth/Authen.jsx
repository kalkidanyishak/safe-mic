import { useEffect, useState } from "react"
import { Email } from "./Email"
import useFetch from "./useFetch"
import Login from "./Login"
import { Automatic } from "./Automatic"
import { PasswordConfirm } from "./PasswordConfirm"
import SignUp from "./SignUp"
import { Home } from "./Home"

export const Authen=(props)=>{
    const [uid, setUid]=useState('')
    const [token, setToken]=useState('')
    const [email, setEmail]=useState('')
    const [confirmPage, setConfirmPage]=useState(false)
    const [confirmUid,setConfirmUid ]=useState('')
    const [confirmToken,setConfirmToken ]=useState('')
    const [confirmEmail, setConfirmEmail]=useState('')
    const { isLoading, data, error, fetchNow, fetch, resetFetch, changeEndPoint } = useFetch(`auth/users/activation/`,false, 'POST', {uid, token});

    useEffect(()=>{
        let urlPath=window.location.pathname.split('/')
        if(urlPath[1]=='activate'){
            setUid(urlPath[2])
            setToken(urlPath[3])
            setEmail(urlPath[4])
            fetchNow()
        }
        if(urlPath[1]=='password' && urlPath[2]=='reset'){
            setConfirmUid(urlPath[4])
            setConfirmToken(urlPath[5])
            setConfirmEmail(urlPath[6])
            setConfirmPage(true)
        }
    }, [])

    if(localStorage.getItem('loggedIn')){
        return <Home />
    }else if(window.location.pathname=='/' && localStorage.getItem('email')){
        let myEmail=localStorage.getItem('email')
        if(localStorage.getItem('name')){
            return <SignUp email={myEmail} name={localStorage.getItem('name')}/>
        }
        return <Login email={myEmail}/>
    }

    if(confirmPage){
        return <PasswordConfirm uid={confirmUid} token={confirmToken} email={confirmEmail}/>
    }

    if(isLoading){
        return <h2>verifying email...</h2>
    }
    if(data){
        return <Login email={email}/>
    }
    if(error){
        if(error.code=='ERR_NETWORK'){
            return <h2>please connect to a network</h2>
        }
        if(error.response.status==400){
            window.history.replaceState({}, "", "/");
            return <Automatic email={email}/>
        }

        if(error.response.status==403){
            return <Login email={email}/>
        }
    }
    return (
        <div>
            <Email/>

        </div>
    )
}