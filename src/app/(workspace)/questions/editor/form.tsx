import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

export default function QuestionsEditorForm(){
     return (
          <div className="space-y-3">
               <h1 className="font-semibold text-xl md:text-2xl lg:text-3xl">Հարցերի խմբագրիչ</h1>
               <Button variant="outline" asChild>
                    <Link href="/questions">
                         <ChevronLeft/>
                         Վերադառնալ
                    </Link>
               </Button>
               <span>TODO: Make each item have a unique view type, unique form page, import/export as JSON & CSV</span>
          </div>
     )
}