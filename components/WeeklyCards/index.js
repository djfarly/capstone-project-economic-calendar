import styled from "styled-components";
import WeeklyCard from "../WeeklyCard";
import { uid } from "uid";
const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 20px;
  padding-top: 0;
  list-style: none;
`;
const StyledDateHeading = styled.h4`
  padding-left: 20px;
`;

export default function WeeklyCards({ events }) {
  return (
    <>
      <StyledDateHeading>
        {events[0].weekday} {events[0].date}
      </StyledDateHeading>
      <StyledList>
        {events.map((event) => {
          return <WeeklyCard key={uid()} event={event}></WeeklyCard>;
        })}
      </StyledList>
    </>
  );
}
