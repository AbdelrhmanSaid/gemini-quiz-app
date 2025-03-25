import { Button } from '../ui/button';
import { CardHeader, CardContent } from '../ui/card';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectItem,
    SelectContent,
} from '../ui/select';

export const QuizSelection = ({
    onStartQuiz,
    selectedCategory,
    setSelectedCategory,
    categoryOptions,
}: {
    onStartQuiz: () => void;
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    categoryOptions: { name: string; value: string }[];
}) => {
    return (
        <>
            <CardHeader>
                <h1 className="text-2xl font-semibold text-gray-800">
                    Welcome to the Quiz!
                </h1>

                <p className="text-gray-600 mb-4">
                    Select a category to start the quiz
                </p>

                <Select
                    onValueChange={setSelectedCategory}
                    defaultValue={selectedCategory}
                >
                    <SelectTrigger className="w-full mb-4">
                        <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                        {categoryOptions.map((category) => (
                            <SelectItem
                                key={category.value}
                                value={category.value}
                            >
                                {category.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent>
                <Button className="w-full cursor-pointer" onClick={onStartQuiz}>
                    Start Quiz
                </Button>

                <p className="text-center mt-4 text-gray-600">
                    Each quiz consists of 10 questions
                </p>
            </CardContent>
        </>
    );
};
