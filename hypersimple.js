import {comp, html, render} from 'hypersimple'

// components
const Button = comp(model => html`
  <button onclick=${model.onclick}>
    ${model.text}
  </button>
`)

// main App: just like any component
const App = comp(model => html`
  Lorem ipsum: ${model.count}
  <br>
  ${Button(model.button)}
`)

// model: it will be mutated to trigger updates on changes
const model = {
  count: 0,
  button: {
    text: 'increment',
    onclick() {
      // will update the view right away
      model.count += 1
    }
  }
}

// render
render(document.body, () => App(model))
