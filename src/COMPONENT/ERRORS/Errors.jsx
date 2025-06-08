

import React from 'react'

function Errors({refetch}) {
    return <>
    

    <div className=' bg-dark d-flex justify-content-center align-items-center p-4'>
        
        <div className=' bg-white shadow d-flex justify-content-center align-items-center flex-column p-3 w-75'>
                <i className="fa-solid fa-triangle-exclamation fa-3x mb-3" style={{ color: "#dc3545" }}></i>
                <h2 className=' fs-4 text-danger'>حدث خطأ أثناء استعادة البيانات</h2>
                <p className=' text-secondary'>يرجى التحقق من الاتصال بالإنترنت والمحاولة مرة أخرى.</p>
                <button onClick={() => refetch()} className="btn btn-danger px-4 mt-4">
                <i className="fa-solid fa-rotate-right me-2"></i>
                إعادة المحاولة
                </button>
        </div>
    </div>
    
    </>
}

export default Errors
