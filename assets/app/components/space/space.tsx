import * as React from 'react'

export default ({ num = 1 }) => <span>{Array(num).fill(0).map((n, i) => <span key={i}>&nbsp;</span>)}</span>
