import { Container } from '../components';
import { Link } from 'react-router';
import profilepic from "../images/himanshu_Sharma_profile.jpeg"

function About() {
    return (
        <div className='w-full min-h-screen py-8 bg-gray-50'>
            <Container>
                {/* Header Section */}
                <div className='mb-16 text-center'>
                    <h1 className='mb-4 text-3xl font-bold md:text-4xl text-gray-900'>
                        About BlogSphere
                    </h1>
                    <p className='max-w-2xl mx-auto text-lg text-gray-600'>
                        Empowering creators worldwide to share their stories and connect with audiences.
                    </p>
                </div>

                {/* Mission Section */}
                <div className='grid gap-12 mb-16 md:grid-cols-2'>
                    <div className='flex flex-col justify-center'>
                        <h2 className='mb-6 text-2xl font-bold text-gray-900'>Our Mission</h2>
                        <p className='mb-4 text-gray-700'>
                            At BlogSphere, we believe everyone has a story worth sharing. Our mission is to provide 
                            a platform where creators of all backgrounds can express themselves, share knowledge, 
                            and build communities around their passions.
                        </p>
                        <p className='text-gray-700'>
                            Founded in 2023, we've grown to become a trusted platform for thousands of writers, 
                            developers, and thought leaders who want to make an impact with their words.
                        </p>
                    </div>
                    <div className='flex items-center justify-center'>
                        <div className='relative w-full h-64 rounded-lg flex items-center justify-center overflow-hidden shadow-lg'>
                            <img 
                                src="https://images.unsplash.com/photo-1640161339667-88fc7a1135b0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTF8fGJsb2d8ZW58MHx8MHx8fDA%3D" 
                                alt="BlogSphere platform" 
                                className="object-cover w-full h-full"
                            />
                            <div className='absolute inset-0 bg-gradient-to-r from-blue-900/70 to-purple-900/70 flex items-center justify-center'>
                                <span className='text-4xl text-white font-bold z-10'>BlogSphere</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className='grid grid-cols-2 gap-6 mb-16 md:grid-cols-4'>
                    <div className='p-6 text-center bg-white rounded-lg shadow-md'>
                        <div className='text-3xl font-bold text-blue-600'>5.2K+</div>
                        <div className='text-gray-600'>Active Creators</div>
                    </div>
                    <div className='p-6 text-center bg-white rounded-lg shadow-md'>
                        <div className='text-3xl font-bold text-green-600'>18.7K+</div>
                        <div className='text-gray-600'>Published Articles</div>
                    </div>
                    <div className='p-6 text-center bg-white rounded-lg shadow-md'>
                        <div className='text-3xl font-bold text-purple-600'>92+</div>
                        <div className='text-gray-600'>Countries Reached</div>
                    </div>
                    <div className='p-6 text-center bg-white rounded-lg shadow-md'>
                        <div className='text-3xl font-bold text-orange-600'>2.1M+</div>
                        <div className='text-gray-600'>Monthly Readers</div>
                    </div>
                </div>

                {/* Values Section */}
                <div className='mb-16'>
                    <h2 className='mb-12 text-2xl font-bold text-center text-gray-900'>Our Values</h2>
                    <div className='grid gap-8 md:grid-cols-3'>
                        <div className='p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300'>
                            <div className='flex items-center justify-center w-12 h-12 mb-4 text-white bg-blue-500 rounded-full'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className='mb-2 text-xl font-semibold text-gray-900'>Authenticity</h3>
                            <p className='text-gray-600'>
                                We believe in genuine storytelling and authentic voices. Your unique perspective matters.
                            </p>
                        </div>
                        <div className='p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300'>
                            <div className='flex items-center justify-center w-12 h-12 mb-4 text-white bg-green-500 rounded-full'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className='mb-2 text-xl font-semibold text-gray-900'>Community</h3>
                            <p className='text-gray-600'>
                                We foster supportive communities where creators can connect, collaborate, and grow together.
                            </p>
                        </div>
                        <div className='p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300'>
                            <div className='flex items-center justify-center w-12 h-12 mb-4 text-white bg-purple-500 rounded-full'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                </svg>
                            </div>
                            <h3 className='mb-2 text-xl font-semibold text-gray-900'>Innovation</h3>
                            <p className='text-gray-600'>
                                We continuously improve our platform to provide the best experience for content creators and readers.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Team Section */}
                <div className='mb-16'>
                    <h2 className='mb-12 text-2xl font-bold text-center text-gray-900'>Our Team</h2>
                    <div className='flex flex-wrap justify-center gap-8'>
                        <div className='text-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 w-72'>
                            <div className='w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full shadow-md'>
                                <img 
                                    src={profilepic} 
                                    alt="Himanshu Sharma" 
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <h3 className='mb-1 text-lg font-semibold text-gray-900'>Himanshu Sharma</h3>
                            <p className='mb-3 text-gray-600'>Founder & CEO</p>
                            <p className='text-sm text-gray-500'>Full-stack developer passionate about building modern web apps and creating tools for creators. </p>
                        </div>
                        <div className='text-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 w-72'>
                            <div className='w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full shadow-md'>
                                <img 
                                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1288&q=80" 
                                    alt="Sarah Chen" 
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <h3 className='mb-1 text-lg font-semibold text-gray-900'>Test Subject - 1</h3>
                            <p className='mb-3 text-gray-600'>CTO & Co-Founder</p>
                            <p className='text-sm text-gray-500'>Led engineering teams at Facebook before co-founding BlogSphere to build better creator tools</p>
                        </div>
                        <div className='text-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 w-72'>
                            <div className='w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full shadow-md'>
                                <img 
                                    src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80" 
                                    alt="Michael Rodriguez" 
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <h3 className='mb-1 text-lg font-semibold text-gray-900'>Test Subject - 2</h3>
                            <p className='mb-3 text-gray-600'>Head of Product</p>
                            <p className='text-sm text-gray-500'>Product lead from Airbnb who joined to build the most intuitive blogging experience</p>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className='p-8 text-center text-white bg-gradient-to-r from-blue-600 to-purple-700 rounded-lg shadow-lg'>
                    <h2 className='mb-4 text-2xl font-bold'>Join Our Community</h2>
                    <p className='max-w-2xl mx-auto mb-6 text-blue-100'>
                        Ready to share your story with the world? Join thousands of creators on BlogSphere today.
                    </p>
                    <div className='flex flex-col justify-center gap-4 sm:flex-row'>
                        <Link 
                            to="/signup"
                            className="px-6 py-3 font-medium text-blue-600 bg-white rounded-lg hover:bg-gray-100 transition-colors duration-300"
                        >
                            Create Account
                        </Link>
                        <Link 
                            to="/"
                            className="px-6 py-3 font-medium text-white bg-transparent border-2 border-white rounded-lg hover:bg-white/10 transition-colors duration-300"
                        >
                            Read Blogs
                        </Link>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default About;