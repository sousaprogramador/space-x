import dayjs from 'dayjs';

export default function formatDate(date: string) {
  const formattedDate = dayjs(new Date(date)).format('DD/MM/YYYY');
  return formattedDate;
}
