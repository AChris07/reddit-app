import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default {
  getRelativeDate(timestamp: number): string {
    return dayjs.unix(timestamp).fromNow();
  },
};
