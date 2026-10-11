import { MOCK_APPLICATIONS } from "@/src/data/mockData";

export const LegalAidService = {
  async trackApplication(applicationNo) {
    if (!applicationNo) return null;
    const cleanNo = applicationNo.trim().toUpperCase();
    const app = MOCK_APPLICATIONS.find(
      (a) => a.applicationNo.toUpperCase() === cleanNo
    );
    // If not found in mock list, generate a mock response for user testing
    if (!app && cleanNo.startsWith("LA")) {
      return {
        applicationNo: cleanNo,
        status: "Under Review",
        statusHi: "समीक्षाधीन",
        statusCode: "under_review",
        applicantName: "Registered Citizen",
        appliedDate: "12 Oct 2026, 11:30 AM",
        offence: "Criminal Case Verification",
        district: "Kolkata",
        state: "West Bengal",
        assignedAdvocate: "Amit Sharma",
        steps: [
          { id: 1, name: "Submitted", nameHi: "जमा किया गया", date: "12 Oct 2026, 11:30 AM", status: "completed" },
          { id: 2, name: "Under Review", nameHi: "समीक्षाधीन", date: "Today, 02:15 PM", status: "current" },
          { id: 3, name: "Assigned to Advocate", nameHi: "अधिवक्ता आवंटित", date: "Pending", status: "pending" },
          { id: 4, name: "Resolved", nameHi: "निस्तारित", date: "Pending", status: "pending" },
        ],
        note: "Your application is currently under scrutiny by the Legal Services Committee.",
        noteHi: "आपका आवेदन विधिक सेवा समिति द्वारा जांच प्रक्रिया में है।",
      };
    }
    return app || null;
  },

  async submitApplication(formData) {
    // Generate unique application ID
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const newAppNo = `LA2026${randomNum}`;
    const newRecord = {
      applicationNo: newAppNo,
      status: "Submitted",
      statusHi: "जमा किया गया",
      statusCode: "submitted",
      applicantName: formData.fullName || "Applicant",
      appliedDate: "Just now",
      offence: formData.offenceSection || "Legal Representation",
      district: formData.district || "Kolkata",
      state: formData.state || "West Bengal",
      assignedAdvocate: "Pending Assignment",
      steps: [
        { id: 1, name: "Submitted", nameHi: "जमा किया गया", date: "Just now", status: "completed" },
        { id: 2, name: "Under Review", nameHi: "समीक्षाधीन", date: "Pending", status: "pending" },
        { id: 3, name: "Assigned to Advocate", nameHi: "अधिवक्ता आवंटित", date: "Pending", status: "pending" },
        { id: 4, name: "Resolved", nameHi: "निस्तारित", date: "Pending", status: "pending" },
      ],
      note: "Your application has been received and queued for review.",
      noteHi: "आपका आवेदन सफलतापूर्वक प्राप्त कर लिया गया है।",
    };
    return newRecord;
  },
};
