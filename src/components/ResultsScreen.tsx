import { type FlowItem } from "@/types"

interface ResultsScreenProps {
  answers:   Record<string, string>
  flowItems: FlowItem[]
}

const CATEGORIES = [
  "organisational", "people", "physical", "technological"
] as const

const LABELS: Record<string, string> = {
  organisational: "Organisational Controls",
  people:         "People Controls",
  physical:       "Physical Controls",
  technological:  "Technological Controls",
}

const ICONS: Record<string, string> = {
  organisational: "🏢",
  people:         "👥",
  physical:       "🔒",
  technological:  "💻",
}

const POSITIVE = new Set([
  "yes", "all", "auto", "different", "limited",
  "yes_straight_away", "yes_always", "yes_regularly",
])

const getRisk = (ratio: number) => {
  if (ratio >= 0.7) return { label: "Low Risk",    colour: "text-[#00bfa5]"  }
  if (ratio >= 0.4) return { label: "Medium Risk", colour: "text-yellow-500" }
  return                   { label: "High Risk",   colour: "text-red-400"    }
}

export const ResultsScreen = ({
  answers,
  flowItems,
}: ResultsScreenProps): JSX.Element => {
  const totalAnswered = Object.keys(answers).length

  const summaries = CATEGORIES.map(cat => {
    const catPool = flowItems.filter(
      item =>
        item.kind === "question" &&
        item.data.category === cat &&
        item.data.type === "pool"
    )
    const answered = catPool.filter(
      item => item.kind === "question" && answers[item.data.id]
    ).length
    const positive = catPool.filter(item => {
      if (item.kind !== "question") return false
      const ans = answers[item.data.id]
      return ans && POSITIVE.has(ans.toLowerCase())
    }).length
    const ratio = answered > 0 ? positive / answered : 0
    return { cat, answered, total: catPool.length, risk: getRisk(ratio) }
  })

  return (
    <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">

      <div className="bg-[#00bfa5] px-8 py-8 flex flex-col items-center gap-2">
        <span className="text-5xl">✅</span>
        <span className="text-white font-bold text-2xl text-center">
          Assessment Complete
        </span>
        <span className="text-white/80 text-sm text-center">
          You answered {totalAnswered} questions across all four control areas
        </span>
      </div>

      <div className="px-8 py-6 flex flex-col gap-4">
        <p className="text-[#1e2937] font-semibold text-base">
          Summary by control area:
        </p>
        {summaries.map(({ cat, answered, total, risk }) => (
          <div
            key={cat}
            className="flex items-center justify-between px-5 py-4 rounded-xl border border-gray-100 bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{ICONS[cat]}</span>
              <div>
                <p className="text-[#1e2937] font-medium text-sm">
                  {LABELS[cat]}
                </p>
                <p className="text-gray-400 text-xs">
                  {answered} of {total} questions answered
                </p>
              </div>
            </div>
            <span className={`text-sm font-semibold ${risk.colour}`}>
              {risk.label}
            </span>
          </div>
        ))}
      </div>

      <div className="px-8 pb-8">
        <div className="bg-[#0a2540] rounded-xl px-6 py-5 flex flex-col gap-2">
          <p className="text-white font-semibold text-sm">
            Your detailed report is being generated
          </p>
          <p className="text-white/60 text-xs leading-relaxed">
            Your full cybersecurity gap analysis — including scores,
            specific recommendations, and suggested next steps — will
            be available in your PDF report.
          </p>
        </div>
      </div>

    </div>
  )
}