import styled from "styled-components"
import theme from "../styles/theme"

const HeaderBox = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 8px;
  align-items: center;
  justify-content: space-between;
  color: ${theme.colors.primary[100]};
`

export default HeaderBox