export default (selector, rule) => {

  return Array.from(document.querySelectorAll(selector))

    .reduce((styles, tag, count) => {

      const attr = selector.replace(/\W/g, '')

      const evaluated = rule.replace(
        /eval\( *((".*?")|('.*?')) *\)/g,
        (string, match) =>
          new Function(`return ${match.slice(1, -1)}`).call(tag)
          || ''
      )

      tag.setAttribute(`data-scoped-${attr}`, count)
      styles += `[data-scoped-${attr}="${count}"] { ${evaluated} }\n`
      count++

      return styles

    }, '')

}
