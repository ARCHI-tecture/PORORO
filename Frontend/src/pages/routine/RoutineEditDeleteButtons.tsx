import React from 'react'

export const RoutineEditDeleteButtons = () => {

    
    localStorage.removeItem('userName')

    return (
    <>
        <button>수정</button>
        <button>삭제</button>
    </>
  )
}
