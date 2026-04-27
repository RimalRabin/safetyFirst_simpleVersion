const CATEGORY_LABELS = ["Org", "People", "Physical", "Tech"]

interface QuestionNavProps {
  isScreening:      boolean
  totalPool:        number
  currentPoolIndex: number
  answeredPoolIds:  string[]
  poolQuestionIds:  string[]
  onJump:           (poolIndex: number) => void
  categoryIndex:    number
}

export const QuestionNav = ({
  isScreening,
  totalPool,
  currentPoolIndex,
  answeredPoolIds,
  poolQuestionIds,
  onJump,
  categoryIndex,
}: QuestionNavProps): JSX.Element => {

  if (isScreening) {
    return (
      <div className="flex justify-center items-center gap-3 py-4">
        <span className="text-white/50 text-xs mr-2">
          Setting up your assessment
        </span>
        {CATEGORY_LABELS.map((label, i) => (
          <div
            key={label}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              i === categoryIndex
                ? "bg-white text-[#0a2540]"
                : i < categoryIndex
                ? "bg-[#00bfa5] text-white"
                : "bg-white/10 text-white/40"
            }`}
          >
            {label}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex justify-center flex-wrap gap-2 py-4 px-6">
      {Array.from({ length: totalPool }).map((_, i) => {
        const isActive   = i === currentPoolIndex
        const isAnswered = answeredPoolIds.includes(poolQuestionIds[i])
        return (
          <button
            key={i}
            onClick={() => onJump(i)}
            className={`w-12 h-10 rounded-full text-sm font-medium transition-all relative ${
              isActive
                ? "bg-white text-[#0a2540] shadow-lg scale-110"
                : isAnswered
                ? "bg-[#00bfa5] text-white hover:bg-[#00bfa5]/80"
                : "bg-[#2d3748] text-white/70 hover:bg-[#3d4758]"
            }`}
          >
            Q{i + 1}
            {isActive && (
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[#ff6b00] text-lg leading-none">
                ▲
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}