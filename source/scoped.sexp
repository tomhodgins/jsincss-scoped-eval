mixin('scoped', ['selector', 'rule'],
  returnValue('Array.from(document.querySelectorAll(selector))',
    reduceFunc(
      prelude('      const evaluated =\n\
        rule.replace(/eval\\( *((".*?")|(\'.*?\')) *\\)/g, (string, match) =>\n\
          new Function(`return ${match.slice(1, -1)}`).call(tag) || \'\'\n\
        )\n\n',
        createAttribute(['selector'],
          addAttribute('tag', 'scoped',
            addRule('', '', 'scoped', '${evaluated}')))))))
