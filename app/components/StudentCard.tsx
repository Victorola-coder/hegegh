import Link from "next/link";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

interface StudentCardProps {
  student: Student;
}

const StudentCard = ({ student }: StudentCardProps) => {
  return (
    <Link href={`/student/${student.tag}`}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full p-4 cursor-pointer"
      >
        <div className="flex flex-col p-4 rounded-lg h-full bg-white shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
          <div className="flex flex-row flex-1 items-center justify-between">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col w-full flex-1 ml-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold capitalize text-dark-800">
                  {student.name}
                </h3>
                <p className="text-sm font-bold text-primary-600">
                  {student.gpa}
                </p>
              </div>
              <p className="text-sm text-dark-600 font-medium">
                {student.degree}
              </p>
              <p className="text-xs text-dark-500 italic mt-1">
                {student.department}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default StudentCard;
