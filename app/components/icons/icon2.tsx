import * as React from "react"
import { SVGProps } from "react"

const SvgComponent2 = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={240}
    height={269}
    fill="none"
    {...props}
  >
    <path
      fill="#EE3C36"
      d="M30.802.186H.666v268.628h30.136V.186ZM120.665.186H90.529v268.628h30.136V.186ZM180.96.186h-30.136v268.628h30.136V.186ZM239.748.186h-30.137v268.628h30.137V.186Z"
    />
  </svg>
)
export default SvgComponent2
