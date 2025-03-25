import { motion } from 'framer-motion';
import { Button } from '../ui/button';

const gradeIllustrations = [
    {
        grade: 'F',
        text: 'Oh no! Better luck next time.',
        svg: (
            <svg
                viewBox="0 0 80 80"
                xmlns="http://www.w3.org/2000/svg"
                fill="#f44336"
                style={{ maxHeight: '150px' }}
            >
                <circle cx="40" cy="40" r="35" />
                <path
                    d="M 24,24 L 56,56 M 56,24 L 24,56"
                    stroke="#fff"
                    strokeWidth="8"
                />
            </svg>
        ),
    },
    {
        grade: 'D',
        text: 'Keep studying!',
        svg: (
            <svg
                viewBox="0 0 80 80"
                xmlns="http://www.w3.org/2000/svg"
                fill="#ff9800"
                style={{ maxHeight: '150px' }}
            >
                <path
                    d="M 16,16 H 64 V 64 H 16 Z M 32,32 H 48 V 48 H 32 Z"
                    fill="#fff"
                />
            </svg>
        ),
    },
    {
        grade: 'C',
        text: 'Not bad, but you can do better!',
        svg: (
            <svg
                viewBox="0 0 80 80"
                xmlns="http://www.w3.org/2000/svg"
                fill="#ffc107"
                style={{ maxHeight: '150px' }}
            >
                <path d="M 64 16 H 16 L 40 64 Z" fill="#fff" />
            </svg>
        ),
    },
    {
        grade: 'B',
        text: 'Good job!',
        svg: (
            <svg
                viewBox="0 0 80 80"
                xmlns="http://www.w3.org/2000/svg"
                fill="#4caf50"
                style={{ maxHeight: '150px' }}
            >
                <path d="M 16 16 H 64 V 64 H 16 Z" fill="#fff" />
                <path d="M 16 40 H 40 V 64 H 16 Z" fill="#4caf50" />
            </svg>
        ),
    },
    {
        grade: 'A',
        text: 'Excellent!',
        svg: (
            <svg
                viewBox="0 0 80 80"
                xmlns="http://www.w3.org/2000/svg"
                fill="#2196f3"
                style={{ maxHeight: '150px' }}
            >
                <path
                    d="M 40 8 L 8 72 H 32 L 40 48 L 48 72 H 72 Z"
                    fill="#fff"
                />
            </svg>
        ),
    },
    {
        grade: 'A+',
        text: 'Perfect score!',
        svg: (
            <svg
                viewBox="0 0 80 80"
                xmlns="http://www.w3.org/2000/svg"
                fill="#8bc34a"
                style={{ maxHeight: '150px' }}
            >
                <path
                    d="M 8 40 L 32 40 L 32 16 L 48 16 L 48 40 L 72 40 L 72 64 L 8 64 Z"
                    fill="#fff"
                />
            </svg>
        ),
    },
];

export const QuizResults = ({
    score,
    totalQuestions,
    onRestart,
}: {
    score: number;
    totalQuestions: number;
    onRestart: () => void;
}) => {
    const getGrade = () => {
        const percentage =
            totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;
        if (percentage >= 90) return { grade: 'A+', index: 5 };
        if (percentage >= 80) return { grade: 'A', index: 4 };
        if (percentage >= 70) return { grade: 'B', index: 3 };
        if (percentage >= 60) return { grade: 'C', index: 2 };
        if (percentage >= 40) return { grade: 'D', index: 1 };
        return { grade: 'F', index: 0 };
    };

    const { index } = getGrade();

    return (
        <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Results</h2>
            <p className="text-lg font-medium">
                Your Score: <span className="font-semibold">{score}</span> /{' '}
                {totalQuestions}
            </p>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-4 flex flex-col items-center"
            >
                {gradeIllustrations[index].svg}
                <p className="mt-2 text-center text-gray-600">
                    {gradeIllustrations[index].text}
                </p>
            </motion.div>

            <Button className="mt-4" onClick={onRestart}>
                Restart Quiz
            </Button>
        </div>
    );
};
