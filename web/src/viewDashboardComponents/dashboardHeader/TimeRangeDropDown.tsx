import { DateTimeRangePicker, TimeOption } from '@perses-dev/components';
import { useTimeRange } from '@perses-dev/plugin-system';

export function TimeRangeDropDown () {

  const TIME_OPTIONS: TimeOption[] = [
    { value: { pastDuration: '5m' }, display: 'Last 5 minutes' },
    { value: { pastDuration: '15m' }, display: 'Last 15 minutes' },
    { value: { pastDuration: '30m' }, display: 'Last 30 minutes' },
    { value: { pastDuration: '1h' }, display: 'Last 1 hour' },
    { value: { pastDuration: '6h' }, display: 'Last 6 hours' },
    { value: { pastDuration: '12h' }, display: 'Last 12 hours' },
    { value: { pastDuration: '24h' }, display: 'Last 1 day' },
    { value: { pastDuration: '7d' }, display: 'Last 7 days' },
    { value: { pastDuration: '14d' }, display: 'Last 14 days' },
  ];
  
  const { timeRange, setTimeRange } = useTimeRange();
  const DEFAULT_HEIGHT = '34px'; 
  const height = DEFAULT_HEIGHT 

  return (
    <div>
      <DateTimeRangePicker timeOptions={TIME_OPTIONS} value={timeRange} onChange={setTimeRange} height={height} />
    </div>
  );
};