mixin('scoped', ['selector', 'rule'],
  returnValue('Array.from(document.querySelectorAll(selector))',
    reduceFunc(
      createAttribute(['selector'],
        prelude('      const evaluated = rule.replace(\n\
       /eval\\( *((".*?")|(\'.*?\')) *\\)/g,\n\
       (string, match) =>\n\
         new Function(`return ${match.slice(1, -1)}`).call(tag)\n\
         || \'\'\n\
     )\n\n',
          addAttribute('tag', 'scoped',
            addRule('', '', 'scoped', '${evaluated}')))))))
