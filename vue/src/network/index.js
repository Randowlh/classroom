import {request} from "./request";

export function getNotices() {
    return request({
        method: 'post',
        url: '/notice/get/list',
        data: {
            "currentPage": 1,
            "pageSize": 10,
            "title": ""
        }
    })
}

export function getClass() {
    return request({
        method: 'put',
        url: '/admin/class/find/list',
        data: {
            "currentPage": 1,
            "pageSize": 10,
            "title": ""
        }
    })
}

export function getClassById(id) {
    return request({
        method: 'get',
        url: '/seat/get/list/' + id
    })
}

export function checkedSeat(data) {
    return request({
        method: 'post',
        url: '/class-user/check',
        data: {
            "classId": data.cid,
            "seatNum": data.sid
        }
    })
}

export function getClassroom() {
    //let param = new URLSearchParams();
    return request({
        method: 'get',
        url: '/classrooms/overview',
    })
}

export function updateClassroomInfo(cid, start_time, end_time) {
    let param = new URLSearchParams();
    param.append('cid', cid);
    param.append('start_time', start_time);
    param.append('end_time', end_time);
    return request({
        method: 'post',
        url: '/classrooms/modify_time',
        data: param
    })    
}

export function getClassroomById(id) {
    return request({
        method: 'get',
        url: '/classrooms/detail/?cid=' + id
    })
}

export function getCurSeatDataById(id) {
    return  request({
        method: 'get',
        url: '/seats/detail/?sid=' + id
    })
}

export function getUserInfoById(id) {
    return request({
        method: 'get',
        url: '/students/detail/?uid=' + id
    })
}

export function submitOrder(uid, sid, start_time, end_time) {
    let param = new URLSearchParams();
    param.append('uid', uid);
    param.append('sid', sid);
    param.append('start_time', start_time);
    param.append('end_time', end_time)
    return request({
        method: 'post',
        url: '/students/preserve',
        data: param
    })
}

export function singInByPid(pid) {
    let param = new URLSearchParams();
    param.append('pid', pid);
    return request({
        method: 'post',
        url: '/preserve/check_in',
        data: param
    })
}

export function cancelByPid(pid) {
    let param = new URLSearchParams();
    param.append('pid', pid);
    return request({
        method: 'post',
        url: '/preserve/cancel',
        data: param
    })
}