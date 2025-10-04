
import React, { useState, useCallback } from 'react';
import ClipboardIcon from './icons/ClipboardIcon';

interface PromptOutputProps {
  generatedPrompt: string;
}

const PromptOutput: React.FC<PromptOutputProps> = ({ generatedPrompt }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(generatedPrompt).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  }, [generatedPrompt]);

  return (
    <div className="bg-slate-800/50 rounded-xl p-6 shadow-lg border border-slate-700 relative">
      <h2 className="text-lg font-medium text-slate-300 mb-3">
        2. 완성된 프롬프트
      </h2>
      <button
        onClick={handleCopy}
        className="absolute top-4 right-4 p-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg transition-colors duration-200"
        aria-label="Copy prompt"
      >
        <ClipboardIcon className="w-5 h-5 text-slate-400" />
      </button>
      
      <div className="bg-slate-900 p-4 rounded-lg border border-slate-600">
        <pre className="whitespace-pre-wrap text-slate-200 text-sm sm:text-base leading-relaxed font-mono">
          {generatedPrompt}
        </pre>
      </div>
      {isCopied && (
        <div className="absolute bottom-4 right-4 text-sm bg-green-500 text-white px-3 py-1 rounded-md transition-opacity duration-300">
          복사 완료!
        </div>
      )}
    </div>
  );
};

export default PromptOutput;
