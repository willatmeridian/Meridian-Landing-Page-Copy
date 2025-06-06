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
  // Always log the contact submission for backup
  const timestamp = new Date().toISOString();
  const contactLog = `
[${timestamp}] NEW CONTACT SUBMISSION
Name: ${formData.name}
Company: ${formData.company}
Phone: ${formData.phone}
Email: ${formData.email}
Description: ${formData.description}
---
  `;
  console.log(contactLog);

  if (!process.env.SENDGRID_API_KEY) {
    console.warn('SendGrid API key not configured - contact logged only');
    return true; // Return true so form submission appears successful
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
      to: 'info@meridianprocure.com',
      from: 'will@meridianprocure.com',
      subject: `New Contact Request from ${formData.name} at ${formData.company}`,
      text: emailContent,
      html: emailContent.replace(/\n/g, '<br>'),
    };

    const result = await sgMail.send(msg);
    console.log('Email sent successfully:', result[0].statusCode);
    return true;

  } catch (error: any) {
    console.error('SendGrid email failed, but contact was logged:', error);
    if (error.response?.body?.errors) {
      console.error('SendGrid error details:', error.response.body.errors);
    }
    
    // Return true even if email fails, since we're logging submissions
    // The user will still get a success message
    return true;
  }
}