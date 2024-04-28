import axios from 'axios';
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from 'react-query';
import { Activation } from './Activation';
import { Email } from './Email';

export const SignUp = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailPage, setEmailPage]=useState(false)

    useEffect(() => {
        setEmail(props.email)
        setName(props.name||'')
        localStorage.setItem('email',props.email)
        localStorage.setItem('name', name)
    }, [])

    useEffect(()=>{
        localStorage.setItem('name', name)
    },[name])

    
    const queryClient = useQueryClient();

    const mutation = useMutation((data) => axios.post('http://localhost:8000/auth/users/', data), {
        onSuccess: () => {
            queryClient.invalidateQueries('user');
        },
    });

    const submitHandler = (e) => {
        e.preventDefault();
        let data = { name, email, password, re_password:password };
        mutation.mutate(data);
    };
    if(mutation.isSuccess){
        return <Activation email={email} />
    }
    let button={
        background:'none',
        border:'1px solid black',
        marginRigt:'20px',
        textAlign:'left',
        marginBottom:'10px',
        width:'200px',
        padding:'5px',
        borderRadius:'30px',
    }
    return (
        <>
        {emailPage?<Email/>
        :
        <div>
             <button style={{...button,border:'none'}}> <span>Signup page</span></button><button onClick={()=>setEmailPage(true)} style={{...button, textAlign:'center'}}> <span>use another email</span></button>

            <form onSubmit={submitHandler}>
                <input onChange={(event) => setEmail(event.target.value)} placeholder='email' type="text" value={email || props.email} required /><br></br>
                <input onChange={(event) => setName(event.target.value)} placeholder='name' type="text" value={name} required /><br></br>
                <input onChange={(event) => setPassword(event.target.value)} placeholder='password' type="password" value={password} required /><br></br>
                <input type="submit" value="submit" />

                {mutation.isLoading && <div>Loading...</div>}
                {mutation.error?.response?.status==401 && <div> you entered a wrong password try again</div>}
                {mutation.error?.code=='ERR_NETWORK' && <div>connect to a network and try again</div>}
            </form>
        </div>
        }
        </>
    );
};

export default SignUp;
