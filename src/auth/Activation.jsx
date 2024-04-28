import useFetch from "./useFetch";

export const Activation=(props)=>{
    const { isLoading, data, error, fetchNow, fetch, resetFetch, changeEndPoint } = useFetch(`auth/users/resend_activation/`,false, 'POST', {email:props.email});

    const clickHandler=()=>{
        return fetchNow()
    }
    if(data){
        return <h3>verification email sent please go check your email</h3>
    }
    return (
        <div>
            <h2>verification link sent to your email address: {props.email} ...{/*2 minutes ago*/} please verify your email</h2>
            <div>go check your email</div>
            <button onClick={clickHandler}>resend verification link</button>
        </div>
    )
}