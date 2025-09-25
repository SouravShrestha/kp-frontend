import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import texts from "../../resources/texts";
import { CommunicationAPI } from "../../apis";

const MAX_MESSAGE_LENGTH = 300;

const ContactForm = () => {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    const packageName = searchParams.get("package");
    if (packageName) {
      const prefilledMessage = `I would like to enquire about ${packageName} package.`;
      setForm((prev) => ({ ...prev, message: prefilledMessage }));
    }
  }, [searchParams]);

  const validateField = (name, value, forceRequired = false) => {
    switch (name) {
      case "name":
        if (!value.trim())
          return forceRequired || touched.name ? "Name is required." : "";
        return "";
      case "email":
        if (value.trim()) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) return "Enter a valid email address.";
        }
        return "";
      case "phone":
        if (!value.trim())
          return forceRequired || touched.phone
            ? "Phone number is required."
            : "";
        const phoneDigits = value.replace(/[^\d]/g, "");
        if (phoneDigits.length < 7) return "Enter a valid phone number.";
        return "";
      case "message":
        if (!value.trim())
          return forceRequired || touched.message ? "Message is required." : "";
        if (value.length > MAX_MESSAGE_LENGTH)
          return `Message must be under ${MAX_MESSAGE_LENGTH} characters.`;
        return "";
      default:
        return "";
    }
  };

  const validateAll = () => {
    const newErrors = {};
    Object.keys(form).forEach((key) => {
      const err = validateField(key, form[key], true); // forceRequired true for submit
      if (err) newErrors[key] = err;
    });
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "email" || name === "phone" || name === "message") {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
    if (name === "name" && value.trim()) {
      setErrors((prev) => ({ ...prev, name: "" }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, form[name]) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, phone: true, message: true });
    const validationErrors = validateAll();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0 && !loading) {
      setLoading(true);
      setSubmitMessage({ type: "", text: "" });
      try {
        const result = await CommunicationAPI.sendEmail(form);
        if (result.success) {
          setSubmitMessage({ type: "success", text: "Your message was sent successfully! We'll get back to you soon." });
          setForm({ name: "", email: "", phone: "", message: "" });
          setTouched({});
          // Clear success message after 5 seconds
          setTimeout(() => setSubmitMessage({ type: "", text: "" }), 5000);
        } else {
          setSubmitMessage({ type: "error", text: "Failed to send message. Please try again." });
        }
      } catch (err) {
        setSubmitMessage({ type: "error", text: "Failed to send message. Please check your connection and try again." });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form className="flex flex-col gap-6 mt-8 w-full" onSubmit={handleSubmit}>
      <label className="flex flex-col gap-1 font-ttjenevers">
        <div className="flex flex-row justify-between items-center w-full">
          <span>{texts.footer.form.name}</span>
          {errors.name && (
            <span className="text-red-500 text-xs ml-2 whitespace-nowrap">
              {errors.name}
            </span>
          )}
        </div>
        <input
          className="border-borderColor bg-[#ede7df] outline-none py-2 font-almarai px-3 mt-2"
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={loading}
        />
      </label>
      <label className="flex flex-col gap-1 font-ttjenevers">
        <div className="flex flex-row justify-between items-center w-full">
          <span>{texts.footer.form.email}</span>
          {errors.email && (
            <span className="text-red-500 text-xs ml-2 whitespace-nowrap">
              {errors.email}
            </span>
          )}
        </div>
        <input
          className="border-borderColor bg-[#ede7df] outline-none py-2 font-almarai px-3 mt-2"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={loading}
        />
      </label>
      <label className="flex flex-col gap-1 font-ttjenevers">
        <div className="flex flex-row justify-between items-center w-full">
          <span>{texts.footer.form.phone}</span>
          {errors.phone && (
            <span className="text-red-500 text-xs ml-2 whitespace-nowrap">
              {errors.phone}
            </span>
          )}
        </div>
        <input
          className="border-borderColor bg-[#ede7df] outline-none py-2 font-almarai px-3 mt-2"
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={loading}
        />
      </label>
      <label className="flex flex-col gap-1 font-ttjenevers">
        <div className="flex flex-row justify-between items-center w-full">
          <span>{texts.footer.form.message}</span>
          {errors.message && (
            <span className="text-red-500 text-xs ml-2 whitespace-nowrap">
              {errors.message}
            </span>
          )}
        </div>
        <textarea
          className="border-borderColor bg-[#ede7df] outline-none py-2 resize-none font-almarai px-3 mt-2"
          rows={4}
          name="message"
          value={form.message}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={loading}
        />
        <div className="flex justify-end items-center">
          <span className="text-xs text-gray-500 ml-auto">
            {form.message.length}/{MAX_MESSAGE_LENGTH}
          </span>
        </div>
      </label>
      
      {/* Submit Message */}
      {submitMessage.text && (
        <div className={`text-sm p-3 rounded border ${
          submitMessage.type === "success" 
            ? "bg-green-50 border-green-200 text-green-700" 
            : "bg-red-50 border-red-200 text-red-700"
        }`}>
          {submitMessage.text}
        </div>
      )}
      
      <button
        type="submit"
        className="border border-borderColor px-8 py-2 mt-2 w-fit self-end font-barlow tracking-wider bg-white hover:underline disabled:opacity-60 disabled:cursor-not-allowed"
        disabled={loading}
      >
        {loading ? "Sending..." : texts.footer.form.submit}
      </button>
    </form>
  );
};

export default ContactForm;
