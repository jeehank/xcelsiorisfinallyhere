function genEmail(username:string){
    const w=username.split(' ')
    let email=''
    for (let i=0; i<w.length; i++){
        email+=w[i].toLowerCase()
    }
    return email+'@gmail.com'
}

export {genEmail}