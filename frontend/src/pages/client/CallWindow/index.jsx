import { hashMD5 } from 'pages/shared/Hash';

export default function CallWindow(status, senderId, senderName, receiverId, receiverName, nameInTitle) {
    const channelName = senderId + receiverId
    const width = 1000;
    const height = 800;
    const x = window.top.outerWidth / 2 + window.top.screenX - 1000 / 2;
    const y = window.top.outerHeight / 2 + window.top.screenY - 800 / 2;
    const windowURL = `/call/${hashMD5(status)}/${channelName}`
    const callWindow = window.open(
        windowURL,
        "",
        `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, top=${y},left=${x},width=${width},height=${height}`
    );
    callWindow.receiverId = receiverId
    callWindow.senderId = senderId
    callWindow.senderName = senderName
    callWindow.receiverName = receiverName

    callWindow.onload = function () {
        callWindow.document.title = `Cuộc gọi với ${nameInTitle}`;
        if (status === '006') {

        }
    };
};
