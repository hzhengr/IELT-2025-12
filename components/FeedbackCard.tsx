import React from 'react';
import { FeedbackData } from '../types';

interface FeedbackCardProps {
  data: FeedbackData;
  onRetry: () => void;
  onNext: () => void;
}

export const FeedbackCard: React.FC<FeedbackCardProps> = ({ data, onRetry, onNext }) => {
  return (
    <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 animate-fade-in-up">
      {/* Header with Score */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-6 text-white flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium opacity-90">Estimated Band Score</h3>
          <div className="text-4xl font-bold mt-1">{data.scoreEstimate}</div>
        </div>
        <div className="text-right">
          <div className="text-xs uppercase tracking-wider opacity-75">Target</div>
          <div className="text-xl font-bold">7.5+</div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        
        {/* Transcription */}
        <div>
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">You said</h4>
          <p className="text-gray-600 italic border-l-4 border-gray-200 pl-4 py-1">"{data.transcription}"</p>
        </div>

        {/* The Upgrade */}
        <div className="bg-green-50 rounded-xl p-5 border border-green-100">
          <div className="flex items-center mb-2">
            <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded mr-2">NATIVE POLISH</span>
            <h4 className="text-green-800 font-semibold">Native Speaker Version</h4>
          </div>
          <p className="text-gray-800 text-lg leading-relaxed">{data.betterVersion}</p>
        </div>

        {/* Vocabulary & Logic */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Band 8.0+ Vocabulary</h4>
            <ul className="space-y-1">
              {data.keyVocabulary.map((vocab, idx) => (
                <li key={idx} className="flex items-center text-gray-700">
                  <svg className="w-4 h-4 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  {vocab}
                </li>
              ))}
            </ul>
          </div>
          
          {data.superordinateTerms && data.superordinateTerms.length > 0 && (
            <div className="bg-amber-50 rounded-lg p-4 border border-amber-100">
              <h4 className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-2">⚡ Part 3 Logic Boost</h4>
              <p className="text-xs text-amber-800 mb-2">Use these abstract terms instead of simple lists:</p>
              <div className="flex flex-wrap gap-2">
                {data.superordinateTerms.map((term, idx) => (
                  <span key={idx} className="px-2 py-1 bg-white border border-amber-200 text-amber-700 rounded text-sm font-medium shadow-sm">
                    {term}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Pronunciation */}
        <div>
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Pronunciation & Flow</h4>
          <p className="text-gray-600 text-sm">{data.pronunciationTips}</p>
        </div>
      </div>

      <div className="bg-gray-50 px-6 py-4 flex justify-between">
        <button onClick={onRetry} className="text-gray-500 hover:text-gray-700 font-medium text-sm">
          Try Again
        </button>
        <button onClick={onNext} className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 shadow-sm transition-colors">
          Next Question
        </button>
      </div>
    </div>
  );
};