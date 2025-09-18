import type { StudentType } from "@/@types/StudentType"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { instance } from "@/hooks/instance"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ArrowLeft } from "lucide-react"
import { useState, type FormEvent } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"

const Create = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { id } = useParams()

  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [age, setAge] = useState("")
  const [study, setStudy] = useState("")
  const [region, setRegion] = useState("")

  // Agar id bor bo‘lsa, eski ma’lumotni yuklaymiz
  useQuery<StudentType, Error>({
  queryKey: ["student", id],
  queryFn: () =>
    instance()
      .get<StudentType>(`/students/${id}`)
      .then(res => res.data),
  enabled: !!id
})


  const mutation = useMutation({
  mutationFn: (body: StudentType) =>
    id ? instance().put(`/students/${id}`, body) : instance().post("/students", body),
  onSuccess: () => {
    toast(id ? "Updated" : "Created", {
      description: id ? "Ma'lumot yangilandi" : "Qo'shildi",
      position: "top-center",
    })
    queryClient.invalidateQueries({ queryKey: ["students"] })
    if (id) {
      queryClient.invalidateQueries({ queryKey: ["student-more", id] })
    }
    setTimeout(() => navigate(-1), 800)
  },
})


  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = { firstname, lastname, age, study, region }
    mutation.mutate(data)
  }

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit}
      className="p-5 w-[1000px] mt-5 mx-auto rounded-md bg-slate-900"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="cursor-pointer"
          >
            <ArrowLeft className="text-white" />
          </button>
          <h2 className="font-bold text-[25px] text-white">
            {id ? "Student Update" : "Student Create"}
          </h2>
        </div>
        <Button className="cursor-pointer" variant={"outline"}>
          Save
        </Button>
      </div>

      <div className="flex justify-between mt-3">
        <div className="w-[45%] space-y-3">
          <Input value={firstname} onChange={(e) => setFirstname(e.target.value)} className="text-white" placeholder="Firstname" />
          <Input value={lastname} onChange={(e) => setLastname(e.target.value)} className="text-white" placeholder="Lastname" />
          <Input value={age} onChange={(e) => setAge(e.target.value)} className="text-white" placeholder="Age" />
        </div>
        <div className="w-[45%] space-y-3">
          <Input value={study} onChange={(e) => setStudy(e.target.value)} className="text-white" placeholder="Study" />
          <Input value={region} onChange={(e) => setRegion(e.target.value)} className="text-white" placeholder="Region" />
        </div>
      </div>
    </form>
  )
}

export default Create
