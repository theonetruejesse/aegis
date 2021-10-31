export function getNodeProperty(node, property) {
  let temp;
  node.once((n) => (temp = n[property]));
  console.log(temp);
  return temp;
}

export function getNodePut(node) {
  let temp;
  node.once((n) => {
    console.log(n);
    temp = n;
  });
  return temp;
}

export function filterNodeProperties(node, property, filter, getProperty) {
  let temp = [];
  node
    .map((n) => {
      if (n[property] === filter) {
        return n;
      }
    })
    .once((n) => temp.push(n[getProperty]));
  console.log(temp);
  return temp;
}

export function getValNode(node) {
  let n = node.val();
  console.log("getValueNode")
  console.log(n);
}

export function getAllNodes(node, data) {
  let temp = [];
  node.map().on((n) => {
    temp.push(n[data]);
  });
  // console.log("getAllNodes():")
  // console.log(temp);
  return temp;
}

export function getAllNodeProperties(node, property) {
  let temp = [];
  node.map().once((n) => temp.push(n[property]));
  // console.log(property, temp)
  return temp;
}
