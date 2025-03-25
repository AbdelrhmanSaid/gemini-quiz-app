import { Question } from '@/interfaces/Question';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

export const QuizQuestion = ({
    questionData,
    userAnswers,
    onOptionSelect,
    questionNumber,
    totalQuestions,
}: {
    questionData: Question;
    userAnswers: string[];
    onOptionSelect: (answer: string) => void;
    questionNumber: number;
    totalQuestions: number;
}) => {
    return (
        <>
            <p className="text-center text-gray-600 mb-2">
                Question {questionNumber} / {totalQuestions}
            </p>
            <h2
                className="text-2xl font-semibold text-gray-800 mb-4"
                dangerouslySetInnerHTML={{ __html: questionData.question }}
            />
            <div className="space-y-3">
                {questionData.options.map((option, index) => (
                    <Button
                        key={index}
                        variant="secondary"
                        className={cn(
                            'w-full text-left',
                            userAnswers[questionNumber - 1] &&
                                (option === questionData.correctAnswer
                                    ? 'bg-green-100 text-green-600 border-green-600'
                                    : option === userAnswers[questionNumber - 1]
                                      ? 'bg-red-100 text-red-600 border-red-600'
                                      : 'hover:bg-gray-100 text-gray-700'),
                        )}
                        onClick={() => onOptionSelect(option)}
                        disabled={!!userAnswers[questionNumber - 1]}
                        dangerouslySetInnerHTML={{ __html: option }}
                    ></Button>
                ))}
            </div>
        </>
    );
};
