interface LaunchStats {
  failureLaunches: number;
  successLaunches: number;
  launchCountByName: { _id: string; count: number }[];
  launchCountByDate: {
    count: number;
    _id: {
      month: number;
      year: number;
      name: string;
    };
  }[];
}

export default LaunchStats;
