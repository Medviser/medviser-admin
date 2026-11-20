import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Download, Plus, Search, Upload } from "lucide-react";

export default function HeadingActions(){
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
                    <Button variant="outline">
                         <Plus/>
                         Ստեղծել
                    </Button>
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