"use client";

import { motion } from "framer-motion";
import { useEffect, useState, use, useRef } from "react";
import {
  GraduationCap,
  Download,
  Share2,
  ArrowLeft,
  Award,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import html2canvas from "html2canvas";

export default function StudentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [isValidID, setIsValidID] = useState(true);
  const [certificateUrl, setCertificateUrl] = useState<string | null>(null);
  const [generatingCertificate, setGeneratingCertificate] = useState(false);
  const [downloadingPNG, setDownloadingPNG] = useState(false);
  const certificateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await fetch(`/api/students/${resolvedParams.id}`);

        if (response.ok) {
          const data = await response.json();
          setStudent(data);
          setIsValidID(true);

          // Generate certificate URL
          await generateCertificateUrl(data);
        } else {
          setIsValidID(false);
        }
      } catch (error) {
        console.error("Error fetching student:", error);
        setIsValidID(false);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [resolvedParams.id]);

  const generateCertificateUrl = async (studentData: Student) => {
    try {
      setGeneratingCertificate(true);

      // Create certificate URL with query parameters
      const params = new URLSearchParams({
        name: studentData.name,
        level: `${studentData.degree} of ${studentData.department}`,
        module: studentData.department,
        score: `${studentData.gpa.toFixed(2)} / 5.00`,
        date: new Date().toISOString().split("T")[0],
        theme: "light",
        format: "svg",
      });

      const certificateUrl = `/api/certificates/${
        studentData.tag
      }?${params.toString()}`;
      setCertificateUrl(certificateUrl);
    } catch (error) {
      console.error("Error generating certificate URL:", error);
      toast.error("Error generating certificate");
    } finally {
      setGeneratingCertificate(false);
    }
  };

  const handleDownload = () => {
    if (certificateUrl) {
      // For SVG, we can download directly
      const link = document.createElement("a");
      link.href = certificateUrl;
      link.download = `${student?.name}-wisdom-certificate.svg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Certificate downloaded successfully!");
    } else {
      toast.error("Certificate not ready yet");
    }
  };

  const handleDownloadPNG = async () => {
    if (!certificateRef.current || !student) {
      toast.error("Certificate not ready yet");
      return;
    }

    try {
      setDownloadingPNG(true);
      toast.info("Generating PNG... Please wait");

      const canvas = await html2canvas(certificateRef.current, {
        scale: 2, // Higher quality
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        width: 1600,
        height: 1100,
        scrollX: 0,
        scrollY: 0,
      });

      // Convert canvas to blob
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `${student.name}-wisdom-certificate.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            toast.success("PNG certificate downloaded successfully!");
          } else {
            toast.error("Failed to generate PNG");
          }
        },
        "image/png",
        0.95
      );
    } catch (error) {
      console.error("Error generating PNG:", error);
      toast.error("Failed to generate PNG certificate");
    } finally {
      setDownloadingPNG(false);
    }
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = `I just graduated from the University of Wisdom and Understanding with a ${student?.degree} in ${student?.department}! Check out my certificate: ${url}`;

    let shareUrl = "";

    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          text
        )}&hashtags=wisdom,understanding,graduation`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`;
        break;
      case "whatsapp":
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
          text
        )}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, "_blank");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-dark-600 text-lg">
            Loading your wisdom certificate...
          </p>
        </div>
      </div>
    );
  }

  if (!isValidID || !student) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <Award className="w-16 h-16 text-dark-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-dark-800 mb-2">
            Student Not Found
          </h2>
          <p className="text-dark-600 mb-6">
            This wisdom seeker doesn&apos;t exist in our records.
          </p>
          <Link href="/enroll">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 text-white bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg"
            >
              <GraduationCap className="w-4 h-4" />
              Enroll Now
            </motion.button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium text-primary-700 bg-primary-100 rounded-full">
            <Sparkles className="w-4 h-4" />
            <span>Championed by GehGeh</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Congratulations!</span>
          </h1>
          <p className="text-xl text-dark-600">
            You have successfully graduated from the University of Wisdom and
            Understanding
          </p>
        </motion.div>

        {/* Certificate Display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl p-8 shadow-xl border border-dark-100 mb-8"
        >
          {generatingCertificate ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-dark-600">Generating your certificate...</p>
            </div>
          ) : certificateUrl ? (
            <div ref={certificateRef} className="text-center">
              <img
                src={certificateUrl}
                alt="Wisdom Certificate"
                className="w-full max-w-4xl mx-auto rounded-lg shadow-lg"
              />
            </div>
          ) : (
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <GraduationCap className="w-12 h-12 text-white" />
              </div>

              <h2 className="text-3xl font-bold text-dark-800 mb-2 capitalize">
                {student.name}
              </h2>

              <p className="text-xl text-primary-600 font-semibold mb-2">
                {student.degree} Degree
              </p>

              <p className="text-lg text-dark-700 mb-4 italic">
                {student.department}
              </p>

              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-full">
                <Award className="w-5 h-5 text-primary-600" />
                <span className="text-lg font-bold text-primary-600">
                  Wisdom Score: {student.gpa}
                </span>
              </div>
            </div>
          )}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-6"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownload}
            disabled={!certificateUrl || generatingCertificate}
            className="inline-flex items-center gap-2 px-8 py-4 text-white bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-5 h-5" />
            Download SVG
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownloadPNG}
            disabled={
              !certificateUrl || generatingCertificate || downloadingPNG
            }
            className="inline-flex items-center gap-2 px-8 py-4 text-white bg-gradient-to-r from-secondary-600 to-secondary-700 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {downloadingPNG ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Download className="w-5 h-5" />
            )}
            {downloadingPNG ? "Generating..." : "Download PNG"}
          </motion.button>
        </motion.div>

        {/* Social Sharing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap gap-2 justify-center mb-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleShare("twitter")}
            className="inline-flex items-center gap-2 px-6 py-4 text-white bg-blue-500 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Share2 className="w-5 h-5" />
            Twitter
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleShare("facebook")}
            className="inline-flex items-center gap-2 px-6 py-4 text-white bg-blue-600 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Share2 className="w-5 h-5" />
            Facebook
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleShare("whatsapp")}
            className="inline-flex items-center gap-2 px-6 py-4 text-white bg-green-500 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Share2 className="w-5 h-5" />
            WhatsApp
          </motion.button>
        </motion.div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 text-primary-600 hover:text-primary-700 font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
