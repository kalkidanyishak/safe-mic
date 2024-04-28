import useFetch from "./useFetch";

export const ResetPass=(props)=>{
    const { isLoading, data, error, fetchNow, fetch, resetFetch, changeEndPoint } = useFetch(`auth/users/reset_password/`, true,'POST', {email:props.email});

    if (isLoading) {
        return <h1>reseting passsword</h1>
    }
    if (data) {
        if(data.status==204){
            return <div>password reset link sent check your email address at {props.email}</div>
        }
    }
    if (error) {
        // console.log(error)
    }

    return (
        <div>
            reset password
        </div>
    )
}