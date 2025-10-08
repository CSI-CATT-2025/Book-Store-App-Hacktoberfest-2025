import { useState } from 'react';
import { FiMail } from 'react-icons/fi';
import toast from 'react-hot-toast';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.message) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      // Handle form submission logic here
      toast.success('Your message has been sent!');
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-16 text-black dark:text-white ">
      <div className="flex items-center justify-center mb-8">
        <FiMail className="text-3xl md:text-4xl mr-4" />
        <h1 className="text-3xl md:text-4xl font-bold">Contact Us</h1>
      </div>

      <p className="text-base md:text-lg text-justify leading-relaxed mb-6">
        We would love to hear from you! Whether you have questions about our products, need assistance with your order, or want to share your feedback, please feel free to reach out to us. Your thoughts and inquiries are important to us, and we are here to help you.
      </p>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label htmlFor="name" className="block text-base md:text-lg font-semibold mb-2">Name:</label>
          <input type="text" id="name" placeholder="Enter your name" value={formData.name} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md shadow-sm bg-white dark:text-black focus:ring-blue-500 focus:border-blue-500" aria-label="Name" />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-base md:text-lg font-semibold mb-2">Email:</label>
          <input type="email" id="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md shadow-sm bg-white dark:text-black focus:ring-blue-500 focus:border-blue-500" aria-label="Email" />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-base md:text-lg font-semibold mb-2">Message:</label>
          <textarea id="message" placeholder="Type your message" value={formData.message} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md shadow-sm bg-white dark:text-black focus:ring-blue-500 focus:border-blue-500" rows="4" aria-label="Message"></textarea>
          {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 hover:scale-105 transition-transform duration-200">Send Message</button>
      </form>

      <p className="text-lg text-center font-semibold">
        Thank you for reaching out to us!<br />
        <strong>The Shop24/7 Books Team</strong>
      </p>
    </div>
  );
}

export default ContactUs;
