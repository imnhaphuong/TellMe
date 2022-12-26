const params = new URLSearchParams(window.location.search);
export const status = params.get("status");

const CallWaiting = () => {
    return (
        <div>Call WAITING</div>
    )
}

export default CallWaiting