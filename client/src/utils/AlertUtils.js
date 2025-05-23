import Swal from 'sweetalert2'

export const showAlert = (responseData, onSuccess = () => {}, onSetData = () => {}) => {
    const payload = responseData?.data

    if(payload?.success) {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: payload?.message,
            showConfirmButton: false,
            timer: 3000,
            customClass: {
                title: 'text-xl font-semibold'
            }
        })       
        onSuccess() // Call the onSuccess callback  
        onSetData(payload)    
    }
    else {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: payload?.message,
            showConfirmButton: false,
            timer: 3000,
            customClass: {
                title: 'text-xl font-semibold'
            }
        })
    }
}

export const showErrorAlert = (error) => {
    Swal.fire({
        position: 'center',
        icon: 'error',
        title: error?.response?.data?.message,
        showConfirmButton: false,
        timer: 3000,
        customClass: {
            title: 'text-xl font-semibold'
        }
    })
}