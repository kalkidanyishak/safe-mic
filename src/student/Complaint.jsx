import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { postData } from '../hooks/useDjango';

// Your mutation function
const submitComplaint = async (newComplaint) => {
  const response = await axios.post('/api/complaints', newComplaint);
  return response.data;
};

export const Complaint=()=> {
  const queryClient = useQueryClient();
  const mutation = useMutation((newComplaint)=>postData('complaint/complaints/',newComplaint), {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries('complaints');
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const { tag, body } = event.target.elements;

    mutation.mutate({
      tag: tag.value,
      body: body.value,
    });
  };

  if (mutation.isLoading) {
    return <span>Submitting...</span>;
  }

  if (mutation.isError) {
    console.log(mutation.error)
    return <span>Error: {mutation.error.message}</span>;
  }



  return (
    <form onSubmit={handleSubmit}>
      <label>
        Tag:
        <input type="text" name="tag" />
      </label>
      <label>
        Body:
        <textarea name="body" />
      </label>
      <button type="submit">Submit Complaint</button>
    </form>
  );
}


let obj = {
    grade_issue: 'grade issue',
    harassment_teacher: 'harassment - teacher',
    harassment_student: 'harassment - student',
    bullied: 'bullied',
    lounge: 'lounge',
    other: 'other'

}