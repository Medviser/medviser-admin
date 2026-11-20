import type { Metadata } from "next";
import SettingsContent from "./content";

export const metadata: Metadata = {
     title: "Կարգավորումներ"
}
export default function SettingsPage() {
     return (
          <SettingsContent/>
     )
}