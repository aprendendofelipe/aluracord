import theme from "../styles/theme"

function HeaderBox(props) {
  return (
    <div className='HeaderBox'>
      {props.children}
      <style jsx>{`
        .HeaderBox {
          display: flex;
          width: 100%;
          margin-bottom: 8px;
          align-items: center;
          justify-content: space-between;
          color: ${theme.colors.primary[100]};
        }
      `}</style>
    </div>
  )
}

export default HeaderBox

