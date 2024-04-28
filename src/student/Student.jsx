import { useGlobal } from "../hooks/useGlobal"
import { Complaint } from "./Complaint"
import { ListComplaints } from "./ListComplaints"
import { ListCounselors } from "./ListCounselors"

export const Student=()=>{
    return (
        <>
        <h2>hello {useGlobal().name}</h2>
        <Complaint/>
        <ListCounselors/>
        <ListComplaints/>
        </>
    )
}