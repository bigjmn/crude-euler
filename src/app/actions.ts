"use server"

export async function subscribeUser(formData:FormData){
    const { email } = Object.fromEntries(formData)
    console.log(email)
    
    try {
        if (!email){
        throw Error("email is required")
        }
        const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID 
        const API_KEY = process.env.MAILCHIMP_API_KEY 
        const DATACENTER = process.env.MAILCHIMP_API_SERVER

        const data = 
        {email_address: email, 
        status: "subscribed"
        }

        const response = await fetch(
      `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`,

      {
        body: JSON.stringify(data),
        headers: {
          Authorization: `apikey ${API_KEY}`,
          "Content-Type": "application/json",
        },
        method: "POST",
      }
    );
    console.log('success')
    } catch (error){
        console.log(error)
    }
    





}