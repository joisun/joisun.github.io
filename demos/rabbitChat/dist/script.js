"use strict";
class TalkWindow {
    constructor(ws, me) {
        this.setDate = function () {
            var d, timestamp;
            timestamp = $('<div>').addClass('timestamp');
            d = new Date();
            timestamp.text(d.getHours() +
                ':' +
                (d.getMinutes() < 10 ? '0' : '') +
                d.getMinutes());
            return timestamp.appendTo($('.message:last'));
        };
        this.updateScrollbar = () => {
            return this.messages
                .mCustomScrollbar('update')
                .mCustomScrollbar('scrollTo', 'bottom', {
                scrollInertia: 10,
                timeout: 0,
            });
        };
        this.setMessage = (msgText, nickName) => {
            var typing;
            typing = $('<div>')
                .append('<span>')
                .addClass('message typing');
            typing.appendTo($('.mCSB_container'));
            this.updateScrollbar();
            var name, msg, msgBox;
            typing.remove();
            msg = $('<div>').addClass('message');
            msg.text(msgText);
            msgBox = $('<div>').addClass('message-box');
            name = $('<div>')
                .text(nickName + ':')
                .addClass('message-box-name');
            msgBox.append(name);
            msgBox.append(msg);
            msgBox.appendTo($('.mCSB_container'));
            this.setDate();
            this.updateScrollbar();
        };
        this.insertMessage = (msgText) => {
            // 自己的输入消息
            var msg;
            if ($.trim(msgText) === '') {
                return false;
            }
            msg = $('<div>').addClass('message');
            msg.text(msgText);
            msg
                .addClass('personal')
                .appendTo($('.mCSB_container'));
            this.setDate();
            this.updateScrollbar();
            $('.action-box-input').val(null);
            $('.message.personal.typing').remove();
            this.isTyping = true;
            clearTimeout(this.uctTimer);
            this.ws.send(JSON.stringify({
                type: 2,
                msg: msgText,
                me: this.me,
            }));
        };
        this.me = me;
        this.ws = ws;
        this.fakeMsg = [
            "Hi there, I'm Kelly and you?",
            'Nice to meet you',
            'How are you doing?',
            'Pretty good',
            "How's life been treating you?",
            'It could be worse, thanks',
            "I've gotta go now",
            'It was a pleasure chat with you',
            'Bye :)',
        ];
        this.fakeNum = 0;
        this.isTyping = true;
        this.messages = $('.messages-content');
        this.uctTimer = null;
        this.messages.mCustomScrollbar();
        $(window).load(() => {
            console.log(this.messages);
            setTimeout(() => {
                return this.setMessage('hello', 'jayce');
            }, 100);
        });
        $(window).on('keydown', (e) => {
            if ($('.action-box-input').is(':focus') &&
                e.key === 'Enter') {
                this.insertMessage($('.action-box-input').val());
                return false;
            }
        });
        $('.action-box-submit').on('click', () => {
            this.insertMessage($('.action-box-input').val());
        });
        $('.action-box-input').on('keydown', (e) => {
            var typing;
            if ($('.action-box-input') !== undefined &&
                this.isTyping === true &&
                e.which !== 13) {
                typing = $('<div>')
                    .append('<span>')
                    .addClass('message personal typing');
                typing.appendTo($('.mCSB_container'));
                this.updateScrollbar();
                this.isTyping = false;
                return this.userTypingClear();
            }
        });
    }
    userTypingClear() {
        return (this.uctTimer = setTimeout(() => {
            $('.message.personal.typing').remove();
            return (this.isTyping = true);
        }, 3500));
    }
}
class Dialog {
    constructor(cb) {
        this.instance = $('#favDialog').get(0);
        $(document).keyup((e) => {
            if ($('#nickname').is(':focus') &&
                e.keyCode == 13) {
                // Do something
                if ($('#nickname').val().trim().length > 10) {
                    alert('太长了，短一点！');
                    return;
                }
                this.instance.close();
                // 触发回调
                cb($('#nickname').val().trim());
            }
        });
    }
}
function init() {
    const dialog = new Dialog(okDialog);
    dialog.instance.showModal();
    function okDialog(nickName) {
        const ws = new WebSocket('wss://jaycethanks-github-io-8zio.vercel.app:8080');
        const tw = new TalkWindow(ws, {
            nickname: nickName,
            id: window.uuid.v4(),
        });
        // const tw = new TalkWindow(ws, { nickname: nickName, id: crypto.randomUUID() });
        ws.onopen = function (evt) {
            ws.send(JSON.stringify({
                type: 1,
                nickname: nickName,
            }));
            console.log('Connection open ...');
        };
        ws.onmessage = function (evt) {
            const data = JSON.parse(evt.data);
            if (data.type === 1) {
                // connection msg
                setInfo(data.nickname + '加入了聊天!!');
            }
            else if (data.type === 2) {
                // normal msg
                console.log('[data]: ', data);
                if (data.me.id !== tw.me.id) {
                    // 这条消息不是自己发送的，不用set了，因为在发送阶段就已经静态的set了
                    tw.setMessage(data.msg, data.me.nickname);
                }
            }
            // tw.setMessage(evt.data);
            // ws.close();
        };
        ws.onclose = function (evt) {
            console.log('Connection closed.');
            okDialog(nickName);
            console.log('重新连接中...');
        };
    }
}
init();
function setInfo(text) {
    $('#info-text').text(text);
    $('#info-text').addClass('slide-in-from-right');
    setTimeout(() => {
        $('#info-text').removeClass('slide-in-from-right');
        $('#info-text').addClass('slide-out-to-left');
        setTimeout(() => {
            $('#info-text').removeClass('slide-out-to-left');
            $('#info-text').text('');
        }, 800);
    }, 3500);
}
