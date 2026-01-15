export const signup = (req, res) => {
    const data = req.body;
    console.log(data);
    res.send('signup')
}

export const login = (req, res) => {
    res.send('login')
}

export const logout = (req, res) => {
    res.send('logout')
}

export const forgotPassword = (req, res) => {
    res.send('forgot-password')
}

export const resetPassword = (req, res) => {
    res.send('reset-password')
}