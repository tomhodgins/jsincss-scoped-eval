export default (selector, rule) => {

  let styles = ''
  let count = 0

  document.querySelectorAll(selector).forEach(tag => {

    const attr = selector.replace(/\W/g, '')
    const evaluated =
      rule.replace(/eval\( *((".*?")|('.*?')) *\)/g, (string, match) =>
        new Function(`return ${match.slice(1, -1)}`).call(tag) || ''
      )

    tag.setAttribute(`data-scoped-${attr}`, count)
    styles += `[data-scoped-${attr}="${count}"] { ${evaluated} }\n`
    count++

  })

  return styles

}