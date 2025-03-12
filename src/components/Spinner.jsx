export default function Spinner(props) {
  const { className } = props;
  return (
    <div className="animate-spin">
      <div
        className={`w-3.5 h-3.5 border-2 border-gray-200 border-t-[#3498db] border-r-[#3498db] border-b-[#3498db] rounded-full ${className}`}
      ></div>
    </div>
  );
}
