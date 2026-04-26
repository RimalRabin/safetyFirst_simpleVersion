import { useState, useEffect, useRef, useCallback } from "react"
import { type FlowItem, type Question, type CategoryIntro } from "@/types"
import {
  scoreScreening,
  selectPoolQuestions,
  distributePoolCounts,
} from "@/utils/scoring"

// ---------------------------------------------------------------------------
// API PLACEHOLDERS
// ---------------------------------------------------------------------------
// These functions will be replaced with real fetch() calls once the
// Express backend is ready.
//
// Replace each function body with:
//   const res  = await fetch(`/api/questions/${category}/screening`)
//   const data = await res.json()
//   return data
//
// The shape of data returned must match the Question[] type in types.ts.
// ---------------------------------------------------------------------------

const CATEGORIES = ["organisational", "people", "physical", "technological"] as const
type Category = typeof CATEGORIES[number]

// Fetch screening questions for one category
const fetchScreening = async (category: Category): Promise<Question[]> => {
  // TODO: replace with real API call
  // const res = await fetch(`/api/questions/${category}/screening`)
  // return res.json()
  return []
}

// Fetch pool questions for one category
const fetchPool = async (category: Category): Promise<Question[]> => {
  // TODO: replace with real API call
  // const res = await fetch(`/api/questions/${category}/pool`)
  // return res.json()
  return []
}

// Fetch category intro cards
const fetchCategoryIntros = async (): Promise<CategoryIntro[]> => {
  // TODO: replace with real API call
  // const res = await fetch(`/api/categories`)
  // return res.json()
  return []
}

// ---------------------------------------------------------------------------
// FLOW BUILDER
// ---------------------------------------------------------------------------
const buildFlow = (
  screeningMap:  Record<string, Question[]>,
  poolMap:       Record<string, Question[]>,
  intros:        CategoryIntro[],
  answers:       Record<string, string>
): FlowItem[] => {
  const flow: FlowItem[] = []

  // Calculate pool counts with 20 question cap
  const rawCounts: Record<string, number> = {}
  CATEGORIES.forEach(cat => {
    const score    = scoreScreening(screeningMap[cat] ?? [], answers)
    rawCounts[cat] = selectPoolQuestions(poolMap[cat] ?? [], score).length
  })
  const adjustedCounts = distributePoolCounts(rawCounts)

  CATEGORIES.forEach(cat => {
    // Category intro card
    const intro = intros.find(i => i.category === cat)
    if (intro) flow.push({ kind: "intro", data: intro })

    // Screening questions
    ;(screeningMap[cat] ?? []).forEach(q =>
      flow.push({ kind: "question", data: q })
    )

    // Pool questions selected by score
    const score    = scoreScreening(screeningMap[cat] ?? [], answers)
    const selected = selectPoolQuestions(poolMap[cat] ?? [], score)
    selected.slice(0, adjustedCounts[cat]).forEach(q =>
      flow.push({ kind: "question", data: q })
    )
  })

  // Results screen at the end
  flow.push({ kind: "results", data: null })

  return flow
}

// ---------------------------------------------------------------------------
// HOOK
// ---------------------------------------------------------------------------
export const useQuestions = (answers: Record<string, string> = {}) => {
  const [flowItems,      setFlowItems]      = useState<FlowItem[]>([])
  const [initialLoading, setInitialLoading] = useState<boolean>(true)
  const [error,          setError]          = useState<string | null>(null)

  // Store fetched data so we do not re-fetch when answers change
  const screeningMap = useRef<Record<string, Question[]>>({})
  const poolMap      = useRef<Record<string, Question[]>>({})
  const intros       = useRef<CategoryIntro[]>([])
  const initialized  = useRef(false)

  // Rebuild flow from cached data without re-fetching
  const rebuild = useCallback((currentAnswers: Record<string, string>) => {
    setFlowItems(buildFlow(
      screeningMap.current,
      poolMap.current,
      intros.current,
      currentAnswers
    ))
  }, [])

  // Initial fetch — runs once on mount
  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    const init = async () => {
      try {
        // Fetch all data in parallel
        const [introData, ...categoryData] = await Promise.all([
          fetchCategoryIntros(),
          ...CATEGORIES.map(cat =>
            Promise.all([fetchScreening(cat), fetchPool(cat)])
          ),
        ])

        intros.current = introData as CategoryIntro[]

        CATEGORIES.forEach((cat, i) => {
          const [screening, pool] = categoryData[i] as [Question[], Question[]]
          screeningMap.current[cat] = screening
          poolMap.current[cat]      = pool
        })

        setFlowItems(buildFlow(
          screeningMap.current,
          poolMap.current,
          intros.current,
          {}
        ))
      } catch (err) {
        setError("Failed to load questions. Please try again.")
      } finally {
        setInitialLoading(false)
      }
    }

    init()
  }, [])

  // Rebuild flow when answers change — no fetch, no flash
  useEffect(() => {
    if (!initialized.current || initialLoading) return
    rebuild(answers)
  }, [JSON.stringify(answers), initialLoading])

  return { flowItems, loading: initialLoading, error }
}