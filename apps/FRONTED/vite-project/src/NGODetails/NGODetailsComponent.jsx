
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { 
  Building2, 
  MapPin, 
  Goal, 
  Info, 
  Users, 
  Mail, 
  Phone, 
  Home, 
  CreditCard, 
  User, 
  BadgeInfo,
  Heart,
  Share2,
  Calendar,
  ArrowLeft
} from "lucide-react";

function NGODetails() {
  const { id } = useParams();
  const [postDetails, setPostDetails] = useState(null);
  const [ngoDetails, setNgoDetails] = useState(null);
  const [fundraiserDetails, setfundraiserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch post data
        const postRes = await fetch(`http://localhost:1200/Post/getPOSTByPostId/${id}`);
        const postData = await postRes.json();
        if (!postRes.ok) throw new Error(postData.message || "Failed to fetch post");
        setPostDetails(postData);

        // Fetch NGO data
        const ngoRes = await fetch(`http://localhost:1200/Post/getNGOByPostId/${id}`);
        const ngoData = await ngoRes.json();
        if (!ngoRes.ok) throw new Error(ngoData.message || "Failed to fetch NGO");
        setNgoDetails(ngoData);

       const fundraiserRes = await fetch(`http://localhost:1200/Administrator/getFundRaiser/${id}`);
       const fundraiserData = await fundraiserRes.json();
       if (!fundraiserRes.ok) throw new Error(fundraiserData.message || "Failed to fetch Data");
        setfundraiserDetails(fundraiserData);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-bright-sun-400">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-400"></div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-50">
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md" role="alert">
        <p className="font-bold">Error</p>
        <p>{error}</p>
      </div>
    </div>
  );

  const parseCurrency = (value) => {
    if (typeof value === 'number') return value;
    if (!value) return 0;
    
    // Remove commas and convert to number
    const num = parseFloat(value.toString().replace(/,/g, ''));
    return isNaN(num) ? 0 : num;
  };
  
  // Then calculate percentage
  const progressPercentage = fundraiserDetails.raisedAmount
    ? Math.round((parseCurrency(fundraiserDetails.raisedAmount) / parseCurrency(postDetails.Goal)) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-mine-shaft-950">
      {/* Navigation Bar */}
     

      <div className="container mx-auto px-4 py-6">
        {/* Hero Section with Background */}
        <div className="relative h-64 md:h-80 bg-gradient-to-r from-yellow-200 to-orange-300 rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="absolute inset-0 opacity-20 bg-[url('/api/placeholder/800/400')] bg-cover bg-center"></div>
          <div className="absolute bottom-0 left-0 p-8 text-white">
            <h1 className="text-3xl md:text-4xl font-bold text-bright-sun-400 shadow-text">{postDetails?.Name}</h1>
            <div className="flex items-center mt-3">
              <MapPin className="h-5 w-5 mr-2 text-bright-sun-500" />
              <span className="text-bright-sun-500 text-lg shadow-text">{postDetails?.location}</span>
            </div>
            <div className="flex items-center mt-2">
              <Calendar className="h-5 w-5 mr-2 text-bright-sun-500" />
              <span className="text-bright-sun-500 shadow-text">Campaign Active</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Campaign Details */}
          <div className="lg:col-span-2">
            {/* Goal and Status */}
            <div className="bg-gradient-to-r from-yellow-200 to-orange-300  rounded-xl shadow-md p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Goal className="h-6 w-6 text-bright-sun-500 mr-2" />
                  <div className="text-2xl text-bright-sun-500 font-semibold">₹{postDetails?.Goal}</div>
                </div>
                <div className="bg-yellow-100 text-yellow-800 text-sm py-1 px-4 rounded-full font-medium">
                  Fundraising
                </div>
              </div>

              
              
              {/* Progress Bar */}
              {/* <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                <div 
                  className="bg-yellow-400 h-3 rounded-full" 
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div> */}

              <div className="relative h-2 bg-mine-shaft-800 rounded-full overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-bright-sun-400 rounded-full"
                  style={{
                  width: `${progressPercentage}%`,
                  transition: 'width 1s ease-out'
                  }}
               ></div>
              </div>
              
              <div className="flex justify-between text-sm text-gray-600 mb-6">
              <span>Raised: ₹{(fundraiserDetails?.raisedAmount || 0).toLocaleString()}</span>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-gradient-to-r from-yellow-200 to-orange-300 hover:bg-yellow-500 text-yellow-900 py-3 px-6 rounded-lg font-bold shadow-md transition duration-200 flex items-center justify-center">
                  <Heart className="h-5 w-5 mr-2" />
                  Support This Cause
                </button>
            
              </div>
            </div>

            {/* Campaign Description */}
            <div className="bg-gradient-to-r from-yellow-200 to-orange-300 rounded-xl shadow-md p-6 mb-6">
              <div className="flex items-start mb-4">
                <Info className="h-6 w-6 text-bright-sun-500 mr-2 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-bright-sun-500">About this campaign</h3>
                </div>
              </div>
              <div className="prose max-w-none text-mine-shaft-700">
                <p>{postDetails?.description}</p>
                {/* <p className="mt-4">
                  Your contribution will make an immediate impact on those in need. 
                  Every donation, regardless of size, brings us one step closer to our goal. 
                  Together, we can create lasting change in our community.
                </p> */}
              </div>
            </div>

            {/* NGO Details Section */}
            {ngoDetails && (
              <div className="bg-gradient-to-r from-yellow-200 to-orange-300 rounded-xl shadow-md p-6 mb-6">
                <div className="flex items-center mb-6">
                  <Building2 className="h-6 w-6 text-bright-sun-500 mr-2" />
                  <h2 className="text-xl font-semibold text-bright-sun-500">About the Organization</h2>
                </div>
                
                {/* <div className="prose max-w-none text-gray-700 mb-6">
                  <p>
                    {ngoDetails.legalBusinessName} is a registered non-profit organization dedicated to making a positive impact in our community. 
                    With years of experience in the field, we are committed to transparency and ensuring every donation reaches those in need.
                  </p>
                </div> */}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Main Info */}
                  <div className="bg-gradient-to-r from-yellow-200 to-orange-300 p-4 rounded-lg border border-yellow-200">
                    <h3 className="text-lg font-semibold text-bright-sun-400 mb-3">Organization Details</h3>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <BadgeInfo className="h-5 w-5 text-bright-sun-500 mr-2 mt-1" />
                        <div>
                          <p className="text-sm text-bright-sun-500">Organization Name</p>
                          <p className="font-medium text-gray-400">{ngoDetails.legalBusinessName}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Users className="h-5 w-5 text-bright-sun-500 mr-2 mt-1" />
                        <div>
                          <p className="text-sm text-bright-sun-500">Contact Name</p>
                          <p className="font-medium text-gray-400">{ngoDetails.contactName}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Mail className="h-5 w-5 text-bright-sun-500 mr-2 mt-1" />
                        <div>
                          <p className="text-sm text-bright-sun-500">Email</p>
                          <p className="font-medium text-gray-400">{ngoDetails.email}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Phone className="h-5 w-5 text-bright-sun-500  mr-2 mt-1" />
                        <div>
                          <p className="text-sm text-bright-sun-500">Phone</p>
                          <p className="font-medium text-gray-400">{ngoDetails.phone}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Address Details */}
                  <div className="bg-gradient-to-r from-yellow-200 to-orange-300 p-4 rounded-lg border border-yellow-200">
                    <h3 className="text-lg font-semibold text-bright-sun-400 mb-3">Location</h3>
                    <div className="flex items-start">
                      <Home className="h-5 w-5 text-bright-sun-500 mr-2 mt-1" />
                      <div>
                        <p className="text-sm text-bright-sun-500">Office Address</p>
                        <p className="font-medium text-gray-400">{ngoDetails.address?.street1}</p>
                        {ngoDetails.address?.street2 && <p className=" font-medium text-gray-400">{ngoDetails.address?.street2}</p>}
                        <p className=" font-medium text-gray-400">
                          {ngoDetails.address?.city}, {ngoDetails.address?.state}, {ngoDetails.address?.country} - {ngoDetails.address?.postal_code}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1">
            {/* Contact Person Card */}
            {ngoDetails && (
              <div className="bg-gradient-to-r from-yellow-200 to-orange-300 rounded-xl shadow-md p-6 mb-6">
                <h3 className="text-lg font-semibold text-bright-sun-500 mb-4">Contact Person</h3>
                <div className="flex items-center mb-4">
                  <div className="bg-yellow-100 p-3 rounded-full mr-3">
                    <User className="h-6 w-6 text-bright-sun-400" />
                  </div>
                  <div>
                    <p className="font-medium text-bright-sun-500">{ngoDetails.contactDetails?.name || ngoDetails.contactName}</p>
                    <p className="text-sm text-gray-400">{ngoDetails.contactDetails?.type || "Primary Contact"}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-bright-sun-500 mr-2 mt-1" />
                    <div>
                      <p className="text-sm text-bright-sun-500">Email</p>
                      <p className="font-medium text-gray-400">{ngoDetails.contactDetails?.email || ngoDetails.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-yellow-500 mr-2 mt-1" />
                    <div>
                      <p className="text-sm text-bright-sun-500">Phone</p>
                      <p className="font-medium text-gray-400">{ngoDetails.contactDetails?.contact || ngoDetails.phone}</p>
                    </div>
                  </div>
                </div>
                {/* <button className="w-full mt-4 bg-yellow-50 hover:bg-yellow-100 text-yellow-800 border border-yellow-200 py-2 px-4 rounded-lg font-medium transition duration-200">
                  Contact Now
                </button> */}
              </div>
            )}

            {/* Bank Details Card */}
            {ngoDetails && (
              <div className="bg-gradient-to-r from-yellow-200 to-orange-300 rounded-xl shadow-md p-6 mb-6">
                <h3 className="text-lg font-semibold text-bright-sun-500 mb-4">Payment Information</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <BadgeInfo className="h-5 w-5 text-bright-sun-500 mr-2 mt-1" />
                    <div>
                      <p className="text-sm text-bright-sun-500">GST</p>
                      <p className="font-medium text-gray-400">{ngoDetails.gst || "N/A"}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CreditCard className="h-5 w-5 text-bright-sun-500 mr-2 mt-1" />
                    <div>
                      <p className="text-sm text-bright-sun-500">Account Number</p>
                      <p className="font-medium text-gray-400">
                        {ngoDetails.bankDetails?.accountNumber ? 
                          `${ngoDetails.bankDetails.accountNumber}` : 
                          "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CreditCard className="h-5 w-5 text-yellow-500 mr-2 mt-1" />
                    <div>
                      <p className="text-sm text-bright-sun-500">IFSC</p>
                      <p className="font-medium text-gray-400">{ngoDetails.bankDetails?.ifsc || "N/A"}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* How To Help Card */}
            <div className="bg-gradient-to-r from-yellow-200 to-orange-300 rounded-xl shadow-md p-6 text-yellow-900">
              <h3 className="text-lg font-bold mb-3">How You Can Help</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="bg-white rounded-full h-6 w-6 flex items-center justify-center text-yellow-600 font-bold mr-2 mt-1">1</div>
                  <div>Donate to this campaign</div>
                </li>
                <li className="flex items-start">
                  <div className="bg-white rounded-full h-6 w-6 flex items-center justify-center text-yellow-600 font-bold mr-2 mt-1">2</div>
                  <div>Share with friends and family</div>
                </li>
                <li className="flex items-start">
                  <div className="bg-white rounded-full h-6 w-6 flex items-center justify-center text-yellow-600 font-bold mr-2 mt-1">3</div>
                  <div>Volunteer your time and skills</div>
                </li>
                <li className="flex items-start">
                  <div className="bg-white rounded-full h-6 w-6 flex items-center justify-center text-yellow-600 font-bold mr-2 mt-1">4</div>
                  <div>Follow our progress updates</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
     
    </div>
  );
}

export default NGODetails;