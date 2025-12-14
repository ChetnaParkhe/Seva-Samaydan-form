import { useState } from 'react';

export default function App() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const myForm = event.currentTarget;
    const formData = new FormData(myForm);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData as any).toString(),
    })
      .then(() => setSubmitted(true))
      .catch((error) => alert(error));
  };

  if (submitted) {
    return (
      <div className="flex items-center justify-center h-screen bg-orange-50">
        <div className="p-8 bg-white rounded-lg shadow-xl text-center">
          <h2 className="text-2xl font-bold text-orange-600 mb-4">Dhanyawad! 🙏</h2>
          <p>Your Seva request has been received.</p>
          <button onClick={() => setSubmitted(false)} className="mt-4 text-blue-600 hover:underline">
            Submit another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50 p-4 flex items-center justify-center font-sans">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-orange-600 p-6 text-white text-center">
          <h1 className="text-2xl font-bold">Seva Samaydan</h1>
          <p className="text-orange-100 mt-1">Mataji Janma Shatabdi</p>
        </div>

        <form name="seva-form" method="post" onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* IMPORTANT: This hidden input links React to Netlify */}
          <input type="hidden" name="form-name" value="seva-form" />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input required name="name" type="text" className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 outline-none" placeholder="Your Name" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
            <input required name="mobile" type="tel" className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 outline-none" placeholder="9876543210" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <textarea required name="address" rows={3} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 outline-none" placeholder="Your full address"></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type of Seva</label>
            <select name="sevatype" className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 outline-none">
              <option>Physical Service (Shramdan)</option>
              <option>Online Coordination</option>
              <option>Event Management</option>
              <option>Other</option>
            </select>
          </div>

          <button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-4 rounded-md transition-colors shadow-md">
            Submit Seva Request
          </button>
        </form>
      </div>
    </div>
  );
}
