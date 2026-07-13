import { mockLoans } from "@/data/mock-fase2";
import LoanDetailClient from "./LoanDetailClient";

export async function generateStaticParams() {
  return mockLoans.map((l) => ({
    id: l.id,
  }));
}

interface LoanDetailPageProps {
  params: { id: string };
}

export default function LoanDetailPage({ params }: LoanDetailPageProps) {
  return <LoanDetailClient loanId={params.id} />;
}
