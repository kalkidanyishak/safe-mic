import { ListCounselors } from "./ListCounselors"
import { calendar } from '../utils/calendar'
import { useState } from "react"
import { useMutation, useQueryClient } from "react-query";
import { postData, useGet } from "../hooks/useDjango";

export const SetAppointment = () => {
    const [counselor, setCounselor] = useState('')
    const [appoint, setAppoint] = useState('')

    const { isLoading, data, error, refetch } = useGet(['appointments', counselor], `counselor/appointment-times/${counselor}/`)


    const queryClient = useQueryClient();
    const mutation = useMutation((newComplaint)=>postData('counselor/appointments/',newComplaint), {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries('appointments');
      },
    });
  
    const sendHandler = () => {

        if(counselor!=''&& appoint!=''){
            mutation.mutate({
              counselor,
              appointment_datetime:appoint
            });
        }
  
    };
  
    if (mutation.isLoading) {
      return <span>send...</span>;
    }
  
    if (mutation.isError) {
      console.log(mutation.error)
      return <span>Error: {mutation.error.message}</span>;
    }

    if(error){
        console.log(error)
    }
    let occupied=(data)=>typeof(data.data)=='object'?data.data.map(a => a.appointment_datetime):[];
    if(data){
        console.log('..................dsasd',occupied(data))
    }

    let handleCounselorChange=(newState)=>{
        setCounselor(newState)
        refetch()
    }

    return (
        <div>
            {isLoading?'loading':
            <>
            <ListCounselors counselor={counselor} onCounselorChange={handleCounselorChange} />
            <div style={{ border: '1px solid black' }}>
                {calendar(occupied(data)).map((week, i) => (
                    <div key={i}>
                        <div>week {i + 1}</div>
                        {week.map((day, j) => (
                            <div key={j * i || Math.random()}>
                                <div>day {day[j].dayName}</div>
                                {['morning', 'afternoon'].map(period => (
                                    <div className={period} key={period}>
                                        {day.filter(appoint => appoint.isMorning === (period === 'morning')).map((appoint, k) => (
                                            <button onClick={()=>setAppoint(appoint.isoDate)} key={`${i * j * k || Math.random()}`} disabled={appoint.disabled}>
                                                {appoint.text}
                                            </button>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <button onClick={sendHandler}>send</button>
            </>
            }
        </div>
    )
}
