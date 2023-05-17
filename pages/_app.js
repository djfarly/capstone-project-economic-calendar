import useSWR from "swr";
import GlobalStyle from "../styles";
import { useEffect, useState } from "react";
import useLocalStorageState from "use-local-storage-state";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function App({ Component, pageProps }) {
  const [newsEvents, setNewsEvents] = useState([]);
  const [alarmEvents, setAlarmEvents] = useLocalStorageState("events", {
    defaultValue: [],
  });
  const { data: events } = useSWR("/api/fetchThisWeek", fetcher);

  useEffect(() => {
    // update events array with alarm info
    if (events) {
      const updatedEventsArray = events.map((event) => {
        const updatedEvent = alarmEvents.find((alarm) => alarm.id === event.id);
        if (updatedEvent) {
          return { ...event, alarm: updatedEvent.alarm };
        }
        return event;
      });
      setNewsEvents(updatedEventsArray);
    }
  }, [events, alarmEvents]);

  function handleToggleAlarm(id) {
    const updatedEvents = newsEvents.map((event) => {
      if (event.id === id) {
        return { ...event, alarm: !event.alarm };
      }
      return event;
    });
    setAlarmEvents(updatedEvents);
    setNewsEvents(updatedEvents);
  }
  return (
    <>
      <GlobalStyle />
      <Component
        {...pageProps}
        events={newsEvents ?? []}
        onToggleAlarm={handleToggleAlarm}
      />
    </>
  );
}
