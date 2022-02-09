import styled from "styled-components";

type ISize = {
  size: string;
};

export const ContainerRecipe = styled.div<ISize>`
  flex: 0 0 33.3333%;
  margin: 0 15px;
  boarder: 1px black solid;
  background: white;
  min-width: 20vw;
  width: ${(props) => (props.size === "large" ? "30vw" : "15vw")};
  height: ${(props) => (props.size === "large" ? "30vh" : "40vh")};
  overflow-y: auto;
  opcaity: 0.7;
  padding: ${(props) => (props.size === "large" ? "2% 5%" : "0 2%")};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: box-shadow 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
  @media (max-width: 768px) {
    width: 70vw;
  }
  h4,
  p {
    text-align: left;
    margin-top: 0;
    margin-bottom: 20px;
    font-size: ${(props) => (props.size === "large" ? "1.4rem" : "1.1rem")};
  }
  p,
  div {
    text-align: left;
    font-size: ${(props) => (props.size === "large" ? "1.3rem" : "1rem")};
  }
`;

export const Field = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 30px 15px;
  div {
    width: 40%;
  }
  p {
    word-break: break-all;
    white-space: normal;
  }
`;

type IButton = {
  color: string;
};

const handleColorType = (color: string) => {
  switch (color) {
    case "primary":
      return "#03a9f3";
    case "danger":
      return "#f56342";
    default:
      return "#fff";
  }
};

export const Button = styled.button<IButton>`
  color: white;
  background-color: ${(props) => handleColorType(props.color)};
  border-radius: 15px;
  padding: 10px 20px;
  border: none;
  font-size: 1.3rem;
  margin: 10px;
`;

export const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 90vw;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

type IStatus = {
  status: string;
};

const handleStatus = (color: string) => {
  switch (color) {
    case "success":
      return "#4bbf56";
    case "failure":
      return "#f56342";
    case "warning":
      return "#FEC901";
    default:
      return "#fff";
  }
};

export const Status = styled.div<IStatus>`
  background-color: ${(props) => handleStatus(props.status)};
  color: white;
  width: 20%;
  boarder: 2px white solid;
  margin: 40px auto;
  padding: 15px;
`;

export const DetailsContainer = styled.div`
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
