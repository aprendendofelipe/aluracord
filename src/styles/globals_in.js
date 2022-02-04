import theme from './theme'

function GlobalStyleJS() {
    return (
        <style global jsx>{`
            a {
                color: ${theme.colors.primary['050']}
            }
            a:hover {
                color: ${theme.colors.primary['200']}
            }
            ::-webkit-scrollbar-thumb {
                background-color: ${theme.colors.neutrals[500]};
            }
        `}</style>
    )
}

export default GlobalStyleJS
