import sgMail from '@sendgrid/mail';

if (!process.env.SENDGRID_API_KEY) {
  console.warn("SENDGRID_API_KEY environment variable is not set. Email functionality will be disabled.");
} else {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

interface ContactFormData {
  name: string;
  company: string;
  phone: string;
  email: string;
  description: string;
}

export async function sendContactEmail(formData: ContactFormData): Promise<boolean> {
  if (!process.env.SENDGRID_API_KEY) {
    console.error('SendGrid API key not configured');
    return false;
  }

  try {
    const emailContent = `
New Contact Request from Meridian Procurement Website

Name: ${formData.name}
Company: ${formData.company}
Phone: ${formData.phone}
Email: ${formData.email}

Description of Needs:
${formData.description}

---
This email was sent from the Meridian Procurement contact form.
    `.trim();

    const msg = {
      to: 'will@meridianprocure.com',
      from: 'will@meridianprocure.com',
      subject: `New Contact Request from ${formData.name} at ${formData.company}`,
      text: emailContent,
      html: emailContent.replace(/\n/g, '<br>'),
    };

    const result = await sgMail.send(msg);
    console.log('Email sent successfully:', result[0].statusCode);

    return true;
  } catch (error: any) {
    console.error('SendGrid email error:', error);
    if (error.response?.body?.errors) {
      console.error('SendGrid error details:', error.response.body.errors);
    }
    return false;
  }
}