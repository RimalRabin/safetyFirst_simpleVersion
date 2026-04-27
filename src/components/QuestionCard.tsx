import { type Question } from "@/types"

interface QuestionCardProps {
  question:       Question
  selectedAnswer: string
  onSelectAnswer: (answerId: string) => void
}

export const QuestionCard = ({
  question,
  selectedAnswer,
  onSelectAnswer,
}: QuestionCardProps): JSX.Element => {
  return (
    <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">

      <div className="bg-[#00bfa5] px-8 py-4 flex items-center justify-between">
        <span className="text-white font-medium text-lg">Question</span>
        <span className="text-white/80 text-sm font-mono capitalize">
          {question.category}
        </span>
      </div>

      <div className="px-8 pt-8 pb-6 min-h-[100px]">
        <p className="text-[#1e2937] text-lg font-semibold leading-snug">
          {question.text}
        </p>
      </div>

      <div className="px-8 pb-8 flex flex-col gap-4">
        {question.options.map((option) => {
          const isSelected = selectedAnswer === option.id
          return (
            <button
              key={option.id}
              onClick={() => onSelectAnswer(option.id)}
              className={`flex items-center gap-4 w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-150 ${
                isSelected
                  ? "border-[#00bfa5] bg-[#00bfa5]/10"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
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
  )
}