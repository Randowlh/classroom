import {request} from "./request";


export function Managerlogin(form) {
    let param = new URLSearchParams();
    param.append('username', form.username);
    param.append('passwd', form.passwd);
    return request({
        method: 'post',
        url: '/login/admin',
        data: param
    })
}

export function Studentlogin(form) {
    let param = new URLSearchParams();
    param.append('username', form.username);
    param.append('passwd', form.passwd);
    return request({
        method: 'post',
        url: '/login/student',
        data: param
    })
}

export function register(form) {
    let param = new URLSearchParams();
    param.append('username', form.username);
    param.append('passwd', form.passwd);
    param.append('name', form.name);
    param.append('email', form.email);
    return request({
        method: 'post',
        url: '/sign_up/student',
        data: param
    })
}

// export function logout() {
//     return request({
//         method: 'get',
//         url: '/user/logout'
//     })
// }

// export function getUserInfo() {
//     return request({
//         method: 'get',
//         url: '/user/find/current/info'
//     })
// }