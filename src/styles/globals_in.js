import theme from './theme'

function GlobalStyleJS() {
    return (
        <style global jsx>{`
            ::-webkit-scrollbar-thumb {
                background-color: ${theme.colors.neutrals[500]};
            }
        `}</style>
    )
}

export default GlobalStyleJS
