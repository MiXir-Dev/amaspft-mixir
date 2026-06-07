import type { MonthlyResult } from "@/types/monthly-result";
import januaryPnl25 from "@/assets/pnl/jan-pnl-25.png";
import februaryPnl25 from "@/assets/pnl/feb-pnl-25.png";
import marchPnl25 from "@/assets/pnl/march-pnl-25.png";
import aprilPnl25 from "@/assets/pnl/april-pnl-25.png";
import mayPnl24 from "@/assets/pnl/may-pnl-24.png";
import junePnl24 from "@/assets/pnl/june-pnl-24.png";
import julyPnl24 from "@/assets/pnl/july-pnl-24.png";
import augustPnl24 from "@/assets/pnl/aug-pnl-24.png";
import octoberPnl24 from "@/assets/pnl/october-pnl-24.png";
import novemberPnl24 from "@/assets/pnl/nov-pnl-24.png";
import decemberPnl24 from "@/assets/pnl/dec-pnl-24.png";

export const MONTHLY_RESULTS: MonthlyResult[] = [
  { id: "result-001", month: "Jan 2025", netResult: "+$X,XXX", record: "XXW / XL", imageSrc: januaryPnl25, alt: "January 2025 monthly trading result" },
  { id: "result-002", month: "Feb 2025", netResult: "+$X,XXX", record: "XXW / XL", imageSrc: februaryPnl25, alt: "February 2025 monthly trading result" },
  { id: "result-003", month: "Mar 2025", netResult: "+$X,XXX", record: "XXW / XL", imageSrc: marchPnl25, alt: "March 2025 monthly trading result" },
  { id: "result-004", month: "Apr 2025", netResult: "+$X,XXX", record: "XXW / XL", imageSrc: aprilPnl25, alt: "April 2025 monthly trading result" },
  { id: "result-005", month: "May 2024", netResult: "+$X,XXX", record: "XXW / XL", imageSrc: mayPnl24, alt: "May 2024 monthly trading result" },
  { id: "result-006", month: "Jun 2024", netResult: "+$X,XXX", record: "XXW / XL", imageSrc: junePnl24, alt: "June 2024 monthly trading result" },
  { id: "result-007", month: "Jul 2024", netResult: "+$X,XXX", record: "XXW / XL", imageSrc: julyPnl24, alt: "July 2024 monthly trading result" },
  { id: "result-008", month: "Aug 2024", netResult: "+$X,XXX", record: "XXW / XL", imageSrc: augustPnl24, alt: "August 2024 monthly trading result" },
  { id: "result-009", month: "Oct 2024", netResult: "+$X,XXX", record: "XXW / XL", imageSrc: octoberPnl24, alt: "October 2024 monthly trading result" },
  { id: "result-010", month: "Nov 2024", netResult: "+$X,XXX", record: "XXW / XL", imageSrc: novemberPnl24, alt: "November 2024 monthly trading result" },
  { id: "result-011", month: "Dec 2024", netResult: "+$X,XXX", record: "XXW / XL", imageSrc: decemberPnl24, alt: "December 2024 monthly trading result" },
];
