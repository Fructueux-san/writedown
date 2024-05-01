const dateFormatter = new Intl.DateTimeFormat('en-US', {
  dateStyle: "short",
  timeStyle: "short",
  timeZone: "UTC"
});

export const formatDateFromMs = (ms) => dateFormatter.format(ms);
