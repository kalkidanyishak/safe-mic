import React, { useState } from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';
import Login from './Login';

export const PasswordConfirm=(props)=>{
  const [uid, setUid] = useState(props.uid);
  const [token, setToken] = useState(props.token);
  const [newPassword, setNewPassword] = useState('');
  const [reNewPassword, setReNewPassword] = useState('');
  

  const mutation = useMutation((data) => axios.post('http://localhost:8000/auth/users/reset_password_confirm/', data));
  console.log(uid)

  const handleSubmit = (event) => {
    event.preventDefault();

    mutation.mutate({
      uid,
      token,
      new_password: newPassword,
      re_new_password: reNewPassword,
    });
  };
  if(mutation.isLoading){
    return <h2>loading...</h2>
  }
  if(mutation.isSuccess){
    return <Login email={props.email}/>
  }
  return (
    <form onSubmit={handleSubmit}>
        <div>reset password for {props.email}</div>
      <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New Password" required />
      <input type="password" value={reNewPassword} onChange={(e) => setReNewPassword(e.target.value)} placeholder="Confirm New Password" required />
      <button type="submit">Reset Password</button>
    </form>
  );
}

