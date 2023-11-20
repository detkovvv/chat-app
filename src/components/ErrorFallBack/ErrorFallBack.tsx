import { type ErrorBoundaryPropsWithComponent } from 'react-error-boundary';

export const ErrorFallBack: ErrorBoundaryPropsWithComponent['FallbackComponent'] = ({
    error,
    resetErrorBoundary,
}) => {
    return (
        <div role='alert'>
            <p>Что то пошло не так</p>
            <pre>{error.message}</pre>
            <button onClick={resetErrorBoundary}>попробовать еще раз</button>
        </div>
    );
};
