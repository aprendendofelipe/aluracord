function GlobalStyle() {
    return (
        <style global jsx>{`
            html,
            body {
                padding: 0;
                margin: 0;
                font-family: Roboto, 'Open Sans', sans-serif;
            }
            a {
                color: inherit;
                text-decoration: none;
            }
            * {
                box-sizing: border-box;
                list-style: none;
            }
            html, body, #__next {
                min-height: 100vh;
                display: flex;
                flex: 1;
            }
            #__next {
                flex: 1;
            }
            #__next > * {
                flex: 1;
            }
        
            `}</style>
    );
}

export default GlobalStyle
