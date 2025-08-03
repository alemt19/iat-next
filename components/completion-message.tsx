export function CompletionMessage({ onRestart }: { onRestart: () => void }) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 space-y-6 text-center">
        <h2 className="text-3xl font-semibold">¡Test completado con éxito!</h2>
        <p className="text-lg text-gray-700">
            Gracias por participar. Tus resultados se han guardado correctamente.
        </p>
        <button
            onClick={onRestart}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
            Volver al inicio
        </button>
        </div>
    )
}
