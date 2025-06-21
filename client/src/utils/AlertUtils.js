import Swal from 'sweetalert2'

export const showAlert = (
    responseData, 
    onSuccess = () => {}, 
    onSetData = () => {}, 
    showSuccess = true // Add a flag to show success message
) => {
    const data = responseData?.data

    if(data?.success) {
        if(showSuccess){
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: data?.message,
                showConfirmButton: false,
                timer: 3000,
                customClass: {
                    title: 'text-xl font-semibold'
                }
            })
        }               
        onSuccess() // Call the onSuccess callback  
        onSetData(data)    
    }
    else {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: data?.message,
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