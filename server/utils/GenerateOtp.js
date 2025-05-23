
const generateOtp = async() => { 
    // Generate random 6 digit number between 100000 to 999999
    return Math.floor(100000 + Math.random() * 900000)
}

export default generateOtp