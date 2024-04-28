import { useGet } from "../hooks/useDjango"

export const ListComplaints=()=>{
    const { isLoading, data, error } = useGet('complaints', 'complaint/complaints/')
    

    if(isLoading){
        return <h2>is loading...</h2>
    }
    if(error){
        return <h2>{error.message}</h2>
    }
    if(data){
        console.log('complaints...........',data.data)
    }
    return (
        <div>
            {data?.data.map((val)=><div key={val.id}>
                {val.body}
            </div>)}
        </div>
    )
}