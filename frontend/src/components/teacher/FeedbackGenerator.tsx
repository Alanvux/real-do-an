// src/components/teacher/FeedbackGenerator.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import Button from '@/components/ui/Button';
import Alert from '@/components/ui/Alert';
import Spinner from '@/components/ui/Spinner';
import { ChatBubbleLeftRightIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import aiChatService from '@/services/aiChatService';

interface FeedbackGeneratorProps {
  submissionId: string;
  studentName: string;
  assignmentTitle: string;
  submissionText?: string;
  onFeedbackGenerated?: (feedback: string) => void;
}

const FeedbackGenerator: React.FC<FeedbackGeneratorProps> = ({ 
  submissionId, 
  studentName, 
  assignmentTitle,
  submissionText, 
  onFeedbackGenerated 
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState<boolean>(false);

  const handleGenerateFeedback = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setShowFeedback(false);

      const response = await aiChatService.generateFeedback(submissionId);
      setFeedback(response.feedback);
      setShowFeedback(true);
      
      if (onFeedbackGenerated) {
        onFeedbackGenerated(response.feedback);
      }
    } catch (err) {
      console.error('Feedback generation error:', err);
      setError('Failed to generate feedback');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyFeedback = () => {
    navigator.clipboard.writeText(feedback);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2 text-primary-600" />
          AI Feedback Generator
        </h3>
        <p className="text-gray-600 text-sm mt-1">
          Generate constructive feedback for {studentName}'s submission to "{assignmentTitle}".
        </p>
      </div>

      {submissionText && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200 max-h-40 overflow-y-auto">
          <h4 className="text-xs uppercase text-gray-500 font-semibold mb-1">Submission Preview:</h4>
          <p className="text-sm text-gray-700">
            {submissionText.length > 300 
              ? `${submissionText.substring(0, 300)}...` 
              : submissionText}
          </p>
        </div>
      )}

      <Button
        variant="primary"
        onClick={handleGenerateFeedback}
        isLoading={isLoading}
        leftIcon={<ChatBubbleLeftRightIcon className="h-5 w-5" />}
        disabled={isLoading}
      >
        Generate Feedback
      </Button>

      {error && (
        <div className="mt-4">
          <Alert type="error" message={error} />
        </div>
      )}

      {isLoading && (
        <div className="mt-6 flex justify-center">
          <div className="text-center">
            <Spinner size="lg" />
            <p className="mt-2 text-gray-600">Generating personalized feedback...</p>
            <p className="text-sm text-gray-500">This may take a moment</p>
          </div>
        </div>
      )}

      {showFeedback && feedback && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-md font-semibold">Generated Feedback</h4>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<DocumentDuplicateIcon className="h-4 w-4" />}
              onClick={handleCopyFeedback}
            >
              Copy
            </Button>
          </div>
          
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg max-h-96 overflow-y-auto">
            <p className="whitespace-pre-wrap">{feedback}</p>
          </div>
          
          <div className="mt-4 flex justify-between">
            <Button
              variant="success"
              size="sm"
              onClick={() => {
                if (onFeedbackGenerated) {
                  onFeedbackGenerated(feedback);
                }
              }}
            >
              Use This Feedback
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFeedback(false)}
            >
              Discard
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackGenerator;