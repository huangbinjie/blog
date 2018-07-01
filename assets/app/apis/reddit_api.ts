import { IRedditType } from "../types/reddit_type"

export const list = (slag: string): Promise<IRedditType> =>
  fetch("/reddit" + slag, {
    method: "GET",
    headers: {
      "if-api": "true"
    }
  }).then(res => res.json())
