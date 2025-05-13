const Footer = () => {
  return (
    <footer className="bg-neutral-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-300">© {new Date().getFullYear()} Cybersecurity Training Program</p>
          <div className="flex space-x-4 mt-2 sm:mt-0">
            <a href="#" className="text-sm text-gray-300 hover:text-white transition">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-300 hover:text-white transition">Terms of Use</a>
            <a href="#" className="text-sm text-gray-300 hover:text-white transition">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
