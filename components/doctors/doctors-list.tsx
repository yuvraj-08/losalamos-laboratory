"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, Pencil, Trash2, Search } from "lucide-react"
import { CreateDoctorForm } from "./create-doctor-form"
import { EditDoctorForm } from "./edit-doctor-form"
import { ViewDoctorDetails } from "./view-doctor-details"
import { DeleteDoctorDialog } from "./delete-doctor-dialog"

// Mock data
const mockDoctors = [
  {
    id: "1",
    email: "john.smith@example.com",
    first_name: "John",
    last_name: "Smith",
    gender: "male",
    degree: "MD",
    phone: "+1 (555) 123-4567",
  },
  {
    id: "2",
    email: "sarah.johnson@example.com",
    first_name: "Sarah",
    last_name: "Johnson",
    gender: "female",
    degree: "MBBS",
    phone: "+1 (555) 987-6543",
  },
  {
    id: "3",
    email: "david.williams@example.com",
    first_name: "David",
    last_name: "Williams",
    gender: "male",
    degree: "PhD",
    phone: "+1 (555) 456-7890",
  },
  {
    id: "4",
    email: "emily.brown@example.com",
    first_name: "Emily",
    last_name: "Brown",
    gender: "female",
    degree: "DO",
    phone: "+1 (555) 234-5678",
  },
  {
    id: "5",
    email: "michael.jones@example.com",
    first_name: "Michael",
    last_name: "Jones",
    gender: "male",
    degree: "MD",
    phone: "+1 (555) 876-5432",
  },
]

interface Doctor {
  id: string
  email: string
  first_name: string
  last_name?: string
  gender: string
  degree: string
  phone: string
}

export function DoctorsList() {
  const [doctors, setDoctors] = useState<Doctor[]>(mockDoctors)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState("10")

  // Modal states
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null)
  const [viewingDoctor, setViewingDoctor] = useState<Doctor | null>(null)
  const [deletingDoctor, setDeletingDoctor] = useState<Doctor | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  // Filter doctors based on search term
  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (doctor.last_name && doctor.last_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      doctor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.phone.includes(searchTerm),
  )

  // Pagination
  const totalPages = Math.ceil(filteredDoctors.length / Number.parseInt(itemsPerPage))
  const paginatedDoctors = filteredDoctors.slice(
    (currentPage - 1) * Number.parseInt(itemsPerPage),
    currentPage * Number.parseInt(itemsPerPage),
  )

  // Handlers
  const handleEdit = (doctor: Doctor) => {
    setEditingDoctor(doctor)
    setIsEditModalOpen(true)
  }

  const handleView = (doctor: Doctor) => {
    setViewingDoctor(doctor)
    setIsViewModalOpen(true)
  }

  const handleDelete = (doctor: Doctor) => {
    setDeletingDoctor(doctor)
    setIsDeleteModalOpen(true)
  }

  const handleDeleteSuccess = () => {
    if (deletingDoctor) {
      setDoctors(doctors.filter((d) => d.id !== deletingDoctor.id))
    }
  }

  const handleCreateSuccess = () => {
    // In a real app, you would fetch the updated list
    console.log("Doctor created successfully")
  }

  const handleEditSuccess = () => {
    // In a real app, you would fetch the updated list
    console.log("Doctor updated successfully")
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex w-full sm:w-auto items-center space-x-2">
          <div className="relative w-full sm:w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search doctors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
        <CreateDoctorForm onSuccess={handleCreateSuccess} />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Degree</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead className="w-[100px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedDoctors.length > 0 ? (
              paginatedDoctors.map((doctor) => (
                <TableRow key={doctor.id}>
                  <TableCell className="font-medium">
                    {doctor.first_name} {doctor.last_name}
                  </TableCell>
                  <TableCell>{doctor.email}</TableCell>
                  <TableCell>{doctor.phone}</TableCell>
                  <TableCell>{doctor.degree}</TableCell>
                  <TableCell className="capitalize">{doctor.gender}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => handleView(doctor)}>
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(doctor)}>
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(doctor)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No doctors found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <p className="text-sm text-muted-foreground">
            Showing {paginatedDoctors.length} of {filteredDoctors.length} doctors
          </p>
          <Select
            value={itemsPerPage}
            onValueChange={(value) => {
              setItemsPerPage(value)
              setCurrentPage(1)
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder="10" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">per page</p>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            Next
          </Button>
        </div>
      </div>

      {/* Modals */}
      {editingDoctor && (
        <EditDoctorForm
          doctor={editingDoctor}
          open={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
          onSuccess={handleEditSuccess}
        />
      )}

      <ViewDoctorDetails doctor={viewingDoctor} open={isViewModalOpen} onOpenChange={setIsViewModalOpen} />

      {deletingDoctor && (
        <DeleteDoctorDialog
          doctorId={deletingDoctor.id}
          doctorName={`${deletingDoctor.first_name} ${deletingDoctor.last_name}`}
          open={isDeleteModalOpen}
          onOpenChange={setIsDeleteModalOpen}
          onSuccess={handleDeleteSuccess}
        />
      )}
    </div>
  )
}
