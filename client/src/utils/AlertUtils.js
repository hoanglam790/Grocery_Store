import Swal from 'sweetalert2'

// Show alert message
export const showAlert = async(
    responseData,
    {
        onSuccess = () => {},
        onFail = () => {},
        onSetData = () => {},
        showSuccess = true
    } = {}
) => {
    // Get data
    // If responseData.data exists => Use responseData.data
    // Otherwise use responseData directly
    const data = responseData?.data ?? responseData

    // Check if fetch data is successful
    if(data?.success) {
        if(showSuccess) {
            await Swal.fire({
                position: 'center',
                icon: 'success',
                title: data?.message || 'Successful',
                showConfirmButton: false,
                timer: 3000,
                customClass: {
                    title: 'text-xl font-semibold'
                }
            })
        }
        onSuccess()
        onSetData(data)
    } else {
        await Swal.fire({
            position: 'center',
            icon: 'error',
            title: data?.message || 'Something went wrong!',
            showConfirmButton: false,
            timer: 3000,
            customClass: {
                title: 'text-xl font-semibold'
            }
        })
        onFail()
    }
}

// Show error alert
export const showErrorAlert = async(error) => {
    let message = 'Unknown error'

    if(error?.response?.data?.message) {
        message = error.response.data.message
    } else if(error?.message) {
        message = error.message
    } else if(typeof error === 'string') {
        message = error
    }

    await Swal.fire({
        position: 'center',
        icon: 'error',
        title: message,
        showConfirmButton: false,
        timer: 3000,
        customClass: {
            title: 'text-xl font-semibold'
        }
    })
}
