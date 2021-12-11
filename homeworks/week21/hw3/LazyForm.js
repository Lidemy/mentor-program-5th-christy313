import styled from "styled-components";
import { useState, useCallback } from "react";

const Wrapper = styled.div`
  min-width: 800px;
  width: 100%;
  background: #b2b2b2;
  padding: 100px 0;
`;

const Application = styled.form`
  box-shadow: 0.8px 2.4px 5px rgba(0, 0, 0, 0.3);

  border-top: 10px solid #fad312;
  border-radius: 2px;
  background: white;

  max-width: 400px;
  width: 100%;
  max-height: 1100px;
  height: 100%;

  text-algin: center;

  margin: 0 auto;
  padding: 55px 300px 55px 40px;
`;

const Title = styled.h1`
  font-size: 36px;
`;

const Detail = styled.div`
  line-height: 24px;
  font-size: 14px;
`;

const Notice = styled.div`
  color: #e74149;
  font-size: 16px;
  margin-top: 20px;
`;

const Block = styled.div`
  margin-top: 20px;
`;

const Subtitle = styled.div`
  &:after {
    color: #e74149;
    content: " *";
  }
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 280px;
  height: 25px;
  border-radius: 3px;
`;

const RegisterRadio = styled.input``;

const RegisterLabel = styled.label`
  line-height: 18px;
  font-size: 14px;
  margin: 15px 8px 0px 0px;
  display: flex;
  align-items: baseline;
`;

const Advice = styled.div`
  margin-bottom: 20px;
`;

const Idea = styled.div`
  font-size: 14px;
  margin-top: 5px;
`;

const SubmitButton = styled.button`
  background: #fad312;
  margin-top: 25px;
  border-style: none;
  padding: 10px 30px;
  border-radius: 3px;
  cursor: pointer;
  &:hover {
    background: #4f772d;
    color: white;
  }
`;

const Warning = styled.div`
  margin-top: 20px;
`;

const Error = styled.div`
  color: #e74149;
  font-size: 12px;
  margin-top: 8px;
  visibility: ${(props) => (props.$hasError ? "visible" : "hidden")};
`;

const Footer = styled.div`
  background: black;
  color: #999;
  height: 20px;
  text-align: center;
  margin: 0 auto;
  padding: 20px;
  font-size: 14px;
  min-width: 760px;
  width: 100%;
`;

export default function LazyForm() {
  const errorMessage = "哎呀，是不是忘了什麼";

  const [name, setName] = useState({ content: "", hasError: false });
  const [email, setEmail] = useState({ content: "", hasError: false });
  const [phone, setPhone] = useState({ content: "", hasError: false });
  const [type, setType] = useState({ id: "", hasError: false });
  const [news, setNews] = useState({ content: "", hasError: false });
  const [other, setOther] = useState({ content: "" });

  const handleSubmitClick = useCallback(
    (e) => {
      e.preventDefault();

      if (!name.content) {
        setName({ ...name, hasError: true });
      }

      if (!email.content) {
        setEmail({ ...email, hasError: true });
      }

      if (!phone.content) {
        setPhone({ ...phone, hasError: true });
      }

      if (!type.id) {
        setType({ ...type, hasError: true });
      }

      if (!news.content) {
        setNews({ ...news, hasError: true });
      }

      if (
        name.content &&
        email.content &&
        phone.content &&
        type.id &&
        news.content
      ) {
        const data = {
          暱稱: name.content,
          email: email.content,
          phone: phone.content,
          報名類型: type.id,
          消息來源: news.content,
          其他: other.content,
        };

        alert("感謝參與活動，以下為您填寫的資訊：" + JSON.stringify(data));
        window.location.reload();
      }
    },
    [name, email, phone, type, news, other]
  );
  return (
    <>
      <Wrapper>
        <Application onSubmit={handleSubmitClick}>
          <Title>新拖延運動報名表單</Title>
          <Detail>
            活動日期：2021/12/10 ~ 2021/12/11
            <br />
            活動地點：台北市大安區新生南路二段1號
          </Detail>
          <Notice>* 必填</Notice>
          <Block>
            <Subtitle>暱稱</Subtitle>
            <Input
              onChange={(e) => {
                setName({ content: e.target.value, hasError: false });
              }}
              value={name.content}
              type="text"
              placeholder="您的回答"
            ></Input>
            <Error $hasError={name.hasError}>{errorMessage}</Error>
          </Block>
          <Block>
            <Subtitle>電子郵件</Subtitle>
            <Input
              onChange={(e) => {
                setEmail({ content: e.target.value, hasError: false });
              }}
              value={email.content}
              type="email"
              placeholder="您的電子郵件"
            ></Input>
            <Error $hasError={email.hasError}>{errorMessage}</Error>
          </Block>
          <Block>
            <Subtitle>手機號碼</Subtitle>
            <Input
              onChange={(e) => {
                setPhone({ content: e.target.value, hasError: false });
              }}
              value={phone.content}
              type="number"
              placeholder="您的手機號碼"
            ></Input>
            <Error $hasError={phone.hasError}>{errorMessage}</Error>
          </Block>
          <Block>
            <Subtitle>報名類型</Subtitle>
            <RegisterLabel>
              <RegisterRadio
                onClick={(e) => {
                  setType({ id: e.target.id, hasError: false });
                }}
                id="躺在床上用想像力實作"
                type="radio"
                name="radio"
              />
              躺在床上用想像力實作
            </RegisterLabel>
            <RegisterLabel>
              <RegisterRadio
                onClick={(e) => {
                  setType({ id: e.target.id, hasError: false });
                }}
                id="趴在地上滑手機找現成的"
                type="radio"
                name="radio"
              />
              趴在地上滑手機找現成的
            </RegisterLabel>
            <Error $hasError={type.hasError}>{errorMessage}</Error>
          </Block>
          <Block>
            <Subtitle>怎麼知道這個活動的？</Subtitle>
            <Input
              onChange={(e) => {
                setNews({ content: e.target.value, hasError: false });
              }}
              value={news.content}
              type="text"
              placeholder="您的回答"
            ></Input>
            <Error $hasError={news.hasError}>{errorMessage}</Error>
          </Block>
          <Block>
            <Advice>
              其他<Idea>對活動的一些建議</Idea>
            </Advice>
            <Input
              onChange={(e) => {
                setOther({ content: e.target.value });
              }}
              value={other.content}
              type="text"
              placeholder="您的回答"
            ></Input>
          </Block>
          <SubmitButton>提交</SubmitButton>
          <Warning>請勿透過表單送出您的密碼。</Warning>
        </Application>
      </Wrapper>
      <Footer>© 2021 © Copyright. All rights Reserved.</Footer>
    </>
  );
}
