
import React, { useState, useRef } from 'react';
import { MapPin, Phone, Mail, User, Calendar, FileText, ChevronDown, ChevronUp, Download, Clock } from 'lucide-react';
import jsPDF from 'jspdf';

const NGOFundraisingReport = ({ ngo }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  const [selectedMonth, setSelectedMonth] = useState('');
  const reportRef = useRef(null);

  // Extract all required data from the ngo object
  const { ngoDetails, fundraiserData, postDetails, donors: donationHistory } = ngo;

  // Calculate the progress percentage
  const progressPercentage = Math.round((fundraiserData.raisedAmount / postDetails.Goal) * 100);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Filter donation history based on selected year and month
  const filteredDonations = donationHistory.filter(donation => {
    const donationDate = new Date(donation.date);
    const donationYear = donationDate.getFullYear().toString();
    const donationMonth = donationDate.getMonth().toString();

    if (selectedYear && selectedMonth) {
      return donationYear === selectedYear && donationMonth === selectedMonth;
    } else if (selectedYear) {
      return donationYear === selectedYear;
    }
    return true;
  });

  // Get unique years from donation history
  const years = [...new Set(donationHistory.map(donation => new Date(donation.date).getFullYear().toString()))];

  // Month names for the dropdown
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Function to handle PDF download
  const handleDownloadPDF = () => {
    const doc = new jsPDF('p', 'mm', 'a4'); // Create a new PDF document

    // Set font to Times New Roman
    doc.setFont('Times', 'normal');

    // Add NGO Details
    doc.setFontSize(18);
    doc.text(`${ngoDetails.name} - Fundraising Report`, 10, 20);
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 10, 30);

    // Add NGO Contact Details
    doc.setFontSize(14);
    doc.text('NGO Details:', 10, 50);
    doc.setFontSize(12);
    doc.text(`Location: ${ngoDetails.address?.street1}, ${ngoDetails.address?.street2}, ${ngoDetails.address?.city}, ${ngoDetails.address?.state} - ${ngoDetails.address?.postal_code}`, 10, 60);
    doc.text(`Contact Person: ${ngoDetails.contactName}`, 10, 70);
    doc.text(`Contact Number: ${ngoDetails.phone}`, 10, 80);
    doc.text(`Email: ${ngoDetails.email}`, 10, 90);

    // Add Fundraising Summary
    doc.setFontSize(14);
    doc.text('Fundraising Summary:', 10, 110);
    doc.setFontSize(12);
    doc.text(`Total Goal:₹${postDetails.Goal.toLocaleString()}`, 10, 120); // Removed space
    doc.text(`Total Raised:₹${fundraiserData.raisedAmount.toLocaleString()}`, 10, 130); // Removed space

    // Add Donation History Table
    doc.setFontSize(14);
    doc.text('Donation History:', 10, 150);
    doc.setFontSize(12);

    // Table Headers
    doc.text('Donor Name', 10, 160);
    doc.text('Donor Email', 60, 160);
    doc.text('Amount (₹)', 120, 160);
    doc.text('Date', 160, 160);

    // Table Rows
    let y = 170;
    filteredDonations.forEach((donation, index) => {
      if (y > 280) { // Add a new page if the content exceeds the page height
        doc.addPage();
        y = 20;
      }
      doc.text(donation.donorName, 10, y);
      doc.text(donation.donorEmail, 60, y);
      doc.text(`₹${donation.amount.toLocaleString().replace('¹', '')}`, 120, y); // Remove unnecessary "1"
      doc.text(new Date(donation.date).toLocaleDateString(), 160, y);
      y += 10;
    });

    doc.setFontSize(10);
    doc.text(`Report Generated on: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`, 10, 290);

    doc.setFontSize(10);
    doc.text('Powered by TerraAid', doc.internal.pageSize.width - 10, 290, { align: 'right' });

    // Save the PDF
    doc.save(`${ngoDetails.name}_Fundraising_Report.pdf`);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Collapsed View */}
      <div 
        onClick={toggleExpand}
        className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl shadow-md p-5 cursor-pointer hover:shadow-lg transition duration-300"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-3 shadow-md">
              <FileText className="text-white" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-lg">{ngoDetails.name}</h3>
              <p className="text-sm text-gray-600">Fundraising Report</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-8">
            <div className="text-right">
              <p className="text-xs font-medium text-indigo-600">Goal</p>
              <p className="font-semibold text-gray-800">₹{postDetails.Goal.toLocaleString()}</p>
            </div>
            
            <div className="text-right">
              <p className="text-xs font-medium text-green-600">Raised</p>
              <p className="font-semibold text-green-600">₹{fundraiserData.raisedAmount.toLocaleString()}</p>
            </div>
            
            <div className="bg-gray-100 p-2 rounded-full">
              {isExpanded ? 
                <ChevronUp className="text-gray-600" size={20} /> : 
                <ChevronDown className="text-gray-600" size={20} />
              }
            </div>
          </div>
        </div>
      </div>
      
      {/* Expanded View */}
      {isExpanded && (
        <div ref={reportRef} className="mt-5 p-6 bg-white rounded-xl shadow-lg border border-gray-100">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl shadow-lg p-8 mb-8 text-white relative overflow-hidden">
            <div className="absolute right-0 top-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-16 -mt-16"></div>
            <div className="relative z-10">
              <h1 className="text-3xl font-bold mb-2">{ngoDetails.name}</h1>
              <p className="text-blue-100">Fundraising Performance Report</p>
              <div className="flex items-center mt-6">
                <Clock size={16} className="mr-2" />
                <span className="text-sm">Generated on {new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Download Button */}
          <div className="flex justify-end mb-6">
            <button 
              onClick={handleDownloadPDF} 
              className="flex items-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-300 shadow-md"
            >
              <Download size={18} className="mr-2" />
              Download Report (PDF)
            </button>
          </div>

          {/* NGO Details & Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* NGO Details Card */}
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-indigo-500 hover:shadow-lg transition duration-300">
              <h2 className="text-xl font-semibold text-gray-800 mb-5 flex items-center">
                <FileText className="mr-2 text-indigo-600" size={20} /> NGO Details
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-indigo-100 p-2 rounded-lg mr-3">
                    <MapPin className="text-indigo-600" size={18} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Location</p>
                    <p className="text-gray-600">{ngoDetails.address?.street1}</p>
                    <p className="text-gray-600">{ngoDetails.address?.street2}</p>
                    <p className="text-gray-600">{ngoDetails.address?.city}, {ngoDetails.address?.state} - {ngoDetails.address?.postal_code}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-indigo-100 p-2 rounded-lg mr-3">
                    <User className="text-indigo-600" size={18} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Contact Person</p>
                    <p className="text-gray-600">{ngoDetails.contactName}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-indigo-100 p-2 rounded-lg mr-3">
                    <Phone className="text-indigo-600" size={18} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Contact Number</p>
                    <p className="text-gray-600">{ngoDetails.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-indigo-100 p-2 rounded-lg mr-3">
                    <Mail className="text-indigo-600" size={18} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Email</p>
                    <p className="text-gray-600">{ngoDetails.email}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Summary Card */}
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300">
              <h2 className="text-xl font-semibold text-gray-800 mb-5 flex items-center">
                <Calendar className="mr-2 text-indigo-600" size={20} /> Fundraising Summary
              </h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl shadow-sm">
                  <p className="text-sm text-indigo-600 font-medium">Total Goal</p>
                  <p className="text-2xl font-bold text-indigo-800 mt-1">₹{postDetails.Goal.toLocaleString()}</p>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-xl shadow-sm">
                  <p className="text-sm text-green-600 font-medium">Total Raised</p>
                  <p className="text-2xl font-bold text-green-700 mt-1">₹{fundraiserData.raisedAmount.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Filter Controls */}
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-5 rounded-xl shadow-md mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-3">Filter Donations</h3>
            <div className="flex flex-wrap gap-6">
              {/* Year Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                <select 
                  className="border border-gray-300 rounded-lg p-2.5 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                >
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              {/* Month Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Month</label>
                <select 
                  className="border border-gray-300 rounded-lg p-2.5 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                >
                  <option value="">All Months</option>
                  {monthNames.map((month, index) => (
                    <option key={index} value={index}>{month}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Detailed Donation History Table */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-5 text-gray-800 flex items-center">
              <FileText className="mr-2 text-indigo-600" size={20} />
              Donation Details
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-50 to-indigo-50">
                    <th className="px-6 py-3.5 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider rounded-tl-lg">
                      Donor Name
                    </th>
                    <th className="px-6 py-3.5 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">
                      Donor Email
                    </th>
                    <th className="px-6 py-3.5 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">
                      Amount (₹)
                    </th>
                    <th className="px-6 py-3.5 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider rounded-tr-lg">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredDonations.length > 0 ? (
                    filteredDonations.map((donation, index) => (
                      <tr key={donation._id} className={index % 2 === 0 ? 'bg-white hover:bg-gray-50' : 'bg-gray-50 hover:bg-gray-100'} transition="all duration-150">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                          {donation.donorName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {donation.donorEmail}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                          ₹{donation.amount.toLocaleString().replace('¹', '')} {/* Remove unnecessary "1" */}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(donation.date).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-6 py-10 text-center text-gray-500 text-sm">
                        No donations found for the selected period
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Footer */}
          <div className="mt-8 text-center text-sm text-gray-500 p-4 border-t border-gray-100">
            <p>Report generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NGOFundraisingReport;