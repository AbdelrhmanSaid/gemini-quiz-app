import { useState } from 'react';
import { Question } from './interfaces/Question';
import { Card, CardContent } from './components/ui/card';
import { Button } from './components/ui/button';
import { QuizSelection } from './components/quiz/selection';
import { QuizLoading } from './components/quiz/loading';
import { QuizError } from './components/quiz/error';
import { QuizResults } from './components/quiz/results';
import { QuizQuestion } from './components/quiz/question';
import { QuizFeedback } from './components/quiz/feedback';

const API_BASE_URL = 'https://opentdb.com/api.php?';

const categoryOptions = [
    { name: 'General Knowledge', value: '9' },
    { name: 'Science & Nature', value: '17' },
    { name: 'Computers', value: '18' },
    { name: 'Mathematics', value: '19' },
    { name: 'Geography', value: '22' },
    { name: 'History', value: '23' },
    { name: 'Animals', value: '27' },
];

function App() {
    const [quizData, setQuizData] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [userAnswers, setUserAnswers] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [quizEnded, setQuizEnded] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string>('17'); // Default to Science & Nature
    const [quizStarted, setQuizStarted] = useState(false);

    // Function to fetch questions from the API
    const fetchQuestions = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(
                `${API_BASE_URL}amount=10&category=${selectedCategory}&type=multiple`
            );
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if (!data.results || data.results.length === 0) {
                throw new Error('No questions received from the API.');
            }

            const processedData: Question[] = data.results.map(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (question: any) => {
                    const options = [
                        ...question.incorrect_answers,
                        question.correct_answer,
                    ].sort(() => Math.random() - 0.5);
                    return {
                        question: question.question,
                        options: options,
                        correctAnswer: question.correctAnswer,
                    };
                }
            );
            setQuizData(processedData);
            setCurrentQuestionIndex(0);
            setScore(0);
            setUserAnswers([]);
            setQuizEnded(false);
            setQuizStarted(true);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setError(
                error.message || 'An error occurred while fetching questions.'
            );
        } finally {
            setLoading(false);
        }
    };

    const handleOptionSelect = (selectedAnswer: string) => {
        setUserAnswers((prev) => {
            const newAnswers = [...prev];
            newAnswers[currentQuestionIndex] = selectedAnswer;
            return newAnswers;
        });

        if (selectedAnswer === quizData[currentQuestionIndex].correctAnswer) {
            setScore((prevScore) => prevScore + 1);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < quizData.length - 1) {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        } else {
            setQuizEnded(true);
        }
    };

    const restartQuiz = () => {
        setQuizStarted(false); // Reset quizStarted state
        setQuizEnded(false);
        setCurrentQuestionIndex(0);
        setScore(0);
        setUserAnswers([]);
        setQuizData([]); // Clear existing quiz data
    };

    const currentQuestion = quizData ? quizData[currentQuestionIndex] : null;
    const correctAnswer = currentQuestion
        ? quizData[currentQuestionIndex].correctAnswer
        : '';

    return (
        <div className="flex items-center justify-center min-h-screen">
            <Card className="w-full max-w-md pt-6">
                <CardContent>
                    {!quizStarted ? (
                        <QuizSelection
                            onStartQuiz={fetchQuestions}
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                            categoryOptions={categoryOptions}
                        />
                    ) : loading ? (
                        <QuizLoading />
                    ) : error ? (
                        <QuizError message={error} />
                    ) : quizEnded ? (
                        <QuizResults
                            score={score}
                            totalQuestions={quizData.length}
                            onRestart={restartQuiz}
                        />
                    ) : (
                        <>
                            <QuizQuestion
                                questionData={currentQuestion!}
                                userAnswers={userAnswers}
                                onOptionSelect={handleOptionSelect}
                                questionNumber={currentQuestionIndex + 1}
                                totalQuestions={quizData.length}
                            />
                            {userAnswers[currentQuestionIndex] && (
                                <QuizFeedback
                                    userAnswer={
                                        userAnswers[currentQuestionIndex]!
                                    }
                                    correctAnswer={correctAnswer}
                                />
                            )}
                            <div className="flex justify-center gap-4 mt-4">
                                {currentQuestionIndex < quizData.length - 1 ? (
                                    <Button
                                        className="w-1/2"
                                        onClick={handleNextQuestion}
                                        disabled={
                                            !userAnswers[currentQuestionIndex]
                                        }
                                    >
                                        Next
                                    </Button>
                                ) : (
                                    <Button
                                        className="w-1/2"
                                        onClick={handleNextQuestion}
                                        disabled={
                                            !userAnswers[currentQuestionIndex]
                                        }
                                    >
                                        Show Results
                                    </Button>
                                )}
                                <Button
                                    className="w-1/2"
                                    variant="outline"
                                    onClick={restartQuiz}
                                >
                                    Restart
                                </Button>
                            </div>
                            <div className="mt-4 text-center">
                                <p>
                                    Your Score:{' '}
                                    <span className="font-semibold">
                                        {score}
                                    </span>
                                </p>
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

export default App;
