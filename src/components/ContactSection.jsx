// src/components/ContactSection.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPaperPlane, FaCheckCircle, FaGoogle, FaCopy } from "react-icons/fa";
import Button from "../components/AppButton";

const ContactSection = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    telephone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [showGoogleFormOption, setShowGoogleFormOption] = useState(false);
  const [showCopyOption, setShowCopyOption] = useState(false);
  const [copied, setCopied] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  // Google Form URL (you need to create one and update this URL)
  const GOOGLE_FORM_URL = "https://forms.gle/m3PDtKm2DPAphcvR8";

  // EmailJS Configuration - UPDATED WITH YOUR ACTUAL CREDENTIALS
  const EMAILJS_CONFIG = {
    service_id: "service_uqy365m", // From your comment
    template_id: "template_acedumail", // From your comment
    user_id: "oS4yoNmkXVRiOvbZB", // Your Public Key
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError(""); // Clear error when user types
  };

  const copyToClipboard = () => {
    const subject = `message from ${form.name || "Acedu BootCamp Website"}`;
    const bodyLines = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Telephone: ${form.telephone || "N/A"}`,
      "",
      "Message:",
      form.message,
      "",
      "---",
      "This message was sent from the Acedu BootCamp contact form.",
    ];
    const body = bodyLines.join("\n");

    const fullMessage = `Subject: ${subject}\n\n${body}`;

    navigator.clipboard.writeText(fullMessage)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = fullMessage;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      });
  };

  const handleEmailSubmit = async () => {
    try {
      // Prepare email data for EmailJS
      const emailData = {
        service_id: EMAILJS_CONFIG.service_id,
        template_id: EMAILJS_CONFIG.template_id,
        user_id: EMAILJS_CONFIG.user_id,
        template_params: {
          to_email: "acedubootcamp@gmail.com",
          from_name: form.name,
          from_email: form.email,
          telephone: form.telephone || "Not provided",
          message: form.message,
          subject: `New Contact Form Message from ${form.name}`,
          submitted_at: new Date().toLocaleString(),
        }
      };

      console.log("Sending email with data:", emailData.template_params);

      // Send email using EmailJS API
      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      });

      if (response.ok) {
        console.log("Email sent successfully!");
        setEmailSent(true);
        setIsSubmitted(true);
        setForm({ name: "", email: "", telephone: "", message: "" });
        
        // Show success message
        setTimeout(() => {
          setIsSubmitted(false);
          setEmailSent(false);
        }, 5000);
      } else {
        const errorData = await response.text();
        throw new Error(errorData || "Failed to send email");
      }
    } catch (error) {
      console.error("EmailJS error:", error);
      setError("Email sending failed. Please try the alternative options below.");
      setShowCopyOption(true);
      setShowGoogleFormOption(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setShowCopyOption(false);
    setShowGoogleFormOption(false);
    setCopied(false);

    try {
      await handleEmailSubmit();
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openGoogleForm = () => {
    // Add form data to Google Form URL if you set up pre-filled fields
    const googleFormUrl = `${GOOGLE_FORM_URL}?usp=pp_url&entry.YOUR_NAME_FIELD=${encodeURIComponent(form.name)}&entry.YOUR_EMAIL_FIELD=${encodeURIComponent(form.email)}&entry.YOUR_PHONE_FIELD=${encodeURIComponent(form.telephone)}&entry.YOUR_MESSAGE_FIELD=${encodeURIComponent(form.message)}`;

    window.open(googleFormUrl, '_blank', 'noopener,noreferrer');
    setIsSubmitted(true);
    setEmailSent(true);
    setForm({ name: "", email: "", telephone: "", message: "" });

    setTimeout(() => {
      setIsSubmitted(false);
      setEmailSent(false);
      setShowGoogleFormOption(false);
    }, 5000);
  };

  return (
    <section id="contact-form" className="bg-white py-14 md:py-18">
      <div className="w-[90vw] max-w-4xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-8 md:mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-3xl md:text-4xl font-extrabold text-black mb-2"
          >
            Send us a <span className="text-red-600">Message</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-sm md:text-base text-gray-600 max-w-xl mx-auto space-y-1"
          >
            <p> Have a question about our bootcamp, courses or enrollment?</p>
            <p> Need free consultation of our software services?</p>
            <p> Drop a message and our team will respond as soon as possible.</p>
          </motion.div>
        </div>

        {/* Success Message */}
        {isSubmitted && emailSent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <FaCheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-green-800">Message Sent Successfully!</h4>
                <p className="text-sm text-green-700">
                  Your message has been delivered directly to our team. We'll respond within 24 hours.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
          >
            <p className="text-sm text-red-700">{error}</p>
          </motion.div>
        )}

        {/* Alternative Options */}
        {(showCopyOption || showGoogleFormOption) && !isSubmitting && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 space-y-3"
          >
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Alternative ways to send:</h4>

              <div className="flex flex-col sm:flex-row gap-3">
                {/* Copy to Clipboard Option */}
                {showCopyOption && (
                  <Button
                    onClick={copyToClipboard}
                    className="flex-1 bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 text-sm font-medium"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <FaCopy className="w-4 h-4" />
                      {copied ? "Copied!" : "Copy Message to Clipboard"}
                    </span>
                  </Button>
                )}

                {/* Google Form Option */}
                {showGoogleFormOption && (
                  <Button
                    onClick={openGoogleForm}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-medium"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <FaGoogle className="w-4 h-4" />
                      Use Google Form
                    </span>
                  </Button>
                )}
              </div>

              {copied && (
                <p className="mt-2 text-xs text-blue-700">
                  Message copied! Now paste it into your email client and send to: Info@acedu.camp
                </p>
              )}
            </div>
          </motion.div>
        )}

        {/* Form Card */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white border border-red-100 shadow-[0_18px_40px_rgba(0,0,0,0.08)] px-5 py-6 sm:px-7 sm:py-8 md:px-8 md:py-9"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-4 md:mb-5">
            {/* Name */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="name"
                className="text-xs font-semibold uppercase tracking-[0.18em] text-red-600"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-300 bg-white px-3 py-2 text-sm text-black outline-none focus:border-red-600 focus:ring-1 focus:ring-red-100 transition-all duration-300 placeholder:text-gray-400"
                placeholder="Your full name"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="email"
                className="text-xs font-semibold uppercase tracking-[0.18em] text-red-600"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full border border-gray-300 bg-white px-3 py-2 text-sm text-black outline-none focus:border-red-600 focus:ring-1 focus:ring-red-100 transition-all duration-300 placeholder:text-gray-400"
                placeholder="you@example.com"
              />
            </div>

            {/* Telephone */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="telephone"
                className="text-xs font-semibold uppercase tracking-[0.18em] text-red-600"
              >
                Telephone
              </label>
              <input
                id="telephone"
                name="telephone"
                type="tel"
                value={form.telephone}
                onChange={handleChange}
                className="w-full border border-gray-300 bg-white px-3 py-2 text-sm text-black outline-none focus:border-red-600 focus:ring-1 focus:ring-red-100 transition-all duration-300 placeholder:text-gray-400"
                placeholder="+234..."
              />
            </div>
          </div>

          {/* Message */}
          <div className="flex flex-col gap-1 mb-5">
            <label
              htmlFor="message"
              className="text-xs font-semibold uppercase tracking-[0.18em] text-red-600"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              value={form.message}
              onChange={handleChange}
              className="w-full border border-gray-300 bg-white px-3 py-2 text-sm text-black outline-none focus:border-red-600 focus:ring-1 focus:ring-red-100 transition-all duration-300 placeholder:text-gray-400 resize-y"
              placeholder="Tell us how we can help..."
            />
          </div>

          {/* Button - FIXED HYDRATION ERROR */}
          <div className="flex justify-end">
            <Button
              className="px-6 md:px-8 h-10 md:h-11 text-sm md:text-base"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block"></span>
                  Sending...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Send Message
                  <FaPaperPlane className="w-4 h-4" />
                </span>
              )}
            </Button>
          </div>
        </motion.form>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <FaEnvelope className="w-5 h-5 text-red-600" />
              <div className="text-left">
                <p className="text-sm font-medium text-gray-700">Email</p>
                <a
                  href="mailto:Info@acedu.camp"
                  className="text-red-600 font-bold hover:text-red-700 transition-colors"
                >
                  Info@acedu.camp
                </a>
              </div>
            </div>

            <div className="h-8 w-px bg-gray-300 hidden md:block"></div>

            <div className="text-center">
              <p className="text-sm font-medium text-gray-700 mb-1">Quick Contact</p>
              <p className="text-xs text-gray-600">
                Messages sent via EmailJS are delivered instantly
              </p>
            </div>
          </div>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg"
        >
          <details className="group">
            <summary className="flex items-center justify-between cursor-pointer text-sm font-medium text-gray-700">
              <span>How it works</span>
              <span className="text-gray-500 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div className="mt-3 text-xs text-gray-600 space-y-2">
              <p><strong>Simple Process:</strong></p>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Fill out the form above</li>
                <li>Click "Send Message" - EmailJS delivers directly to our inbox</li>
                <li>You'll see a success confirmation</li>
                <li>If email fails, use the alternative options that appear</li>
              </ol>
              <p className="mt-2 text-green-600 font-medium">✓ EmailJS handles all the technical stuff!</p>
            </div>
          </details>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;