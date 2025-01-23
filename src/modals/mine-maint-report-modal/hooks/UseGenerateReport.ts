import API from "../../../Api";
import PDF_API from "../../../PDF-Api";

export default function useGenerateReport() {
  const generateAndDownloadPDF = async (endpoint: string, payload: any, fileName: string) => {
    try {
      const response = await PDF_API.post(endpoint, payload, {
        responseType: "blob", 
      });

      const pdfBlob = new Blob([response.data], { type: "application/pdf" });
      const downloadUrl = URL.createObjectURL(pdfBlob);

      // Trigger PDF download
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);

      console.log(`PDF "${fileName}" downloaded successfully.`);
    } catch (error) {
      console.error("Error generating or downloading PDF:", error);
      throw error;
    }
  };

  const createAndDownloadReport = async (payload: any) => {
    try {
      await generateAndDownloadPDF(
        "/pdf/generate-mine-maintenance-report",
        payload,
        "Mine_Maintenance_Report.pdf"
      );
    } catch (error) {
      console.error("Error while creating and downloading report", error)
    }
  };

  const downloadReport = async (payload: any) => {
    try {
      await generateAndDownloadPDF(
        "/pdf/download-mine-maintenance-pdf",
        payload,
        "Mine_Maintenance_Report.pdf"
      );
    } catch (error) {
      console.error("Error while downloading report", error)
    }
  };

  const updateReport = async (payload: any) => {
    try {
      await API.patch("/report/update-mine-maintenance-report", payload);
    } catch (error) {
      console.error("Error while updating report");
    } 
  }

  const updateAndDownloadReport = async (payload: any) => {
    try {
      await generateAndDownloadPDF(
        "/pdf/update-mine-maintenance-pdf",
        payload,
        "Mine_Maintenance_Report.pdf"
      );
    } catch (error) {
      console.error("Error while updating and generating downloading report", error);
    }
  }

  return { 
    createAndDownloadReport, 
    downloadReport, 
    updateReport, 
    updateAndDownloadReport };
}