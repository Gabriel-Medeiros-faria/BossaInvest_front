export default function useUser(){
    // Crio a variável user e salvo as informações do usuário que estão dentro do JSON.parse(localStorage.getItem('user')); retorná-la
    // Assim podendo ser utilizada em todo código quando chamar a função useUser()
    const user = JSON.parse(localStorage.getItem('user'));
    return user
}