
function validateName (name) {
  console.log('NAME - ', name)
  const safeName = String(name).trim().replaceAll(/[^A-Z,a-z,0-9,\s]/g, '')
  console.log('SAFENAME - ', safeName)
  return safeName.length < 20 ? safeName : new Error('Name too long')
}

module.exports = validateName
