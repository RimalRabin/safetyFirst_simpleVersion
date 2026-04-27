import { useState, useMemo }     from "react"
import { useQuestions }          from "@/hooks/useQuestions"
import { Header }                from "@/components/Header"
import { QuestionNav }           from "@/components/QuestionNav"
import { QuestionCard }          from "@/components/QuestionCard"
import { Navigation }            from "@/components/Navigation"
import { CategoryIntroCard }     from "@/components/CategoryIntroCard"
import { ResultsScreen }         from "@/components/ResultsScreen"

const CATEGORIES = ["organisational", "people", "physical", "technological"]

export const SimpleQuestionnaire = (): JSX.Element => {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [answers,      setAnswers]      = useState<Record<string, string>>({})

  const { flowItems, loading, error } = useQuestions(answers)

  const currentItem = flowItems[currentIndex]

  // Pool questions only — for progress and nav pills
  const poolItems = useMemo(
    () => flowItems.filter(
      item => item.kind === "question" && item.data.type === "pool"
    ),
    [flowItems]
  )

  const poolQuestionIds = useMemo(
    () => poolItems.map(item =>
      item.kind === "question" ? item.data.id : ""
    ),
    [poolItems]
  )

  const poolItemsBeforeCurrent = useMemo(
    () => flowItems.slice(0, currentIndex).filter(
      item => item.kind === "question" && item.data.type === "pool"
    ),
    [flowItems, currentIndex]
  )

  const currentPoolIndex   = poolItemsBeforeCurrent.length
  const totalPoolQuestions = poolItems.length
  const isResultsScreen    = currentItem?.kind === "results"

  const isScreening = currentItem?.kind === "question"
    ? currentItem.data.type === "screening"
    : currentItem?.kind === "intro"
    ? true
    : false

  const screeningCategoryIndex = useMemo(() => {
    if (!isScreening) return 0
    const cat =
      currentItem?.kind === "question" ? currentItem.data.category :
      currentItem?.kind === "intro"    ? currentItem.data.category :
      null
    return cat ? Math.max(0, CATEGORIES.indexOf(cat)) : 0
  }, [currentItem, isScreening])

  const progressPercent =
    isScreening || isResultsScreen || totalPoolQuestions === 0
      ? 0
      : Math.round((currentPoolIndex / totalPoolQuestions) * 100)

  const selectedAnswer =
    currentItem?.kind === "question"
      ? answers[currentItem.data.id] ?? ""
      : ""

  const prevItemIsIntro =
    currentIndex > 0 && flowItems[currentIndex - 1]?.kind === "intro"

  const backDisabled =
    currentIndex === 0 || prevItemIsIntro || isResultsScreen

  const nextDisabled =
    currentItem?.kind === "question" && !selectedAnswer

  // ── handlers ──────────────────────────────────────────────────────────────
  const handleSelectAnswer = (answerId: string) => {
    if (currentItem?.kind !== "question") return
    setAnswers(prev => ({ ...prev, [currentItem.data.id]: answerId }))
  }

  const handleNext = () => {
    if (
      currentItem?.kind === "intro" ||
      currentItem?.kind === "results"
    ) {
      setCurrentIndex(prev => prev + 1)
      return
    }

    if (currentItem?.kind !== "question" || !selectedAnswer) return

    const nextId = currentItem.data.conditionalNext?.[selectedAnswer]
    if (nextId) {
      const nextIndex = flowItems.findIndex(
        item => item.kind === "question" && item.data.id === nextId
      )
      if (nextIndex !== -1) {
        setCurrentIndex(nextIndex)
        return
      }
    }

    if (currentIndex < flowItems.length - 1) {
      setCurrentIndex(prev => prev + 1)
    }
  }

  const handleBack = () => {
    if (backDisabled) return
    setCurrentIndex(prev => prev - 1)
  }

  const handleJumpToPool = (poolIndex: number) => {
    const targetId = poolQuestionIds[poolIndex]
    if (!targetId) return
    const targetFlowIndex = flowItems.findIndex(
      item => item.kind === "question" && item.data.id === targetId
    )
    if (targetFlowIndex !== -1) setCurrentIndex(targetFlowIndex)
  }

  // ── loading ────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a2540] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-white/20 border-t-[#00bfa5] rounded-full animate-spin" />
          <span className="text-white/70 text-base">
            Loading your assessment...
          </span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0a2540] flex items-center justify-center">
        <span className="text-red-400 text-lg">{error}</span>
      </div>
    )
  }

  // No questions from API yet
  if (!loading && flowItems.length <= 1) {
    return (
      <div className="min-h-screen bg-[#0a2540] flex items-center justify-center px-6">
        <div className="bg-white/10 rounded-2xl px-8 py-10 max-w-md text-center flex flex-col gap-4">
          <span className="text-5xl">🔌</span>
          <p className="text-white font-semibold text-xl">
            No questions loaded
          </p>
          <p className="text-white/60 text-sm leading-relaxed">
            The questionnaire is waiting for a backend connection.
            Once the API is live, questions will load automatically.
          </p>
        </div>
      </div>
    )
  }

  if (!currentItem) return <></>

  // ── main render ────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#0a2540] flex flex-col font-['Inter',Helvetica] relative">

      {/* Background pattern */}
      <img
        src="/figmaAssets/subtle-security-pattern-with-flags-1.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-[0.15] pointer-events-none select-none"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col flex-1">

        <Header
          currentIndex={isScreening || isResultsScreen ? 0 : currentPoolIndex}
          totalQuestions={isScreening || isResultsScreen ? 0 : totalPoolQuestions}
          progressPercent={progressPercent}
          isScreening={isScreening || isResultsScreen}
        />

        {!isResultsScreen && (
          <QuestionNav
            isScreening={isScreening}
            totalPool={totalPoolQuestions}
            currentPoolIndex={currentPoolIndex}
            answeredPoolIds={Object.keys(answers).filter(id =>
              poolQuestionIds.includes(id)
            )}
            poolQuestionIds={poolQuestionIds}
            onJump={handleJumpToPool}
            categoryIndex={screeningCategoryIndex}
          />
        )}

        <main className="flex-1 flex items-start justify-center px-6 py-8">
          <div className="w-full max-w-2xl flex flex-col">

            {isResultsScreen ? (
              <ResultsScreen
                answers={answers}
                flowItems={flowItems}
              />
            ) : currentItem.kind === "intro" ? (
              <CategoryIntroCard
                intro={currentItem.data}
                onStart={handleNext}
              />
            ) : (
              <>
                <QuestionCard
                  question={currentItem.data}
                  selectedAnswer={selectedAnswer}
                  onSelectAnswer={handleSelectAnswer}
                />
                <Navigation
                  backDisabled={backDisabled}
                  nextDisabled={!!nextDisabled}
                  onBack={handleBack}
                  onNext={handleNext}
                  isLastItem={currentIndex === flowItems.length - 2}
                />
              </>
            )}

          </div>
        </main>

      </div>
    </div>
  )
}