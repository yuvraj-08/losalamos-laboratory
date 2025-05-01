"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, Pencil, Trash2, Search } from "lucide-react";
import { ViewPatientDetails } from "./view-patient-details";
import { CreatePatientForm } from "./create-patient-form";
import { EditPatientForm } from "./edit-patient-form";
import { DeletePatientDialog } from "./delete-patient-dialog";

// Mock data
const mockPatients = [
  {
    id: "1",
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    gender: "male",
    dob: "1990-01-15",
    mobile: "+1 (555) 123-4567",
    address: "123 Elm Street",
  },
  {
    id: "2",
    first_name: "Jane",
    last_name: "Smith",
    email: "jane.smith@example.com",
    gender: "female",
    dob: "1985-05-30",
    mobile: "+1 (555) 987-6543",
    address: "456 Oak Avenue",
  },
];

interface Patient {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  dob: string;
  mobile: string;
  address: string;
}

export function PatientsList() {
  const [patients, setPatients] = useState<Patient[]>(mockPatients);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState("10");

  // Modal states
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [viewingPatient, setViewingPatient] = useState<Patient | null>(null);
  const [deletingPatient, setDeletingPatient] = useState<Patient | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Filter based on search term
  const filteredPatients = patients.filter(
    (patient) =>
      patient.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.mobile.includes(searchTerm)
  );

  const totalPages = Math.ceil(
    filteredPatients.length / Number.parseInt(itemsPerPage)
  );
  const paginatedPatients = filteredPatients.slice(
    (currentPage - 1) * Number.parseInt(itemsPerPage),
    currentPage * Number.parseInt(itemsPerPage)
  );

  // Handlers
  const handleEdit = (patient: Patient) => {
    setEditingPatient(patient);
    setIsEditModalOpen(true);
  };

  const handleView = (patient: Patient) => {
    setViewingPatient(patient);
    setIsViewModalOpen(true);
  };

  const handleDelete = (patient: Patient) => {
    setDeletingPatient(patient);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteSuccess = () => {
    if (deletingPatient) {
      setPatients(patients.filter((p) => p.id !== deletingPatient.id));
    }
  };

  const handleCreateSuccess = () => {
    console.log("Patient created successfully");
  };

  const handleEditSuccess = () => {
    console.log("Patient updated successfully");
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex w-full sm:w-auto items-center space-x-2">
          <div className="relative w-full sm:w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search patient..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
        <CreatePatientForm onSuccess={handleCreateSuccess} />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Mobile</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>DOB</TableHead>
              <TableHead className="w-[100px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedPatients.length > 0 ? (
              paginatedPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>
                    {patient.first_name} {patient.last_name}
                  </TableCell>
                  <TableCell>{patient.email}</TableCell>
                  <TableCell>{patient.mobile}</TableCell>
                  <TableCell className="capitalize">{patient.gender}</TableCell>
                  <TableCell>{patient.dob}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleView(patient)}
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(patient)}
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(patient)}
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
                  No patients found.
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
            Showing {paginatedPatients.length} of {filteredPatients.length}{" "}
            patients
          </p>
          <Select
            value={itemsPerPage}
            onValueChange={(value) => {
              setItemsPerPage(value);
              setCurrentPage(1);
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
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages || totalPages === 0}
          >
            Next
          </Button>
        </div>
      </div>

      {/* Modals */}
      {editingPatient && (
        <EditPatientForm
          patient={editingPatient}
          open={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
          onSuccess={handleEditSuccess}
        />
      )}

      <ViewPatientDetails
        patient={viewingPatient}
        open={isViewModalOpen}
        onOpenChange={setIsViewModalOpen}
      />

      {deletingPatient && (
        <DeletePatientDialog
          patientId={deletingPatient.id}
          patientName={`${deletingPatient.first_name} ${deletingPatient.last_name}`}
          open={isDeleteModalOpen}
          onOpenChange={setIsDeleteModalOpen}
          onSuccess={handleDeleteSuccess}
        />
      )}
    </div>
  );
}
