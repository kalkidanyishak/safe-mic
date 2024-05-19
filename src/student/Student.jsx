import { useGlobal } from "../hooks/useGlobal"
import { Complaint } from "./Complaint"
import { ListComplaints } from "./ListComplaints"
import { MyAppoints } from "./MyAppoints"
import { SetAppointment } from "./SetAppointment"

export const Student=()=>{
    return (
        <>
        <h2>hello {useGlobal().name}</h2>
        <Complaint/>
        <ListComplaints/>
        <SetAppointment/>
        <MyAppoints/>
        </>
    )
}