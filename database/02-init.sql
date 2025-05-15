-- Seed E-Learning Database with sample data

-- Insert sample categories
INSERT INTO categories (id, name, description) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Web Development', 'Courses related to web development, including frontend and backend technologies'),
  ('22222222-2222-2222-2222-222222222222', 'Data Science', 'Courses related to data analysis, visualization, and machine learning'),
  ('33333333-3333-3333-3333-333333333333', 'Mobile Development', 'Courses focused on mobile app development for iOS and Android'),
  ('44444444-4444-4444-4444-444444444444', 'Design', 'Courses covering design principles, UX/UI, and graphic design');

-- Insert sample users with hashed passwords (password is 'password123' for all)
INSERT INTO users (id, email, password, role, first_name, last_name, bio) VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'admin@example.com', '$2a$10$mLK.rrdlvx9DCFb6Eck1t.TlltnGulepXnov3bBp5T2TloO1MYj52', 'admin', 'Admin', 'User', 'System administrator'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'teacher@example.com', '$2a$10$mLK.rrdlvx9DCFb6Eck1t.TlltnGulepXnov3bBp5T2TloO1MYj52', 'teacher', 'Teacher', 'User', 'Experienced web developer and educator'),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'student@example.com', '$2a$10$mLK.rrdlvx9DCFb6Eck1t.TlltnGulepXnov3bBp5T2TloO1MYj52', 'student', 'Student', 'User', 'Eager learner exploring web development'),
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'teacher2@example.com', '$2a$10$mLK.rrdlvx9DCFb6Eck1t.TlltnGulepXnov3bBp5T2TloO1MYj52', 'teacher', 'Jane', 'Smith', 'Data science specialist with 10 years experience');

-- Insert sample courses
INSERT INTO courses (id, title, description, teacher_id, price, status, level, category, category_id) VALUES
  ('11111111-2222-3333-4444-555555555555', 'React Fundamentals', 'Learn the basics of React including components, props, and state management', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 49.99, 'published', 'beginner', 'Web Development', '11111111-1111-1111-1111-111111111111'),
  ('22222222-3333-4444-5555-666666666666', 'Node.js Backend Development', 'Build robust and scalable backend applications with Node.js, Express, and MongoDB', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 59.99, 'published', 'intermediate', 'Web Development', '11111111-1111-1111-1111-111111111111'),
  ('33333333-4444-5555-6666-777777777777', 'Python for Data Science', 'Learn how to analyze and visualize data using Python and popular data science libraries', 'dddddddd-dddd-dddd-dddd-dddddddddddd', 69.99, 'published', 'beginner', 'Data Science', '22222222-2222-2222-2222-222222222222'),
  ('44444444-5555-6666-7777-888888888888', 'Mobile App Development with React Native', 'Create cross-platform mobile applications with React Native', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 79.99, 'published', 'intermediate', 'Mobile Development', '33333333-3333-3333-3333-333333333333'),
  ('55555555-6666-7777-8888-999999999999', 'UX/UI Design Principles', 'Master the principles of effective user interface and user experience design', 'dddddddd-dddd-dddd-dddd-dddddddddddd', 49.99, 'published', 'beginner', 'Design', '44444444-4444-4444-4444-444444444444');

-- Insert sample lectures for React Fundamentals course
INSERT INTO lectures (id, course_id, title, description, content_type, content_url, order_index, duration, is_published) VALUES
  ('aaaaaaaa-1111-2222-3333-444444444444', '11111111-2222-3333-4444-555555555555', 'Introduction to React', 'Overview of React and its core concepts', 'video', 'https://example.com/videos/react-intro.mp4', 1, 1200, true),
  ('bbbbbbbb-2222-3333-4444-555555555555', '11111111-2222-3333-4444-555555555555', 'Components and Props', 'Creating components and passing props', 'video', 'https://example.com/videos/react-components.mp4', 2, 1800, true),
  ('cccccccc-3333-4444-5555-666666666666', '11111111-2222-3333-4444-555555555555', 'State and Lifecycle', 'Managing component state and lifecycle methods', 'video', 'https://example.com/videos/react-state.mp4', 3, 2400, true),
  ('dddddddd-4444-5555-6666-777777777777', '11111111-2222-3333-4444-555555555555', 'Hooks and Functional Components', 'Using React hooks in functional components', 'video', 'https://example.com/videos/react-hooks.mp4', 4, 3000, true);

-- Insert sample lectures for Node.js course
INSERT INTO lectures (id, course_id, title, description, content_type, content_url, order_index, duration, is_published) VALUES
  ('eeeeeeee-5555-6666-7777-888888888888', '22222222-3333-4444-5555-666666666666', 'Introduction to Node.js', 'Getting started with Node.js development', 'video', 'https://example.com/videos/node-intro.mp4', 1, 1500, true),
  ('ffffffff-6666-7777-8888-999999999999', '22222222-3333-4444-5555-666666666666', 'Express Framework', 'Building web applications with Express', 'video', 'https://example.com/videos/express-basics.mp4', 2, 1800, true),
  ('gggggggg-7777-8888-9999-aaaaaaaaaaaa', '22222222-3333-4444-5555-666666666666', 'RESTful API Development', 'Creating RESTful APIs with Node.js and Express', 'video', 'https://example.com/videos/rest-apis.mp4', 3, 2700, true);

-- Insert sample enrollments
INSERT INTO enrollments (user_id, course_id, progress) VALUES
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', '11111111-2222-3333-4444-555555555555', 75),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', '22222222-3333-4444-5555-666666666666', 30),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', '33333333-4444-5555-6666-777777777777', 10);

