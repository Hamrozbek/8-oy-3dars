import type { StudentType } from "@/@types/StudentType"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import { useQueryClient } from "@tanstack/react-query"
import { EllipsisVertical } from "lucide-react"
import { useNavigate } from "react-router-dom"

export function CustomeTable({data}:{data:StudentType[]}) {
  const navegate = useNavigate()
  const queryClient = useQueryClient()

  function handleClickMore(id:string | undefined){
    queryClient.invalidateQueries({queryKey:['student-more']})
    navegate(`/student/${id}`)
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>First Name</TableHead>
          <TableHead>Last Name</TableHead>
          <TableHead className="text-right">Age</TableHead>
          <TableHead className="text-right">Study</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell>{item.firstname}</TableCell>
            <TableCell>{item.lastname}</TableCell>
            <TableCell className="text-right">{item.age}</TableCell>
            <TableCell className="text-right">{item.study}</TableCell>
            <TableCell className="text-right">
              <Button onClick={() => handleClickMore(item.id)} className="bg-slate-900 cursor-pointer" size={"sm"}><EllipsisVertical /></Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
