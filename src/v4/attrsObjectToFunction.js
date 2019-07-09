export default function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  const attrCalls = root.find(j.CallExpression, {
    callee: {
      property: {
        name: 'attrs',
      },
    },
  });

  attrCalls.forEach(p => {
    const firstArg = p.value.arguments[0];
    if (firstArg.type === 'ObjectExpression') {
      const objArg = p.value.arguments.pop();
      p.value.arguments.push(j.arrowFunctionExpression([], objArg));
    }
  });
  return root.toSource();
}
