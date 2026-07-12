import { panduanData } from "@/data/panduan";
import PanduanClient from "./PanduanClient";

export async function generateStaticParams() {
  return panduanData.map((p) => ({
    id: p.id,
  }));
}

interface PanduanDetailPageProps {
  params: { id: string };
}

export default function PanduanDetailPage({ params }: PanduanDetailPageProps) {
  const panduan = panduanData.find((p) => p.id === params.id);

  if (!panduan) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-slate-800">Panduan tidak ditemukan</h1>
        </div>
      </div>
    );
  }

  return <PanduanClient panduan={panduan} />;
}
