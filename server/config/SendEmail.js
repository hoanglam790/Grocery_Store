import { Resend } from 'resend'
import 'dotenv/config'

// Check if RESEND_API_KEY is defined or not
const resend = new Resend(process.env.RESEND_EMAIL_API_KEY)
if(!resend) {
    throw new Error('RESEND_API_KEY is not defined, please check your .env file')
}

const sendEmail = async(data) => { // data = { to: '', from: '', subject: '', html: '' }
    try {
        const { response, error } = await resend.emails.send({
            from: process.env.EMAIL_FROM,
            to: data.to,
            subject: data.subject,
            html: data.html
        })
        if(error) {
            console.error(error)
        }
        return response
    } catch (error) {
        console.log(error)
    }
}

export default sendEmail