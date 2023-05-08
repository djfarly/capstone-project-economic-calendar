import styled from "styled-components";
const StyledLi = styled.li`
  font-size: 0.6rem;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr 1fr;
`;
export default function WeeklyCard({ event }) {
  return (
    <StyledLi>
      <p>{event.time}</p>
      <p>{event.title}</p>
      <p>
        {event.country}
        {event.flag}
      </p>
      <p>{event.impact}</p>
    </StyledLi>
  );
}
