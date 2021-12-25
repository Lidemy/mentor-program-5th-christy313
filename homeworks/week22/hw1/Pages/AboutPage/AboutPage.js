import styled from "styled-components";

const AboutWrapper = styled.div`
  margin: 30px auto;
`;
const About = styled.div`
  text-align: center;
  font-size: 20px;
  color: #666;
`;

export default function AboutPage() {
  return (
    <AboutWrapper>
      <About>Hello, this is a SPA blog made with React & React Routers</About>
    </AboutWrapper>
  );
}
