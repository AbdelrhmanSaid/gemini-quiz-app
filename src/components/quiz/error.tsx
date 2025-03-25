import { Alert, AlertTitle, AlertDescription } from '../ui/alert';

export const QuizError = ({ message }: { message: string }) => (
    <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
    </Alert>
);
