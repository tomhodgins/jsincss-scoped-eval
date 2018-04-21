export default (selector, rule) => {

  return Array.from(document.querySelectorAll(selector))

    .reduce((styles, tag, count) => {

      const evaluated =
         rule.replace(/eval\( *((".*?")|('.*?')) *\)/g, (string, match) =>
           new Function(`return ${match.slice(1, -1)}`).call(tag) || ''
         )

      const attr = selector.replace(/\W/g, '')

      tag.setAttribute(`data-scoped-${attr}`, count)
      styles += `[data-scoped-${attr}="${count}"] { ${evaluated} }\n`
      count++

      return styles

    }, '')

}
