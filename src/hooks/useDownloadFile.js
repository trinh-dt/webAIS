import { useCallback } from "react"
import { toast } from "react-toastify"

const useDownloadFile = () => {
  const downloadFile = useCallback(async (apiCall, filename) => {
    try {
      const response = await apiCall()

      // Assume response contains blob, adjust if needed
      const blob = new Blob([response.data], { type: response.headers["content-type"] })
      const downloadUrl = window.URL.createObjectURL(blob)

      const link = document.createElement("a")
      link.href = downloadUrl
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(downloadUrl)
    } catch (error) {
      console.error("Download failed:", error)
      toast.error("An error occurred. Please try again later")
    }
  }, [])

  return downloadFile
}

export default useDownloadFile
