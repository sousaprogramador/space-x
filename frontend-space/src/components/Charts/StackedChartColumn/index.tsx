import ReactApexChart from 'react-apexcharts';
import LaunchStats from '../../../interfaces/lauchStats';

interface Props {
  data: LaunchStats | undefined;
}

export default function StackedChartColumn({ data }: Props) {
  if (!data) return null;

  const { launchCountByDate, launchCountByName } = data;

  const chartColumnStacked100Colors = [
    '#e60049',
    '#0bb4ff',
    '#50e991',
    '#e6d800',
    '#9b19f5',
  ];

  const dataMap = new Map();
  const years = [...new Set(launchCountByDate.map(({ _id }) => _id.year))].map(
    Number
  );

  const oldestYear = Math.min(...years);
  const newestYear = Math.max(...years);

  const categories = Array.from(
    { length: newestYear - oldestYear + 1 },
    (_, index) => oldestYear + index
  );

  launchCountByDate.forEach((item) => {
    const { count, _id } = item;
    const { year, name } = _id;

    const position = year - oldestYear;

    if (!dataMap.has(name)) {
      const data = Array(categories.length).fill(0);
      dataMap.set(name, { name, data });
    }

    const dataEntry = dataMap.get(name);
    dataEntry.data[position] = count;
  });

  const series = Array.from(dataMap.values());
  const labels = launchCountByName.map((item) => item._id);
  series.sort((a: { name: string }, b: { name: string }) => {
    const indexA = labels.indexOf(a.name);
    const indexB = labels.indexOf(b.name);

    return indexA - indexB;
  });

  const options = {
    fill: { opacity: 1 },
    xaxis: { categories },
    legend: { show: false },
    dataLabels: { enabled: false },
    colors: chartColumnStacked100Colors,
    chart: {
      stacked: !0,
      foreColor: '#878a99',
      toolbar: { show: !1 },
    },
    yaxis: {
      min: 0,
      max: 60,
    },
  } as ApexCharts.ApexOptions;

  return (
    <ReactApexChart
      dir="ltr"
      type="bar"
      height={330}
      series={series}
      options={options}
    />
  );
}
