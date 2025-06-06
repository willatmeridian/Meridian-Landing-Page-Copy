import { MailService } from '@sendgrid/mail';

if (!process.env.SENDGRID_API_KEY) {
  console.warn("SENDGRID_API_KEY environment variable is not set. Email functionality will be disabled.");
}

const mailService = new MailService();
if (process.env.SENDGRID_API_KEY) {
  mailService.setApiKey(process.env.SENDGRID_API_KEY);
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

    await mailService.send({
      to: 'will@meridianprocure.com',
      from: 'noreply@meridianprocure.com', // This should be a verified sender domain
      subject: `New Contact Request from ${formData.name} at ${formData.company}`,
      text: emailContent,
      html: emailContent.replace(/\n/g, '<br>'),
      replyTo: formData.email,
    });

    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    return false;
  }
}