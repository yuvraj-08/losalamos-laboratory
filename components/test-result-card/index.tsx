"use client";

import type React from "react";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Download, FileText, Upload } from "lucide-react";

import type { Test, TestResult } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { StatusBadge } from "@/components/status-badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "react-toastify";

type TestResultCardProps = {
  test: Test;
  result?: TestResult;
  isAdmin?: boolean;
  onResultUpdate?: (testId: string, data: any) => void;
};

const resultFormSchema = z.object({
  result_value: z.string().min(1, "Result value is required"),
  remarks: z.string().optional(),
});

const fileUploadSchema = z.object({
  file: z.instanceof(File, { message: "Please select a file" }),
});

export function TestResultCard({
  test,
  result,
  isAdmin = false,
  onResultUpdate,
}: TestResultCardProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const resultForm = useForm<z.infer<typeof resultFormSchema>>({
    resolver: zodResolver(resultFormSchema),
    defaultValues: {
      result_value: result?.result_value || "",
      remarks: result?.remarks || "",
    },
  });

  const fileForm = useForm<z.infer<typeof fileUploadSchema>>({
    resolver: zodResolver(fileUploadSchema),
  });

  const handleResultSubmit = (data: z.infer<typeof resultFormSchema>) => {
    if (!isAdmin) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      if (onResultUpdate) {
        onResultUpdate(test.id, {
          ...data,
          status: "completed",
          performed_at: new Date().toISOString(),
        });
      }

      setIsSubmitting(false);

      toast.success("Test result has been updated successfully.");
    }, 1000);
  };

  const handleFileSubmit = (data: z.infer<typeof fileUploadSchema>) => {
    if (!isAdmin) return;

    setIsSubmitting(true);

    // Simulate API call for file upload
    setTimeout(() => {
      if (onResultUpdate) {
        onResultUpdate(test.id, {
          linkToReport: `/reports/${data.file.name}`,
          status: "completed",
          performed_at: new Date().toISOString(),
        });
      }

      setIsSubmitting(false);
      setSelectedFile(null);

      toast( "Test report has been uploaded successfully.");
    }, 1500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      fileForm.setValue("file", file);
    }
  };

  const handleDownload = () => {
    if (!result?.linkToReport) return;

    // In a real app, this would trigger a download from your API
    toast("Your report download has started.");
  };

  return (
    <Card className="border-gray-200 shadow-sm">
      <CardHeader className="bg-gradient-to-r from-teal-600/5 to-transparent border-b pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <CardTitle className="text-base text-gray-800">{test.name}</CardTitle>
          {result && <StatusBadge status={result.status} type="test" />}
        </div>
        <p className="text-sm text-gray-500 mt-1">{test.description}</p>
      </CardHeader>
      <CardContent className="pt-4">
        {isAdmin && (!result || result.status !== "completed") ? (
          <Tabs defaultValue="form">
            <TabsList className="mb-4">
              <TabsTrigger value="form">Enter Results</TabsTrigger>
              <TabsTrigger value="upload">Upload Report</TabsTrigger>
            </TabsList>

            <TabsContent value="form">
              <Form {...resultForm}>
                <form
                  onSubmit={resultForm.handleSubmit(handleResultSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={resultForm.control}
                    name="result_value"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Result Value</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter test result value"
                            className="resize-none min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={resultForm.control}
                    name="remarks"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Remarks</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter any remarks or notes"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="bg-teal-600 hover:bg-teal-700 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Saving..." : "Save Results"}
                  </Button>
                </form>
              </Form>
            </TabsContent>

            <TabsContent value="upload">
              <Form {...fileForm}>
                <form
                  onSubmit={fileForm.handleSubmit(handleFileSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={fileForm.control}
                    name="file"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Upload Report</FormLabel>
                        <FormControl>
                          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-6 bg-gray-50">
                            <Input
                              type="file"
                              accept=".pdf,.doc,.docx,.jpg,.png"
                              className="hidden"
                              id="file-upload"
                              onChange={handleFileChange}
                            />
                            {selectedFile ? (
                              <div className="flex flex-col items-center gap-2">
                                <FileText className="h-8 w-8 text-teal-600" />
                                <p className="text-sm font-medium">
                                  {selectedFile.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {(selectedFile.size / 1024 / 1024).toFixed(2)}{" "}
                                  MB
                                </p>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setSelectedFile(null)}
                                >
                                  Remove
                                </Button>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center gap-2">
                                <Upload className="h-8 w-8 text-gray-400" />
                                <p className="text-sm font-medium">
                                  Drag and drop or click to upload
                                </p>
                                <p className="text-xs text-gray-500">
                                  Supports PDF, DOC, DOCX, JPG, PNG (max 10MB)
                                </p>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    document
                                      .getElementById("file-upload")
                                      ?.click()
                                  }
                                >
                                  Select File
                                </Button>
                              </div>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="bg-teal-600 hover:bg-teal-700 text-white"
                    disabled={isSubmitting || !selectedFile}
                  >
                    {isSubmitting ? "Uploading..." : "Upload Report"}
                  </Button>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
        ) : result?.status === "completed" ? (
          <div className="space-y-4">
            {result.result_value && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">Result</h3>
                <p className="mt-1 text-sm whitespace-pre-line">
                  {result.result_value}
                </p>
              </div>
            )}

            {result.remarks && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">Remarks</h3>
                <p className="mt-1 text-sm text-gray-700">{result.remarks}</p>
              </div>
            )}

            {result.performed_at && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Performed At
                </h3>
                <p className="mt-1 text-sm text-gray-700">
                  {new Date(result.performed_at).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="py-6 text-center text-gray-500">
            <FileText className="h-8 w-8 mx-auto mb-2 text-gray-400" />
            <p>Results pending</p>
          </div>
        )}
      </CardContent>

      {result?.linkToReport && (
        <CardFooter className="border-t pt-4 flex justify-end">
          <Button
            variant="outline"
            size="sm"
            className="text-teal-600 border-teal-600 hover:bg-teal-50"
            onClick={handleDownload}
          >
            <Download className="h-4 w-4 mr-2" />
            Download Report
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
