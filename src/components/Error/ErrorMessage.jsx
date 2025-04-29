export default function ErrorMessage({ message }) {
  return message ? (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Modal content */}
      <div className="relative bg-red-500 w-[500px] p-6 rounded-lg text-white flex flex-col items-center justify-center shadow-lg">
        <p className="text-center text-sm font-semibold">{message}</p>
      </div>
    </div>
  ) : null;
}
