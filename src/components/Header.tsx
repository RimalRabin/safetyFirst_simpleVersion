interface HeaderProps {
  currentIndex: number
  totalQuestions: number
  progressPercent: number
}

export const Header = ({
  currentIndex,
  totalQuestions,
  progressPercent,
}: HeaderProps): JSX.Element => {
  return (
    <header className="flex items-center justify-between px-8 py-4 border-b border-white/10">

      {/* Logo and brand name */}
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

      {/* Centre — version label, question counter, progress bar */}
      <div className="flex flex-col items-center gap-1">
        <span className="font-bold text-white text-xl">Simple Version</span>
        <span className="text-white/70 text-sm">
          Question {currentIndex + 1} of {totalQuestions} | {progressPercent}% complete
        </span>
        <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#00bfa5] rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Exit button */}
      <button className="bg-[#ff6b00] hover:bg-[#ff6b00]/90 text-white font-medium px-5 py-2 rounded cursor-pointer">
        Exit
      </button>

    </header>
  )
}