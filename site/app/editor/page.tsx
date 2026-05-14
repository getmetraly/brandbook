import EditorClient from "./EditorClient";
import "../components/dashboard/dashboard.css";

export const dynamic = "force-dynamic";

export default function EditorPage() {
  return (
    <main style={{ padding: "1rem", maxWidth: "1180px", margin: "0 auto" }}>
      <EditorClient />
    </main>
  );
}
