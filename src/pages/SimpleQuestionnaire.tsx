import { useState } from "react"

const TOTAL_QUESTIONS = 10

const answerOptions = [
  { id: "yes",     label: "Yes — fully implemented" },
  { id: "partial", label: "Partial — in progress or informal" },
  { id: "no",      label: "No — not yet implemented" },
]

export const SimpleQuestionnaire = (): JSX.Element => {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})

  const progressPercent = Math.round((currentIndex / TOTAL_QUESTIONS) * 100)
  const selectedAnswer = answers[currentIndex] ?? ""

  const handleSelectAnswer = (answerId: string) => {
    setAnswers((prev) => ({ ...prev, [currentIndex]: answerId }))
  }

  return (
    <div className="min-h-screen bg-[#0a2540] flex flex-col font-['Inter',Helvetica]">

      {/* HEADER */}
      <header className="flex items-center justify-between px-8 py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <img
            className="w-10 h-10"
            alt="Shield"
            src="/figmaAssets/shield-off.svg"
          />
          <span className="font-bold text-white text-2xl">
            _safety_first
          </span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="font-bold text-white text-xl">Simple Version</span>
          <span className="text-white/70 text-sm">
            Question {currentIndex + 1} of {TOTAL_QUESTIONS} | {progressPercent}% complete
          </span>
          <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#00bfa5] rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
        <button className="bg-[#ff6b00] hover:bg-[#ff6b00]/90 text-white font-medium px-5 py-2 rounded cursor-pointer">
          Exit
        </button>
      </header>

      {/* STEP DOTS */}
      <div className="flex justify-center gap-2 py-5">
        {Array.from({ length: TOTAL_QUESTIONS }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentIndex
                ? "bg-white scale-125"
                : answers[index]
                ? "bg-[#00bfa5]"
                : "bg-white/30"
            }`}
            aria-label={`Go to question ${index + 1}`}
          />
        ))}
      </div>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex items-start justify-center px-6 py-8">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">

          {/* Question header band */}
          <div className="bg-[#00bfa5] px-8 py-4 flex items-center justify-between">
            <span className="text-white font-medium text-lg">
              Question {currentIndex + 1}
            </span>
            <span className="text-white/80 text-sm font-mono">
              ISO 27001
            </span>
          </div>

          {/* Question text — placeholder for MongoDB */}
          <div className="px-8 pt-8 pb-6 min-h-[120px] flex items-center">
            <p className="text-gray-300 text-base italic">
              Question text will load from the database here...
            </p>
          </div>

          {/* ANSWER OPTIONS */}
          <div className="px-8 pb-8 flex flex-col gap-4">
            {answerOptions.map((option) => {
              const isSelected = selectedAnswer === option.id
              return (
                <button
                  key={option.id}
                  onClick={() => handleSelectAnswer(option.id)}
                  className={`flex items-center gap-4 w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-150 ${
                    isSelected
                      ? "border-[#00bfa5] bg-[#00bfa5]/10"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  {/* Checkbox */}
                  <div className={`w-5 h-5 rounded flex-shrink-0 flex items-center justify-center border-2 transition-colors ${
                    isSelected
                      ? "bg-[#00bfa5] border-[#00bfa5]"
                      : "border-gray-400"
                  }`}>
                    {isSelected && (
                      <img
                        src="/figmaAssets/check-small.svg"
                        alt="checked"
                        className="w-5 h-5"
                      />
                    )}
                  </div>
                  <span className={`text-base font-medium ${
                    isSelected ? "text-[#0a2540]" : "text-gray-700"
                  }`}>
                    {option.label}
                  </span>
                </button>
              )
            })}
          </div>

        </div>
      </main>

    </div>
  )
}