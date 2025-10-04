import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import PromptInput from './components/PromptInput';
import PromptOutput from './components/PromptOutput';
import ExecutionOutput from './components/ImageOutput';
import Loader from './components/Loader';
import { refinePrompt, executePrompt } from './services/geminiService';

const App: React.FC = () => {
  const [userInput, setUserInput] = useState<string>('');
  const [refinedPrompt, setRefinedPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [executionResult, setExecutionResult] = useState<string | null>(null);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [executionError, setExecutionError] = useState<string | null>(null);

  const handleNew = useCallback(() => {
    setUserInput('');
    setRefinedPrompt('');
    setIsLoading(false);
    setError(null);
    setExecutionResult(null);
    setIsExecuting(false);
    setExecutionError(null);
  }, []);

  const handleGeneratePrompt = useCallback(async () => {
    if (!userInput.trim()) {
      setError('아이디어를 입력해주세요.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setRefinedPrompt('');
    setExecutionResult(null);
    setExecutionError(null);

    try {
      const result = await refinePrompt(userInput);
      setRefinedPrompt(result);
    } catch (err) {
      setError('프롬프트 생성 중 오류가 발생했습니다. 다시 시도해주세요.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [userInput]);
  
  const handleExecutePrompt = useCallback(async () => {
    if (!refinedPrompt) return;

    setIsExecuting(true);
    setExecutionError(null);
    setExecutionResult(null);

    try {
      const result = await executePrompt(refinedPrompt);
      setExecutionResult(result);
    } catch (err) {
      setExecutionError('프롬프트 실행 중 오류가 발생했습니다. 다시 시도해주세요.');
      console.error(err);
    } finally {
      setIsExecuting(false);
    }
  }, [refinedPrompt]);


  return (
    <div className="bg-slate-900 min-h-screen font-sans text-slate-200 flex flex-col p-4 sm:p-6">
      <div className="w-full max-w-3xl mx-auto flex-grow">
        <Header onNew={handleNew} />
        <main className="mt-8 space-y-8">
          <PromptInput
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onSubmit={handleGeneratePrompt}
            isLoading={isLoading}
          />
          {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center">
              {error}
            </div>
          )}
          {isLoading && <Loader />}
          {refinedPrompt && (
            <>
              <PromptOutput generatedPrompt={refinedPrompt} />
              <ExecutionOutput 
                onExecute={handleExecutePrompt}
                result={executionResult}
                isLoading={isExecuting}
                error={executionError}
              />
            </>
          )}
        </main>
      </div>
      <footer className="text-center py-4 text-slate-500 text-sm">
        Made by 해준
      </footer>
    </div>
  );
};

export default App;