import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>CountDowns | Conteos regresivos online </title>
        <meta
          name="description"
          content="Agrega conteos regresivos desde 1 minuto al futuro hasta que el fin de los tiempos"
        />
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>
      <body className="dark">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
