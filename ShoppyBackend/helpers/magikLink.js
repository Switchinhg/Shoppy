export function MagikLink() {
    let linkObjeto = {}
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    let counter = 0
    while (counter < 20) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
      counter += 1
    }

    linkObjeto.url = result
    linkObjeto.expiracion= Date.now()+(5*60*1000)
    


    return linkObjeto;
}

