// src/pages/EnrollmentPage.jsx
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Button from '../components/AppButton'

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    // Personal Information
    referrerCode: '',
    course: '',
    firstName: '',
    middleName: '',
    surname: '',
    mobilePhone: '',
    email: '',
    
    // Contact Information
    contactAddress: '',
    postalAddress: '',
    permanentAddress: '',
    phoneNumber: '',
    
    // Next of Kin
    kinName: '',
    kinAddress: '',
    kinTelephone: '',
    kinRelationship: '',
    
    // Career goals
    careerGoals: '',
    
    // Sponsorship
    sponsorshipMeans: '',
    onScholarship: '',
    scholarshipDonor: '',
    
    // Declaration
    declaration: false,
  })

  const [focusedFields, setFocusedFields] = useState({})
  const [errors, setErrors] = useState({})

  // Course options with prices
  const courses = [
    { id: '', name: '--Select a Course--', price: '' },
    { id: 'html-css', name: 'HTML & CSS', price: '190k' },
    { id: 'javascript', name: 'JavaScript', price: '200k' },
    { id: 'react', name: 'React', price: '300k' },
    { id: 'cybersecurity', name: 'Cyber Security', price: '300k' },
    { id: 'data-analysis', name: 'Data Analysis', price: '370k' },
  ]

  // Form configuration array for dynamic rendering
  const formFields = [
    {
      section: 'Personal Information',
      fields: [
        {
          id: 'referrerCode',
          label: 'Referrer Code',
          type: 'text',
          required: false,
          grid: 'full',
        },
        {
          id: 'course',
          label: 'Your Choice Course',
          type: 'select',
          options: courses,
          required: true,
          grid: 'full',
        },
        {
          id: 'firstName',
          label: 'First name',
          type: 'text',
          required: true,
          grid: 'third',
        },
        {
          id: 'middleName',
          label: 'Middle name',
          type: 'text',
          required: false,
          grid: 'third',
        },
        {
          id: 'surname',
          label: 'Surname',
          type: 'text',
          required: true,
          grid: 'third',
        },
        {
          id: 'mobilePhone',
          label: 'Mobile Phone Number',
          type: 'tel',
          required: true,
          grid: 'half',
        },
        {
          id: 'email',
          label: 'e-Mail Address',
          type: 'email',
          required: true,
          grid: 'half',
        },
      ],
    },
    {
      section: 'Contact Information',
      fields: [
        {
          id: 'contactAddress',
          label: 'Contact Address',
          type: 'text',
          required: false,
          grid: 'full',
        },
        {
          id: 'postalAddress',
          label: 'Postal Address',
          type: 'text',
          required: false,
          grid: 'half',
        },
        {
          id: 'permanentAddress',
          label: 'Permanent Home Address',
          type: 'text',
          required: true,
          grid: 'half',
        },
        {
          id: 'phoneNumber',
          label: 'Phone Number',
          type: 'tel',
          required: false,
          grid: 'full',
        },
      ],
    },
    {
      section: 'Next Of KIN Information',
      fields: [
        {
          id: 'kinName',
          label: 'Name',
          type: 'text',
          required: false,
          grid: 'half',
        },
        {
          id: 'kinAddress',
          label: 'Address',
          type: 'text',
          required: false,
          grid: 'half',
        },
        {
          id: 'kinTelephone',
          label: 'Telephone Number',
          type: 'tel',
          required: false,
          grid: 'half',
        },
        {
          id: 'kinRelationship',
          label: 'Relationship',
          type: 'text',
          required: false,
          grid: 'half',
        },
      ],
    },
    {
      section: 'Career goals',
      fields: [
        {
          id: 'careerGoals',
          label: 'Your Career goals',
          type: 'textarea',
          required: false,
          grid: 'full',
          rows: 4,
        },
      ],
    },
    {
      section: 'Sponsorship Information',
      fields: [
        {
          id: 'sponsorshipMeans',
          label: 'Means of Sponsorship',
          type: 'select',
          options: [
            { id: '', name: '--Select--' },
            { id: 'self', name: 'Self-sponsored' },
            { id: 'family', name: 'Family' },
            { id: 'employer', name: 'Employer' },
            { id: 'scholarship', name: 'Scholarship' },
            { id: 'other', name: 'Other' },
          ],
          required: false,
          grid: 'half',
        },
        {
          id: 'onScholarship',
          label: 'On Scholarship',
          type: 'select',
          options: [
            { id: '', name: '--Select--' },
            { id: 'yes', name: 'Yes' },
            { id: 'no', name: 'No' },
          ],
          required: false,
          grid: 'half',
        },
        {
          id: 'scholarshipDonor',
          label: 'Name of Scholarship Donor',
          type: 'text',
          required: false,
          grid: 'full',
        },
      ],
    },
  ]

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleFocus = (fieldId) => {
    setFocusedFields(prev => ({ ...prev, [fieldId]: true }))
  }

  const handleBlur = (fieldId) => {
    if (!formData[fieldId]) {
      setFocusedFields(prev => ({ ...prev, [fieldId]: false }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    // Check required fields
    formFields.forEach(section => {
      section.fields.forEach(field => {
        if (field.required && !formData[field.id]) {
          newErrors[field.id] = 'This field is required'
        }
      })
    })

    // Additional validation for email
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Check declaration
    if (!formData.declaration) {
      newErrors.declaration = 'You must accept the declaration'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      // Form is valid, submit data
      console.log('Form submitted:', formData)
      // Here you would typically send the data to your backend
      alert('Registration submitted successfully! We will contact you shortly.')
      
      // Reset form
      setFormData({
        referrerCode: '',
        course: '',
        firstName: '',
        middleName: '',
        surname: '',
        mobilePhone: '',
        email: '',
        contactAddress: '',
        postalAddress: '',
        permanentAddress: '',
        phoneNumber: '',
        kinName: '',
        kinAddress: '',
        kinTelephone: '',
        kinRelationship: '',
        careerGoals: '',
        sponsorshipMeans: '',
        onScholarship: '',
        scholarshipDonor: '',
        declaration: false,
      })
    } else {
      // Scroll to first error
      const firstErrorField = document.querySelector('[data-error="true"]')
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
  }

  const renderField = (field) => {
    const hasValue = formData[field.id] && formData[field.id].toString().trim() !== ''
    const isFocused = focusedFields[field.id] || hasValue
    const hasError = errors[field.id]

    const baseClasses = `w-full bg-white border rounded-lg px-4 text-gray-900 text-sm md:text-base
      focus:outline-none focus:ring-2 focus:ring-red-500/30 transition-all duration-300
      ${hasError ? 'border-red-500' : 'border-gray-300 focus:border-red-500'}`

    return (
      <motion.div
        key={field.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`relative ${getGridClass(field.grid)}`}
        data-error={hasError ? "true" : "false"}
      >
        <div className="relative">
          {field.type === 'textarea' ? (
            <div className="relative">
              <textarea
                id={field.id}
                name={field.id}
                value={formData[field.id]}
                onChange={handleChange}
                onFocus={() => handleFocus(field.id)}
                onBlur={() => handleBlur(field.id)}
                rows={field.rows || 4}
                className={`${baseClasses} resize-none pt-8 pb-3 md:pt-9 md:pb-4`}
              />
              <label
                htmlFor={field.id}
                className={`absolute left-4 transition-all duration-300 pointer-events-none text-sm md:text-base ${
                  isFocused 
                    ? 'top-2 text-xs md:text-xs text-red-600 font-medium' 
                    : 'top-3 md:top-4 text-gray-500'
                } ${hasError ? 'text-red-500' : ''}`}
              >
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
            </div>
          ) : field.type === 'select' ? (
            <div className="relative">
              <select
                id={field.id}
                name={field.id}
                value={formData[field.id]}
                onChange={handleChange}
                onFocus={() => handleFocus(field.id)}
                onBlur={() => handleBlur(field.id)}
                className={`${baseClasses} appearance-none cursor-pointer pt-8 pb-3 md:pt-9 md:pb-4`}
              >
                {field.options.map(option => (
                  <option key={option.id} value={option.id}>
                    {option.name} {option.price ? `- ₦${option.price}` : ''}
                  </option>
                ))}
              </select>
              <label
                htmlFor={field.id}
                className={`absolute left-4 transition-all duration-300 pointer-events-none text-sm md:text-base ${
                  isFocused || formData[field.id] !== ''
                    ? 'top-2 text-xs md:text-xs text-red-600 font-medium' 
                    : 'top-3 md:top-4 text-gray-500'
                } ${hasError ? 'text-red-500' : ''}`}
              >
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              {/* Custom dropdown arrow - positioned for floating labels */}
              <div className="absolute right-4 pointer-events-none">
                <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          ) : (
            <div className="relative">
              <input
                id={field.id}
                name={field.id}
                type={field.type}
                value={formData[field.id]}
                onChange={handleChange}
                onFocus={() => handleFocus(field.id)}
                onBlur={() => handleBlur(field.id)}
                className={`${baseClasses} py-4 md:py-5`}
              />
              <label
                htmlFor={field.id}
                className={`absolute left-4 transition-all duration-300 pointer-events-none text-sm md:text-base ${
                  isFocused 
                    ? 'top-2 text-xs md:text-xs text-red-600 font-medium' 
                    : 'top-3 md:top-4 text-gray-500'
                } ${hasError ? 'text-red-500' : ''}`}
              >
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
            </div>
          )}
        </div>
        
        {hasError && (
          <motion.p 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-xs mt-1 ml-1"
          >
            {errors[field.id]}
          </motion.p>
        )}
      </motion.div>
    )
  }

  const getGridClass = (grid) => {
    switch(grid) {
      case 'third': return 'md:col-span-4 col-span-12'
      case 'half': return 'md:col-span-6 col-span-12'
      case 'full': return 'col-span-12'
      default: return 'col-span-12'
    }
  }

  return (
    <>
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 md:py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col lg:flex-row gap-6 md:gap-8"
          >
            {/* Left Column - Form */}
            <div className="lg:w-7/12">
              <div className="bg-white  shadow-lg md:shadow-xl p-4 sm:p-6 md:p-8">
                {/* Header */}
                <div className="text-center mb-6 md:mb-8">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-2 md:mb-3">
                    Register <span className="text-red-600">Now</span>
                  </h1>
                  <p className="text-sm md:text-base text-gray-600">
                    Fill in this form to register for the Coding Camp
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8 md:space-y-10">
                  {/* Render form sections dynamically */}
                  {formFields.map((section, sectionIndex) => (
                    <motion.div
                      key={sectionIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: sectionIndex * 0.1 }}
                    >
                      <h2 className="text-lg sm:text-xl font-bold text-black mb-4 md:mb-6 pb-2 border-b border-red-100">
                        {section.section}
                      </h2>
                      <div className="grid grid-cols-12 gap-3 md:gap-4 lg:gap-6">
                        {section.fields.map(field => renderField(field))}
                      </div>
                    </motion.div>
                  ))}

                  {/* Declaration Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <h2 className="text-lg sm:text-xl font-bold text-black mb-4 md:mb-6 pb-2 border-b border-red-100">
                      Declaration
                    </h2>
                    
                    <div className="space-y-3 md:space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="flex items-center h-6 mt-0.5">
                          <input
                            id="declaration"
                            name="declaration"
                            type="checkbox"
                            checked={formData.declaration}
                            onChange={handleChange}
                            className="w-4 h-4 md:w-5 md:h-5 text-red-600 rounded focus:ring-red-500 shrink-0"
                          />
                        </div>
                        <label htmlFor="declaration" className="text-sm md:text-base text-gray-700 cursor-pointer">
                          I hereby certify that the information displayed above is correct and 
                          will therefore not hold the school liable for any mistake contained 
                          in the detail therein.
                        </label>
                      </div>
                      
                      {errors.declaration && (
                        <p className="text-red-500 text-xs md:text-sm">{errors.declaration}</p>
                      )}
                      
                      <div className="text-xs md:text-sm text-gray-500">
                        <p className="text-red-500">* required fields</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="pt-4 md:pt-6"
                  >
                    <Button
                      type="submit"
                      className="w-full py-3 md:py-4 text-base md:text-lg font-bold"
                    >
                      Submit Registration
                    </Button>
                  </motion.div>
                </form>
              </div>
            </div>

            {/* Right Column - Image and Info */}
            <div className="lg:w-5/12">
              <div className="sticky top-6 md:top-8">
                {/* Image Card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="relative overflow-hidden shadow-lg md:shadow-xl h-48 sm:h-56 md:h-64 lg:h-80 mb-6 md:mb-8"
                >
                  <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: 'url("https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
                    }}
                  >
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-linear-to-br from-red-600/30 to-black/50"></div>
                    
                    {/* Light illustration effect */}
                    <div className="absolute inset-0 bg-linear-to-tr from-white/10 via-transparent to-transparent"></div>
                  </div>
                  
                  <div className="relative z-10 h-full flex items-center justify-center p-4 sm:p-6 md:p-8">
                    <div className="text-center text-white">
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 md:mb-4">
                        Start Your Tech Journey
                      </h3>
                      <p className="text-sm sm:text-base md:text-lg opacity-90">
                        Join Moat Academy and transform your career
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Course Information Card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white rounded-xl md:rounded-2xl shadow-lg md:shadow-xl p-4 sm:p-6"
                >
                  <h3 className="text-lg sm:text-xl font-bold text-black mb-3 md:mb-4">
                    Available Courses
                  </h3>
                  
                  <div className="space-y-2 sm:space-y-3">
                    {courses.slice(1).map((course, index) => (
                      <motion.div
                        key={course.id}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="flex items-center justify-between p-2 sm:p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                      >
                        <span className="font-medium text-gray-900 text-sm sm:text-base">
                          {course.name}
                        </span>
                        <span className="font-bold text-red-600 text-sm sm:text-base">
                          ₦{course.price}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Additional Info */}
                  <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-200">
                    <div className="space-y-2 md:space-y-3 text-xs sm:text-sm text-gray-600">
                      <p className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full shrink-0"></span>
                        <span>13-week intensive bootcamp</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full shrink-0"></span>
                        <span>100% practical, job-oriented training</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full shrink-0"></span>
                        <span>Expert-led sessions</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full shrink-0"></span>
                        <span>Career support and mentorship</span>
                      </p>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="mt-6 md:mt-8 p-3 sm:p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-black mb-2 text-sm sm:text-base">
                      Need Help?
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Contact us at{' '}
                      <a 
                        href="mailto:acedu@gmail.com" 
                        className="text-red-600 hover:text-red-700 font-medium"
                      >
                        acedu@gmail.com
                      </a>
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
    </>
  )
}

export default RegisterPage