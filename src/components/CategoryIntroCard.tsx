import { type CategoryIntro } from "@/types"

interface CategoryIntroCardProps {
  intro:   CategoryIntro
  onStart: () => void
}

const ICONS: Record<string, string> = {
  organisational: "🏢",
  people:         "👥",
  physical:       "🔒",
  technological:  "💻",
}

export const CategoryIntroCard = ({
  intro,
  onStart,
}: CategoryIntroCardProps): JSX.Element => {
  return (
    <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">

      <div className="bg-[#0a2540] px-8 py-8 flex flex-col items-center gap-3">
        <span className="text-5xl">{ICONS[intro.category]}</span>
        <span className="text-white font-bold text-2xl text-center">
          {intro.title}
        </span>
      </div>

      <div className="px-8 py-8 flex flex-col gap-6">
        <p className="text-[#1e2937] text-base leading-relaxed text-center">
          {intro.description}
        </p>
        <div className="bg-[#00bfa5]/10 border border-[#00bfa5]/30 rounded-xl px-5 py-4">
          <p className="text-[#0a2540] text-sm text-center">
            We will ask you a couple of quick questions to understand your
            situation. Your answers shape the rest of the assessment.
          </p>
        </div>
        <button
          onClick={onStart}
          className="w-full bg-[#ff6b00] hover:bg-[#ff6b00]/90 text-white font-medium text-base py-4 rounded-xl transition-all cursor-pointer"
        >
          Let's go →
        </button>
      </div>

    </div>
  )
}