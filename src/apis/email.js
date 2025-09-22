export async function sendContactEmail({ name, email, phone, message }) {
  const subject = `Contact Form Submission: ${name}`;
  const text = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`;
  const html = `
    <h2>Contact Form Submission</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>
  `;
  const response = await fetch('https://kp-backend-pfn7.onrender.com/api/email/submit-form', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ subject, text, html })
  });
  return response.json();
}
