
import React, { useState } from 'react';
import { Plus, Trash2, GripVertical, MoveUp, MoveDown } from 'lucide-react';
import { Question } from '../types/survey';
import { v4 as uuidv4 } from 'uuid';

interface SurveyBuilderProps {
  questions: Question[];
  onQuestionsChange: (questions: Question[]) => void;
  maxQuestions: number;
}

const SurveyBuilder = ({ questions, onQuestionsChange, maxQuestions }: SurveyBuilderProps) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const addQuestion = () => {
    if (questions.length >= maxQuestions) return;
    
    const newQuestion: Question = {
      id: uuidv4(),
      type: 'multiple-choice',
      question: '',
      options: ['Option 1', 'Option 2'],
      required: true
    };
    onQuestionsChange([...questions, newQuestion]);
  };

  const updateQuestion = (id: string, updates: Partial<Question>) => {
    onQuestionsChange(
      questions.map(q => q.id === id ? { ...q, ...updates } : q)
    );
  };

  const deleteQuestion = (id: string) => {
    onQuestionsChange(questions.filter(q => q.id !== id));
  };

  const moveQuestion = (fromIndex: number, toIndex: number) => {
    const newQuestions = [...questions];
    const [movedQuestion] = newQuestions.splice(fromIndex, 1);
    newQuestions.splice(toIndex, 0, movedQuestion);
    onQuestionsChange(newQuestions);
  };

  const moveQuestionUp = (index: number) => {
    if (index > 0) {
      moveQuestion(index, index - 1);
    }
  };

  const moveQuestionDown = (index: number) => {
    if (index < questions.length - 1) {
      moveQuestion(index, index + 1);
    }
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== dropIndex) {
      moveQuestion(draggedIndex, dropIndex);
    }
    setDraggedIndex(null);
  };

  const addOption = (questionId: string) => {
    const question = questions.find(q => q.id === questionId);
    if (question && question.options) {
      updateQuestion(questionId, {
        options: [...question.options, `Option ${question.options.length + 1}`]
      });
    }
  };

  const updateOption = (questionId: string, optionIndex: number, value: string) => {
    const question = questions.find(q => q.id === questionId);
    if (question && question.options) {
      const newOptions = [...question.options];
      newOptions[optionIndex] = value;
      updateQuestion(questionId, { options: newOptions });
    }
  };

  const removeOption = (questionId: string, optionIndex: number) => {
    const question = questions.find(q => q.id === questionId);
    if (question && question.options && question.options.length > 2) {
      const newOptions = question.options.filter((_, index) => index !== optionIndex);
      updateQuestion(questionId, { options: newOptions });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Survey Questions</h3>
        <span className="text-sm text-gray-500">
          {questions.length} / {maxQuestions} questions
        </span>
      </div>

      {questions.map((question, index) => (
        <div 
          key={question.id} 
          className={`bg-white border border-gray-200 rounded-lg p-6 transition-all duration-200 ${
            draggedIndex === index ? 'opacity-50 scale-95' : 'hover:shadow-md'
          }`}
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, index)}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="flex flex-col space-y-1">
                <GripVertical className="h-5 w-5 text-gray-400 cursor-move" />
                <span className="text-sm font-medium text-gray-500">Q{index + 1}</span>
              </div>
              <div className="flex flex-col space-y-1">
                <button
                  onClick={() => moveQuestionUp(index)}
                  disabled={index === 0}
                  className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                  title="Move up"
                >
                  <MoveUp className="h-4 w-4" />
                </button>
                <button
                  onClick={() => moveQuestionDown(index)}
                  disabled={index === questions.length - 1}
                  className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                  title="Move down"
                >
                  <MoveDown className="h-4 w-4" />
                </button>
              </div>
            </div>
            <button
              onClick={() => deleteQuestion(question.id)}
              className="text-red-500 hover:text-red-700 p-1"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Question
              </label>
              <input
                type="text"
                value={question.question}
                onChange={(e) => updateQuestion(question.id, { question: e.target.value })}
                placeholder="Enter your question..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Question Type
                </label>
                <select
                  value={question.type}
                  onChange={(e) => updateQuestion(question.id, { 
                    type: e.target.value as Question['type'],
                    options: e.target.value === 'multiple-choice' || e.target.value === 'rating' 
                      ? (question.options || ['Option 1', 'Option 2']) 
                      : undefined
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="multiple-choice">Multiple Choice</option>
                  <option value="text">Text Input</option>
                  <option value="rating">Rating Scale</option>
                  <option value="boolean">Yes/No</option>
                </select>
              </div>

              <div className="flex items-center">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={question.required}
                    onChange={(e) => updateQuestion(question.id, { required: e.target.checked })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Required</span>
                </label>
              </div>
            </div>

            {(question.type === 'multiple-choice' || question.type === 'rating') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Options
                </label>
                <div className="space-y-2">
                  {question.options?.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => updateOption(question.id, optionIndex, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {question.options && question.options.length > 2 && (
                        <button
                          onClick={() => removeOption(question.id, optionIndex)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={() => addOption(question.id)}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    + Add Option
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}

      {questions.length < maxQuestions && (
        <button
          onClick={addQuestion}
          className="w-full py-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:text-gray-700 hover:border-gray-400 transition-colors flex items-center justify-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add Question</span>
        </button>
      )}
    </div>
  );
};

export default SurveyBuilder;
