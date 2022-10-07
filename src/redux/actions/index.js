
const setLocalStorage = (param) => {
    localStorage.setItem('token', param.token);
};

export const fetchAPI = () => async () => {
    try {
        const tokenRequest = 'https://opentdb.com/api_token.php?command=request'
        const request = await fetch(tokenRequest);
        const resposta = await request.json();
        console.log(resposta);
        setLocalStorage(resposta);
    } catch (error) {
        
    }
}