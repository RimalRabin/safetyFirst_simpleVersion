import { type Question } from "@/types"

export type RiskLevel = "low" | "medium" | "high"

const RISK_ANSWERS = new Set([
  "no", "not_sure", "no_process", "shared", "same",
  "never", "trash", "major", "possibly", "several",
])

export const scoreAnswer = (answerId: string): number => {
  const lower = answerId.toLowerCase().replace(/\s+/g, "_")
  if (RISK_ANSWERS.has(lower)) return 0
  if (["sometimes", "few", "some", "not_sure", "partial",
       "probably",  "family", "manual", "mixed",
       "home",      "cloud"].includes(lower)) return 1
  return 2
}

export const scoreScreening = (
  questions: Question[],
  answers:   Record<string, string>
): number =>
  questions.reduce((total, q) => {
    const ans = answers[q.id]
    return total + (ans ? scoreAnswer(ans) : 0)
  }, 0)

export const getRiskLevel = (score: number): RiskLevel =>
  score >= 4 ? "low" : score >= 2 ? "medium" : "high"

export const getPoolCount = (score: number): number =>
  getRiskLevel(score) === "low" ? 3 : getRiskLevel(score) === "medium" ? 5 : 7

export const selectPoolQuestions = (
  pool:  Question[],
  score: number
): Question[] => pool.slice(0, getPoolCount(score))

export const distributePoolCounts = (
  rawCounts: Record<string, number>
): Record<string, number> => {
  const total = Object.values(rawCounts).reduce((a, b) => a + b, 0)
  if (total <= 20) return rawCounts

  const cats     = Object.keys(rawCounts)
  const adjusted: Record<string, number> = {}
  let   remaining = 20

  cats.forEach((cat, i) => {
    if (i === cats.length - 1) {
      adjusted[cat] = Math.max(1, remaining)
    } else {
      adjusted[cat] = Math.max(1, Math.round(20 * rawCounts[cat] / total))
      remaining    -= adjusted[cat]
    }
  })

  return adjusted
}