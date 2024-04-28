import axios from 'axios';
import { useState } from "react";
import { useMutation, useQueryClient } from 'react-query';
import { Email } from './Email';
import { ResetPass } from './Resetpass';
import { Home } from './Home';

export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailPage, setEmailPage] = useState(false)
    const [passPage, setPassPage] = useState(false)
    const [isLoggedIn, setIsLoggedIn]=useState(false)
    const [data, setData]=useState({})

    useState(() => {
        setEmail(props.email)
        window.history.replaceState({}, "", "/");
        localStorage.setItem('email',props.email)
    }, [])


    const queryClient = useQueryClient();

    const mutation = useMutation((data) => axios.post('http://localhost:8000/auth/jwt/create/', data), {
        onSuccess: (data) => {
            queryClient.invalidateQueries('users');
            console.log(data)
            setData(data.data)
            setIsLoggedIn(true)
        },
    });

    const submitHandler = (e) => {
        e.preventDefault();
        let data = { email, password };
        mutation.mutate(data);
    };

    if(isLoggedIn){
        return <Home data={data}/>
    }


    let button = {
        background: 'none',
        border: '1px solid black',
        marginRigt: '20px',
        textAlign: 'left',
        marginBottom: '10px',
        width: '200px',
        padding: '5px',
        borderRadius: '30px',
    }
    if (mutation.isError) {
        if (mutation.error?.response?.status == 401) {
            console.log('wrong password')
        }
        if (mutation.error?.code == 'ERR_NETWORK') {
            console.log('net error')
        }
    }
    if (passPage) {
        return <ResetPass email={email} />
    }
    return (
        <>
            {emailPage ?
                <Email />
                :
                <div>
                    <button style={{ ...button, border: 'none' }}> <span>login page</span></button> <button onClick={() => setEmailPage(true)} style={{ ...button, textAlign: 'center' }}> <span>use another email</span></button>
                    <form onSubmit={submitHandler}>
                        <input onChange={(event) => setEmail(event.target.value)} placeholder='email' type="text" value={email} required /><br></br>
                        <input onChange={(event) => setPassword(event.target.value)} placeholder='password' type="password" value={password} required /><br></br>
                        <input type="submit" value="submit" /><br></br>

                        {mutation.isLoading && <div>Loading...</div>}
                        {mutation.error?.response?.status == 401 && <div> you entered a wrong password try again or <button onClick={() => setPassPage(true)}>reset password</button> </div>}
                        {mutation.error?.code == 'ERR_NETWORK' && <div>connect to a network and try again</div>}
                    </form>
                </div>
            }
        </>
    );
};

export default Login;
