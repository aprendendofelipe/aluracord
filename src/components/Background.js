import theme from "../styles/theme"

const Background = (props) => (
    <div>
      {props.children}  
        <style jsx>{`
            div {
                display: flex;
                flex: 1;
                align-items: center;
                justify-content: center;
                color: ${theme.colors.primary[100]};
                background-color: ${theme.colors.primary[200]};
                background-image: url(${theme.images.background});
                background-repeat: no-repeat;
                background-size: cover;
            }
      `}</style>
    </div>
)

export default Background