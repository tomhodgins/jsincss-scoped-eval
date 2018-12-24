export default (selector, rule) => {
  const attr = selector.replace(/\W/g, '')
  const result = Array.from(document.querySelectorAll(selector))
    .reduce((output, tag, count) => {
      const evaluated = rule.replace(
        /eval\( *((".*?")|('.*?')) *\)/g,
        (string, match) =>
          new Function(`return ${match.slice(1, -1)}`).call(tag)
          || ''
      )
      output.add.push({tag: tag, count: count})
      output.styles.push(`[data-scoped-${attr}="${count}"] { ${evaluated} }`)
      return output
    }, {add: [], remove: [], styles: []})
  result.add.forEach(tag => tag.tag.setAttribute(`data-scoped-${attr}`, tag.count))
  result.remove.forEach(tag => tag.setAttribute(`data-scoped-${attr}`, ''))
  return result.styles.join('\n')
}
