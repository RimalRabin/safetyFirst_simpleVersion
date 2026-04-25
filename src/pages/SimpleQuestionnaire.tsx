import { useState } from "react"
import { type Question } from "@/types"

const placeholderQuestions: Question[] = [
  {
    id: "org_screen_1",
    category: "organisational",
    type: "screening",
    text: "Have you ever done any kind of check for online risks in your business?",
    options: [
      { id: "yes", label: "Yes" },
      { id: "sometimes", label: "Sometimes / Not sure" },
      { id: "no", label: "No" },
    ],
    conditionalNext: {
      yes: "org_screen_2a",
      sometimes: "org_screen_2b",
      no: "org_screen_2b",
    },
  },
  {
    id: "org_screen_2a",
    category: "organisational",
    type: "screening",
    text: "Do you have any simple written rules or plan for what to do if something goes wrong online?",
    options: [
      { id: "yes", label: "Yes" },
      { id: "no", label: "No" },
    ],
  },
  {
    id: "org_screen_2b",
    category: "organisational",
    type: "screening",
    text: "Would it help to start with a simple list of your most important business things?",
    options: [
      { id: "yes", label: "Yes" },
      { id: "no", label: "No" },
    ],
  },
  {
    id: "people_screen_1",
    category: "people",
    type: "screening",
    text: "Do you have any staff, team members, or contractors who help with the business?",
    options: [
      { id: "yes", label: "Yes" },
      { id: "no", label: "No (just me)" },
    ],
    conditionalNext: {
      yes: "people_screen_2a",
      no: "people_screen_2b",
    },
  },
  {
    id: "people_screen_2a",
    category: "people",
    type: "screening",
    text: "Do you talk with your team about staying safe online?",
    options: [
      { id: "yes", label: "Yes" },
      { id: "sometimes", label: "Sometimes" },
      { id: "no", label: "No" },
    ],
  },
  {
    id: "people_screen_2b",
    category: "people",
    type: "screening",
    text: "Do you ever work with freelancers or contractors who need access to your email, files, or systems?",
    options: [
      { id: "yes", label: "Yes" },
      { id: "no", label: "No" },
    ],
  },
]

const TOTAL_QUESTIONS = placeholderQuestions.length

export const SimpleQuestionnaire = (): JSX.Element => {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const currentQuestion = placeholderQuestions[currentIndex]
  const progressPercent = Math.round((currentIndex / TOTAL_QUESTIONS) * 100)
  const selectedAnswer = answers[currentQuestion.id] ?? ""

  const handleSelectAnswer = (answerId: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: answerId }))
  }

  const handleNext = () => {
    if (!selectedAnswer) return

    // check if this question has conditional routing
    const nextId = currentQuestion.conditionalNext?.[selectedAnswer]

    if (nextId) {
      // find the index of the next question by id
      const nextIndex = placeholderQuestions.findIndex((q) => q.id === nextId)
      if (nextIndex !== -1) {
        setCurrentIndex(nextIndex)
        return
      }
    }

    // no conditional routing — just go to next in sequence
    if (currentIndex < TOTAL_QUESTIONS - 1) {
      setCurrentIndex((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
    }
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
        {placeholderQuestions.map((q, index) => (
          <button
            key={q.id}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentIndex
                ? "bg-white scale-125"
                : answers[q.id]
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
            <span className="text-white/80 text-sm font-mono capitalize">
              {currentQuestion.category}
            </span>
          </div>

          {/* Question text */}
          <div className="px-8 pt-8 pb-6 min-h-[100px]">
            <p className="text-[#1e2937] text-lg font-semibold leading-snug">
              {currentQuestion.text}
            </p>
          </div>

          {/* ANSWER OPTIONS — fully dynamic */}
          <div className="px-8 pb-8 flex flex-col gap-4">
            {currentQuestion.options.map((option) => {
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

          {/* NAVIGATION */}
          <div className="px-8 py-5 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
            <button
              onClick={handleBack}
              disabled={currentIndex === 0}
              className="text-gray-500 font-medium text-base disabled:opacity-30 hover:text-[#0a2540] transition-colors cursor-pointer"
            >
              ← Back
            </button>
            <button
              onClick={handleNext}
              disabled={!selectedAnswer}
              className={`px-8 py-3 rounded-xl font-medium text-white text-base transition-all ${
                selectedAnswer
                  ? "bg-[#ff6b00] hover:bg-[#ff6b00]/90 cursor-pointer"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              Next →
            </button>
          </div>

        </div>
      </main>

    </div>
  )
}