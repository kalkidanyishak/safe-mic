import { useGet } from "../hooks/useDjango"

export const ListCounselors=({onCounselorChange, counselor})=>{
    const { isLoading, data, error } = useGet('counselors', 'counselor/counselors/')

    if(isLoading){
        return <h2>is loading counselors</h2>
    }
    if(error){
        return <h2>{error.message}</h2>
    }
    return (
        <>
        {data?.data.map((val)=><div style={{border:'1px solid red', margin:'5px'}} key={val.id}>
            <div>{val.username}</div>
            <div>{val.bio}</div>
            <em>{val.gender}</em>
            <button onClick={()=>onCounselorChange(val.id)} disabled={counselor==val.id}>choose</button>
            </div>)}
        </>
    )

}