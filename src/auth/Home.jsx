import { useGet } from "../hooks/useDjango"
import { useAtom, atom } from "jotai"
import { useGlobal } from "../hooks/useGlobal"
import { Counselor } from "../counselor/Counselor"
import { Student } from "../student/Student"

const userAtom=atom({})
export const Home=(props)=>{
    if(props.data){
        localStorage.setItem('access', props.data.access)
        localStorage.setItem('refresh', props.data.refresh)
        localStorage.setItem('loggedIn', 'true')
    }
    const {data:user}= useGet('userdata', 'auth/users/me/')
    const userId=user?.data.id
    const {isLoading, data, error}=useGet(['userdata',userId],`all/users/${userId}/`,)
    
    if(isLoading){
        return <h2>is loading...</h2>
    }
    if(error){
        return <h2>{error.message}</h2>
    }
    if(data){
        console.log(data.data)
        useGlobal(data.data)
        if(data.data.is_student){
            return <Student/>
        }
        return <Counselor/>
    }

    return (
        <div>
            hello world
            <button onClick={()=>(localStorage.removeItem('loggedIn'), location.reload())}>
                logout
            </button>
        </div>
    )
}