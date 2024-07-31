interface Props {
  isError?: boolean;
  error?: string | null;
}

const ErrorMessage = ({ error, isError }: Props) => {
  return (
    <>
      {isError ||
        (error && (
          <div className="bg-destructive/20 p-2 border-l-8 border-destructive">
            <p className="text-destructive">
              {error ? error : "Opss ocurrio un error"}
            </p>
          </div>
        ))}
    </>
  );
};

export default ErrorMessage;
