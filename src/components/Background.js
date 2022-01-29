import styled from "styled-components"
import theme from "../styles/theme"

const Background = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    color: ${theme.colors.primary[100]};
    background-color: ${theme.colors.primary[200]};
    background-image: url(https://deltime.com.br/wp-content/uploads/2019/03/seguran%C3%A7a-de-datacenters-Deltime.jpg);
    background-repeat: no-repeat;
    background-size: cover;
`

export default Background