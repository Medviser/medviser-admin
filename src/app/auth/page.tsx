import type { Metadata } from "next"
import LoginContent from "@/contents/workspace"

export const metadata: Metadata = {
     title: "Մուտք"
}
export default function LoginPage(){
     return (
          <LoginContent/>
     )
}