import { comp, html } from 'hypersimple'

export const Message = comp(model => html`
  <li>${model.author} ✒️ ${model.message}</li>
`
)

export const Messages = comp(model => html`
  ${model.map(value => Message(value))}
`
)
