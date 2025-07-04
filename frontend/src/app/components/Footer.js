export default function Footer() {
  return (
    <footer className="bg-white border-t mt-8 py-4">
      <div className="container mx-auto px-4 text-center text-gray-500">
        <p>© {new Date().getFullYear()} Smart Todo List with AI</p>
      </div>
    </footer>
  );
}
