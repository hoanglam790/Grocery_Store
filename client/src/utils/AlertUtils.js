import Swal from 'sweetalert2'

export const showAlert = async(
    responseData,
    {
        onSuccess = () => {},
        onFail = () => {},
        onSetData = () => {},
        showSuccess = true
    } = {}
) => {
    const data = responseData?.data

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


export const showErrorAlert = async(error) => {
    await Swal.fire({
        position: 'center',
        icon: 'error',
        title: error?.response?.data?.message || 'Unknown error',
        showConfirmButton: false,
        timer: 3000,
        customClass: {
            title: 'text-xl font-semibold'
        }
    })
}
