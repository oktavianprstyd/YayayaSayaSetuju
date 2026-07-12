import { templateSuratData } from "@/data/template-surat";
import TemplateSuratClient from "./TemplateSuratClient";

export async function generateStaticParams() {
  return templateSuratData.map((t) => ({
    id: t.id,
  }));
}

interface TemplateSuratDetailPageProps {
  params: { id: string };
}

export default function TemplateSuratDetailPage({ params }: TemplateSuratDetailPageProps) {
  const template = templateSuratData.find((t) => t.id === params.id);

  if (!template) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-slate-800">Template tidak ditemukan</h1>
        </div>
      </div>
    );
  }

  return <TemplateSuratClient template={template} />;
}
