import { ServerStyleSheets } from "@material-ui/core/styles";
import Document, { Html, Main, Head, NextScript } from "next/document";
import React from "react";

export default class MyDocument extends Document {
    render(){
        return (
            <Html lang="en">
                <Head>
                  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" /> 
                  {/* </link><link rel="stylesheet" href="https://fonts.google.com/css?family=Roboto:300,400,500,700&display=swap" /> */}
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

MyDocument.getInitialProps = async (ctx) => {
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;
    ctx.renderPage = () => {
      return originalRenderPage({
        enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
      });
    };
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: [
        ...React.Children.toArray(initialProps.styles),
        sheets.getStyleElement(),
      ],
    };
}