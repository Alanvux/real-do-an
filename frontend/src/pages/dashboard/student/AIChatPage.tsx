// src/pages/dashboard/student/AIChatPage.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import aiChatService from '@/services/aiChatService';
import Button from '@/components/ui/Button';
import { 
  PaperAirplaneIcon, 
  ArrowPathIcon,
  ArchiveBoxIcon,
  LightBulbIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline';

interface Message {
  id?: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatHistoryItem {
  id: string;
  query: string;
  response: string;
  created_at: string;
}

interface Course {
  id: string;
  title: string;
}

const AIChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m your AI learning assistant. How can I help with your studies today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [courses, setCourses] = useState<Course[]>([]);
  const [showChatHistory, setShowChatHistory] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [suggestedPrompts, setSuggestedPrompts] = useState<string[]>([
    "Can you explain the concept of React component lifecycle?",
    "What are the key differences between SQL and NoSQL databases?",
    "How does useEffect hook work in React?",
    "Explain the MVC architecture pattern",
    "What are closures in JavaScript?"
  ]);
  
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const { user } = useSelector((state: RootState) => state.auth);
  
  // Fetch enrolled courses for context
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // This would normally come from a courseService API call
        // For now, we'll use placeholder data
        setCourses([
          { id: '11111111-2222-3333-4444-555555555555', title: 'React Fundamentals' },
          { id: '22222222-3333-4444-5555-666666666666', title: 'Node.js Backend Development' },
          { id: '33333333-4444-5555-6666-777777777777', title: 'Python for Data Science' }
        ]);
      } catch (err) {
        console.error('Failed to fetch courses', err);
      }
    };
    
    fetchCourses();
  }, []);
  
  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };
  
  // Handle send message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);
    
    try {
      // Prepare request data
      const requestData: { query: string; courseId?: string } = {
        query: input
      };
      
      // Add courseId if selected
      if (selectedCourse) {
        requestData.courseId = selectedCourse;
      }
      
      // Send request to AI
      const response = await aiChatService.sendMessage(requestData.query, requestData.courseId);
      
      // Add AI response to messages
      const assistantMessage: Message = {
        role: 'assistant',
        content: response.response,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Error sending message to AI', err);
      setError('Failed to get a response. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Fetch chat history
  const handleFetchChatHistory = async () => {
    setHistoryLoading(true);
    try {
      const history = await aiChatService.getChatHistory();
      setChatHistory(history.chatHistory);
      setShowChatHistory(true);
    } catch (err) {
      console.error('Failed to fetch chat history', err);
    } finally {
      setHistoryLoading(false);
    }
  };
  
  // Load a conversation from history
  const loadConversation = (item: ChatHistoryItem) => {
    setMessages([
      {
        role: 'user',
        content: item.query,
        timestamp: new Date(item.created_at)
      },
      {
        role: 'assistant',
        content: item.response,
        timestamp: new Date(item.created_at)
      }
    ]);
    setShowChatHistory(false);
  };
  
  // Start a new conversation
  const startNewConversation = () => {
    setMessages([
      {
        role: 'assistant',
        content: 'Hello! I\'m your AI learning assistant. How can I help with your studies today?',
        timestamp: new Date()
      }
    ]);
  };
  
  // Use a suggested prompt
  const useSuggestedPrompt = (prompt: string) => {
    setInput(prompt);
  };
  
  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-900">AI Learning Assistant</h1>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            leftIcon={<ArchiveBoxIcon className="h-5 w-5" />}
            onClick={handleFetchChatHistory}
          >
            History
          </Button>
          <Button
            variant="outline"
            leftIcon={<ArrowPathIcon className="h-5 w-5" />}
            onClick={startNewConversation}
          >
            New Chat
          </Button>
        </div>
      </div>
      
      {/* Course context selector */}
      <div className="mb-4">
        <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1">
          Course Context (Optional)
        </label>
        <select
          id="course"
          className="form-select"
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
        >
          <option value="">No specific course</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.title}
            </option>
          ))}
        </select>
        <p className="mt-1 text-sm text-gray-500">
          Selecting a course provides relevant context to the AI assistant.
        </p>
      </div>
      
      {/* Chat History Panel */}
      {showChatHistory ? (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4 max-h-96 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Chat History</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowChatHistory(false)}
            >
              Close
            </Button>
          </div>
          
          {historyLoading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>
          ) : chatHistory.length === 0 ? (
            <p className="text-gray-500 py-4 text-center">No chat history found</p>
          ) : (
            <ul className="space-y-2">
              {chatHistory.map((item) => (
                <li
                  key={item.id}
                  className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 cursor-pointer"
                  onClick={() => loadConversation(item)}
                >
                  <div className="flex justify-between">
                    <p className="font-medium text-gray-800 truncate">{item.query}</p>
                    <span className="text-xs text-gray-500">
                      {new Date(item.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{item.response}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <>
          {/* Suggested prompts */}
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <LightBulbIcon className="h-5 w-5 text-primary-600 mr-2" />
              <h3 className="text-sm font-medium text-gray-700">Suggested Questions</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {suggestedPrompts.map((prompt, index) => (
                <button
                  key={index}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 truncate max-w-xs"
                  onClick={() => useSuggestedPrompt(prompt)}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
          
          {/* Messages */}
          <div className="flex-1 bg-white rounded-lg shadow-md p-4 mb-4 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-3/4 rounded-lg px-4 py-2 ${
                      message.role === 'user'
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {message.role === 'assistant' && (
                      <div className="flex items-center mb-1">
                        <BookOpenIcon className="h-4 w-4 mr-1" />
                        <span className="text-xs font-medium">AI Assistant</span>
                      </div>
                    )}
                    <div className="whitespace-pre-wrap">{message.content}</div>
                    <div className="text-xs opacity-70 text-right mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Loading indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-3/4 bg-gray-100 rounded-lg px-4 py-2 text-gray-800">
                    <div className="flex items-center">
                      <BookOpenIcon className="h-4 w-4 mr-1" />
                      <span className="text-xs font-medium">AI Assistant</span>
                    </div>
                    <div className="flex items-center space-x-1 my-2">
                      <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                      <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Error message */}
              {error && (
                <div className="flex justify-center">
                  <div className="max-w-3/4 bg-red-100 text-red-800 rounded-lg px-4 py-2">
                    <p>{error}</p>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>
        </>
      )}
      
      {/* Input form */}
      <form onSubmit={handleSendMessage} className="flex items-end space-x-2">
        <div className="flex-1">
          <textarea
            className="form-input w-full rounded-lg resize-none border-gray-300 focus:border-primary-500 focus:ring-primary-500"
            rows={3}
            placeholder="Type your question here..."
            value={input}
            onChange={handleInputChange}
            disabled={isLoading}
          ></textarea>
        </div>
        <Button
          type="submit"
          variant="primary"
          className="h-12 w-12 rounded-full flex items-center justify-center"
          disabled={isLoading || !input.trim()}
        >
          <PaperAirplaneIcon className="h-6 w-6" />
        </Button>
      </form>
      
      <p className="mt-2 text-xs text-gray-500">
        Powered by AI to help with your learning journey. Your conversations may be stored to improve the service.
      </p>
    </div>
  );
};

export default AIChatPage;