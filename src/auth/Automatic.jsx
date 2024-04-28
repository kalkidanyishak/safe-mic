import { Activation } from "./Activation";
import Login from "./Login";
import SignUp from "./SignUp";
import useFetch from "./useFetch";

export const Automatic = (props) => {
    const { isLoading, data, error, fetchNow, fetch, resetFetch, changeEndPoint } = useFetch(`all/check/${props.email}/`, true);

    if (isLoading) {
        return <h1>is loading... automatic</h1>
    }
    if (data) {
        console.log(data.data)
        if (data.data.is_active) {
            return <Login email={props.email} />
        }
        else {
            if (data.data.no_user) {
                return <SignUp email={props.email} />
            }
            return <Activation email={props.email} />
        }
    }
    if (error) {
        // console.log(error)
    }

}