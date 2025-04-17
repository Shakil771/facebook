
const Loading = (props) => (
    <div className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-transparent">
        <img src="/google_meet_icon.svg" alt="My SVG Icon" width={48} height={48} />
        <p className="text-block-700 mt-4 text-lg">{props.message}</p>
    </div>
);

export default Loading;