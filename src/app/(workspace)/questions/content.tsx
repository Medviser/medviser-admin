import HeadingActions from "@/components/admin/header-actions";

export default function QuestionsContent(){
     return (
          <div className="space-y-3">
               <h1 className="font-semibold text-xl md:text-2xl lg:text-3xl">Հարցեր</h1>
               <HeadingActions href="/questions/editor"/>
               <span>TODO: Make each item have a unique view type, unique form page, import/export as JSON & CSV</span>
          </div>
     );
}