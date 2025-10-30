
import { useParams } from 'react-router-dom';
import ReportContent from '../smartreport/ReportContent';

function MySmartReportPage() {
  const { year, month } = useParams();

  return <ReportContent year={year} month={month} />;
}

export default MySmartReportPage;