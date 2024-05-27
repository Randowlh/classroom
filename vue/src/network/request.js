import axios from "axios";
import JSONbig from 'json-bigint'
import self from '../main'

export function request(config) {
  const instance = axios.create({
    // baseURL: 'http://192.168.195.128:5000',
    baseURL: 'http://47.120.11.116:5000',
    //baseURL: 'https://www.fastmock.site/mock/9efa7db63d99e8c92195ce24873c711a/api',
    timeout: 10000,
    transformResponse: [function (data) {
      // Do whatever you want to transform the data
      return JSONbig.parse(data)
    }],
  })

  // //请求拦截器
  // instance.interceptors.request.use(config => {
  //   config.headers.satoken = localStorage.getItem("token")
  //   return config
  // },error => {
  //   console.log(error);
  // })

  // //响应拦截器
  // instance.interceptors.response.use(res => {
  //   if (res.data.code === 5002){
  //     self.$message.error('请先登录账号');
  //     self.$router.push("/login")
  //   }else if (res.data.code === 5001){
  //     self.$message.error('token无效，请重新登录');
  //     self.$router.push("/login")
  //   }
  //   return res.data
  //   // return res.data
  // },error => {
  //   console.log(error);
  // })

  //发送真正的网络请求
  return instance(config)

}
