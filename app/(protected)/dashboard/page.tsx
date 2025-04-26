import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DoctorsList } from "@/components/doctors/doctors-list";
import { TestCategoriesList } from "@/components/test-categories/test-categories-list";
import { LabBranchesList } from "@/components/lab-branches/lab-branches-list";

export default function Dashboard() {
  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-teal-700 mb-8">
        Medical Lab Management System
      </h1>

      <Tabs defaultValue="doctors" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="doctors">Doctors</TabsTrigger>
          <TabsTrigger value="test-categories">Test Categories</TabsTrigger>
          <TabsTrigger value="lab-branches">Lab Branches</TabsTrigger>
        </TabsList>
        <TabsContent value="doctors">
          <DoctorsList />
        </TabsContent>
        <TabsContent value="test-categories">
          <TestCategoriesList />
        </TabsContent>
        <TabsContent value="lab-branches">
          <LabBranchesList />
        </TabsContent>
      </Tabs>
    </main>
  );
}
