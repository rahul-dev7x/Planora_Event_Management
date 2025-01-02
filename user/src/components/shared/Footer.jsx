

const footerData = [
  {
    title: 'Planora',
    links: [
      'Plan your perfect journey with us.',
      'Discover, explore, and create unforgettable experiences.',
    ],
  },
  {
    title: 'Company',
    links: ['About Us', 'Careers', 'Press', 'Blog'],
  },
  {
    title: 'Support',
    links: ['Help Center', 'Terms of Service', 'Privacy Policy', 'Contact Us'],
  },
  {
    title: 'Follow Us',
    links: ['Facebook', 'Twitter', 'Instagram', 'LinkedIn'],
  },
];

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 py-8 px-6">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {footerData.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link,index) => (
                  <li key={index}>
                    {section.title === 'Follow Us' ? (
                      <a
                        href="#"
                        className="hover:text-blue-500 transition-colors"
                      >
                        {link}
                      </a>
                    ) : (
                      <span>{link}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="text-center mt-8 border-t pt-4 text-sm">
          <p>&copy; {new Date().getFullYear()} Planora. All rights reserved.</p>
        </div>
      </div>
    </footer>
   
  );
};

export default Footer;
