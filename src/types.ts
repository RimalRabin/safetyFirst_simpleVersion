export interface AnswerOption {
  id: string
  label: string
}

export interface Question {
  id: string
  category: "organisational" | "people" | "physical" | "technological"
  type: "screening" | "pool"
  text: string
  options: AnswerOption[]
  conditionalNext?: Record<string, string>
}