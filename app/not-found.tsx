export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "black",
        color: "white",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <h1>404 - Página não encontrada</h1>
      <p>A página que você está procurando não existe.</p>
      <a href="/" style={{ color: "#a67e62", textDecoration: "underline" }}>
        Voltar para a página inicial
      </a>
    </div>
  )
}
