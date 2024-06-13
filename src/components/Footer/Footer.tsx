import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub, FaEnvelope } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-darkBackground border-t border-borderLines text-textColor py-8">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <h2 className="text-xl font-semibold">Vantaverse</h2>
            <p className="mt-2">Organization Analyzer Application</p>
          </div>
          <div className="flex flex-col md:flex-row gap-8">
            <div>
              <h3 className="text-lg font-semibold">Contact Us</h3>
              <ul className="mt-2 space-y-2">
                <li className="flex items-center text-textColor hover:text-white">
                  <FaEnvelope className="mr-2" />
                  support@vantaverse.com
                </li>
                <li className="text-textColor hover:text-white">123 Chat Analyzer Street, Tech City</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-6 md:mt-0 flex justify-center ">
          <a href="https://facebook.com" className="text-gray-400 hover:text-white mx-2"><FaFacebookF size="1.5em" /></a>
          <a href="https://twitter.com" className="text-gray-400 hover:text-white mx-2"><FaTwitter size="1.5em" /></a>
          <a href="https://linkedin.com" className="text-gray-400 hover:text-white mx-2"><FaLinkedinIn size="1.5em" /></a>
          <a href="https://github.com" className="text-gray-400 hover:text-white mx-2"><FaGithub size="1.5em" /></a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
