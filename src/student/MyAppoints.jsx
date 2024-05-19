import { useGet } from "../hooks/useDjango"
import { CounselorById } from "./CounselorById"

export const MyAppoints=()=>{
    const { isLoading, data, error } = useGet('my-appoints', 'counselor/appointments/')

    if(isLoading){
        return <h2>is loading...</h2>
    }
    if(error){
        return <h2>{error.message}</h2>
    }
    if(data){
        console.log('my appoints...........',data.data)
    }
    return (
        <div>
            {data?.data.map((val)=><div key={val.id}>
                {val.appointment_datetime}
                <div>
                    counselor: <CounselorById id={val.counselor}/>
                </div>
            </div>)}
        </div>
    )
}