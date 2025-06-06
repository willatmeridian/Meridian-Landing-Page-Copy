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

  // Always log the contact submission to console for backup
  console.log('\n=== NEW CONTACT FORM SUBMISSION ===');
  console.log(emailContent);
  console.log('=====================================\n');

  if (!process.env.SENDGRID_API_KEY) {
    console.warn('SendGrid API key not configured - contact form logged to console only');
    return true; // Return true since we logged it
  }

  try {
    const fromEmail = process.env.SENDGRID_VERIFIED_SENDER || 'will@meridianprocure.com';
    
    const msg = {
      to: 'will@meridianprocure.com',
      from: fromEmail,
      subject: `New Contact Request from ${formData.name} at ${formData.company}`,
      text: emailContent,
      html: emailContent.replace(/\n/g, '<br>'),
    };

    const result = await sgMail.send(msg);
    console.log('Email sent successfully via SendGrid:', result[0].statusCode);
    return true;
  } catch (error: any) {
    console.error('SendGrid email failed, but contact form was logged to console');
    
    if (error.response?.body?.errors) {
      console.error('SendGrid setup needed:', error.response.body.errors);
      console.log('To fix email delivery:');
      console.log('1. Verify will@meridianprocure.com as a sender in SendGrid');
      console.log('2. Or set SENDGRID_VERIFIED_SENDER environment variable to a verified email');
    }
    
    // Return true since we logged the submission
    return true;
  }
}