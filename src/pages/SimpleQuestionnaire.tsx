import { useState, useMemo }      from "react"
import { useQuestions }           from "@/hooks/useQuestions"
import { Header }                 from "@/components/Header"
import { QuestionNav }            from "@/components/QuestionNav"
import { QuestionCard }           from "@/components/QuestionCard"
import { Navigation }             from "@/components/Navigation"
import { CategoryIntroCard }      from "@/components/CategoryIntroCard"
import { ResultsScreen }          from "@/components/ResultsScreen"

export const SimpleQuestionnaire = (): JSX.Element => {
  const { questions, loading, error } = useQuestions()

  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [answers, setAnswers]           = useState<Record<string, string>>({})

  // ── derived values ────────────────────────────────────────────────────────
  const totalQuestions  = questions.length
  const currentQuestion = questions[currentIndex]
  const progressPercent = totalQuestions > 0
    ? Math.round((currentIndex / totalQuestions) * 100)
    : 0
  const selectedAnswer  = currentQuestion
    ? answers[currentQuestion.id] ?? ""
    : ""

  // ── handlers ──────────────────────────────────────────────────────────────
  const handleSelectAnswer = (answerId: string) => {
    if (!currentQuestion) return
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: answerId }))
  }

  const handleNext = () => {
    if (!selectedAnswer || !currentQuestion) return

    const nextId = currentQuestion.conditionalNext?.[selectedAnswer]

    if (nextId) {
      const nextIndex = questions.findIndex((q) => q.id === nextId)
      if (nextIndex !== -1) {
        setCurrentIndex(nextIndex)
        return
      }
    }

    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
    }
  }

  // ── loading state ─────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a2540] flex items-center justify-center">
        <span className="text-white/70 text-lg">Loading questions...</span>
      </div>
    )
  }

  // ── error state ───────────────────────────────────────────────────────────
  if (error || !currentQuestion) {
    return (
      <div className="min-h-screen bg-[#0a2540] flex items-center justify-center">
        <span className="text-red-400 text-lg">{error ?? "Something went wrong."}</span>
      </div>
    )
  }

  // ── main render ───────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#0a2540] flex flex-col font-['Inter',Helvetica]">

      <Header
        currentIndex={currentIndex}
        totalQuestions={totalQuestions}
        progressPercent={progressPercent}
      />

      <StepDots
        totalQuestions={totalQuestions}
        currentIndex={currentIndex}
        answeredIds={Object.keys(answers)}
        questionIds={questions.map((q) => q.id)}
        onDotClick={setCurrentIndex}
      />

      <main className="flex-1 flex items-start justify-center px-6 py-8">
        <div className="w-full max-w-2xl flex flex-col">
          <QuestionCard
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={handleSelectAnswer}
          />
          <Navigation
            currentIndex={currentIndex}
            totalQuestions={totalQuestions}
            selectedAnswer={selectedAnswer}
            onBack={handleBack}
            onNext={handleNext}
          />
        </div>
      </main>

    </div>
  )
}