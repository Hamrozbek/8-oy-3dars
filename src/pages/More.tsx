import { Button } from "@/components/ui/button"
import { instance } from "@/hooks/instance"
import { useQuery } from "@tanstack/react-query"
import { ArrowLeft } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"

const More = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const { data: studentMore = {} } = useQuery({
    queryKey: ['student-more', id],
    queryFn: () => instance().get(`/students/${id}`).then(res => res.data)
  })

  return (
    <div className="bg-slate-900">
      <div className="min-h-screen containers p-6">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => navigate(-1)} className="cursor-pointer p-2 rounded-full hover:bg-slate-800 transition"><ArrowLeft className="text-white" /></button>
            <h2 className="font-bold text-2xl text-white">Student Details</h2>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => navigate(`/create/${id}`)} className="bg-yellow-600 hover:bg-yellow-500 text-white">Edit</Button>
            <Button className="bg-red-700 hover:bg-red-600 text-white">Delete</Button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-xl w-[500px] mx-auto p-6 space-y-4">
          <div className="border-b pb-4 mb-4">
            <h3 className="text-xl font-semibold text-slate-800">Personal Info</h3>
          </div>

          <div className="space-y-2 text-slate-700">
            <div className="flex justify-between">
              <span className="font-medium">First Name:</span>
              <span>{studentMore.firstname}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Last Name:</span>
              <span>{studentMore.lastname}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Age:</span>
              <span>{studentMore.age}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Study:</span>
              <span>{studentMore.study}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Region:</span>
              <span>{studentMore.region}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default More
