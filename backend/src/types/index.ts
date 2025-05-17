// src/types/index.ts

// User related types
export interface User {
    id: string;
    email: string;
    password: string;
    role: UserRole;
    firstName: string;
    lastName: string;
    profilePicture?: string;
    bio?: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export type UserRole = 'student' | 'teacher' | 'admin';
  
  export interface UserRegistration {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role?: UserRole;
  }
  
  export interface UserLogin {
    email: string;
    password: string;
  }
  
  export interface UserResponse {
    id: string;
    email: string;
    role: UserRole;
    firstName: string;
    lastName: string;
    profilePicture?: string;
    bio?: string;
  }
  
  export interface AuthResponse {
    user: UserResponse;
    token: string;
    refreshToken: string;
  }
  
  // Course related types
  export interface Course {
    id: string;
    title: string;
    description: string;
    thumbnailUrl?: string;
    teacherId: string;
    price: number;
    status: CourseStatus;
    level: CourseLevel;
    category: string;
    categoryId?: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export type CourseStatus = 'draft' | 'published' | 'archived';
  export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';
  
  // Lecture related types
  export interface Lecture {
    id: string;
    courseId: string;
    title: string;
    description?: string;
    contentType: ContentType;
    contentUrl?: string;
    orderIndex: number;
    duration?: number;
    isPublished: boolean;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export type ContentType = 'video' | 'document' | 'quiz';
  
  // Enrollment related types
  export interface Enrollment {
    id: string;
    userId: string;
    courseId: string;
    progress: number;
    enrolledAt: Date;
    completedAt?: Date;
    lastAccessedAt: Date;
  }
  
  // Lecture progress types
  export interface LectureProgress {
    id: string;
    userId: string;
    lectureId: string;
    isCompleted: boolean;
    progressSeconds: number;
    lastAccessedAt: Date;
  }
  
  // Assignment related types
  export interface Assignment {
    id: string;
    courseId: string;
    title: string;
    description: string;
    dueDate?: Date;
    maxPoints: number;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface AssignmentSubmission {
    id: string;
    assignmentId: string;
    userId: string;
    submissionUrl?: string;
    submissionText?: string;
    submittedAt: Date;
    grade?: number;
    feedback?: string;
    gradedAt?: Date;
  }
  
  // Message related types
  export interface Message {
    id: string;
    senderId: string;
    recipientId: string;
    courseId?: string;
    subject: string;
    content: string;
    createdAt: Date;
    readAt?: Date;
  }
  
  // AI Chat related types
  export interface AIChatHistory {
    id: string;
    userId: string;
    query: string;
    response: string;
    createdAt: Date;
  }
  
  // Review related types
  export interface Review {
    id: string;
    courseId: string;
    userId: string;
    rating: number;
    comment?: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  // Category related types
  export interface Category {
    id: string;
    name: string;
    description?: string;
    createdAt: Date;
  }
  
  // Notification related types
  export interface Notification {
    id: string;
    userId: string;
    type: string;
    message: string;
    isRead: boolean;
    referenceId?: string;
    createdAt: Date;
  }
  
  // API Error types
  export interface AppErrorOptions {
    statusCode: number;
    message: string;
  }
  
  // API Response types
  export interface ApiResponse<T> {
    status: 'success' | 'error' | 'fail';
    message?: string;
    data?: T;
    results?: number;
    errors?: { field: string; message: string }[];
  }