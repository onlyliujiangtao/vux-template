import Mock from 'mockjs';
import {User} from './data'

Mock.mock('/memberList', "post", request => {
  let body = JSON.parse(request.body);
  return body;
})

Mock.mock('/post', "post", request => {
    let body = JSON.parse(request.body);
    return '{aa:123,bb:43234}';
})

Mock.mock('/login', "post", request => {
    let body = JSON.parse(request.body);
    return User;
})