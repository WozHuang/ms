import fnclient from './fnclient'

export default function (Adapter) {
  let client = fnclient(Adapter)
  let $ = function (name = 'ms-ws-client') {
    let app = this
    app.clientModules.ws = client
    app.clientModules.wss = client

    return {
      name: name,
      unuse: () => {
        delete app.clientModules.ws
        delete app.clientModules.wss
      }
    }
  }

  if (typeof global !== 'undefined' && global) {
    global.jm || (global.jm = {})
    let jm = global.jm
    if (jm.ms) {
      jm.ms.root.use($)
    }
  }

  $.client = client
  return $
}
