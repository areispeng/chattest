import store from '../store/index.js'
let language = store.getState().getIn(['pageUI','language']);
let regZH = /zh/i,
    regEN = /en/i;
if(regZH.test(language)){
    module.exports = {
        ERROR1000: '服务器开了个小差',
        ERROR1001: 'token解析失败',
        ERROR1002: '用户已存在',
        ERROR1003: '用户不存在',
        ERROR1004: '密码错误',
        ERROR1005: '房间不存在',
        ERROR1006: '文件类型错误',
        ERROR1007: '文件过大',
        ERROR1008: '文件读取失败',
        ERROR1009: '文件上传失败',
        ERROR10010: '超出限制，用户最多能创建3个房间',
        ERROR10011: '成功创建房间',
        ERROR10012: '该房间已存在',
        ERROR10013: '权限不足',
        ERROR10014: '昵称被占用',
        ERROR10015: '账号在其他设备登录!!!',
        ERROR10016: '撤回失败，超出两分钟',
        
        email: '邮箱',
        nickname: '昵称',
        password: '密码',
        Login: '登录',
        SignUp: '注册',
        inputAreaPlaceholder: '输入消息，使用⌃/⌘ + enter输入表情',
        blockAreaPlaceholder: '无法发送消息',
        emoji: '表情包',
        send: '发送',
        group: '群组',
        private: '私聊',
        AM: '上午',
        PM: '下午',
        conversation: '新建对话',
        startConv: '开始对话',
        userProfile: '用户资料',
        status: '状态',
        userProfileTran: '用户名对其他用户可见',
        groupInfo: '群组信息',
        bulletin: '公告',
        participants: '成员',
        addPart: '添加成员',
        inviteLink: '邀请链接',
        contactInfo: '对话信息',
        newGroup: '创建群组',
        success: '操作成功',
        inviteTitle: '邀请链接',
        inviteLinkDisabled: '链接失效',
        joinRoomSuccess: '成功加入房间',
        logout: '登出',
        sendInviteLink: '发送邀请链接',
        sendInviteLinkByNami: '使用 nami 发送链接',
        copyLink: '复制链接',
        refreshLink: '更新链接',
        copiedLink: '链接已复制到剪贴板',
        linkTran: '任何人都能通过邀请链接加入房间.',
        newContact: '新建对话',
        participants: '群组成员',
        search: '搜索...',
        menu: '菜单',
        attach: '附件',
        addExpression: '成功添加表情',
        exitGroup: '退出房间',
        kickOut: '踢出房间',
        deleteContact: '删除对话',
        blockContact: '屏蔽对话',
        blockTran: '屏蔽用户之后，你将无法收到用户私聊你的消息',
        removeBlock: '解除屏蔽',
        setting: '设置',
        notifications: '提醒设置',
        help: '帮助',
        desktopAlerts: '桌面弹窗',
        showDesktopPreviews: '桌面弹窗消息预览',
        showMessagePreviews: '消息预览',
        showImages: '显示图片消息',
        showExpressions: '快捷输入表情',
        searchInput: '搜索或开始新的对话',
        withdrawn: '撤回',
        sendMessage: '发送消息',
        disabledPrivate: '屏蔽私聊消息',
        offline: '网络故障，重新连接中...',
        
    }
}else{
    module.exports = {
        ERROR1000: 'Server error',
        ERROR1001: 'Token parsing failed',
        ERROR1002: 'User already exists',
        ERROR1003: 'User doesn‘t exist',
        ERROR1004: 'Password error',
        ERROR1005: 'Room doesn‘t exist',
        ERROR1006: 'File type error',
        ERROR1007: 'The file is too large',
        ERROR1008: 'File read error',
        ERROR1009: 'File upload error',
        ERROR10010: '超出限制，用户最多能创建3个房间',
        ERROR10011: '成功创建房间',
        ERROR10012: '该房间已存在',
        ERROR10013: 'Insufficient permissions',
        ERROR10014: '昵称被占用',
        ERROR10015: 'login with a different device ',
        ERROR10016: 'Recall Error，Over two minutes',

        email: 'email',
        nickname: 'nickname',
        password: 'password',
        Login: 'Login',
        SignUp: 'SignUp',
        inputAreaPlaceholder: 'type a message, use ⌃/⌘ + enter input emoji',
        blockAreaPlaceholder: 'can‘t type message',
        emoji: 'emoji',
        send: 'send',
        group: 'Group',
        private: 'Private',
        AM: 'am',
        PM: 'pm',
        conversation: 'New Conversation',
        startConv: 'Start a conversation',
        userProfile: 'Profile and status',
        nickname: 'nickname',
        status: 'status',
        userProfileTran: 'This is not your pin. This name will be visible to your app contacts.',
        groupInfo: 'Group info',
        bulletin: 'Bulletin',
        participants: 'Participants',
        addPart: 'Add participant',
        inviteLink: 'Invite to Group via Link',
        contactInfo: 'Contact info',
        newGroup: 'New Group',
        success: 'success',
        kickOut: 'kick out',
        inviteTitle: 'Invite via link',
        inviteLinkDisabled: 'Invite link disabled',
        joinRoomSuccess: 'joined room',
        logout: 'Logout',
        sendInviteLink: 'send invite link',
        sendInviteLinkByNami: 'Send link via nami',
        copyLink: 'Copy link',
        refreshLink: 'Refresh link',
        copiedLink: 'Link copied to clipboard',
        copyError: 'error',
        linkTran: 'Anyone with nami can follow this link to join this group. Only share it with people you trust.',
        newContact: 'New Contact',
        participants: 'Participants',
        search: 'search...',
        menu: 'menu',
        attach: 'attach',
        addExpression: 'added expression',
        exitGroup: 'Exit group',
        deleteContact: 'Delete Contact',
        blockContact: 'Blocked Contact',
        blockTran: 'Blocked contacts will no longer be able to send you messages, unblock contacts by click item ',
        removeBlock: 'Remove Block',
        setting: 'Setting',
        notifications: 'Notifications',
        help: 'Help',
        blocked: 'Blocked',
        desktopAlerts: 'Desktop Alerts',
        showDesktopPreviews: 'Show Desktop Previews',
        showMessagePreviews: 'Show Message Previews',
        showImages: 'Show Images',
        showExpressions: 'Shortcut input',
        searchInput :'Search or start new chat',
        withdrawn: 'Recall',
        sendMessage: 'Send Message',
        disabledPrivate: 'Reject Private Message',
        offline: 'Network Failure Error，Rconnect...',
    }
}