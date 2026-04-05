function genEmail(username:string){
    const w=username.split('_')
    let email=''
    for (let i=0; i<w.length; i++){
        email+=w[i].charAt(0).toLowerCase()
    }
    return email+'@gmail.com'
}

export {genEmail}