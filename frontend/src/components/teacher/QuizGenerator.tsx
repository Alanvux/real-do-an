// src/components/teacher/QuizGenerator.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { generateQuiz } from '@/redux/slices/aiChatSlice';
import { AppDispatch } from '@/redux/store';
import Button from '@/components/ui/Button';
import Alert from '@/components/ui/Alert';
import Spinner from '@/components/ui/Spinner';
import { PlusCircleIcon, DocumentTextIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

interface QuizGeneratorProps {
  lectureId: string;
  onQuizGenerated?: (questions: QuizQuestion[]) => void;
}

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

const QuizGenerator: React.FC<QuizGeneratorProps> = ({ lectureId, onQuizGenerated }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [numQuestions, setNumQuestions] = useState<number>(5);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedQuestions, setGeneratedQuestions] = useState<QuizQuestion[]>([]);
  const [showQuestions, setShowQuestions] = useState<boolean>(false);

  const handleNumQuestionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= 20) {
      setNumQuestions(value);
    }
  };

  const handleGenerateQuiz = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setShowQuestions(false);

      const resultAction = await dispatch(generateQuiz({ lectureId, numQuestions }));
      if (generateQuiz.fulfilled.match(resultAction)) {
        const questions = resultAction.payload;
        setGeneratedQuestions(questions);
        setShowQuestions(true);
        if (onQuizGenerated) {
          onQuizGenerated(questions);
        }
      } else if (generateQuiz.rejected.match(resultAction)) {
        setError(resultAction.payload as string || 'Failed to generate quiz');
      }
    } catch (err) {
      console.error('Quiz generation error:', err);
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <AcademicCapIcon className="h-5 w-5 mr-2 text-primary-600" />
          AI Quiz Generator
        </h3>
        <p className="text-gray-600 text-sm mt-1">
          Generate quiz questions based on lecture content.
        </p>
      </div>

      <div className="mb-4">
        <label htmlFor="numQuestions" className="block text-sm font-medium text-gray-700 mb-1">
          Number of Questions
        </label>
        <input
          type="number"
          id="numQuestions"
          min="1"
          max="20"
          value={numQuestions}
          onChange={handleNumQuestionsChange}
          className="form-input w-full max-w-xs rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        />
      </div>

      <Button
        variant="primary"
        onClick={handleGenerateQuiz}
        isLoading={isLoading}
        leftIcon={<PlusCircleIcon className="h-5 w-5" />}
        disabled={isLoading}
      >
        Generate Quiz
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
            <p className="mt-2 text-gray-600">Generating quiz questions...</p>
            <p className="text-sm text-gray-500">This may take a moment</p>
          </div>
        </div>
      )}

      {showQuestions && generatedQuestions.length > 0 && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-md font-semibold flex items-center">
              <DocumentTextIcon className="h-5 w-5 mr-2 text-success-600" />
              Generated Questions
            </h4>
            <Button
              variant="success"
              size="sm"
              onClick={() => {
                if (onQuizGenerated) {
                  onQuizGenerated(generatedQuestions);
                }
              }}
            >
              Use These Questions
            </Button>
          </div>
          
          <div className="space-y-4 max-h-96 overflow-y-auto p-2">
            {generatedQuestions.map((q, qIndex) => (
              <div key={qIndex} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <p className="font-medium mb-2">
                  <span className="inline-block w-6 h-6 bg-primary-600 text-white rounded-full text-center mr-2">
                    {qIndex + 1}
                  </span>
                  {q.question}
                </p>
                
                <div className="ml-8 space-y-1 mb-3">
                  {q.options.map((option, oIndex) => (
                    <div key={oIndex} className="flex items-start">
                      <div className={`flex-shrink-0 h-5 w-5 mt-0.5 rounded-full mr-2 ${oIndex === q.correctAnswerIndex ? 'bg-success-100 border-2 border-success-500' : 'border border-gray-300'}`}></div>
                      <p className={`text-sm ${oIndex === q.correctAnswerIndex ? 'font-medium' : ''}`}>
                        {option}
                      </p>
                    </div>
                  ))}
                </div>
                
                <div className="ml-8 mt-2 bg-gray-100 p-2 rounded text-sm">
                  <p className="text-xs font-medium text-gray-700">Explanation:</p>
                  <p className="text-gray-600">{q.explanation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizGenerator;