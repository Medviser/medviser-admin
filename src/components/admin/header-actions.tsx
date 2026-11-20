import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Download, Plus, Search, Upload } from "lucide-react";
import Link from "next/link";

interface HeadingActionsProps{
     href?: string,
     onCreate?: () => void
}
export default function HeadingActions({href, onCreate}: HeadingActionsProps){
     return (
          <div className="flex items-center justify-between gap-2">
               <InputGroup className="bg-background/50 max-w-lg">
                    <InputGroupInput
                         type="text"
                         placeholder="Որոնում"
                    />
                    <InputGroupAddon>
                         <Search/>
                    </InputGroupAddon>
                    <InputGroupAddon align="inline-end">12 արդյունք</InputGroupAddon>
               </InputGroup>
               <div className="flex items-center gap-2 flex-wrap">
                    {href && href.trim()!=="" ? (
                         <Button variant="outline" asChild>
                              <Link href={href}>
                                   <Plus/>
                                   Ստեղծել
                              </Link>
                         </Button>
                    ) : (
                         <Button variant="outline" onClick={onCreate}>
                              <Plus/>
                              Ստեղծել
                         </Button>
                    )}
                    {/* TODO: Ավելացնել Դրա հնարավորությունները 5 Ռեսուրսներում */}
                    <ButtonGroup>
                         <Button size="icon" variant="outline" title="Ներմուծել">
                              <Upload/>
                         </Button>
                         <Button size="icon" variant="outline" title="Արտածել">
                              <Download/>
                         </Button>
                    </ButtonGroup>
               </div>
          </div>
     )
}