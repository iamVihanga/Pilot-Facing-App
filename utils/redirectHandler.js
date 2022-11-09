const redirectHandler = (router) => {
    if (typeof window !== 'undefined') {
        const localDataLength = JSON.parse(localStorage.length);
        
        if (localDataLength !== 0) {
          router.push('/dashboard')
        } else {
          router.push('/auth/login')
        }
      }
}

export default redirectHandler