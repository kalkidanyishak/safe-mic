import { useMutation, useQueryClient } from "react-query";
import { postData, useGet } from "../hooks/useDjango"
import { useGlobal } from "../hooks/useGlobal"
import { NotVerified } from "./NotVerfied";

export const Counselor = () => {
    const { isLoading, data, error } = useGet('counselor', 'counselor/counselor-profile/')

    const queryClient = useQueryClient();
    const mutation = useMutation((newData) => postData('counselor/counselor-profile/', newData), {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries('counselor');
        },
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        const { gender, bio, languages, specialities } = event.target.elements;

        mutation.mutate({
            gender: gender.value,
            bio: bio.value,
            languages: languages.value,
            specialities: specialities.value,
        });
    };


    if (isLoading) {
        return <h2>is loading...</h2>
    }
    if (error) {
        if (error.response.status == 500) {
            return (
                (
                    <form onSubmit={handleSubmit}>
                        <label>Gender</label>
                        <input type="text" name="gender" />
                        <label>Bio</label>
                        <input type="text" name="bio" />
                        <label>Languages</label>
                        <input type="text" name="languages" />
                        <label>Specialties</label>
                        <input type="text" name="specialities" />
                        <button type="submit">Update Profile</button>
                    </form>
                )
            )
        }
        return <h2>{error.message}</h2>
    }
    if (data) {
        if(data.data.verified==false){
            return <NotVerified/>
        }
    }

    return (<
        h2>hello {useGlobal().name}</h2>
    )
}

