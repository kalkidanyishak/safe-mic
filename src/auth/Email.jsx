import { useState, useEffect } from 'react';
import useFetch from './useFetch';
import SignUp from './SignUp';
import Login from './Login';
import { Activation } from './Activation';
import { Automatic } from './Automatic';
export const Email = () => {
    const { isLoading, data, error, fetchNow, fetch, resetFetch, changeEndPoint } = useFetch(`all/check/`);
    const [email, setEmail] = useState('')

    useEffect(() => {
        localStorage.removeItem('email')
        localStorage.removeItem('name')
    }, [])

    let submithandler = (e) => {
        e.preventDefault()
        changeEndPoint(`all/check/${email}/`)
        return fetchNow()
    }

    if (isLoading) {
        return <h1>is loading...</h1>
    }
    if (data) {
        if (data.data.is_active) {
            localStorage.setItem('email', email)
            return <Login email={email} />
        }
        else {
            if (data.data.no_user) {
                return <SignUp email={email} />
            }
            return <Activation email={email} />
        }
    }
    if (error) {
        // console.log(error)
    }

    return (
        <div>
            <form onSubmit={submithandler}>
                <input onChange={(event) => setEmail(event.target.value)} placeholder='email' type="email" value={email} required />
                <input type="submit" value="submit" />
            </form>
            {data ? <div>{data.is_active}</div> : <div>no data</div>}
            {fetch && <div>{JSON.stringify(data?.data)}</div>}
        </div>
    )
}