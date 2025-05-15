// src/pages/HomePage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@/components/ui/Button';

const HomePage: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100" />
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
            <div className="absolute inset-0">
              <img
                className="h-full w-full object-cover"
                src="/images/hero-image.jpg"
                alt="Students learning online"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-accent-600 mix-blend-multiply" />
            </div>
            <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
              <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                <span className="block text-white">Learning Made</span>
                <span className="block text-accent-200">Simple and Effective</span>
              </h1>
              <p className="mt-6 max-w-lg mx-auto text-center text-xl text-white sm:max-w-3xl">
                Unlock your potential with our comprehensive online courses. Learn from expert instructors and gain valuable skills for the future.
              </p>
              <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
                  <Link to="/courses">
                    <Button variant="primary" size="lg" fullWidth>
                      Explore Courses
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="outline" size="lg" fullWidth className="bg-white hover:bg-gray-50">
                      Sign Up for Free
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Categories Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Categories</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Explore Our Top Categories
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Find the perfect course from our wide range of categories tailored for beginners to advanced learners.
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
              <div className="group relative bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-w-16 aspect-h-9 bg-primary-100 group-hover:opacity-75">
                  <div className="flex items-center justify-center h-full p-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1 p-6 space-y-2 flex flex-col">
                  <h3 className="font-semibold text-gray-900">Web Development</h3>
                  <p className="text-sm text-gray-500">Learn to build responsive websites and web applications with modern frameworks.</p>
                  <div className="mt-auto">
                    <Link to="/courses?category=web-development" className="text-primary-600 hover:text-primary-700 font-medium">
                      Browse courses <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="group relative bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-w-16 aspect-h-9 bg-accent-100 group-hover:opacity-75">
                  <div className="flex items-center justify-center h-full p-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1 p-6 space-y-2 flex flex-col">
                  <h3 className="font-semibold text-gray-900">Data Science</h3>
                  <p className="text-sm text-gray-500">Dive into data analysis, visualization, and machine learning with Python.</p>
                  <div className="mt-auto">
                    <Link to="/courses?category=data-science" className="text-accent-600 hover:text-accent-700 font-medium">
                      Browse courses <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="group relative bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-w-16 aspect-h-9 bg-success-100 group-hover:opacity-75">
                  <div className="flex items-center justify-center h-full p-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-success-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1 p-6 space-y-2 flex flex-col">
                  <h3 className="font-semibold text-gray-900">Mobile Development</h3>
                  <p className="text-sm text-gray-500">Build mobile applications for iOS and Android with React Native.</p>
                  <div className="mt-auto">
                    <Link to="/courses?category=mobile-development" className="text-success-600 hover:text-success-700 font-medium">
                      Browse courses <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="group relative bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-w-16 aspect-h-9 bg-warning-100 group-hover:opacity-75">
                  <div className="flex items-center justify-center h-full p-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-warning-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1 p-6 space-y-2 flex flex-col">
                  <h3 className="font-semibold text-gray-900">Design</h3>
                  <p className="text-sm text-gray-500">Master the principles of UI/UX design and create stunning visual experiences.</p>
                  <div className="mt-auto">
                    <Link to="/courses?category=design" className="text-warning-600 hover:text-warning-700 font-medium">
                      Browse courses <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Courses Section */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Featured Courses</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Learn from Our Best Courses
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Expand your knowledge with our most popular and highly-rated courses.
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* Course Card 1 */}
              <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                <div className="flex-shrink-0">
                  <img className="h-48 w-full object-cover" src="/images/course-react.jpg" alt="React Course" />
                </div>
                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-primary-600">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">Web Development</span>
                    </p>
                    <Link to="/courses/react-fundamentals" className="block mt-2">
                      <p className="text-xl font-semibold text-gray-900">React Fundamentals</p>
                      <p className="mt-3 text-base text-gray-500">Learn the basics of React, from components to hooks and everything in between.</p>
                    </Link>
                  </div>
                  <div className="mt-6 flex items-center">
                    <div className="flex-shrink-0">
                      <img className="h-10 w-10 rounded-full" src="/images/instructor-1.jpg" alt="Instructor" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Jane Smith</p>
                      <div className="flex items-center">
                        <div className="flex items-center text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <p className="ml-1 text-sm text-gray-500">4.9 (120 reviews)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Course Card 2 */}
              <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                <div className="flex-shrink-0">
                  <img className="h-48 w-full object-cover" src="/images/course-node.jpg" alt="Node.js Course" />
                </div>
                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-primary-600">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">Web Development</span>
                    </p>
                    <Link to="/courses/node-backend" className="block mt-2">
                      <p className="text-xl font-semibold text-gray-900">Node.js Backend Development</p>
                      <p className="mt-3 text-base text-gray-500">Build robust and scalable backend applications with Node.js, Express, and MongoDB.</p>
                    </Link>
                  </div>
                  <div className="mt-6 flex items-center">
                    <div className="flex-shrink-0">
                      <img className="h-10 w-10 rounded-full" src="/images/instructor-2.jpg" alt="Instructor" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">John Doe</p>
                      <div className="flex items-center">
                        <div className="flex items-center text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <p className="ml-1 text-sm text-gray-500">4.8 (98 reviews)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Course Card 3 */}
              <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                <div className="flex-shrink-0">
                  <img className="h-48 w-full object-cover" src="/images/course-python.jpg" alt="Python Course" />
                </div>
                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-primary-600">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent-100 text-accent-800">Data Science</span>
                    </p>
                    <Link to="/courses/python-data-science" className="block mt-2">
                      <p className="text-xl font-semibold text-gray-900">Python for Data Science</p>
                      <p className="mt-3 text-base text-gray-500">Learn how to analyze and visualize data using Python and popular data science libraries.</p>
                    </Link>
                  </div>
                  <div className="mt-6 flex items-center">
                    <div className="flex-shrink-0">
                      <img className="h-10 w-10 rounded-full" src="/images/instructor-3.jpg" alt="Instructor" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Emily Johnson</p>
                      <div className="flex items-center">
                        <div className="flex items-center text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <p className="ml-1 text-sm text-gray-500">4.7 (75 reviews)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link to="/courses">
                <Button variant="primary" size="lg">
                  View All Courses
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Testimonials</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              What Our Students Say
            </p>
          </div>
          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Testimonial 1 */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <img className="h-12 w-12 rounded-full" src="/images/student-1.jpg" alt="Student" />
                  <div className="ml-4">
                    <h4 className="text-lg font-bold">Alex Johnson</h4>
                    <p className="text-gray-600">Web Developer</p>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex items-center text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700">
                  "The React Fundamentals course completely transformed my career. The instructor's teaching style made complex concepts easy to understand. I landed a job as a React developer within weeks of completing the course!"
                </p>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <img className="h-12 w-12 rounded-full" src="/images/student-2.jpg" alt="Student" />
                  <div className="ml-4">
                    <h4 className="text-lg font-bold">Sarah Williams</h4>
                    <p className="text-gray-600">Data Analyst</p>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex items-center text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700">
                  "I took the Python for Data Science course as a complete beginner, and it was fantastic! The hands-on projects really helped me apply what I learned. I'm now confidently working with data in my daily job."
                </p>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <img className="h-12 w-12 rounded-full" src="/images/student-3.jpg" alt="Student" />
                  <div className="ml-4">
                    <h4 className="text-lg font-bold">Michael Rodriguez</h4>
                    <p className="text-gray-600">Mobile Developer</p>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex items-center text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700">
                  "The React Native course was exactly what I needed to transition into mobile development. The instructor was knowledgeable and responsive. I've already built several apps using what I learned!"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to start learning?</span>
            <span className="block text-primary-200">Join thousands of students today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link to="/register">
                <Button variant="outline" size="lg" className="bg-white hover:bg-gray-50">
                  Get Started
                </Button>
              </Link>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <Link to="/courses">
                <Button variant="primary" size="lg" className="bg-primary-600 hover:bg-primary-500">
                  View Courses
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;