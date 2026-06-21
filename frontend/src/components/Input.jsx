export default function Input({ label, ...props }) {
  return (
    <div>
      {label && <label className="block text-gray-700 font-semibold mb-2">{label}</label>}
      <input
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-purple-600"
        {...props}
      />
    </div>
  );
}