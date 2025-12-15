// src/components/ContactSection.jsx
import { useState, useEffect } from "react";
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
  const [showGoogleFormOption, setShowGoogleFormOption] = useState(false);
  const [showCopyOption, setShowCopyOption] = useState(false);
  const [copied, setCopied] = useState(false);

  // Check if device likely has an email client
  const [hasEmailClient, setHasEmailClient] = useState(false);

  useEffect(() => {
    // Simple check for email client support
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const isDesktop = !isMobile;
    
    // Most desktops have email clients, mobile devices usually have mail apps
    // This is a basic heuristic - you could make it more sophisticated
    setHasEmailClient(true); // Assume true by default
    
    // Alternative: check if mailto protocol is supported
    try {
      const link = document.createElement('a');
      link.href = 'mailto:Info@acedu.camp';
      setHasEmailClient(link.protocol === 'mailto:');
    } catch (e) {
      setHasEmailClient(false);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Google Form URL (you need to create one and update this URL)
  const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform";

  const copyToClipboard = () => {
    const subject = `New message from ${form.name || "Acedu BootCamp Website"}`;
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

  const handleEmailSubmit = () => {
    const subject = `New message from ${form.name || "Acedu BootCamp Website"}`;
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

    const mailtoLink = `mailto:Info@acedu.camp?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Create a hidden link to avoid navigation
    const link = document.createElement('a');
    link.href = mailtoLink;
    link.style.display = 'none';
    
    // Set target to _blank and add noopener for security
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    
    // Add to body, click it, then remove it
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Check if we should show fallback options
    // We'll assume mailto worked and show success
    // If not, user can use the fallback options
    setIsSubmitted(true);
    setForm({ name: "", email: "", telephone: "", message: "" });
    
    // After a delay, show copy option as alternative
    setTimeout(() => {
      setShowCopyOption(true);
    }, 2000);
    
    setTimeout(() => {
      setIsSubmitted(false);
      setShowGoogleFormOption(false);
      setShowCopyOption(false);
    }, 10000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Clear any previous states
    setShowGoogleFormOption(false);
    setShowCopyOption(false);
    setCopied(false);

    // Simulate processing
    setTimeout(() => {
      handleEmailSubmit();
      setIsSubmitting(false);
    }, 500);
  };

  const openGoogleForm = () => {
    // Add form data to Google Form URL if you set up pre-filled fields
    const googleFormUrl = `${GOOGLE_FORM_URL}?usp=pp_url&entry.YOUR_NAME_FIELD=${encodeURIComponent(form.name)}&entry.YOUR_EMAIL_FIELD=${encodeURIComponent(form.email)}&entry.YOUR_PHONE_FIELD=${encodeURIComponent(form.telephone)}&entry.YOUR_MESSAGE_FIELD=${encodeURIComponent(form.message)}`;
    
    window.open(googleFormUrl, '_blank', 'noopener,noreferrer');
    setIsSubmitted(true);
    setForm({ name: "", email: "", telephone: "", message: "" });
    
    setTimeout(() => {
      setIsSubmitted(false);
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
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-sm md:text-base text-gray-600 max-w-xl mx-auto"
          >
            Have a question about our bootcamps, curriculum, or enrollment? Drop
            a message and our team will respond as soon as possible.
          </motion.p>
        </div>

        {/* Success Message */}
        {isSubmitted && !showGoogleFormOption && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <FaCheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-green-800">Message prepared!</h4>
                <p className="text-sm text-green-700">
                  Your email client should open with a pre-filled message. 
                  {!hasEmailClient && " If it doesn't open, use one of the options below."}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Alternative Options */}
        {(showCopyOption || !hasEmailClient) && !isSubmitting && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 space-y-3"
          >
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Alternative ways to send:</h4>
              
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Copy to Clipboard Option */}
                <Button
                  onClick={copyToClipboard}
                  className="flex-1 bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 text-sm font-medium"
                >
                  <div className="flex items-center justify-center gap-2">
                    <FaCopy className="w-4 h-4" />
                    {copied ? "Copied!" : "Copy Message to Clipboard"}
                  </div>
                </Button>
                
                {/* Google Form Option */}
                <Button
                  onClick={openGoogleForm}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-medium"
                >
                  <div className="flex items-center justify-center gap-2">
                    <FaGoogle className="w-4 h-4" />
                    Use Google Form
                  </div>
                </Button>
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

          {/* Button */}
          <div className="flex justify-end">
            <Button 
              className="px-6 md:px-8 h-10 md:h-11 text-sm md:text-base gap-2"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Preparing Email...
                </>
              ) : (
                <>
                  Send Message
                  <FaPaperPlane className="w-4 h-4" />
                </>
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
                  onClick={(e) => {
                    e.preventDefault();
                    // Open mailto without navigation
                    const link = document.createElement('a');
                    link.href = 'mailto:Info@acedu.camp';
                    link.style.display = 'none';
                    link.target = '_blank';
                    link.rel = 'noopener noreferrer';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                >
                  Info@acedu.camp
                </a>
              </div>
            </div>
            
            <div className="h-8 w-px bg-gray-300 hidden md:block"></div>
            
            <div className="text-center">
              <p className="text-sm font-medium text-gray-700 mb-1">Quick Contact</p>
              <p className="text-xs text-gray-600">
                Use the form above or email us directly
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
                <li>We'll open your email client with a pre-filled message</li>
                <li>If your email doesn't open, use the "Copy Message" button</li>
                <li>Paste into any email app and send to Info@acedu.camp</li>
              </ol>
              <p className="mt-2 text-red-600 font-medium">Your page will NOT navigate away!</p>
            </div>
          </details>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;