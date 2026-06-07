import type { MonthlyResult } from "@/types/monthly-result";
import result1 from "@/assets/result-1.jpg";
import result2 from "@/assets/result-2.jpg";
import result3 from "@/assets/result-3.jpg";

export const MONTHLY_RESULTS: MonthlyResult[] = [
  { id: "result-001", month: "May 2026", netResult: "+$5,315", record: "13W / 2L", imageSrc: result1, alt: "May 2026 monthly trading result" },
  { id: "result-002", month: "Apr 2026", netResult: "+$8,420", record: "18W / 4L", imageSrc: result2, alt: "April 2026 monthly trading result" },
  { id: "result-003", month: "Mar 2026", netResult: "+$4,210", record: "11W / 3L", imageSrc: result3, alt: "March 2026 monthly trading result" },
  { id: "result-004", month: "Feb 2026", netResult: "+$6,780", record: "15W / 3L", imageSrc: result1, alt: "February 2026 monthly trading result" },
  { id: "result-005", month: "Jan 2026", netResult: "+$3,940", record: "9W / 2L", imageSrc: result2, alt: "January 2026 monthly trading result" },
];
