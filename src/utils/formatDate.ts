import moment from "moment";

const DATE_FORMAT = "MMM D YYYY, h:mm a";
// Convert epoch into real date format
export default (date: number) => moment.unix(date).format(DATE_FORMAT);
