import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const UserRedirect = () => {
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const onSubmit = (e) => {
        e.preventDefault()
        setPassword('')
    }

    useEffect(() => {
       fetch('http://localhost:5080/auth/reset-password/:token', {
        method: 'post',
        password
       })
    }, [password])

    const userMoveToDashboard = () => {
        navigate('/dashboard')
    }
    

  return (
    <div className='h-screen'>
     <form className='h-96 w-96 flex flex-col' onSubmit={onSubmit}>
        <input type='password' placeholder='please Enter your password'
         onChange={(e) => setPassword(e.target.value)}  value={password} className='px-3 py-5'/>
        <button onClick={userMoveToDashboard} className='px-5 py-7 bg-amber-600'>Change</button>
     </form>
    </div>
  )
}

export default UserRedirect
