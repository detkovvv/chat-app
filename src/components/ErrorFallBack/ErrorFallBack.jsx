function ErrorFallBack({ error, resetErrorBoundary }) {
    return (
        <div role='alert'>
            <p>Что то пошло не так</p>
            <pre>{error.message}</pre>
            <button onClick={resetErrorBoundary}>попробовать еще раз</button>
        </div>
    );
}

export { ErrorFallBack };
