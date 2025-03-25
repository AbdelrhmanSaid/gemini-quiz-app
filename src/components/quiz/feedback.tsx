export const QuizFeedback = ({
    userAnswer,
    correctAnswer,
}: {
    userAnswer: string;
    correctAnswer: string;
}) => {
    return (
        <div className="mt-4">
            <p className="text-center font-medium">
                {userAnswer === correctAnswer ? 'Correct!' : 'Incorrect!'}
            </p>
        </div>
    );
};
