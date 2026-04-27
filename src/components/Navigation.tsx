interface NavigationProps {
  backDisabled: boolean
  nextDisabled: boolean
  onBack:       () => void
  onNext:       () => void
  isLastItem:   boolean
}

export const Navigation = ({
  backDisabled,
  nextDisabled,
  onBack,
  onNext,
  isLastItem,
}: NavigationProps): JSX.Element => {
  return (
    <div className="px-8 py-5 bg-gray-50 border-t border-gray-100 flex items-center justify-between rounded-b-2xl">
      <button
        onClick={onBack}
        disabled={backDisabled}
        className="text-gray-500 font-medium text-base disabled:opacity-30 hover:text-[#0a2540] transition-colors cursor-pointer disabled:cursor-not-allowed"
      >
        ← Back
      </button>
      <button
        onClick={onNext}
        disabled={nextDisabled}
        className={`px-8 py-3 rounded-xl font-medium text-white text-base transition-all ${
          !nextDisabled
            ? "bg-[#ff6b00] hover:bg-[#ff6b00]/90 cursor-pointer"
            : "bg-gray-300 cursor-not-allowed"
        }`}
      >
        {isLastItem ? "Finish" : "Next →"}
      </button>
    </div>
  )
}