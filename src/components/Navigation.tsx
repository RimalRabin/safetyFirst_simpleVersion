interface NavigationProps {
  currentIndex: number
  totalQuestions: number
  selectedAnswer: string
  onBack: () => void
  onNext: () => void
}

export const Navigation = ({
  currentIndex,
  totalQuestions,
  selectedAnswer,
  onBack,
  onNext,
}: NavigationProps): JSX.Element => {
  const isFirst = currentIndex === 0
  const isLast  = currentIndex === totalQuestions - 1

  return (
    <div className="px-8 py-5 bg-gray-50 border-t border-gray-100 flex items-center justify-between">

      {/* Back button */}
      <button
        onClick={onBack}
        disabled={isFirst}
        className="text-gray-500 font-medium text-base disabled:opacity-30 hover:text-[#0a2540] transition-colors cursor-pointer"
      >
        ← Back
      </button>

      {/* Next button */}
      <button
        onClick={onNext}
        disabled={!selectedAnswer || isLast}
        className={`px-8 py-3 rounded-xl font-medium text-white text-base transition-all ${
          selectedAnswer && !isLast
            ? "bg-[#ff6b00] hover:bg-[#ff6b00]/90 cursor-pointer"
            : "bg-gray-300 cursor-not-allowed"
        }`}
      >
        Next →
      </button>

    </div>
  )
}