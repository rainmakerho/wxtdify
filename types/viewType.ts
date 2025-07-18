
export const ViewTypes = {
  chat: "chat",
  settings: "settings",
  conversations: "conversations"
} as const;

export type ViewType = keyof typeof ViewTypes;