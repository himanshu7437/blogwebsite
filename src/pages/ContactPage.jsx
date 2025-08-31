import { Container } from '../components';
import { useState } from 'react';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log('Form submitted:', formData);
        alert('Thank you for your message! We will get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <div className='w-full min-h-screen bg-gray-50'>
            {/* Header with Gradient Background */}
            <div className='bg-gradient-to-r from-blue-600 to-purple-700 py-16 text-white'>
                <Container>
                    <div className='text-center'>
                        <h1 className='mb-4 text-4xl font-bold md:text-5xl'>Get in Touch</h1>
                        <p className='max-w-2xl mx-auto text-xl text-blue-100'>
                            We'd love to hear from you. Reach out to our team for questions, feedback, or support.
                        </p>
                    </div>
                </Container>
            </div>

            <Container>
                {/* Main Content */}
                <div className='py-12'>
                    <div className='grid gap-12 lg:grid-cols-5'>
                        {/* Contact Information */}
                        <div className='lg:col-span-2'>
                            <h2 className='mb-8 text-2xl font-bold text-gray-900'>Contact Information</h2>
                            
                            <div className='space-y-6'>
                                <div className='flex items-start p-4 bg-white rounded-lg shadow-md'>
                                    <div className='flex items-center justify-center flex-shrink-0 w-12 h-12 mr-4 text-white bg-blue-500 rounded-full'>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className='text-lg font-semibold text-gray-900'>Call Us</h3>
                                        <p className='text-gray-600'>Speak directly to our support team</p>
                                        <a href="tel:+11234567890" className='text-blue-600 hover:underline'>+1 (123) 456-7890</a>
                                    </div>
                                </div>

                                <div className='flex items-start p-4 bg-white rounded-lg shadow-md'>
                                    <div className='flex items-center justify-center flex-shrink-0 w-12 h-12 mr-4 text-white bg-green-500 rounded-full'>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className='text-lg font-semibold text-gray-900'>Email Us</h3>
                                        <p className='text-gray-600'>Send us an email anytime</p>
                                        <a href="mailto:support@blogsphere.com" className='text-blue-600 hover:underline'>support@blogsphere.com</a>
                                    </div>
                                </div>

                                <div className='flex items-start p-4 bg-white rounded-lg shadow-md'>
                                    <div className='flex items-center justify-center flex-shrink-0 w-12 h-12 mr-4 text-white bg-purple-500 rounded-full'>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className='text-lg font-semibold text-gray-900'>Visit Us</h3>
                                        <p className='text-gray-600'>Come say hello at our office</p>
                                        <p className='text-gray-600'>123 Tech Park Avenue, San Francisco, CA 94107</p>
                                    </div>
                                </div>
                            </div>

                            {/* Social Media */}
                            <div className='p-6 mt-8 bg-white rounded-lg shadow-md'>
                                <h3 className='mb-4 text-xl font-semibold text-gray-900'>Follow Us</h3>
                                <p className='mb-4 text-gray-600'>Stay connected with us on social media for updates and news.</p>
                                <div className='flex space-x-4'>
                                    <a href="#" className='p-2 text-gray-600 transition-colors bg-gray-100 rounded-full hover:bg-blue-100 hover:text-blue-600'>
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                    <a href="#" className='p-2 text-gray-600 transition-colors bg-gray-100 rounded-full hover:bg-blue-400 hover:text-white'>
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                        </svg>
                                    </a>
                                    <a href="#" className='p-2 text-gray-600 transition-colors bg-gray-100 rounded-full hover:bg-purple-100 hover:text-purple-600'>
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                    <a href="#" className='p-2 text-gray-600 transition-colors bg-gray-100 rounded-full hover:bg-red-100 hover:text-red-600'>
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className='lg:col-span-3'>
                            <div className='p-8 bg-white rounded-lg shadow-md'>
                                <h2 className='mb-6 text-2xl font-bold text-gray-900'>Send us a Message</h2>
                                <form className='space-y-6' onSubmit={handleSubmit}>
                                    <div className='grid gap-6 sm:grid-cols-2'>
                                        <div>
                                            <label htmlFor="name" className='block mb-2 text-sm font-medium text-gray-700'>Your Name *</label>
                                            <input 
                                                type="text" 
                                                id="name" 
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="Enter your name"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className='block mb-2 text-sm font-medium text-gray-700'>Email Address *</label>
                                            <input 
                                                type="email" 
                                                id="email" 
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="your.email@example.com"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="subject" className='block mb-2 text-sm font-medium text-gray-700'>Subject *</label>
                                        <select 
                                            id="subject" 
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        >
                                            <option value="">Select a subject</option>
                                            <option value="general">General Inquiry</option>
                                            <option value="technical">Technical Support</option>
                                            <option value="billing">Billing Question</option>
                                            <option value="partnership">Partnership Opportunity</option>
                                            <option value="feedback">Feedback</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="message" className='block mb-2 text-sm font-medium text-gray-700'>Your Message *</label>
                                        <textarea 
                                            id="message" 
                                            name="message"
                                            rows="5" 
                                            value={formData.message}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="How can we help you?"
                                            required
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
                                    >
                                        Send Message
                                    </button>
                                </form>
                            </div>

                            {/* Response Time Info */}
                            <div className='p-6 mt-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-md text-white'>
                                <div className='flex items-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 w-6 h-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <div>
                                        <h3 className='font-semibold'>Quick Response Time</h3>
                                        <p className='text-blue-100'>We typically respond to all inquiries within 24 hours.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div className='mt-16'>
                        <h2 className='mb-8 text-2xl font-bold text-center text-gray-900'>Frequently Asked Questions</h2>
                        <div className='grid gap-6 md:grid-cols-2'>
                            <div className='p-6 bg-white rounded-lg shadow-md'>
                                <h3 className='mb-3 text-lg font-semibold text-gray-900'>How do I create an account on BlogSphere?</h3>
                                <p className='text-gray-600'>Click on the "Sign Up" button in the top right corner of any page. You'll need to provide your email address and create a password to get started.</p>
                            </div>
                            <div className='p-6 bg-white rounded-lg shadow-md'>
                                <h3 className='mb-3 text-lg font-semibold text-gray-900'>Is BlogSphere free to use?</h3>
                                <p className='text-gray-600'>Yes, BlogSphere offers a free plan with basic features. We also have premium plans with additional capabilities for serious content creators.</p>
                            </div>
                            <div className='p-6 bg-white rounded-lg shadow-md'>
                                <h3 className='mb-3 text-lg font-semibold text-gray-900'>How can I monetize my blog?</h3>
                                <p className='text-gray-600'>We offer several monetization options including display ads, sponsored content opportunities, premium subscriptions, and affiliate marketing integrations.</p>
                            </div>
                            <div className='p-6 bg-white rounded-lg shadow-md'>
                                <h3 className='mb-3 text-lg font-semibold text-gray-900'>Can I transfer my existing blog to BlogSphere?</h3>
                                <p className='text-gray-600'>Yes, we provide migration tools to help you transfer content from platforms like WordPress, Medium, and Blogger. Contact our support team for assistance.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Contact;