-- Insert sample lecture progress
INSERT INTO lecture_progress (user_id, lecture_id, is_completed, progress_seconds) VALUES
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'aaaaaaaa-1111-2222-3333-444444444444', true, 1200),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'bbbbbbbb-2222-3333-4444-555555555555', true, 1800),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'cccccccc-3333-4444-5555-666666666666', true, 2400),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'dddddddd-4444-5555-6666-777777777777', false, 1500),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'eeeeeeee-5555-6666-7777-888888888888', true, 1500),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'ffffffff-6666-7777-8888-999999999999', false, 900);

-- Insert sample assignments
INSERT INTO assignments (id, course_id, title, description, due_date, max_points) VALUES
  ('11111111-aaaa-bbbb-cccc-dddddddddddd', '11111111-2222-3333-4444-555555555555', 'React Component Design', 'Create a reusable component library with proper prop typing and documentation', '2023-06-15 23:59:59+00', 100),
  ('22222222-bbbb-cccc-dddd-eeeeeeeeeeee', '11111111-2222-3333-4444-555555555555', 'React Final Project', 'Build a full-featured React application with state management and API integration', '2023-07-01 23:59:59+00', 200),
  ('33333333-cccc-dddd-eeee-ffffffffffff', '22222222-3333-4444-5555-666666666666', 'RESTful API Implementation', 'Implement a RESTful API with Express and MongoDB', '2023-06-20 23:59:59+00', 100);

-- Insert sample assignment submissions
INSERT INTO assignment_submissions (id, assignment_id, user_id, submission_url, submission_text, grade, feedback) VALUES
  ('aaaaaaaa-1111-2222-3333-444444444444', '11111111-aaaa-bbbb-cccc-dddddddddddd', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'https://github.com/student/react-components', 'I created a set of reusable components including Button, Card, and Form components with proper TypeScript interfaces.', 85, 'Great work on component design! Consider adding more comprehensive documentation for better reusability.'),
  ('bbbbbbbb-2222-3333-4444-555555555555', '33333333-cccc-dddd-eeee-ffffffffffff', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'https://github.com/student/express-api', 'Implemented a RESTful API for a blog platform with CRUD operations for posts and comments.', NULL, NULL);

-- Insert sample messages
INSERT INTO messages (id, sender_id, recipient_id, course_id, subject, content) VALUES
  ('11111111-mmmm-mmmm-mmmm-mmmmmmmmmmmm', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'cccccccc-cccc-cccc-cccc-cccccccccccc', '11111111-2222-3333-4444-555555555555', 'Assignment Feedback', 'Great job on your recent React assignment! I particularly liked your implementation of the component library.'),
  ('22222222-mmmm-mmmm-mmmm-mmmmmmmmmmmm', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-2222-3333-4444-555555555555', 'Question about final project', 'I have a question about the requirements for the final project. Could you clarify what type of API integration is expected?'),
  ('33333333-mmmm-mmmm-mmmm-mmmmmmmmmmmm', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'cccccccc-cccc-cccc-cccc-cccccccccccc', '11111111-2222-3333-4444-555555555555', 'Re: Question about final project', 'You should integrate with a public API of your choice. You can use REST APIs like weather data, movie databases, or any other API that interests you. Let me know if you need suggestions!');

-- Insert sample AI chat history
INSERT INTO ai_chat_history (id, user_id, query, response) VALUES
  ('11111111-cccc-cccc-cccc-cccccccccccc', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'What is the difference between props and state in React?', 'Props (short for properties) are passed to components from their parent component, making them read-only within the component. State, on the other hand, is managed within the component and can be updated using setState(). Props are used to pass data down the component tree, while state is used to manage data that changes over time within a component.'),
  ('22222222-cccc-cccc-cccc-cccccccccccc', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'How do I create a REST API with Express?', 'To create a REST API with Express, you need to set up routes for your resources using HTTP methods like GET, POST, PUT, and DELETE. First, install Express with npm, then create route handlers for each endpoint. You''ll typically connect to a database like MongoDB or PostgreSQL to store and retrieve data. Use middleware for authentication, validation, and error handling. Remember to structure your API with proper status codes and consistent response formats.');

-- Insert sample reviews
INSERT INTO reviews (id, course_id, user_id, rating, comment) VALUES
  ('11111111-rrrr-rrrr-rrrr-rrrrrrrrrrrr', '11111111-2222-3333-4444-555555555555', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 5, 'Excellent course! The instructor explains React concepts clearly and the projects are very practical.'),
  ('22222222-rrrr-rrrr-rrrr-rrrrrrrrrrrr', '22222222-3333-4444-5555-666666666666', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 4, 'Good introduction to Node.js and Express. Would have liked more advanced topics.');

-- Insert sample notifications
INSERT INTO notifications (id, user_id, type, message, reference_id) VALUES
  ('11111111-nnnn-nnnn-nnnn-nnnnnnnnnnnn', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'assignment_graded', 'Your assignment "React Component Design" has been graded', '11111111-aaaa-bbbb-cccc-dddddddddddd'),
  ('22222222-nnnn-nnnn-nnnn-nnnnnnnnnnnn', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'new_message', 'You have a new message from Teacher User', '11111111-mmmm-mmmm-mmmm-mmmmmmmmmmmm'),
  ('33333333-nnnn-nnnn-nnnn-nnnnnnnnnnnn', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'new_submission', 'Student User has submitted an assignment', 'bbbbbbbb-2222-3333-4444-555555555555');