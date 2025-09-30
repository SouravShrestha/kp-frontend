import { API_ENDPOINTS, apiPost } from "../config";

export async function sendEmail({ name, email, phone, message }) {
  try {
    if (!name || !email || !message) {
      throw new Error("Name, email, and message are required fields");
    }

    const subject = `Contact Form Submission: ${name}`;
    const text = `Name: ${name}\nEmail: ${email}\nPhone: ${
      phone || "Not provided"
    }\nMessage: ${message}`;
    const html = `
      <h2>Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
      <p><strong>Message:</strong><br/>${message.replace(/\n/g, "<br/>")}</p>
    `;

    return await apiPost(API_ENDPOINTS.SEND_EMAIL, { subject, text, html });
  } catch (error) {
    console.error("Error sending contact email:", error);
    throw error;
  }
}
