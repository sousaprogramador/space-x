import ReactApexChart from 'react-apexcharts';
import LaunchStats from '../../../interfaces/lauchStats';

interface Props {
  data: LaunchStats | undefined;
}

export default function PieChart({ data }: Props) {
  if (!data) return null;

  const launchCountByNameData = data.launchCountByName;
  const labels = launchCountByNameData.map((item) => item._id);
  const counts = launchCountByNameData.map((item) => item.count);

  const chartPieBasicColors = [
    '#e60049',
    '#0bb4ff',
    '#50e991',
    '#e6d800',
    '#9b19f5',
  ];

  const options = {
    labels: labels,
    fill: { opacity: 1 },
    colors: chartPieBasicColors,
    legend: { position: 'bottom' },
    chart: { foreColor: '#878a99' },
  } as ApexCharts.ApexOptions;

  return (
    <ReactApexChart
      dir="ltr"
      type="pie"
      height={330}
      series={counts}
      options={options}
    />
  );
}
