export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-primary">Smart Todo</h1>
        <div className="flex space-x-4">
          <button className="px-4 py-2 rounded-md bg-primary text-white hover:bg-primary-dark">
            Sign In
          </button>
        </div>
      </div>
    </nav>
  );
}
