import { Twitter } from "../types/twitter_type"

export function list(name: string): Promise<Twitter[]> {
  return fetch("/twitter/" + name, {
    method: "GET",
    headers: {
      "if-api": "true"
    }
  })
    .then(res => res.json())
}