import { useGet } from "../hooks/useDjango"

export const ListCounselors=()=>{
    const { isLoading, data, error } = useGet('counselors', 'counselor/counselors/')

    if(isLoading){
        return <h2>is loading counselors</h2>
    }
    if(error){
        return <h2>{error.message}</h2>
    }
    if(data){
        console.log(data.data)
    }
    return (
        <>
        {data?.data.map((val)=><div key={val.id}>
            <h2>{val.username}</h2>
            <div>{val.bio}</div>
            <em>{val.gender}</em>
            </div>)}
        </>
    )

}