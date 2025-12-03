import React, { useState } from 'react';
import { IeltsPart, Topic, FeedbackData } from './types';
import { TOPICS } from './data';
import { AudioRecorder } from './components/AudioRecorder';
import { FeedbackCard } from './components/FeedbackCard';
import { analyzeSpeaking } from './services/geminiService';

// Helpers
const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      // remove data:audio/webm;base64, prefix
      const base64Data = base64String.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'menu' | 'practice'>('menu');
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [feedback, setFeedback] = useState<FeedbackData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // --- Actions ---

  const handleSelectTopic = (topic: Topic) => {
    setSelectedTopic(topic);
    setCurrentQuestionIndex(0);
    setFeedback(null);
    setCurrentView('practice');
  };

  const handleBackToMenu = () => {
    setCurrentView('menu');
    setFeedback(null);
  };

  const handleRecordingComplete = async (audioBlob: Blob) => {
    if (!selectedTopic) return;
    
    setIsProcessing(true);
    
    try {
      // 1. Convert Blob to Base64 for Gemini
      const audioBase64 = await blobToBase64(audioBlob);
      
      // 2. Determine Current Question Text
      let questionText = "";
      if (selectedTopic.part === IeltsPart.Part2) {
        questionText = `Cue Card: ${selectedTopic.title}. Points: ${selectedTopic.cues?.join(', ')}`;
      } else {
        questionText = selectedTopic.questions[currentQuestionIndex];
      }

      // 3. Call AI
      const result = await analyzeSpeaking(audioBase64, questionText, selectedTopic.part);
      setFeedback(result);
    } catch (error) {
      console.error(error);
      alert("Failed to analyze audio. Please try again or check your API key.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleNextQuestion = () => {
    if (!selectedTopic) return;
    setFeedback(null);
    
    if (selectedTopic.part === IeltsPart.Part2) {
      // Part 2 is usually one big turn. We can loop or go back to menu.
      // For this app, let's just reset to allow re-recording or go back.
      handleBackToMenu(); 
    } else {
      if (currentQuestionIndex < selectedTopic.questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        alert("Topic completed!");
        handleBackToMenu();
      }
    }
  };

  const handleRetry = () => {
    setFeedback(null);
  };

  // --- Renders ---

  const renderMenu = () => (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-slate-800 mb-2 tracking-tight">IELTS 7.5+ Coach</h1>
        <p className="text-slate-500">Sep-Dec 2025 Question Bank • Native Polishing • Part 3 Logic</p>
      </header>

      {[IeltsPart.Part1, IeltsPart.Part2, IeltsPart.Part3].map((part) => (
        <section key={part} className="mb-8">
          <h2 className="text-xl font-bold text-slate-700 mb-4 flex items-center">
            <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded text-sm mr-3 uppercase">{part}</span>
            Select a Topic
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {TOPICS.filter(t => t.part === part).map(topic => (
              <button
                key={topic.id}
                onClick={() => handleSelectTopic(topic)}
                className="group relative bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all text-left"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors pr-2">
                    {topic.title}
                  </h3>
                  {topic.tags?.includes("New") && (
                    <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">New</span>
                  )}
                </div>
                <p className="text-xs text-slate-400">
                  {topic.part === IeltsPart.Part2 ? 'Cue Card' : `${topic.questions.length} Questions`}
                </p>
              </button>
            ))}
          </div>
        </section>
      ))}
    </div>
  );

  const renderPractice = () => {
    if (!selectedTopic) return null;

    const isPart2 = selectedTopic.part === IeltsPart.Part2;
    const currentQ = isPart2 ? selectedTopic.title : selectedTopic.questions[currentQuestionIndex];

    return (
      <div className="max-w-3xl mx-auto px-4 py-8 min-h-screen flex flex-col">
        {/* Nav */}
        <button onClick={handleBackToMenu} className="self-start text-sm text-slate-500 hover:text-indigo-600 mb-6 flex items-center font-medium">
          ← Back to Library
        </button>

        {/* Progress */}
        {!isPart2 && (
          <div className="w-full bg-gray-200 h-1 rounded-full mb-8 overflow-hidden">
            <div 
              className="bg-indigo-500 h-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / selectedTopic.questions.length) * 100}%` }}
            />
          </div>
        )}

        {/* Question Area */}
        <div className="flex-1 flex flex-col items-center">
          {!feedback ? (
            <>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 w-full mb-8 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
                <h3 className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-4">
                  {selectedTopic.part} {isPart2 ? 'Cue Card' : `- Question ${currentQuestionIndex + 1}`}
                </h3>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 leading-tight">
                  {currentQ}
                </h2>
                {isPart2 && selectedTopic.cues && (
                  <div className="mt-6 text-left bg-slate-50 p-6 rounded-lg mx-auto max-w-md">
                    <p className="text-sm font-bold text-slate-500 mb-2 uppercase">You should say:</p>
                    <ul className="list-disc list-inside space-y-2 text-slate-700">
                      {selectedTopic.cues.map((cue, i) => <li key={i}>{cue}</li>)}
                    </ul>
                  </div>
                )}
              </div>

              <div className="w-full max-w-md">
                <AudioRecorder onRecordingComplete={handleRecordingComplete} isProcessing={isProcessing} />
                <p className="text-center text-xs text-slate-400 mt-6">
                  Tip: Speak clearly. The AI will analyze your fluency and vocabulary.
                </p>
              </div>
            </>
          ) : (
            <FeedbackCard 
              data={feedback} 
              onRetry={handleRetry} 
              onNext={handleNextQuestion} 
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {currentView === 'menu' ? renderMenu() : renderPractice()}
    </div>
  );
};

export default App;