import { mockCampaigns } from "@/data/mock-fase2";
import CampaignDetailClient from "./CampaignDetailClient";

export async function generateStaticParams() {
  return mockCampaigns.map((c) => ({
    id: c.id,
  }));
}

interface CampaignDetailPageProps {
  params: { id: string };
}

export default function CampaignDetailPage({ params }: CampaignDetailPageProps) {
  return <CampaignDetailClient campaignId={params.id} />;
}
