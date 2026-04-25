interface StepDotsProps {
  totalQuestions: number
  currentIndex: number
  answeredIds: string[]
  questionIds: string[]
  onDotClick: (index: number) => void
}

export const StepDots = ({
  totalQuestions,
  currentIndex,
  answeredIds,
  questionIds,
  onDotClick,
}: StepDotsProps): JSX.Element => {
  return (
    <div className="flex justify-center gap-2 py-5">
      {Array.from({ length: totalQuestions }).map((_, index) => {
        const isActive   = index === currentIndex
        const isAnswered = answeredIds.includes(questionIds[index])

        return (
          <button
            key={index}
            onClick={() => onDotClick(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              isActive
                ? "bg-white scale-125"
                : isAnswered
                ? "bg-[#00bfa5]"
                : "bg-white/30"
            }`}
            aria-label={`Go to question ${index + 1}`}
          />
        )
      })}
    </div>
  )
}