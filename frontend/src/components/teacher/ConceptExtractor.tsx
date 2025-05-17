// src/components/teacher/ConceptExtractor.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { extractConcepts } from '@/redux/slices/aiChatSlice';
import { AppDispatch } from '@/redux/store';
import Button from '@/components/ui/Button';
import Alert from '@/components/ui/Alert';
import Spinner from '@/components/ui/Spinner';
import { LightBulbIcon, TagIcon } from '@heroicons/react/24/outline';

interface ConceptExtractorProps {
  lectureId: string;
  onConceptsExtracted?: (concepts: string[]) => void;
}

const ConceptExtractor: React.FC<ConceptExtractorProps> = ({ lectureId, onConceptsExtracted }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [concepts, setConcepts] = useState<string[]>([]);
  const [showConcepts, setShowConcepts] = useState<boolean>(false);

  const handleExtractConcepts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setShowConcepts(false);

      const resultAction = await dispatch(extractConcepts(lectureId));
      if (extractConcepts.fulfilled.match(resultAction)) {
        const extractedConcepts = resultAction.payload;
        setConcepts(extractedConcepts);
        setShowConcepts(true);
        if (onConceptsExtracted) {
          onConceptsExtracted(extractedConcepts);
        }
      } else if (extractConcepts.rejected.match(resultAction)) {
        setError(resultAction.payload as string || 'Failed to extract concepts');
      }
    } catch (err) {
      console.error('Concept extraction error:', err);
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <LightBulbIcon className="h-5 w-5 mr-2 text-accent-600" />
          Key Concept Extractor
        </h3>
        <p className="text-gray-600 text-sm mt-1">
          Identify important concepts and terms from lecture content.
        </p>
      </div>

      <Button
        variant="accent"
        onClick={handleExtractConcepts}
        isLoading={isLoading}
        leftIcon={<TagIcon className="h-5 w-5" />}
        disabled={isLoading}
      >
        Extract Key Concepts
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
            <p className="mt-2 text-gray-600">Analyzing lecture content...</p>
          </div>
        </div>
      )}

      {showConcepts && concepts.length > 0 && (
        <div className="mt-6">
          <h4 className="text-md font-semibold flex items-center mb-3">
            <TagIcon className="h-5 w-5 mr-2 text-accent-600" />
            Key Concepts
          </h4>
          
          <div className="flex flex-wrap gap-2">
            {concepts.map((concept, index) => (
              <div 
                key={index} 
                className="bg-accent-100 text-accent-800 px-3 py-1 rounded-full text-sm font-medium"
              >
                {concept}
              </div>
            ))}
          </div>
          
          <div className="mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (onConceptsExtracted) {
                  onConceptsExtracted(concepts);
                }
              }}
            >
              Use These Concepts
            </Button>
          </div>
        </div>
      )}

      {showConcepts && concepts.length === 0 && (
        <div className="mt-4">
          <Alert 
            type="info" 
            message="No key concepts were identified. Try updating the lecture content with more specific information." 
          />
        </div>
      )}
    </div>
  );
};

export default ConceptExtractor;