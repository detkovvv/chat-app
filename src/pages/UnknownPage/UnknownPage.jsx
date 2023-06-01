export const UnknownPage = ({ resetErrorBoundary }) => {
    return (
        <div>
            <h1>Page not found</h1>
            <button onClick={resetErrorBoundary}>back</button>
        </div>
    );
};
