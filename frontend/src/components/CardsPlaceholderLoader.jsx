import React from "react"
import ContentLoader from "react-content-loader"

const CardLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={300}
    height={528}
    viewBox="0 0 300 528"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    {/* Título */}
    <rect x="0" y="10" rx="4" ry="4" width="250" height="20" />

    {/* Imagen */}
    <rect x="0" y="58" rx="4" ry="4" width="300" height="300" />

    {/* Descripción */}
    <rect x="0" y="390" rx="4" ry="4" width="300" height="15" />
    <rect x="0" y="410" rx="4" ry="4" width="300" height="15" />
    <rect x="0" y="430" rx="4" ry="4" width="300" height="15" />

    {/* Botón */}
    <rect x="90" y="485" rx="4" ry="4" width="120" height="40" />
  </ContentLoader>
)

export default CardLoader