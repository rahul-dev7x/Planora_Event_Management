import { FaCalendarAlt, FaUsers, FaTasks, FaCreditCard, FaChartBar, FaBullhorn } from 'react-icons/fa';

const featuresData = [
  {
    id: 1,
    title: 'Event Scheduling',
    description: 'Easily plan and schedule your events with our intuitive calendar interface. Set reminders and track important deadlines.',
    icon: <FaCalendarAlt size={24} />,
    color: 'bg-blue-100',
    textColor: 'text-blue-600',
  },
  {
    id: 2,
    title: 'Guest Management',
    description: 'Manage attendees, send invitations, and track RSVPs all in one place. Keep your guest list organized effortlessly.',
    icon: <FaUsers size={24} />,
    color: 'bg-green-100',
    textColor: 'text-green-600',
  },
  {
    id: 3,
    title: 'Task Management',
    description: 'Create and assign tasks, set deadlines, and track progress. Stay on top of every detail for your event.',
    icon: <FaTasks size={24} />,
    color: 'bg-yellow-100',
    textColor: 'text-yellow-600',
  },
  {
    id: 4,
    title: 'Payment Processing',
    description: 'Secure payment processing for ticket sales and vendor payments. Multiple payment options supported.',
    icon: <FaCreditCard size={24} />,
    color: 'bg-red-100',
    textColor: 'text-red-600',
  },
  {
    id: 5,
    title: 'Analytics & Reports',
    description: 'Get detailed insights and analytics about your events. Track attendance, revenue, and engagement.',
    icon: <FaChartBar size={24} />,
    color: 'bg-purple-100',
    textColor: 'text-purple-600',
  },
  {
    id: 6,
    title: 'Marketing Tools',
    description: 'Powerful marketing tools to promote your events. Email campaigns, social media integration, and more.',
    icon: <FaBullhorn size={24} />,
    color: 'bg-orange-100',
    textColor: 'text-orange-600',
  },
];

const FeaturesSection = () => {
  return (
    <div className="bg-gray-50 p-8 min-h-screen">
      <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center">Amazing Features</h2>
      <p className="text-center text-lg text-gray-600 mb-12">Everything you need to create and manage successful events, all in one platform.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 cursor-pointer">
        {featuresData.map(({ id, title, description, icon, color, textColor }) => (
          <div key={id} className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center justify-between gap-6 hover:shadow-2xl transition-shadow duration-300 ease-in-out">
            <div className={`${color} ${textColor} p-4 rounded-full`}>
              {icon}
            </div>
            <h3 className="text-[24px] font-bold text-gray-900 text-center">{title}</h3>
            <p className="text-gray-600 text-[17px] text-center">{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;
