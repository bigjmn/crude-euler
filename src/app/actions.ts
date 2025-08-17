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
        if (!AUDIENCE_ID || !API_KEY || !DATACENTER) {
            console.error("Mailchimp environment variables are not configured.");
            return { error: "Something went wrong. Please try again later." };
        }
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
    if (response.status >= 400) {
            const errorData = await response.json();
            if (errorData.title === "Member Exists") {
                return { success: true, message: "You're already subscribed!" };
            }
            return {
                error: `There was an error subscribing you. Please try again.`,
            };
        }
    return { success: true, message: "Success! You are now subscribed." }
    } catch (error){
        return { error: "Something went wrong. Please try again."}
    }
    





}