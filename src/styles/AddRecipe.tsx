import styled from 'styled-components'

export const Form =  styled.form`
    boarder: 2px black solid;
    background: white;
    width: 80vw;
    margin: 10px auto;
    opcaity: 0.7;
    padding: 10px;
    border-radius: 15px;
    @media (min-width: 768px) {
        width: 30vw;
      }
    `

type IInput = {
    size?: number
}
const handleSize= (size: number | undefined) => {
    if(size) return "80%"
    else return `${size}%`
  };

export const Input =  styled.input<IInput>`
    background: rgba(255,255,255,.1);
    border: none;
    border-radius: 4px;
    font-size: 15px;
    padding: 10px;
    width: ${props => handleSize(props.size)};
    background-color: #e8eeef;
    color:#333;
    margin: 10px;
`

export const TextArea =  styled.textarea<IInput>`
    background: rgba(255,255,255,.1);
    border: none;
    border-radius: 4px;
    font-size: 15px;
    padding: 10px;
    width: 80%;
    background-color: #e8eeef;
    color:#333;
    margin: 10px;
    resize: none;
    height: 10vh;
    overflow: auto;
`

export const InputField = styled.div`

    margin: 10px;
`

export const ButtonField = styled.div`
      display:flex;
      margin: 0 auto;
      width: 30%;
      justify-content: space-around;
      align-item: center;
`