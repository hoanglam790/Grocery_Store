
const forgotPasswordTemp = ({ name, otp }) => {
    return `
        <div>
            <p>Dear <span style='font-weight: bold'>${name}</span>,</p>
            <p>You have just submitted a password recovery request. Please use the OTP code below to proceed with the recovery..</p>
            <div style='background: yellow; font-size: 24px; text-align: center; font-weight: 600'>
                ${otp}
            </div>
            <p>Note: The OTP code is valid for 30 minutes. Please do not share this code with anyone.</p>
        </div>
    `
}

export default forgotPasswordTemp