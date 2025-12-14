// src/components/ContactSection.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import Button from "../components/AppButton"; // adjust path if this file is not in /components

const ContactSection = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    telephone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just log. Replace with your API / email logic later.
    console.log("Message sent:", form);
    alert("Thank you for your message. We will get back to you soon.");
    setForm({ name: "", email: "", telephone: "", message: "" });
  };

  return (
    <section className="bg-white py-14 md:py-18">
      <div className="w-[90vw] max-w-4xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-8 md:mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="f2 text-3xl md:text-4xl font-extrabold text-black mb-2"
          >
            Send us a <span className="text-(--text3-c)">Message</span>
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
                className="text-xs font-semibold uppercase tracking-[0.18em] text-(--text3-c)"
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
                className="w-full border border-gray-300 bg-white px-3 py-2 text-sm text-black outline-none focus:border-(--text3-c) focus:ring-1 focus:ring-(--text3-c) placeholder:text-gray-400"
                placeholder="Your full name"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="email"
                className="text-xs font-semibold uppercase tracking-[0.18em] text-(--text3-c)"
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
                className="w-full border border-gray-300 bg-white px-3 py-2 text-sm text-black outline-none focus:border-(--text3-c) focus:ring-1 focus:ring-(--text3-c) placeholder:text-gray-400"
                placeholder="you@example.com"
              />
            </div>

            {/* Telephone */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="telephone"
                className="text-xs font-semibold uppercase tracking-[0.18em] text-(--text3-c)"
              >
                Telephone
              </label>
              <input
                id="telephone"
                name="telephone"
                type="tel"
                value={form.telephone}
                onChange={handleChange}
                className="w-full border border-gray-300 bg-white px-3 py-2 text-sm text-black outline-none focus:border-(--text3-c) focus:ring-1 focus:ring-(--text3-c) placeholder:text-gray-400"
                placeholder="+234..."
              />
            </div>
          </div>

          {/* Message */}
          <div className="flex flex-col gap-1 mb-5">
            <label
              htmlFor="message"
              className="text-xs font-semibold uppercase tracking-[0.18em] text-(--text3-c)"
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
              className="w-full border border-gray-300 bg-white px-3 py-2 text-sm text-black outline-none focus:border-(--text3-c) focus:ring-1 focus:ring-(--text3-c) placeholder:text-gray-400 resize-y"
              placeholder="Tell us how we can help..."
            />
          </div>

          {/* Button */}
          <div className="flex justify-end">
            <Button className="px-6 md:px-8 h-10 md:h-11 text-sm md:text-base">
              Send Message
            </Button>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default ContactSection;