import { Dropdown, DropdownItem, DropdownToggle } from '@patternfly/react-core';
import type { TimeOption } from '@perses-dev/components';
import { isRelativeTimeRange } from '@perses-dev/core';
import { useTimeRange } from '@perses-dev/plugin-system';
import { useState } from 'react';

export function TimeRangeDropDown() {
  const timeRangeOptions: TimeOption[] = [
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

  const [isOpen, setIsOpen] = useState(false);
  const { timeRange, setTimeRange } = useTimeRange();

  const handleSelectedValue = (value: TimeOption['value']) => () => {
    setIsOpen(false);
    setTimeRange(value);
  };

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Dropdown
        dropdownItems={timeRangeOptions.map(({ value, display }) => (
          <DropdownItem
            componentID={display}
            onClick={handleSelectedValue(value)}
            key={display}
          >
            {display}
          </DropdownItem>
        ))}
        isOpen={isOpen}
        toggle={
          <DropdownToggle onToggle={toggleIsOpen}>
            {isRelativeTimeRange(timeRange)
              ? timeRange.pastDuration
              : `${timeRange.start} - ${timeRange.end}`}
          </DropdownToggle>
        }
      />
    </div>
  );
}
