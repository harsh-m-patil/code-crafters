import Header from "@/app/(root)/_components/Header";
import EditorPanel from "@/app/(root)/_components/EditorPanel";
import OutputPanel from "@/app/(root)/_components/OutputPanel";

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[1800px] p-4">
        <Header />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <EditorPanel />
          <OutputPanel />
        </div>
      </div>
    </div>
  );
}
