const Room = require('../models/room-mongo')
    , jwt = require('jsonwebtoken')
    , User = require('../models/user-mongo')
    , config = require('../config/cr-config')
    , JWT_KEY = require('../config/cr-config').JWT_KEY;
const kickedUser = {};
module.exports = {
    initRoomList: function*(info,socket,cb){
        let userId = info.token.user
            rooms = [];
        let userRooms = yield User.findOne({_id: info.token.user}).populate({
            path: 'rooms', 
            select: 'histories name avatar bulletin',
            options: { limit: 20 },
            populate: {
                path: 'histories',
                options: { limit: 1, sort: '-_id' },
                populate: {path: 'owner', select: '_id avatar nickname'}
            }
        });
        rooms = userRooms.rooms.map(function(room){
            socket.join(room._id);
            return room;
        });
        cb(rooms);
    },
    initRoomItem: function *(info,cb){
        const room = yield Room.findOne({_id: info._id},'bulletin name avatar');
        if(room){
            return cb({_id: room._id, bulletin: room.bulletin, name: room.name, avatar: room.avatar, histories: []});
        }
        return cb({isError: true, errMsg: 'ERROR1005'});
    },
    loadRoomHistories: function *(info,cb){
        const { _id, limit } = info;
        const timestamp = info.timestamp || Date.now();
        const room = yield Room.findOne({_id: _id},'histories bulletin name avatar').populate({
            path: 'histories',
            match: {timestamp: {'$lt': timestamp}},
            options: {sort:'-_id', limit },
            populate: {path: 'owner', select: '_id avatar nickname'}
        });
        if(room) return cb(room);
        return cb({isError: true, errMsg: 'ERROR1005'});
    },
    createRoom: function *(info,socket,cb) {
        const user = yield User.findOne({_id: info.user});
        const count = yield Room.count({creater: user._id});
        let inviteLink = jwt.sign({ link: Date.now() },JWT_KEY);
            inviteLink = inviteLink.slice(inviteLink.length-20,inviteLink.length);
        if(count >= config.MAX_ROOM) return cb({isError: true,errMsg: 'ERROR10010'});
        if(user){
            const room = new Room({inviteLink, name: info.roomName,creater: user._id, users:[user._id]});
            user.rooms.push(room._id);
            yield user.save();
            yield room.save();
            socket.join(room.name);
            cb({ isOk: true, _id: room._id});
        } else{
            cb({ isError: true, errMsg: 'ERROR10012'});
        }
    },
    
    getRoomInfo: function *(info,cb){
        const room = yield Room.findOne({_id:info._id},'avatar createdAt bulletin name creater').populate({path: 'creater', select: '_id avatar nickname status'});
        if(room){
            cb(room);
        } else{
            cb({ isError: true, errMsg: 'ERROR1005' });
        }
    },
    getInviteLink: function*(info,cb){
        const room = yield Room.findOne({_id:info._id},'avatar name inviteLink creater');
        if(room){
            cb(room);
        } else{
            cb({ isError: true, errMsg: 'ERROR1005' });
        }
    },
    refreshInviteLink: function *(info,cb){
        const room = yield Room.findOne({_id:info._id,creater: info.creater},'avatar name inviteLink');
        if(room){
            let inviteLink = Date.now().toString(36) + Math.random().toString(36).slice(8);
            room.inviteLink = inviteLink;
            const success =  yield room.save();
            cb({inviteLink});
        } else{
            cb({ isError: true, errMsg: 'ERROR1005' });
        }
    },
    updateRoomInfo: function *(info,cb){
        const { _id, creater } = info;
        yield Room.update({_id,creater},{$set: info});
        cb({isOk: true});
    },
    exitRoom: function *(info,socket,cb){
        const user = yield User.findOne({_id: info.user});
        let roomArr = user.rooms || [];
        const index = user.rooms.indexOf(info.room);
        if( index !== -1){
            roomArr.splice(index,1);
            socket.leave(info.room);
            user.rooms = roomArr;
            yield user.save();
        }
        cb({isOk: true});
    },
    kickOutUser: function*(info, socket) {
        console.log('kickOutUser info: ', info);
        const room = yield Room.findOne({_id: info.room}, 'creater');
        console.log(room.creater, info.token.user == room.creater);
        if(info.token.user == room.creater) {
            console.log('kickOutUser !!!! ');
           if( !kickedUser[info.kicked]) kickedUser[info.kicked] = [];
           kickedUser[info.kicked].push(info.room);
            socket.broadcast.to(info.kicked).emit('kickOutUser', {
                room: info.room,
                user: info.kicked
            });
        }
    },
    joinRoom: function *(info,socket,cb) {
        const user = yield User.findOne({_id: info.user});
        const room = yield Room.findOne({inviteLink: info.inviteLink});
        console.log('kickedUser[user._id]: ', kickedUser[user._id]);
        console.log('room._id: ', room._id);
        console.log('index: ', kickedUser[user._id].indexOf(room._id));
        if(kickedUser[user._id] && kickedUser[user._id].indexOf(`${room._id}`) > -1) {
            console.log(kickedUser[user._id]);
            return cb({ isError: true, errMsg: 'ERROR1005'});
        }
        if(room && user.rooms.indexOf(room._id) !== -1){
            return cb({ isOk: true, _id: room._id});
        } else if(room && user){
            user.rooms.push(room._id);
            room.users.push(user._id);
            yield room.save();
            yield user.save();
            socket.join(room.name)
            cb({ isOk: true,_id: room._id});
        } else {
            return cb({ isError: true, errMsg: 'ERROR1005'})
        }
    },
    getRoomUsers: function *(info,cb){
        let userInfo = {}
        if(info.nickname.trim()!=='') {
            userInfo.nickname = new RegExp(info.nickname,'i');
        }
        if(info.onlineState) {
            userInfo.onlineState = info.onlineState;
        }
        const room = yield Room.findOne({_id: info.room}).populate({
            path: 'users', 
            options: {limit: 20, sort: '-lastOnlineTime'},
            match: userInfo,
            select: '_id avatar nickname status onlineState device'
        })
        cb(room.users);
    }
}