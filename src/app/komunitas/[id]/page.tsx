import { mockArisanGroups } from "@/data/mock-fase2";
import ArisanDetailClient from "./ArisanDetailClient";

export async function generateStaticParams() {
  return mockArisanGroups.map((g) => ({
    id: g.id,
  }));
}

interface ArisanDetailPageProps {
  params: { id: string };
}

export default function ArisanDetailPage({ params }: ArisanDetailPageProps) {
  return <ArisanDetailClient groupId={params.id} />;
}
