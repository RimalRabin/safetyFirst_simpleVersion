import { type Question } from "@/types"

export const screeningQuestions: Record<string, Question[]> = {
  organisational: [
    {
      id:       "org_screen_1",
      category: "organisational",
      type:     "screening",
      text:     "Has your business ever experienced an online security problem — like a scam email, unauthorised access, or lost data?",
      options:  [
        { id: "yes",      label: "Yes, it has happened"   },
        { id: "not_sure", label: "Not that I know of"     },
        { id: "no",       label: "No"                     },
      ],
      conditionalNext: {
        yes:      "org_screen_2a",
        not_sure: "org_screen_2b",
        no:       "org_screen_2b",
      },
    },
    {
      id:       "org_screen_2a",
      category: "organisational",
      type:     "screening",
      text:     "After that incident, did you do anything differently to stop it happening again?",
      options:  [
        { id: "yes",      label: "Yes, we made changes"           },
        { id: "not_sure", label: "Some things, not sure if enough" },
        { id: "no",       label: "No, not really"                 },
      ],
    },
    {
      id:       "org_screen_2b",
      category: "organisational",
      type:     "screening",
      text:     "Do you have any kind of plan for what you would do if something went wrong online tomorrow?",
      options:  [
        { id: "yes",      label: "Yes, I have a plan"              },
        { id: "not_sure", label: "Roughly, but nothing written down" },
        { id: "no",       label: "No plan at all"                  },
      ],
    },
  ],

  people: [
    {
      id:       "people_screen_1",
      category: "people",
      type:     "screening",
      text:     "Do you have anyone else — staff, contractors, or family — who uses your business systems or accounts?",
      options:  [
        { id: "yes",    label: "Yes, staff or contractors"    },
        { id: "family", label: "Just family or occasional help" },
        { id: "no",     label: "No, just me"                  },
      ],
      conditionalNext: {
        yes:    "people_screen_2a",
        family: "people_screen_2a",
        no:     "people_screen_2b",
      },
    },
    {
      id:       "people_screen_2a",
      category: "people",
      type:     "screening",
      text:     "When someone stops working with you, do you remove their access to your accounts and systems straight away?",
      options:  [
        { id: "yes",      label: "Yes, straight away"         },
        { id: "not_sure", label: "We get to it eventually"    },
        { id: "no",       label: "No process for this"        },
      ],
    },
    {
      id:       "people_screen_2b",
      category: "people",
      type:     "screening",
      text:     "Do you use shared passwords with anyone for business accounts?",
      options:  [
        { id: "yes", label: "Yes" },
        { id: "no",  label: "No"  },
      ],
    },
  ],

  physical: [
    {
      id:       "physical_screen_1",
      category: "physical",
      type:     "screening",
      text:     "Where do you mainly do your business work?",
      options:  [
        { id: "office", label: "Office or fixed location" },
        { id: "home",   label: "From home"                },
        { id: "mixed",  label: "Mixed or on the go"       },
      ],
      conditionalNext: {
        office: "physical_screen_2a",
        home:   "physical_screen_2b",
        mixed:  "physical_screen_2b",
      },
    },
    {
      id:       "physical_screen_2a",
      category: "physical",
      type:     "screening",
      text:     "Do you lock your office and secure devices when you leave at the end of the day?",
      options:  [
        { id: "yes",       label: "Yes, always"  },
        { id: "sometimes", label: "Sometimes"    },
        { id: "no",        label: "No"           },
      ],
    },
    {
      id:       "physical_screen_2b",
      category: "physical",
      type:     "screening",
      text:     "Do you use a VPN or secure connection when working outside your home network?",
      options:  [
        { id: "yes",      label: "Yes"                         },
        { id: "not_sure", label: "Not sure what a VPN is"      },
        { id: "no",       label: "No"                          },
      ],
    },
  ],

  technological: [
    {
      id:       "tech_screen_1",
      category: "technological",
      type:     "screening",
      text:     "Do you use cloud services or online accounts for your business (like Gmail, Microsoft 365, Xero, Shopify, or similar)?",
      options:  [
        { id: "yes", label: "Yes, several"       },
        { id: "few", label: "Just one or two"    },
        { id: "no",  label: "No"                 },
      ],
      conditionalNext: {
        yes: "tech_screen_2a",
        few: "tech_screen_2a",
        no:  "tech_screen_2b",
      },
    },
    {
      id:       "tech_screen_2a",
      category: "technological",
      type:     "screening",
      text:     "Do any of those accounts use two-factor authentication — a code sent to your phone when you log in?",
      options:  [
        { id: "all",  label: "Yes, all of them" },
        { id: "some", label: "Some of them"     },
        { id: "no",   label: "No"               },
      ],
    },
    {
      id:       "tech_screen_2b",
      category: "technological",
      type:     "screening",
      text:     "Where do you store your important business files and data?",
      options:  [
        { id: "cloud",    label: "Cloud (Google Drive, Dropbox, OneDrive etc.)" },
        { id: "computer", label: "On my computer only"                          },
        { id: "usb",      label: "USB or external drive"                        },
      ],
    },
  ],
}