function ExtSrvBox(props) {
    return (
      <div className='ExtSrvBox'>
        {props.children}
        <style jsx>{`
          .ExtSrvBox {
            display: grid;
            height: 100%;
            width: 100%;
            margin: 0;
            border: 0;
            border-radius: 5px;
            overflow: hidden;
            grid-template-rows: 1fr auto;
            grid-gap: 4px;
          }
          @media screen and (max-width: 639px) {
            .ExtSrvBox {
              grid-gap: 2px;
            }
          }
      `}</style>
    </div>
  )
}

export default ExtSrvBox