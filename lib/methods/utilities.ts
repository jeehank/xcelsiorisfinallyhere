function genEmail(username:string){
    const w=username.split('_')
    let email=''
    for (let i=0; i<w.length; i++){
        email+=w[i].toLowerCase()
    }
    return email+'@gmail.com'
}

function sanitizeUsername(username:string){
    return username.replace(/\s+/g, ' ').trim().replace(/\s/g, '_')
}

function desanitizeUsername(username: string): string {
    // 1. Replace underscores with spaces
    // 2. Capitalize the first letter of each word (Optional, but looks better)
    return username.replace(/_/g, ' ').trim();
}

export {genEmail, sanitizeUsername, desanitizeUsername}