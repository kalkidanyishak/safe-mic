import { useGet } from "../hooks/useDjango"

export const CounselorById = ({ id }) => {
    const { isLoading, data, error } = useGet('counselors', 'counselor/counselors/')

    if (isLoading) {
        return <h2>is loading counselors</h2>
    }
    if (error) {
        return <h2>{error.message}</h2>
    }
    let byId = (data) => data?.data.filter((a) => a.id == id)
    if (data) {

        return <div>
            {(byId(data)).map((val, i) => (
                <div key={i}>
                    <div>{val.username}</div>
                    <div>{val.bio}</div>
                    <em>{val.gender}</em>
                </div>
            ))}
        </div>
    }
}