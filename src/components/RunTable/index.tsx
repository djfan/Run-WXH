import React, { useState, useMemo, useCallback } from 'react';
import {
  sortDateFunc,
  sortDateFuncReverse,
  convertMovingTime2Sec,
  Activity,
  RunIds,
} from '@/utils/utils';
import { SHOW_ELEVATION_GAIN } from '@/utils/const';

import RunRow from './RunRow';
import styles from './style.module.css';

interface IRunTableProperties {
  runs: Activity[];
  locateActivity: (_runIds: RunIds) => void;
  setActivity: (_runs: Activity[]) => void;
  runIndex: number;
  setRunIndex: (_index: number) => void;
}

type SortFunc = (_a: Activity, _b: Activity) => number;

const RunTable = ({
  runs,
  locateActivity,
  setActivity,
  runIndex,
  setRunIndex,
}: IRunTableProperties) => {
  const [sortFuncInfo, setSortFuncInfo] = useState('');

  // Memoize sort functions to prevent recreating them on every render
  const sortFunctions = useMemo(() => {
    const sortKMFunc: SortFunc = (a, b) =>
      sortFuncInfo === '公里' ? a.distance - b.distance : b.distance - a.distance;
    const sortElevationGainFunc: SortFunc = (a, b) =>
      sortFuncInfo === '海拔'
        ? (a.elevation_gain ?? 0) - (b.elevation_gain ?? 0)
        : (b.elevation_gain ?? 0) - (a.elevation_gain ?? 0);
    const sortPaceFunc: SortFunc = (a, b) =>
      sortFuncInfo === '配速'
        ? a.average_speed - b.average_speed
        : b.average_speed - a.average_speed;
    const sortBPMFunc: SortFunc = (a, b) => {
      return sortFuncInfo === '心率'
        ? (a.average_heartrate ?? 0) - (b.average_heartrate ?? 0)
        : (b.average_heartrate ?? 0) - (a.average_heartrate ?? 0);
    };
    const sortRunTimeFunc: SortFunc = (a, b) => {
      const aTotalSeconds = convertMovingTime2Sec(a.moving_time);
      const bTotalSeconds = convertMovingTime2Sec(b.moving_time);
      return sortFuncInfo === '时间'
        ? aTotalSeconds - bTotalSeconds
        : bTotalSeconds - aTotalSeconds;
    };
    const sortDateFuncClick =
      sortFuncInfo === '日期' ? sortDateFunc : sortDateFuncReverse;

    const sortFuncMap = new Map([
      ['公里', sortKMFunc],
      ['海拔', sortElevationGainFunc],
      ['配速', sortPaceFunc],
      ['心率', sortBPMFunc],
      ['时间', sortRunTimeFunc],
      ['日期', sortDateFuncClick],
    ]);

    if (!SHOW_ELEVATION_GAIN) {
      sortFuncMap.delete('海拔');
    }

    return sortFuncMap;
  }, [sortFuncInfo]);

  const handleClick = useCallback<React.MouseEventHandler<HTMLElement>>(
    (e) => {
      const funcName = (e.target as HTMLElement).innerHTML;
      const f = sortFunctions.get(funcName);

      setRunIndex(-1);
      setSortFuncInfo(sortFuncInfo === funcName ? '' : funcName);
      setActivity(runs.sort(f));
    },
    [sortFunctions, sortFuncInfo, runs, setRunIndex, setActivity]
  );

  return (
    <div className={styles.tableContainer}>
      <table className={styles.runTable} cellSpacing="0" cellPadding="0">
        <thead>
          <tr>
            <th />
            {Array.from(sortFunctions.keys()).map((k) => (
              <th key={k} onClick={handleClick}>
                {k}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {runs.map((run, elementIndex) => (
            <RunRow
              key={run.run_id}
              elementIndex={elementIndex}
              locateActivity={locateActivity}
              run={run}
              runIndex={runIndex}
              setRunIndex={setRunIndex}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RunTable;
